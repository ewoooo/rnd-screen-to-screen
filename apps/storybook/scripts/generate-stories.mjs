#!/usr/bin/env node
/**
 * Generate Storybook stories for every component in @pxds/cx-components
 * by reading its preview registry and examples. Each generated story is a
 * thin wrapper that calls the existing example.cases[i].render() function,
 * so the SOT stays in cx-components.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(HERE, "..");
const REPO_ROOT = resolve(APP_ROOT, "../..");
const PREVIEW_DIR = resolve(
	REPO_ROOT,
	"packages/cx-components/src/preview",
);
const OUT_DIR = resolve(APP_ROOT, "generated/components");

function readText(path) {
	return readFileSync(path, "utf-8");
}

/**
 * Parse registry.ts into a list of entries.
 * The file is a single `export const cxComponentPreviewRegistry = [ {...}, {...} ]`
 * where each entry has flat string fields.
 */
function parseRegistry(source) {
	const arrayMatch = source.match(
		/cxComponentPreviewRegistry\s*=\s*\[([\s\S]*?)\n\]\s*as const;?/,
	);
	const body = arrayMatch ? arrayMatch[1] : source;
	const blocks = splitTopLevelObjects(body);
	const entries = [];
	for (const block of blocks) {
		const id = pickString(block, "id");
		if (!id) continue;
		entries.push({
			id,
			name: pickString(block, "name") ?? id,
			layer: pickString(block, "layer") ?? "base",
			group: pickString(block, "group") ?? "misc",
			owner: pickString(block, "owner") ?? "@pxds/cx-components",
			importPath: pickString(block, "importPath") ?? "",
			status: pickString(block, "status") ?? "active",
			candidateKind: pickString(block, "candidateKind"),
		});
	}
	return entries;
}

/**
 * Parse examples.tsx — each top-level block has componentId, description, cases.
 * Cases contain JSX render functions, so we extract case id/label only and skip
 * the render bodies entirely. We never need to evaluate React here.
 */
function parseExamples(source) {
	const arrayMatch = source.match(
		/cxComponentPreviewExamples\s*=\s*\[([\s\S]*?)\n\]\s*(?:as const)?\s*;?/,
	);
	const body = arrayMatch ? arrayMatch[1] : source;
	const blocks = splitTopLevelObjects(body);
	const examples = [];
	for (const block of blocks) {
		const componentId = pickString(block, "componentId");
		if (!componentId) continue;
		const description = pickString(block, "description") ?? "";
		const cases = [];
		const caseRegex = /id:\s*"([^"]+)",\s*label:\s*"([^"]+)"/g;
		for (const match of block.matchAll(caseRegex)) {
			cases.push({ id: match[1], label: match[2] });
		}
		examples.push({ componentId, description, cases });
	}
	return examples;
}

/**
 * Split a section into top-level object literals by tracking brace depth and
 * skipping over string contents. We rely on this instead of regex because case
 * render bodies contain JSX with arbitrary braces.
 */
function splitTopLevelObjects(body) {
	const blocks = [];
	let depth = 0;
	let start = -1;
	let inString = false;
	let stringChar = "";
	let inBacktick = false;
	let inLineComment = false;
	let inBlockComment = false;
	for (let i = 0; i < body.length; i++) {
		const ch = body[i];
		const next = body[i + 1];
		if (inLineComment) {
			if (ch === "\n") inLineComment = false;
			continue;
		}
		if (inBlockComment) {
			if (ch === "*" && next === "/") {
				inBlockComment = false;
				i++;
			}
			continue;
		}
		if (inString) {
			if (ch === "\\") {
				i++;
				continue;
			}
			if (ch === stringChar) inString = false;
			continue;
		}
		if (inBacktick) {
			if (ch === "\\") {
				i++;
				continue;
			}
			if (ch === "`") inBacktick = false;
			continue;
		}
		if (ch === "/" && next === "/") {
			inLineComment = true;
			i++;
			continue;
		}
		if (ch === "/" && next === "*") {
			inBlockComment = true;
			i++;
			continue;
		}
		if (ch === '"' || ch === "'") {
			inString = true;
			stringChar = ch;
			continue;
		}
		if (ch === "`") {
			inBacktick = true;
			continue;
		}
		if (ch === "{") {
			if (depth === 0) start = i;
			depth++;
		} else if (ch === "}") {
			depth--;
			if (depth === 0 && start !== -1) {
				blocks.push(body.slice(start, i + 1));
				start = -1;
			}
		}
	}
	return blocks;
}

