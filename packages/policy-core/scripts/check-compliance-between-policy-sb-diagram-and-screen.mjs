#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..", "..", "..");
const policyRoot = path.join(repoRoot, "packages", "policy-core", "policies");
const appRoot = path.join(repoRoot, "apps", "mobile", "src", "app");
const organismsRoot = path.join(repoRoot, "apps", "mobile", "src", "organisms");
const routesPath = path.join(
	repoRoot,
	"apps",
	"mobile",
	"src",
	"scripts",
	"screen-routes",
	"routes.ts",
);
const requiredDesignDocs = ["DESIGN_PATTERNS.md", "DESIGN_FOUNDATION.md"];
const strict =
	process.argv.includes("--strict") || process.env.SCREEN_GENERATION_STRICT === "1";

function readText(filePath) {
	return readFileSync(filePath, "utf8");
}

function readJson(filePath) {
	return JSON.parse(readText(filePath));
}

function walkFiles(dir, predicate) {
	if (!existsSync(dir)) return [];
	const files = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const child = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...walkFiles(child, predicate));
		} else if (predicate(child)) {
			files.push(child);
		}
	}
	return files;
}

function readStringProperty(source, propertyName) {
	const pattern = new RegExp(`${propertyName}:\\s*(?:"([^"]*)"|\`([^\`]*)\`)`, "m");
	const match = source.match(pattern);
	return match?.[1] ?? match?.[2] ?? null;
}

function normalizePath(filePath) {
	return path.relative(repoRoot, filePath);
}

function kebabToPascal(value) {
	return value
		.split("-")
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");
}

function componentNameFromOgnId(ognId) {
	return kebabToPascal(ognId.replace(/^ogn-[a-z]+-/i, ""));
}

function color(text, code) {
	return process.stdout.isTTY ? `\u001B[${code}m${text}\u001B[0m` : text;
}

const red = (text) => color(text, "31");
const green = (text) => color(text, "32");
const yellow = (text) => color(text, "33");
const dim = (text) => color(text, "2");

const report = {
	problems: 0,
	warnings: 0,
	checked: 0,
	adoptionWarnings: 0,
};

function problem(message) {
	report.problems += 1;
	console.log(`      ${red("✗")} ${message}`);
}

function warning(message) {
	report.warnings += 1;
	console.log(`      ${yellow("·")} ${message}`);
}

function adoptionWarning(message) {
	report.adoptionWarnings += 1;
	if (strict) {
		problem(message);
	} else {
		warning(message);
	}
}

function ok(message) {
	console.log(`      ${green("✓")} ${message}`);
}

function parseScreenConfig(configPath) {
	const source = readText(configPath);
	return {
		filePath: configPath,
		dir: path.dirname(configPath),
		id: readStringProperty(source, "id"),
		route: readStringProperty(source, "route"),
		domain: readStringProperty(source, "domain"),
	};
}

function parseOrganismConfig(configPath) {
	const source = readText(configPath);
	const id = readStringProperty(source, "id");
	if (!id) return null;
	const domain = path.basename(path.dirname(path.dirname(configPath)));
	return {
		id,
		name: readStringProperty(source, "name") ?? componentNameFromOgnId(id),
		domain,
		filePath: configPath,
		dir: path.dirname(configPath),
	};
}

function collectPolicyIds() {
	return new Set(
		walkFiles(policyRoot, (filePath) => filePath.endsWith(".policy.ts"))
			.map((filePath) => readStringProperty(readText(filePath), "id"))
			.filter(Boolean),
	);
}

function collectOrganisms() {
	const organisms = walkFiles(organismsRoot, (filePath) =>
		filePath.endsWith(".config.ts"),
	)
		.map(parseOrganismConfig)
		.filter(Boolean);
	return new Map(organisms.map((organism) => [organism.id, organism]));
}

function collectCurrentScreens() {
	return walkFiles(appRoot, (filePath) => filePath.endsWith("Screen.config.ts"))
		.map(parseScreenConfig)
		.filter((screen) => screen.id?.startsWith("NOVA-"));
}

function includesAll(text, values) {
	return values.every((value) => text.includes(value));
}

function hasDeprecatedImport(filePath) {
	return existsSync(filePath) && readText(filePath).includes("@pxds/pxds-components");
}

function validateMetaShape(meta) {
	const requiredStrings = ["screenId", "domain", "source", "pattern"];
	const requiredArrays = ["policyRefs", "ognIds", "designDocsChecked"];
	for (const field of requiredStrings) {
		if (typeof meta[field] !== "string" || meta[field].length === 0) {
			problem(`generation.meta.json field "${field}" must be a non-empty string`);
		}
	}
	for (const field of requiredArrays) {
		if (!Array.isArray(meta[field])) {
			problem(`generation.meta.json field "${field}" must be an array`);
		}
	}
}

