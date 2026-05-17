#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..", "..", "..");
const policyRoot = path.join(repoRoot, "packages", "policy-core", "policies");
const governanceRoot = path.join(repoRoot, "packages", "policy-core", "governance");
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
const requiredDesignDocs = [
	"DESIGN_PATTERNS.md",
	"DESIGN_FOUNDATION.md",
	"SCREEN_STRUCTURE_PRINCIPLES.md",
];
const requiredDiagramSections = [
	"Screen Contract",
	"Screen Wire",
	"Section Contracts",
	"Policy / OGN Matrix",
	"Distortion Gates",
];
const buildSelectionSources = new Set([
	"componentCandidates",
	"existing-composition",
	"new-organism",
	"new-component",
]);
const routeGroupDomainAliases = new Map([
	["nova-mbr-legacy", "mbr"],
]);
const strict =
	process.argv.includes("--strict") || process.env.SCREEN_GENERATION_STRICT === "1";

function readText(filePath) {
	return readFileSync(filePath, "utf8");
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

function readStringArrayProperty(source, propertyName) {
	const pattern = new RegExp(`${propertyName}:\\s*\\[([\\s\\S]*?)\\]`, "m");
	const match = source.match(pattern);
	if (!match) return null;
	return Array.from(match[1].matchAll(/"([^"]*)"|`([^`]*)`/g)).map(
		(item) => item[1] ?? item[2],
	);
}

function isIdentifierChar(char) {
	return /[A-Za-z0-9_$]/.test(char ?? "");
}

function findPropertyValueStart(source, propertyName) {
	let quote = null;
	let escaped = false;
	for (let index = 0; index < source.length; index += 1) {
		const char = source[index];
		if (quote) {
			if (escaped) {
				escaped = false;
			} else if (char === "\\") {
				escaped = true;
			} else if (char === quote) {
				quote = null;
			}
			continue;
		}
		if (char === "\"" || char === "'" || char === "`") {
			quote = char;
			continue;
		}
		if (!source.startsWith(propertyName, index)) continue;
		if (isIdentifierChar(source[index - 1])) continue;
		let colonIndex = index + propertyName.length;
		while (/\s/.test(source[colonIndex] ?? "")) colonIndex += 1;
		if (source[colonIndex] !== ":") continue;
		let valueStart = colonIndex + 1;
		while (/\s/.test(source[valueStart] ?? "")) valueStart += 1;
		return valueStart;
	}
	return -1;
}

function findMatchingBracket(source, startIndex, openChar, closeChar) {
	let depth = 0;
	let quote = null;
	let escaped = false;
	for (let index = startIndex; index < source.length; index += 1) {
		const char = source[index];
		if (quote) {
			if (escaped) {
				escaped = false;
			} else if (char === "\\") {
				escaped = true;
			} else if (char === quote) {
				quote = null;
			}
			continue;
		}
		if (char === "\"" || char === "'" || char === "`") {
			quote = char;
			continue;
		}
		if (char === openChar) {
			depth += 1;
		} else if (char === closeChar) {
			depth -= 1;
			if (depth === 0) return index;
		}
	}
	return -1;
}

function readRawArrayProperty(source, propertyName) {
	const start = findPropertyValueStart(source, propertyName);
	if (start === -1) return { present: false, isArray: false, raw: null };
	const valueStart = source.slice(start).search(/\S/);
	if (valueStart === -1) return { present: true, isArray: false, raw: null };
	const arrayStart = start + valueStart;
	if (source[arrayStart] !== "[") {
		return { present: true, isArray: false, raw: null };
	}
	const arrayEnd = findMatchingBracket(source, arrayStart, "[", "]");
	if (arrayEnd === -1) {
		return { present: true, isArray: false, raw: null };
	}
	return {
		present: true,
		isArray: true,
		raw: source.slice(arrayStart + 1, arrayEnd),
	};
}

