/**
 * Generate src/tokens.css from registry/wds-token-registry.json.
 *
 * Registry is a Tokens Studio single-file JSON with 3 Sets:
 *   foundation / semantic / project + $metadata + $extensions.
 *
 * CSS var naming follows WDS conventions (the Set name is NOT in the prefix):
 *   foundation.atomic.{family}.{key}  → --atomic-{family}-{key}
 *   foundation.spacing.{key}          → --spacing-{key}
 *   foundation.opacity.{key}          → --opacity-{key}
 *   foundation.breakpoint.{key}       → --breakpoint-{key}
 *   foundation.zIndex.{key}           → --z-index-{key}
 *   semantic.{group}.{...path}        → --semantic-{group}-{...path}
 *   semantic.spacing.{token}          → --semantic-spacing-{token}
 *   project.{group}.{...path}         → --pxds-{group}-{...path}
 *
 * Aliases ({foundation.atomic.blue.50}) are resolved to var(--…) in CSS.
 * Light values only — dark fields were dropped from SSOT 2026-05-11.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const registryPath = path.join(
	packageRoot,
	"registry",
	"wds-token-registry.json",
);
const outputPath = path.join(packageRoot, "src", "tokens.css");

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const foundation = registry.foundation ?? {};
const semantic = registry.semantic ?? {};
const project = registry.project ?? {};

const isTokenLeaf = (node) =>
	node && typeof node === "object" && Object.hasOwn(node, "$value");

const kebab = (value) =>
	value.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

const escapeKey = (key) => key.replace(".", "\\.");

const colorToRgb = (value) => {
	if (typeof value !== "string") return undefined;
	if (value.startsWith("#")) {
		const hex = value.slice(1);
		if (hex.length !== 6 && hex.length !== 8) return undefined;
		const r = Number.parseInt(hex.slice(0, 2), 16);
		const g = Number.parseInt(hex.slice(2, 4), 16);
		const b = Number.parseInt(hex.slice(4, 6), 16);
		return `${r}, ${g}, ${b}`;
	}
	const rgba = value.match(
		/^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)/,
	);
	if (!rgba) return undefined;
	return `${Number(rgba[1])}, ${Number(rgba[2])}, ${Number(rgba[3])}`;
};

const aliasToVar = (alias) => {
	// "{foundation.atomic.blue.50}" → "--atomic-blue-50"
	// "{semantic.background.normal.normal}" → "--semantic-background-normal-normal"
	const match = alias.match(/^\{([^}]+)\}$/);
	if (!match) return null;
	const [setName, ...rest] = match[1].split(".");
	if (setName === "foundation") {
		const [tier, ...path] = rest;
		if (tier === "atomic") return `--atomic-${path.join("-")}`;
		if (tier === "spacing") return `--spacing-${path.join("-")}`;
		if (tier === "opacity") return `--opacity-${path.join("-")}`;
		if (tier === "breakpoint") return `--breakpoint-${path.join("-")}`;
		if (tier === "zIndex") return `--z-index-${path.join("-")}`;
		return null;
	}
	if (setName === "semantic") return `--semantic-${rest.join("-")}`;
	if (setName === "project") return `--pxds-${rest.join("-")}`;
	return null;
};

const resolveAliasToHex = (alias) => {
	// Look up alias in registry — used for emitting raw hex for atomic-referencing
	// semantic colors so the `-rgb` sibling can be computed without trusting cascade.
	const match = alias.match(/^\{([^}]+)\}$/);
	if (!match) return null;
	const segments = match[1].split(".");
	let node = registry;
	for (const segment of segments) {
		if (!node || typeof node !== "object") return null;
		node = node[segment];
	}
	if (isTokenLeaf(node) && typeof node.$value === "string") {
		return node.$value.startsWith("{") ? resolveAliasToHex(node.$value) : node.$value;
	}
	return null;
};

const pushColorVar = (lines, name, rawValue) => {
	let cssValue = rawValue;
	let rgbSource = rawValue;

	if (typeof rawValue === "string" && rawValue.startsWith("{")) {
		const varRef = aliasToVar(rawValue);
		if (varRef) cssValue = `var(${varRef})`;
		const resolved = resolveAliasToHex(rawValue);
		if (resolved) rgbSource = resolved;
	}

	lines.push(`\t--${name}: ${cssValue};`);
	const rgb = colorToRgb(rgbSource);
	if (rgb) lines.push(`\t--${name}-rgb: ${rgb};`);
};

const pushPlainVar = (lines, name, rawValue) => {
	let cssValue = rawValue;
	if (typeof rawValue === "string" && rawValue.startsWith("{")) {
		const varRef = aliasToVar(rawValue);
		if (varRef) cssValue = `var(${varRef})`;
	}
	lines.push(`\t--${name}: ${cssValue};`);
};

// ----- foundation -----

const walkAtomic = (lines) => {
	for (const [family, tones] of Object.entries(foundation.atomic ?? {})) {
		for (const [key, leaf] of Object.entries(tones)) {
			if (!isTokenLeaf(leaf)) continue;
			pushColorVar(lines, `atomic-${family}-${key}`, leaf.$value);
		}
	}
};

const walkScalarMap = (lines, prefix, map) => {
	for (const [key, leaf] of Object.entries(map ?? {})) {
		if (!isTokenLeaf(leaf)) continue;
		lines.push(`\t--${prefix}-${escapeKey(key)}: ${leaf.$value};`);
	}
};

// ----- semantic -----

const SEMANTIC_SKIP_GROUPS = new Set(["platform", "elevation", "typography"]);

const walkSemanticColors = (lines) => {
	for (const [group, node] of Object.entries(semantic)) {
		if (SEMANTIC_SKIP_GROUPS.has(group)) continue;
		if (group === "spacing") continue; // emitted separately
		walkSemanticNode(lines, node, [group]);
	}
};

const walkSemanticNode = (lines, node, pathParts) => {
	if (!node || typeof node !== "object") return;
	if (isTokenLeaf(node)) {
		if (node.$type === "color") {
			pushColorVar(lines, `semantic-${pathParts.join("-")}`, node.$value);
		}
		return;
	}
	for (const [key, child] of Object.entries(node)) {
		walkSemanticNode(lines, child, [...pathParts, key]);
	}
};

const walkSemanticSpacing = (lines) => {
	for (const [token, leaf] of Object.entries(semantic.spacing ?? {})) {
		if (!isTokenLeaf(leaf)) continue;
		pushPlainVar(lines, `semantic-spacing-${token}`, leaf.$value);
	}
};

// ----- project -----

const walkProject = (lines) => {
	const walk = (node, pathParts) => {
		if (!node || typeof node !== "object") return;
		if (isTokenLeaf(node)) {
			pushPlainVar(lines, `pxds-${pathParts.join("-")}`, node.$value);
			return;
		}
		for (const [key, child] of Object.entries(node)) {
			walk(child, [...pathParts, kebab(key)]);
		}
	};
	walk(project, []);
};

// ----- assemble -----

const lines = [
	"/* Generated from @pxds/pxds-tokens/registry/wds-token-registry.json. */",
	"/* Do not edit token values here by hand. */",
	"",
	":root {",
];