function validateScreen(screen, context) {
	const screenLabel = screen.id ?? path.basename(screen.dir);
	const screenRel = normalizePath(screen.dir);
	const screenPath = path.join(screen.dir, "Screen.tsx");
	const metaPath = path.join(screen.dir, "generation.meta.json");
	const diagramPath = path.join(screen.dir, "generation.diagram.md");
	const hasMeta = existsSync(metaPath);
	const hasDiagram = existsSync(diagramPath);
	console.log(`  ${screenLabel}  ${dim(screenRel)}`);

	if (!hasMeta && !hasDiagram) {
		adoptionWarning(
			"generation.meta.json and generation.diagram.md are not present yet",
		);
		return;
	}

	if (!hasMeta || !hasDiagram) {
		problem("generation.meta.json and generation.diagram.md must be created together");
		return;
	}

	report.checked += 1;

	let meta;
	try {
		meta = readJson(metaPath);
	} catch (error) {
		problem(`generation.meta.json is not valid JSON: ${error.message}`);
		return;
	}

	validateMetaShape(meta);

	if (meta.screenId !== screen.id) {
		problem(`meta screenId "${meta.screenId}" does not match Screen.config id "${screen.id}"`);
	} else {
		ok("meta screenId matches Screen.config id");
	}

	if (meta.domain !== screen.domain) {
		problem(`meta domain "${meta.domain}" does not match Screen.config domain "${screen.domain}"`);
	}

	for (const doc of requiredDesignDocs) {
		if (!meta.designDocsChecked?.includes(doc)) {
			problem(`designDocsChecked must include ${doc}`);
		}
	}

	if (requiredDesignDocs.every((doc) => meta.designDocsChecked?.includes(doc))) {
		ok("required design docs are recorded");
	}

	if (!Array.isArray(meta.policyRefs) || meta.policyRefs.length === 0) {
		warning("policyRefs is empty; generated screens should usually bind policy ids");
	}

	for (const policyId of meta.policyRefs ?? []) {
		if (!context.policyIds.has(policyId)) {
			problem(`unknown policyRef: ${policyId}`);
		}
	}

	const diagram = readText(diagramPath);
	if (!diagram.includes("AppScreen")) {
		problem("generation.diagram.md must include AppScreen");
	}
	if (meta.screenId && !diagram.includes(meta.screenId)) {
		problem(`generation.diagram.md must include screenId ${meta.screenId}`);
	}
	if (!includesAll(diagram, meta.ognIds ?? [])) {
		problem("generation.diagram.md must include every ognId from meta");
	}
	if (!includesAll(diagram, meta.policyRefs ?? [])) {
		problem("generation.diagram.md must include every policyRef from meta");
	}

	const screenSource = existsSync(screenPath) ? readText(screenPath) : "";
	if (!screenSource) {
		problem("Screen.tsx is missing");
	}

	for (const ognId of meta.ognIds ?? []) {
		const organism = context.organismsById.get(ognId);
		if (!organism) {
			problem(`unknown ognId: ${ognId}`);
			continue;
		}
		if (organism.domain !== meta.domain) {
			problem(`ognId ${ognId} belongs to domain "${organism.domain}", not "${meta.domain}"`);
		}
		if (!screenSource.includes(organism.name)) {
			problem(`Screen.tsx must use organism component ${organism.name} for ${ognId}`);
		}
		if (hasDeprecatedImport(path.join(organism.dir, `${organism.name}.tsx`))) {
			problem(`organism ${ognId} imports deprecated @pxds/pxds-components`);
		}
	}

	if (hasDeprecatedImport(screenPath)) {
		problem("Screen.tsx imports deprecated @pxds/pxds-components");
	}

	if (!context.routesSource.includes(path.basename(screen.dir))) {
		problem("screen-routes/routes.ts does not reference this screen directory");
	} else {
		ok("screen route catalog references this screen");
	}
}

const context = {
	policyIds: collectPolicyIds(),
	organismsById: collectOrganisms(),
	routesSource: existsSync(routesPath) ? readText(routesPath) : "",
};

const screens = collectCurrentScreens();

console.log("");
console.log(color("═══ Policy ↔ SB diagram ↔ screen compliance ═══", "1;36"));
console.log(strict ? dim("strict mode: missing generation files are failures") : dim("adoption mode: missing generation files are warnings"));
console.log("");

for (const screen of screens) {
	validateScreen(screen, context);
}

console.log("");
console.log(color("─── summary ───", "1"));
console.log(`  current screens     : ${screens.length}`);
console.log(`  generation checked  : ${report.checked}`);
console.log(`  adoption warnings   : ${report.adoptionWarnings}`);
console.log(`  warnings            : ${report.warnings > 0 ? yellow(String(report.warnings)) : green("0")}`);
console.log(`  problems            : ${report.problems > 0 ? red(String(report.problems)) : green("0")}`);
console.log("");

process.exit(report.problems > 0 ? 1 : 0);