function splitTopLevelItems(source) {
	const items = [];
	let start = 0;
	let depth = 0;
	let quote = null;
	let escaped = false;
	for (let index = 0; index < source.length; index += 1) {
		const char = source[index];
		if (quote) {
			if (escaped) {
				escaped = false;
			} else if (char === "\\") {
				escaped = true;
			} else if (char === quote) {
				quote = null;
			}
			continue;
		}
		if (char === "\"" || char === "'" || char === "`") {
			quote = char;
			continue;
		}
		if (char === "{" || char === "[") {
			depth += 1;
		} else if (char === "}" || char === "]") {
			depth -= 1;
		} else if (char === "," && depth === 0) {
			const item = source.slice(start, index).trim();
			if (item) items.push(item);
			start = index + 1;
		}
	}
	const item = source.slice(start).trim();
	if (item) items.push(item);
	return items;
}

function trimObjectLiteral(source) {
	const trimmed = source.trim();
	if (!trimmed.startsWith("{")) return null;
	const end = findMatchingBracket(trimmed, 0, "{", "}");
	if (end === -1) return null;
	return trimmed.slice(1, end);
}

function readRawObjectStringProperty(source, propertyName) {
	const start = findPropertyValueStart(source, propertyName);
	if (start === -1) return null;
	const quote = source[start];
	if (quote !== "\"" && quote !== "'" && quote !== "`") return null;
	let value = "";
	let escaped = false;
	for (let index = start + 1; index < source.length; index += 1) {
		const char = source[index];
		if (escaped) {
			value += char;
			escaped = false;
		} else if (char === "\\") {
			escaped = true;
		} else if (char === quote) {
			return value;
		} else {
			value += char;
		}
	}
	return null;
}

function readBuildSelections(source) {
	const array = readRawArrayProperty(source, "buildSelections");
	if (!array.present || !array.isArray) return { ...array, items: [] };
	return {
		...array,
		items: splitTopLevelItems(array.raw).map((item) => ({
			raw: item,
			body: trimObjectLiteral(item),
		})),
	};
}

function extractMarkdownSection(source, heading) {
	const lines = source.split(/\r?\n/);
	const start = lines.findIndex((line) => line.trim() === `## ${heading}`);
	if (start === -1) return "";
	const end = lines.findIndex(
		(line, index) => index > start && line.startsWith("## "),
	);
	return lines.slice(start + 1, end === -1 ? undefined : end).join("\n");
}

function extractWireSectionIds(screenWire) {
	return Array.from(screenWire.matchAll(/\[([A-Za-z][A-Za-z0-9_.-]*)\]/g))
		.map((match) => match[1])
		.filter((id) => !["Header", "Content", "Bottom", "Divider"].includes(id));
}

function validateScreenWireContract(diagram, screenWire, sectionContracts) {
	if (!screenWire.trim()) {
		problem("Screen Wire must include an actual screen-like ASCII wire");
		return;
	}

	if (!/┌─AppScreen/.test(screenWire)) {
		problem("Screen Wire must show the AppScreen top rail, e.g. ┌─AppScreen");
	}
	if (!/├─Header/.test(screenWire)) {
		problem("Screen Wire must show the AppScreen Header rail, e.g. ├─Header");
	}
	if (!/├─Content/.test(screenWire)) {
		problem("Screen Wire must show the AppScreen Content rail, e.g. ├─Content");
	}
	if (diagram.includes("Bottom(preset=") && !/├─Bottom/.test(screenWire)) {
		problem("Screen Wire must show the AppScreen Bottom rail when Bottom(preset=...) is used, e.g. ├─Bottom");
	}
	if (/Divider/.test(screenWire) && !/├═+Divider/.test(screenWire)) {
		problem("Screen Wire divider must use the explicit divider rail form, e.g. ├══Divider");
	}

	for (const sectionId of extractWireSectionIds(screenWire)) {
		if (!sectionContracts.includes(sectionId)) {
			problem(`Section Contracts must include Screen Wire section id [${sectionId}]`);
		}
	}
}