walkAtomic(lines);
walkSemanticColors(lines);
lines.push("");
lines.push("\t/* spacing */");
walkScalarMap(lines, "spacing", foundation.spacing);
lines.push("");
lines.push("\t/* semantic spacing (intent-based) */");
walkSemanticSpacing(lines);
lines.push("");
lines.push("\t/* opacity */");
walkScalarMap(lines, "opacity", foundation.opacity);
lines.push("");
lines.push("\t/* breakpoint */");
walkScalarMap(lines, "breakpoint", foundation.breakpoint);
lines.push("");
lines.push("\t/* z-index */");
walkScalarMap(lines, "z-index", foundation.zIndex);
lines.push("");
lines.push("\t/* project */");
walkProject(lines);
lines.push("");
lines.push("\t/* preview/device */");
lines.push("\t--pxds-device-mobile-view-width: 375px;");
lines.push("\t--pxds-device-mobile-view-height: 812px;");
lines.push("\t--pxds-device-mobile-view-radius: 28px;");
lines.push("\t--pxds-device-mobile-view-background: #ffffff;");
lines.push("\t--pxds-device-mobile-view-border-color: #e1e2e4;");
lines.push("\t--pxds-device-mobile-view-shadow: 0 8px 24px rgb(15 23 42 / 8%);");
lines.push("\t--pxds-surface-canvas: #f4f4f5;");
lines.push("}");
lines.push("");
lines.push(
	"/* typography utility fallback. Prefer WDS Typography when possible. */",
);

for (const [variant, leaf] of Object.entries(semantic.typography ?? {})) {
	if (!isTokenLeaf(leaf) || leaf.$type !== "typography") continue;
	const v = leaf.$value;
	lines.push("");
	lines.push(`.wds-${variant} {`);
	lines.push(`\tfont-size: ${v.fontSize};`);
	lines.push(`\tline-height: ${v.lineHeight};`);
	lines.push(`\tletter-spacing: ${v.letterSpacing};`);
	lines.push("}");
}

for (const [name, leaf] of Object.entries(semantic.typography?.weights ?? {})) {
	if (!isTokenLeaf(leaf)) continue;
	lines.push("");
	lines.push(`.wds-${name} {`);
	lines.push(`\tfont-weight: ${leaf.$value};`);
	lines.push("}");
}

fs.writeFileSync(outputPath, `${lines.join("\n")}\n`);