function pickString(block, field) {
	const re = new RegExp(`${field}:\\s*"([^"]+)"`);
	const m = block.match(re);
	return m ? m[1] : undefined;
}

/**
 * PascalCase from id ("text-field" → "TextField"). Guarantees a valid JS
 * identifier for the story export name. Falls back to Case0/Case1/... if the
 * id starts with a digit.
 */
function toStoryExportName(caseId, index) {
	const pascal = caseId
		.split(/[^a-zA-Z0-9]+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");
	if (!pascal || /^\d/.test(pascal)) return `Case${index + 1}`;
	return pascal;
}

function uniquifyName(name, taken) {
	let candidate = name;
	let suffix = 2;
	while (taken.has(candidate)) {
		candidate = `${name}${suffix++}`;
	}
	taken.add(candidate);
	return candidate;
}

function titleFor(entry) {
	const root = entry.status === "candidate" ? "Candidate" : "Components";
	return `${root}/${entry.group}/${entry.name}`;
}

function renderStoryFile(entry, example) {
	const cases = example?.cases ?? [];
	const taken = new Set();
	const storyExports = cases
		.map((c, i) => {
			const name = uniquifyName(toStoryExportName(c.id, i), taken);
			return `export const ${name}: StoryObj = {
\tname: ${JSON.stringify(c.label)},
\trender: () => example.cases[${i}].render() as ReactElement,
};`;
		})
		.join("\n\n");

	const description = (example?.description ?? "").replace(/`/g, "\\`");
	const docDescription = description ? `\n\t\tdocs: {\n\t\t\tdescription: {\n\t\t\t\tcomponent: \`${description}\`,\n\t\t\t},\n\t\t},` : "";

	return `// @generated by apps/storybook/scripts/generate-stories.mjs
// Do not edit by hand. Regenerate via \`npm run generate:stories -w @screen/storybook\`.
import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { getCxComponentPreviewExample } from "@pxds/cx-components/preview";

const example = getCxComponentPreviewExample(${JSON.stringify(entry.id)});
if (!example) {
\tthrow new Error("Missing preview example for component ${entry.id}");
}

const meta: Meta = {
\ttitle: ${JSON.stringify(titleFor(entry))},
\ttags: ["autodocs"],
\tparameters: {${docDescription}
\t\tlayer: ${JSON.stringify(entry.layer)},
\t\towner: ${JSON.stringify(entry.owner)},
\t\timportPath: ${JSON.stringify(entry.importPath)},
\t\tstatus: ${JSON.stringify(entry.status)},${entry.candidateKind ? `\n\t\tcandidateKind: ${JSON.stringify(entry.candidateKind)},` : ""}
\t},
};
export default meta;

${storyExports}
`;
}

function main() {
	const registrySource = readText(resolve(PREVIEW_DIR, "registry.ts"));
	const examplesSource = readText(resolve(PREVIEW_DIR, "examples.tsx"));
	const entries = parseRegistry(registrySource);
	const examples = parseExamples(examplesSource);
	const examplesById = new Map(examples.map((e) => [e.componentId, e]));

	if (existsSync(OUT_DIR)) {
		rmSync(OUT_DIR, { recursive: true, force: true });
	}
	mkdirSync(OUT_DIR, { recursive: true });

	let withStories = 0;
	let skipped = 0;
	for (const entry of entries) {
		const example = examplesById.get(entry.id);
		if (!example || example.cases.length === 0) {
			skipped++;
			continue;
		}
		const fileName = `${entry.id}.stories.tsx`;
		const filePath = resolve(OUT_DIR, fileName);
		writeFileSync(filePath, renderStoryFile(entry, example), "utf-8");
		withStories++;
	}

	console.log(
		`[generate-stories] wrote ${withStories} story files to apps/storybook/generated/components (skipped ${skipped} entries without preview cases).`,
	);
}

main();