function extractGovernanceRefs(source) {
	return Array.from(source.matchAll(/\b(UXP_[A-Z0-9_]+|UXPT_[A-Z0-9_]+|VOT_[A-Z0-9_]+)\b/g))
		.map((match) => match[1]);
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

function domainFromRouteGroup(routeGroup) {
	return routeGroupDomainAliases.get(routeGroup) ?? routeGroup;
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
	infos: 0,
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

function info(message) {
	report.infos += 1;
	console.log(`      ${dim("·")} ${message}`);
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
		generation: {
			source: readStringProperty(source, "source"),
			pattern: readStringProperty(source, "pattern"),
			policyRefs: readStringArrayProperty(source, "policyRefs"),
			ognIds: readStringArrayProperty(source, "ognIds"),
			governanceRefs: readStringArrayProperty(source, "governanceRefs"),
			designDocsChecked: readStringArrayProperty(source, "designDocsChecked"),
			buildSelections: readBuildSelections(source),
		},
	};
}

function parseOrganismConfig(configPath) {
	const source = readText(configPath);
	const id = readStringProperty(source, "id");
	if (!id) return null;
	const domain = domainFromRouteGroup(path.basename(path.dirname(path.dirname(configPath))));
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

function collectGovernanceIds() {
	return new Set(
		walkFiles(governanceRoot, (filePath) =>
			filePath.endsWith(".md") && path.basename(filePath) !== "README.md",
		).map((filePath) => path.basename(filePath, ".md")),
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
		.filter(
			(screen) =>
				screen.id?.startsWith("NOVA-") ||
				screen.id?.startsWith("CX-EXAMPLE-"),
		);
}

function includesAll(text, values) {
	return values.every((value) => text.includes(value));
}

const sampleLengthAcceptanceEvidencePatterns = [
	/\bshort enough\b/i,
	/\bcurrent\b[^\n]{0,120}\b(?:sample|proof|copy|data|values?|figma proof)\b[^\n]{0,120}\b(?:short|fit|fits|sufficient|enough)\b/i,
	/\b(?:sample|proof|copy|data|values?|figma proof)\b[^\n]{0,120}\b(?:short|fit|fits|sufficient|enough)\b[^\n]{0,120}\bcurrent\b/i,
	/현재[\s\S]{0,80}(?:샘플|증빙|값|데이터|문구|카피|copy)[\s\S]{0,80}(?:짧|맞|충분|들어맞)/,
	/(?:샘플|증빙|값|데이터|문구|카피|copy)[\s\S]{0,80}(?:짧|맞|충분|들어맞)[\s\S]{0,80}현재/,
];

function hasSampleLengthAcceptanceEvidence(text) {
	return sampleLengthAcceptanceEvidencePatterns.some((pattern) => pattern.test(text));
}

function validateCapabilityBasedFitEvidence(label, text) {
	if (!text || !hasSampleLengthAcceptanceEvidence(text)) return;
	problem(
		`${label} fit and selection rationale must be capability-based; prove reusable layout behavior against layoutContract and Distortion Gates`,
	);
}

function extractNamedCandidateBlocks(diagram) {
	const starts = Array.from(diagram.matchAll(/^\s*-\s+name:\s*(.+)$/gm)).map(
		(match) => ({
			index: match.index,
			name: match[1],
		}),
	);
	return starts.map((start, index) => {
		const end = starts[index + 1]?.index ?? diagram.length;
		return {
			name: start.name,
			body: diagram.slice(start.index, end),
		};
	});
}

function hasUnderSpecifiedConventionMarker(text) {
	return /sourceCompleteness:\s*(?:under-specified-proof|conflict-with-convention)|establishedConvention:|decisionRequired:|assumption:/i.test(
		text,
	);
}

function validateNoUnderSpecifiedConventionAutoReject(label, text) {
	if (!text) return;
	const rejectsRqrForMissingHeader =
		/RQRContentsDetail/i.test(text) &&
		/fit:\s*reject|candidate:\s*["'`]RQRContentsDetail["'`]/i.test(text) &&
		/(?:no|without|missing|not present|lacks?)[^\n.]{0,80}(?:card\s*)?(?:title|header)|(?:title|header)[^\n.]{0,80}(?:not present|missing|lacks?)/i.test(
			text,
		);
	if (!rejectsRqrForMissingHeader) return;
	if (hasUnderSpecifiedConventionMarker(text)) return;
	problem(
		`${label} must pass Pattern-Family Precedent Gate before rejecting an established summary-card convention candidate only because a structural proof wire lacks an authorable title/header; record sourceCompleteness, establishedConvention, and decisionRequired or assumption`,
	);
}

function hasDeprecatedImport(filePath) {
	return existsSync(filePath) && readText(filePath).includes("@pxds/pxds-components");
}

function hasGenerationConfig(screen) {
	const generation = screen.generation;
	return Boolean(
		generation.source ||
			generation.pattern ||
			generation.policyRefs ||
			generation.ognIds ||
			generation.governanceRefs ||
			generation.designDocsChecked ||
			generation.buildSelections?.present,
	);
}

function validateGenerationShape(generation) {
	const requiredStrings = ["source", "pattern"];
	const requiredArrays = ["policyRefs", "ognIds", "designDocsChecked"];
	for (const field of requiredStrings) {
		if (typeof generation[field] !== "string" || generation[field].length === 0) {
			problem(`Screen.config.ts generation.${field} must be a non-empty string`);
		}
	}
	for (const field of requiredArrays) {
		if (!Array.isArray(generation[field])) {
			problem(`Screen.config.ts generation.${field} must be an array`);
		}
	}
}

function validateBuildSelectionsShape(generation) {
	const buildSelections = generation.buildSelections;
	if (!buildSelections?.present) return;

	if (!buildSelections.isArray) {
		problem("Screen.config.ts generation.buildSelections must be an array when present");
		return;
	}

	for (const [index, item] of buildSelections.items.entries()) {
		const itemLabel = `Screen.config.ts generation.buildSelections[${index}]`;
		if (!item.body) {
			problem(`${itemLabel} must be an object`);
			continue;
		}

		const requiredStrings = ["section", "selected", "source", "reason"];
		for (const field of requiredStrings) {
			const value = readRawObjectStringProperty(item.body, field);
			if (typeof value !== "string" || value.trim().length === 0) {
				problem(`${itemLabel}.${field} must be a non-empty string`);
			}
		}
		validateCapabilityBasedFitEvidence(itemLabel, item.body);
		validateNoUnderSpecifiedConventionAutoReject(itemLabel, item.body);

		const source = readRawObjectStringProperty(item.body, "source");
		if (source && !buildSelectionSources.has(source)) {
			problem(`${itemLabel}.source must be one of ${Array.from(buildSelectionSources).join(", ")}`);
		}

		const rejected = readRawArrayProperty(item.body, "rejected");
		if (rejected.present) {
			if (!rejected.isArray) {
				problem(`${itemLabel}.rejected must be an array when present`);
			} else {
				for (const [rejectedIndex, rejectedItem] of splitTopLevelItems(rejected.raw).entries()) {
					const rejectedLabel = `${itemLabel}.rejected[${rejectedIndex}]`;
					const rejectedBody = trimObjectLiteral(rejectedItem);
					if (!rejectedBody) {
						problem(`${rejectedLabel} must be an object`);
						continue;
					}
					for (const field of ["candidate", "reason"]) {
						const value = readRawObjectStringProperty(rejectedBody, field);
						if (typeof value !== "string" || value.trim().length === 0) {
							problem(`${rejectedLabel}.${field} must be a non-empty string`);
						}
					}
					validateCapabilityBasedFitEvidence(rejectedLabel, rejectedBody);
					validateNoUnderSpecifiedConventionAutoReject(rejectedLabel, rejectedBody);
				}
			}
		}

		const deviationReasonStart = findPropertyValueStart(item.body, "deviationReason");
		if (deviationReasonStart !== -1) {
			const deviationReason = readRawObjectStringProperty(item.body, "deviationReason");
			if (typeof deviationReason !== "string" || deviationReason.trim().length === 0) {
				problem(`${itemLabel}.deviationReason must be a non-empty string when present`);
			} else {
				info(`${itemLabel}.deviationReason recorded: ${deviationReason}`);
			}
		}
	}
}

function validateBuildSelectionsAgainstDiagram(generation, diagram) {
	const buildSelections = generation.buildSelections;
	if (!buildSelections?.present || !buildSelections.isArray) return;

	for (const [index, item] of buildSelections.items.entries()) {
		if (!item.body) continue;
		const itemLabel = `Screen.config.ts generation.buildSelections[${index}]`;
		const section = readRawObjectStringProperty(item.body, "section");
		const selected = readRawObjectStringProperty(item.body, "selected");

		if (section && !diagram.includes(`[${section}]`) && !diagram.includes(section)) {
			problem(`${itemLabel}.section "${section}" must appear in Screen.diagram.md`);
		}

		if (selected && !diagram.includes(selected)) {
			warning(`${itemLabel}.selected "${selected}" does not appear verbatim in Screen.diagram.md`);
		}
	}
}

function validateDiagramProcessGates(diagram) {
	if (!/wireReference\s*:/i.test(diagram)) {
		warning("Screen.diagram.md should record wireReference in Screen Contract");
	}
	if (!/ognBoundaryDecision\s*:/i.test(diagram)) {
		warning("Screen.diagram.md should record ognBoundaryDecision for each policy-bearing section/OGN");
	}
	if (!/layoutContract\s*:/i.test(diagram)) {
		warning("Screen.diagram.md should record layoutContract before Build");
	}
	if (!/componentCandidates\s*:/i.test(diagram)) {
		warning("Screen.diagram.md should record componentCandidates before Build");
	}
}

function validateFoundationScan(label, source) {
	if (!source) return;
	const rawStylePatterns = [
		{ name: "raw hex color", pattern: /#[0-9a-fA-F]{3,8}\b/ },
		{ name: "raw fontSize", pattern: /\bfontSize\s*[:=]/ },
		{ name: "raw font-size", pattern: /\bfont-size\s*:/ },
		{ name: "route-level margin", pattern: /\bmargin(?:Top|Right|Bottom|Left)?\s*[:=]/ },
		{ name: "route-level padding", pattern: /\bpadding(?:Top|Right|Bottom|Left)?\s*[:=]/ },
	];
	for (const { name, pattern } of rawStylePatterns) {
		if (pattern.test(source)) {
			warning(`${label} contains ${name}; confirm DESIGN_FOUNDATION.md token/component ownership`);
		}
	}
}

function validateCompletionPattern(screen, screenSource, organismSources) {
	if (screen.generation.pattern !== "complete") return;
	const combinedSource = `${screenSource}\n${organismSources.join("\n")}`;
	if (!/TitleMain[\s\S]{0,300}type=["']complete["']/.test(combinedSource)) {
		warning('complete pattern should render TitleMain type="complete"');
	}
	if (/type=["']back["']|leftLabel=["']뒤로["']|title=["']뒤로["']/.test(screenSource)) {
		warning("complete pattern should not expose back navigation as the primary AppBar action");
	}
	if (!/AppScreen\.Bottom[\s\S]{0,200}preset=["']primary-cta["']/.test(screenSource)) {
		warning('complete pattern should keep the primary CTA in AppScreen.Bottom preset="primary-cta"');
	}
}

function validateScreenMap(screen, context, mapPath) {
	if (!existsSync(mapPath)) {
		problem("Screen.map.md is missing; generated screens must record Phase 2 policy/governance mapping");
		return null;
	}

	const map = readText(mapPath);
	ok("Screen.map.md is present");

	if (screen.id && !map.includes(screen.id)) {
		problem(`Screen.map.md must include screenId ${screen.id}`);
	}

	if (!includesAll(map, screen.generation.policyRefs ?? [])) {
		problem("Screen.map.md must include every policyRef from Screen.config generation");
	}

	if (!includesAll(map, screen.generation.ognIds ?? [])) {
		problem("Screen.map.md must include every ognId from Screen.config generation");
	}

	const governanceRefsFromConfig = screen.generation.governanceRefs ?? [];
	for (const governanceRef of governanceRefsFromConfig) {
		if (!context.governanceIds.has(governanceRef)) {
			problem(`unknown governanceRef: ${governanceRef}`);
		}
	}

	if (governanceRefsFromConfig.length > 0 && !includesAll(map, governanceRefsFromConfig)) {
		problem("Screen.map.md must include every governanceRef from Screen.config generation");
	}

	const governanceRefsFromMap = extractGovernanceRefs(map);
	if (
		governanceRefsFromMap.length === 0 &&
		!map.includes("governanceRefs") &&
		!map.includes("notApplicableReason")
	) {
		problem("Screen.map.md must record governanceRefs or notApplicableReason");
	}

	return map;
}

function validateDiagramContract(screen, context, diagramPath, mapText) {
	const diagram = readText(diagramPath);
	validateCapabilityBasedFitEvidence("Screen.diagram.md", diagram);
	for (const candidate of extractNamedCandidateBlocks(diagram)) {
		if (!/RQRContentsDetail/i.test(candidate.name)) continue;
		validateNoUnderSpecifiedConventionAutoReject(
			`Screen.diagram.md candidate ${candidate.name}`,
			candidate.body,
		);
	}

	if (!diagram.includes("AppScreen")) {
		problem("Screen.diagram.md must include AppScreen");
	}
	if (screen.id && !diagram.includes(screen.id)) {
		problem(`Screen.diagram.md must include screenId ${screen.id}`);
	}
	if (!includesAll(diagram, screen.generation.ognIds ?? [])) {
		problem("Screen.diagram.md must include every ognId from Screen.config generation");
	}
	if (!includesAll(diagram, screen.generation.policyRefs ?? [])) {
		problem("Screen.diagram.md must include every policyRef from Screen.config generation");
	}

	for (const section of requiredDiagramSections) {
		if (!diagram.includes(`## ${section}`)) {
			problem(`Screen.diagram.md must include "## ${section}"`);
		}
	}

	if (diagram.includes("AppScreen.ActionBar") || diagram.includes("ActionBar(")) {
		problem('Screen.diagram.md must use Bottom(preset="...") instead of AppScreen.ActionBar/ActionBar');
	}

	const screenWire = extractMarkdownSection(diagram, "Screen Wire");
	const sectionContracts = extractMarkdownSection(diagram, "Section Contracts");
	validateScreenWireContract(diagram, screenWire, sectionContracts);
	validateDiagramProcessGates(diagram);
	validateBuildSelectionsAgainstDiagram(screen.generation, diagram);

	const governanceRefsFromConfig = screen.generation.governanceRefs ?? [];
	if (
		governanceRefsFromConfig.length > 0 &&
		!includesAll(diagram, governanceRefsFromConfig)
	) {
		problem("Screen.diagram.md must include every governanceRef from Screen.config generation");
	}

	if (mapText) {
		const governanceRefsFromMap = Array.from(new Set(extractGovernanceRefs(mapText)));
		const appliedGovernanceRefs = extractGovernanceRefs(diagram);
		for (const governanceRef of governanceRefsFromMap) {
			if (!context.governanceIds.has(governanceRef)) {
				problem(`unknown governanceRef in Screen.map.md: ${governanceRef}`);
				continue;
			}
			if (!appliedGovernanceRefs.includes(governanceRef)) {
				problem(`Screen.diagram.md must apply governanceRef from Screen.map.md: ${governanceRef}`);
			}
		}
	}

	return diagram;
}

function validateScreen(screen, context) {
	const screenLabel = screen.id ?? path.basename(screen.dir);
	const screenRel = normalizePath(screen.dir);
	const screenPath = path.join(screen.dir, "Screen.tsx");
	const mapPath = path.join(screen.dir, "Screen.map.md");
	const diagramPath = path.join(screen.dir, "Screen.diagram.md");
	const hasGeneration = hasGenerationConfig(screen);
	const hasDiagram = existsSync(diagramPath);
	console.log(`  ${screenLabel}  ${dim(screenRel)}`);

	if (!hasGeneration && !hasDiagram) {
		adoptionWarning(
			"Screen.config.ts generation and Screen.diagram.md are not present yet",
		);
		return;
	}

	if (!hasGeneration || !hasDiagram) {
		problem("Screen.config.ts generation and Screen.diagram.md must be created together");
		return;
	}

	report.checked += 1;

	const generation = screen.generation;
	validateGenerationShape(generation);
	validateBuildSelectionsShape(generation);

	for (const doc of requiredDesignDocs) {
		if (!generation.designDocsChecked?.includes(doc)) {
			problem(`designDocsChecked must include ${doc}`);
		}
	}

	if (requiredDesignDocs.every((doc) => generation.designDocsChecked?.includes(doc))) {
		ok("required design docs are recorded");
	}

	if (!Array.isArray(generation.policyRefs) || generation.policyRefs.length === 0) {
		warning("policyRefs is empty; generated screens should usually bind policy ids");
	}

	for (const policyId of generation.policyRefs ?? []) {
		if (!context.policyIds.has(policyId)) {
			problem(`unknown policyRef: ${policyId}`);
		}
	}

	const mapText = validateScreenMap(screen, context, mapPath);
	validateDiagramContract(screen, context, diagramPath, mapText);

	const screenSource = existsSync(screenPath) ? readText(screenPath) : "";
	if (!screenSource) {
		problem("Screen.tsx is missing");
	}

	validateFoundationScan("Screen.tsx", screenSource);
	const organismSources = [];
	for (const ognId of generation.ognIds ?? []) {
		const organism = context.organismsById.get(ognId);
		if (!organism) {
			problem(`unknown ognId: ${ognId}`);
			continue;
		}
		if (organism.domain !== screen.domain) {
			problem(`ognId ${ognId} belongs to domain "${organism.domain}", not "${screen.domain}"`);
		}
		if (!screenSource.includes(organism.name)) {
			problem(`Screen.tsx must use organism component ${organism.name} for ${ognId}`);
		}
		const organismPath = path.join(organism.dir, `${organism.name}.tsx`);
		if (existsSync(organismPath)) {
			const organismSource = readText(organismPath);
			organismSources.push(organismSource);
			validateFoundationScan(`organism ${ognId}`, organismSource);
		}
		if (hasDeprecatedImport(organismPath)) {
			problem(`organism ${ognId} imports deprecated @pxds/pxds-components`);
		}
	}
	validateCompletionPattern(screen, screenSource, organismSources);

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
	governanceIds: collectGovernanceIds(),
	organismsById: collectOrganisms(),
	routesSource: existsSync(routesPath) ? readText(routesPath) : "",
};

const screens = collectCurrentScreens();

console.log("");
console.log(color("═══ Policy ↔ SB diagram ↔ screen compliance ═══", "1;36"));
console.log(strict ? dim("strict mode: missing generation contract is a failure") : dim("adoption mode: missing generation contract is a warning"));
console.log("");

for (const screen of screens) {
	validateScreen(screen, context);
}

console.log("");
console.log(color("─── summary ───", "1"));
console.log(`  current screens     : ${screens.length}`);
console.log(`  generation checked  : ${report.checked}`);
console.log(`  adoption warnings   : ${report.adoptionWarnings}`);
console.log(`  info                : ${report.infos}`);
console.log(`  warnings            : ${report.warnings > 0 ? yellow(String(report.warnings)) : green("0")}`);
console.log(`  problems            : ${report.problems > 0 ? red(String(report.problems)) : green("0")}`);
console.log("");

process.exit(report.problems > 0 ? 1 : 0);
