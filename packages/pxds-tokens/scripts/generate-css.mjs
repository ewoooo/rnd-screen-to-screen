/**
 * Generate src/tokens.css from registry/tokens.original.json.
 *
 * New SSOT: SKT primitive token set (`_skt/primitive/default`).
 * Style Dictionary owns token loading. This script defines naming + grouping.
 */
import { register as registerTokensStudioTransforms } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { transformTypes } from "style-dictionary/enums";

const SOURCE_FILE = "registry/tokens.original.json";
const OUTPUT_FILE = "tokens.css";
const SET_NAME = "_skt/primitive/default";

const PX_CATEGORIES = new Set(["spacing", "radius", "font-size"]);
const SKIP_CATEGORIES = new Set([
	"fontFamilies",
	"lineHeights",
	"fontWeights",
	"fontSize",
	"letterSpacing",
	"paragraphSpacing",
	"textCase",
	"textDecoration",
	"paragraphIndent",
	"guide",
]);

const HEX_NOISE_RE = /^[0-9A-F]{6}(?:\s+\d+%)?$/;

const isTokenType = (token, type) => (token.$type ?? token.type) === type;
const getRawValue = (token) => token.original?.$value ?? token.original?.value;

const sanitize = (segment) =>
	String(segment)
		.replaceAll("_", "-")
		.replaceAll(/\s+/g, "-")
		.replaceAll("%", "pct")
		.replaceAll(/[^a-zA-Z0-9-]/g, "-")
		.toLowerCase();

const isNoise = (path) => {
	if (path.length === 0) return true;
	const head = path[0];
	if (SKIP_CATEGORIES.has(head)) return true;
	if (HEX_NOISE_RE.test(head)) return true;
	return false;
};

const cssVarNameFromPath = (path) => {
	if (path.length === 0) return null;
	return path.map(sanitize).join("-");
};

const isPxCategory = (path) => PX_CATEGORIES.has(path[0]);

const formatPrimitiveValue = (token) => {
	const raw = getRawValue(token);
	if (typeof raw === "string" && raw.startsWith("{")) {
		const inner = raw.slice(1, -1);
		const name = cssVarNameFromPath(inner.split("."));
		return name ? `var(--${name})` : raw;
	}
	if (typeof raw === "number" && isPxCategory(token.path)) return `${raw}px`;
	return raw;
};

const colorToRgb = (value) => {
	if (typeof value !== "string" || !value.startsWith("#")) return undefined;
	const hex = value.slice(1);
	if (hex.length !== 6 && hex.length !== 8) return undefined;
	const r = Number.parseInt(hex.slice(0, 2), 16);
	const g = Number.parseInt(hex.slice(2, 4), 16);
	const b = Number.parseInt(hex.slice(4, 6), 16);
	return `${r}, ${g}, ${b}`;
};

const pushVar = (lines, token) => {
	const name = cssVarNameFromPath(token.path);
	if (!name) return;
	lines.push(`\t--${name}: ${formatPrimitiveValue(token)};`);
	if (isTokenType(token, "color")) {
		const rgb = colorToRgb(getRawValue(token));
		if (rgb) lines.push(`\t--${name}-rgb: ${rgb};`);
	}
};

registerTokensStudioTransforms(StyleDictionary);

StyleDictionary.registerParser({
	name: "pxds/unwrap-set",
	pattern: /tokens\.original\.json$/,
	parser: ({ contents }) => {
		const raw = JSON.parse(contents);
		return raw[SET_NAME] ?? raw;
	},
});

StyleDictionary.registerTransform({
	name: "pxds/name/from-path",
	type: transformTypes.name,
	transform: (token) => cssVarNameFromPath(token.path) ?? token.path.join("-"),
});

StyleDictionary.registerFormat({
	name: "pxds/css-vars",
	format: ({ dictionary }) => {
		const tokens = dictionary.allTokens;

		const primitives = tokens.filter(
			(t) => !isNoise(t.path) && !isTokenType(t, "typography"),
		);

		const byCategory = new Map();
		for (const token of primitives) {
			const head = token.path[0];
			if (!byCategory.has(head)) byCategory.set(head, []);
			byCategory.get(head).push(token);
		}

		const lines = [
			"/* Generated from @pxds/pxds-tokens/registry/tokens.original.json. */",
			"/* Source: SKT primitive token set (_skt/primitive/default). */",
			"/* Do not edit token values here by hand. */",
			"",
			":root {",
		];

		const order = ["color", "spacing", "radius", "font-size", "font-weight"];
		const seen = new Set();
		const emitCategory = (cat) => {
			const list = byCategory.get(cat);
			if (!list) return;
			lines.push("");
			lines.push(`\t/* ${cat} */`);
			for (const token of list) pushVar(lines, token);
			seen.add(cat);
		};
		for (const cat of order) emitCategory(cat);
		for (const cat of byCategory.keys()) if (!seen.has(cat)) emitCategory(cat);

		lines.push("}");

		return `${lines.join("\n")}\n`;
	},
});

const styleDictionary = new StyleDictionary({
	source: [SOURCE_FILE],
	parsers: ["pxds/unwrap-set"],
	preprocessors: ["tokens-studio"],
	log: { warnings: "disabled" },
	platforms: {
		css: {
			transforms: ["pxds/name/from-path"],
			buildPath: "src/",
			files: [{ destination: OUTPUT_FILE, format: "pxds/css-vars" }],
		},
	},
});

await styleDictionary.buildAllPlatforms();
