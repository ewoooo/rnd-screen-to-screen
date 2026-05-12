/**
 * Generate src/tokens.css from registry/tokens.original.json.
 *
 * Style Dictionary owns token loading/build orchestration. This package keeps
 * only the PXDS/WDS-specific CSS variable naming and compatibility output.
 */
import { register as registerTokensStudioTransforms } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { transformTypes } from "style-dictionary/enums";

const SOURCE_FILE = "registry/tokens.original.json";
const OUTPUT_FILE = "tokens.css";

const isTokenType = (token, type) => (token.$type ?? token.type) === type;

const getRawValue = (token) => token.original?.$value ?? token.original?.value;

const kebab = (value) =>
	value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const escapeKey = (key) => key.replace(".", "\\.");

const cssVarNameFromPath = (path) => {
	const [setName, ...rest] = path;
	if (setName === "foundation") {
		const [tier, ...parts] = rest;
		if (tier === "atomic") return `atomic-${parts.join("-")}`;
		if (tier === "spacing") return `spacing-${escapeKey(parts.join("."))}`;
		if (tier === "opacity") return `opacity-${parts.join("-")}`;
		if (tier === "breakpoint") return `breakpoint-${parts.join("-")}`;
		if (tier === "zIndex") return `z-index-${parts.join("-")}`;
		return null;
	}
	if (setName === "semantic") return `semantic-${rest.join("-")}`;
	if (setName === "project") {
		return `pxds-${rest.map((part) => kebab(part)).join("-")}`;
	}
	return null;
};

const aliasToVar = (alias) => {
	const match = alias.match(/^\{([^}]+)\}$/);
	if (!match) return null;
	const name = cssVarNameFromPath(match[1].split("."));
	return name ? `--${name}` : null;
};

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

const createTokenLookup = (tokens) =>
	new Map(tokens.map((token) => [token.path.join("."), token]));

const resolveAliasValue = (alias, tokenLookup) => {
	const match = alias.match(/^\{([^}]+)\}$/);
	if (!match) return null;
	const token = tokenLookup.get(match[1]);
	if (!token) return null;
	const rawValue = getRawValue(token);
	return typeof rawValue === "string" && rawValue.startsWith("{")
		? resolveAliasValue(rawValue, tokenLookup)
		: rawValue;
};

const toCssValue = (rawValue) => {
	if (typeof rawValue === "string" && rawValue.startsWith("{")) {
		const varRef = aliasToVar(rawValue);
		if (varRef) return `var(${varRef})`;
	}
	return rawValue;
};

const pushVar = (lines, token, tokenLookup, { withRgb = false } = {}) => {
	const name = cssVarNameFromPath(token.path);
	if (!name) return;
	const rawValue = getRawValue(token);
	lines.push(`\t--${name}: ${toCssValue(rawValue)};`);
	if (!withRgb) return;
	const rgbSource =
		typeof rawValue === "string" && rawValue.startsWith("{")
			? resolveAliasValue(rawValue, tokenLookup)
			: rawValue;
	const rgb = colorToRgb(rgbSource);
	if (rgb) lines.push(`\t--${name}-rgb: ${rgb};`);
};

const isPath = (token, prefix) =>
	prefix.every((part, index) => token.path[index] === part);

const pushSection = (lines, label, tokens, tokenLookup, options) => {
	lines.push("");
	lines.push(`\t/* ${label} */`);
	for (const token of tokens) {
		pushVar(lines, token, tokenLookup, options);
	}
};

registerTokensStudioTransforms(StyleDictionary);

StyleDictionary.registerTransform({
	name: "pxds/name/from-path",
	type: transformTypes.name,
	transform: (token) => cssVarNameFromPath(token.path) ?? token.path.join("-"),
});

StyleDictionary.registerFormat({
	name: "pxds/css-vars",
	format: ({ dictionary }) => {
		const tokens = dictionary.allTokens;
		const tokenLookup = createTokenLookup(tokens);
		const foundationAtomic = tokens.filter((token) =>
			isPath(token, ["foundation", "atomic"]),
		);
		const semanticColors = tokens.filter(
			(token) =>
				token.path[0] === "semantic" &&
				!["platform", "elevation", "typography", "spacing"].includes(
					token.path[1],
				) &&
				isTokenType(token, "color"),
		);
		const foundationSpacing = tokens.filter((token) =>
			isPath(token, ["foundation", "spacing"]),
		);
		const semanticSpacing = tokens.filter((token) =>
			isPath(token, ["semantic", "spacing"]),
		);
		const foundationOpacity = tokens.filter((token) =>
			isPath(token, ["foundation", "opacity"]),
		);
		const foundationBreakpoint = tokens.filter((token) =>
			isPath(token, ["foundation", "breakpoint"]),
		);
		const foundationZIndex = tokens.filter((token) =>
			isPath(token, ["foundation", "zIndex"]),
		);
		const project = tokens.filter((token) => token.path[0] === "project");
		const typography = tokens.filter(
			(token) => isPath(token, ["semantic", "typography"]) && isTokenType(token, "typography"),
		);
		const typographyWeights = tokens.filter((token) =>
			isPath(token, ["semantic", "typography", "weights"]),
		);

		const lines = [
			"/* Generated from @pxds/pxds-tokens/registry/tokens.original.json. */",
			"/* Do not edit token values here by hand. */",
			"",
			":root {",
		];

		for (const token of foundationAtomic) {
			pushVar(lines, token, tokenLookup, { withRgb: true });
		}
		for (const token of semanticColors) {
			pushVar(lines, token, tokenLookup, { withRgb: true });
		}
		pushSection(lines, "spacing", foundationSpacing, tokenLookup);
		pushSection(lines, "semantic spacing (intent-based)", semanticSpacing, tokenLookup);
		pushSection(lines, "opacity", foundationOpacity, tokenLookup);
		pushSection(lines, "breakpoint", foundationBreakpoint, tokenLookup);
		pushSection(lines, "z-index", foundationZIndex, tokenLookup);
		pushSection(lines, "project", project, tokenLookup);
		lines.push("}");
		lines.push("");
		lines.push(
			"/* typography utility fallback. Prefer WDS Typography when possible. */",
		);

		for (const token of typography) {
			const value = getRawValue(token);
			lines.push("");
			lines.push(`.wds-${token.path.at(-1)} {`);
			lines.push(`\tfont-size: ${value.fontSize};`);
			lines.push(`\tline-height: ${value.lineHeight};`);
			lines.push(`\tletter-spacing: ${value.letterSpacing};`);
			lines.push("}");
		}

		for (const token of typographyWeights) {
			lines.push("");
			lines.push(`.wds-${token.path.at(-1)} {`);
			lines.push(`\tfont-weight: ${getRawValue(token)};`);
			lines.push("}");
		}

		return `${lines.join("\n")}\n`;
	},
});

const styleDictionary = new StyleDictionary({
	source: [SOURCE_FILE],
	preprocessors: ["tokens-studio"],
	log: {
		warnings: "disabled",
	},
	platforms: {
		css: {
			transforms: ["pxds/name/from-path"],
			buildPath: "src/",
			files: [
				{
					destination: OUTPUT_FILE,
					format: "pxds/css-vars",
				},
			],
		},
	},
});

await styleDictionary.buildAllPlatforms();
