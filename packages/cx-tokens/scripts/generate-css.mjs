/**
 * Generate src/tokens.css from the Tokens Studio token-set export.
 *
 * The source files stay in Tokens Studio set form under registry/tokens.
 * This script only normalizes set ownership so Style Dictionary can resolve
 * same-path aliases across primitive, semantic, and component layers.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
	expandTypesMap,
	register as registerTokensStudio,
	transformDimension,
} from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { transformTypes } from "style-dictionary/enums";
import {
	createPropertyFormatter,
	getReferences,
	outputReferencesFilter,
	outputReferencesTransformed,
	sortByReference,
} from "style-dictionary/utils";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const tokenRoot = path.join(packageRoot, "registry", "tokens");

const PRIMITIVE_SET = "_skt/primitive/default";
const SEMANTIC_SET_RE = /^_skt\/semantic\/(.+)$/;
const COMPONENT_SET_RE = /^_skt\/component\/(.+)$/;

const tokenSets = readTokenSetOrder();
const tokenIndexes = buildTokenIndexes(tokenSets);

await registerTokensStudio(StyleDictionary);

StyleDictionary.registerParser({
	name: "cx/tokens-studio-set",
	pattern: /registry\/tokens\/_skt\/.*\.json$/,
	parser: ({ contents, filePath }) => {
		const context = contextFromFilePath(filePath);
		if (!context) return {};

		const tokens = rewriteReferences(JSON.parse(contents), context);
		return nestAtPath(context.prefix, tokens);
	},
});

StyleDictionary.registerTransform({
	name: "cx/name/path-kebab",
	type: transformTypes.name,
	transform: (token) => token.path.map(cssNamePart).join("-"),
});

StyleDictionary.registerTransform({
	name: "cx/size/px",
	type: transformTypes.value,
	transitive: true,
	filter: (token) => {
		const tokenType = token.$type ?? token.type;
		const rootPath = token.path[0];
		return (
			[
				"borderRadius",
				"dimension",
				"fontSize",
				"fontSizes",
				"sizing",
				"spacing",
			].includes(tokenType) ||
			["font-size", "fontSize", "radius", "spacing"].includes(rootPath)
		);
	},
	transform: (token) => transformDimension(token),
});

StyleDictionary.registerFormat({
	name: "cx/css-variables",
	format: ({ dictionary }) => formatCssVariables(dictionary),
});

const styleDictionary = new StyleDictionary({
	source: tokenSets
		.filter((setName) => contextFromSetName(setName))
		.map((setName) => path.join("registry", "tokens", `${setName}.json`)),
	parsers: ["cx/tokens-studio-set"],
	preprocessors: ["tokens-studio"],
	expand: {
		typesMap: expandTypesMap,
	},
	platforms: {
		css: {
			transformGroup: "tokens-studio",
			transforms: ["cx/size/px", "cx/name/path-kebab"],
			buildPath: "src/",
			files: [
				{
					destination: "tokens.css",
					format: "cx/css-variables",
				},
			],
		},
	},
});

await styleDictionary.cleanAllPlatforms();
await styleDictionary.buildAllPlatforms();

function readTokenSetOrder() {
	const metadataPath = path.join(tokenRoot, "$metadata.json");
	if (fs.existsSync(metadataPath)) {
		const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
		if (Array.isArray(metadata.tokenSetOrder)) return metadata.tokenSetOrder;
	}

	return [
		PRIMITIVE_SET,
		"_skt/semantic/light",
		"_skt/semantic/dark",
		"_skt/component/light",
		"_skt/component/dark",
	];
}

function buildTokenIndexes(setNames) {
	const indexes = {
		primitive: new Set(),
		semantic: new Map(),
		component: new Map(),
	};

	for (const setName of setNames) {
		const context = contextFromSetName(setName);
		if (!context) continue;
		const filePath = path.join(tokenRoot, `${setName}.json`);
		if (!fs.existsSync(filePath)) continue;

		const registry = JSON.parse(fs.readFileSync(filePath, "utf8"));
		const paths = new Set(collectTokenPaths(registry).map((tokenPath) => tokenPath.join(".")));

		if (context.layer === "primitive") {
			indexes.primitive = paths;
		}
		if (context.layer === "semantic" && context.mode) {
			indexes.semantic.set(context.mode, paths);
		}
		if (context.layer === "component" && context.mode) {
			indexes.component.set(context.mode, paths);
		}
	}

	return indexes;
}

function contextFromFilePath(filePath) {
	const relativePath = path
		.relative(tokenRoot, filePath)
		.split(path.sep)
		.join("/")
		.replace(/\.json$/, "");
	return contextFromSetName(relativePath);
}

function contextFromSetName(setName) {
	if (setName === PRIMITIVE_SET) {
		return { layer: "primitive", mode: null, prefix: [], group: "primitive" };
	}

	const semanticMatch = setName.match(SEMANTIC_SET_RE);
	if (semanticMatch) {
		return {
			layer: "semantic",
			mode: semanticMatch[1],
			prefix: ["semantic", semanticMatch[1]],
			group: `semantic/${semanticMatch[1]}`,
		};
	}

	const componentMatch = setName.match(COMPONENT_SET_RE);
	if (componentMatch) {
		return {
			layer: "component",
			mode: componentMatch[1],
			prefix: ["component", componentMatch[1]],
			group: `component/${componentMatch[1]}`,
		};
	}

	return null;
}

function collectTokenPaths(node, currentPath = []) {
	if (!isRecord(node)) return [];
	if (isToken(node)) return [currentPath];

	return Object.entries(node).flatMap(([key, value]) => {
		if (key.startsWith("$")) return [];
		return collectTokenPaths(value, [...currentPath, key]);
	});
}

function rewriteReferences(node, context) {
	if (Array.isArray(node)) {
		return node.map((value) => rewriteReferences(value, context));
	}
	if (!isRecord(node)) return rewriteReferenceValue(node, context);

	const next = {};
	for (const [key, value] of Object.entries(node)) {
		next[key] = key === "$value"
			? rewriteReferenceValue(value, context)
			: rewriteReferences(value, context);
	}
	return next;
}

function rewriteReferenceValue(value, context) {
	if (Array.isArray(value)) {
		return value.map((item) => rewriteReferenceValue(item, context));
	}
	if (isRecord(value)) {
		return Object.fromEntries(
			Object.entries(value).map(([key, item]) => [
				key,
				rewriteReferenceValue(item, context),
			]),
		);
	}
	if (typeof value !== "string") return value;

	return value.replace(/\{([^}]+)\}/g, (match, rawPath) => {
		const resolved = resolveReferencePath(rawPath, context);
		return resolved ? `{${resolved.join(".")}}` : match;
	});
}

function resolveReferencePath(rawPath, context) {
	const pathParts = rawPath.split(".");
	const pathKey = pathParts.join(".");

	if (context.layer === "component" && context.mode) {
		if (tokenIndexes.component.get(context.mode)?.has(pathKey)) {
			return ["component", context.mode, ...pathParts];
		}
		if (tokenIndexes.semantic.get(context.mode)?.has(pathKey)) {
			return ["semantic", context.mode, ...pathParts];
		}
	}

	if (tokenIndexes.primitive.has(pathKey)) return pathParts;

	if (context.layer === "semantic" && context.mode) {
		if (tokenIndexes.semantic.get(context.mode)?.has(pathKey)) {
			return ["semantic", context.mode, ...pathParts];
		}
	}

	return null;
}

function nestAtPath(prefix, value) {
	return prefix.reduceRight((acc, key) => ({ [key]: acc }), value);
}

function formatCssVariables(dictionary) {
	const formatProperty = createPropertyFormatter({
		dictionary,
		format: "css",
		formatting: {
			indentation: "\t",
			commentStyle: "none",
		},
		outputReferences: (token, context) =>
			shouldOutputReferences(token, context),
		usesDtcg: true,
	});

	const lines = [
		"/* Generated from @pxds/cx-tokens/registry/tokens. */",
		"/* Source: Tokens Studio token-set export. */",
		"/* Do not edit token values here by hand. */",
		"",
		'@import "./text-styles.css";',
		"",
		":root {",
	];

	let currentGroup = null;
	for (const token of orderedTokens(dictionary).filter(shouldEmitToken)) {
		const group = groupNameForToken(token);
		if (group !== currentGroup) {
			currentGroup = group;
			lines.push("");
			lines.push(`\t/* ${group} */`);
		}

		lines.push(formatProperty(token));

		const tokenType = token.$type ?? token.type;
		const tokenValue = token.$value ?? token.value;
		const rgb = tokenType === "color" ? colorToRgb(tokenValue) : null;
		if (rgb) lines.push(`\t--${token.name}-rgb: ${rgb};`);
	}

	lines.push("}");
	return `${lines.join("\n")}\n`;
}

function shouldOutputReferences(token, context) {
	if (
		!outputReferencesFilter(token, context) ||
		!outputReferencesTransformed(token, context)
	) {
		return false;
	}

	const originalValue = token.original?.$value ?? token.original?.value;
	if (originalValue === undefined) return false;

	const references = getReferences(
		originalValue,
		context.dictionary.tokens,
		{
			unfilteredTokens: context.dictionary.unfilteredTokens,
			usesDtcg: true,
			warnImmediately: false,
		},
		[],
	);

	return references.every(shouldEmitToken);
}

function shouldEmitToken(token) {
	if (token.path[0] !== "semantic" && token.path[0] !== "component") {
		const rootPath = token.path[0];
		const normalizedRootPath = sanitizeNamePart(rootPath);
		if (rootPath === "guide") return false;
		if (/^[a-f0-9]{6}(-\d+pct)?$/i.test(normalizedRootPath)) return false;
		if (
			[
				"fontFamilies",
				"fontSize",
				"fontWeights",
				"letterSpacing",
				"lineHeights",
				"paragraphIndent",
				"paragraphSpacing",
				"textCase",
				"textDecoration",
			].includes(rootPath)
		) {
			return false;
		}
	}

	return true;
}

function orderedTokens(dictionary) {
	const groupOrder = new Map(
		[
			"primitive",
			"semantic/light",
			"semantic/dark",
			"component/light",
			"component/dark",
		].map((group, index) => [group, index]),
	);

	return [...dictionary.allTokens].sort((a, b) => {
		const groupDelta =
			(groupOrder.get(groupNameForToken(a)) ?? 100) -
			(groupOrder.get(groupNameForToken(b)) ?? 100);
		if (groupDelta !== 0) return groupDelta;
		return sortByReference(dictionary.tokens, {
			unfilteredTokens: dictionary.unfilteredTokens,
		})(a, b);
	});
}

function groupNameForToken(token) {
	if (token.path[0] === "semantic" && token.path[1]) {
		return `semantic/${token.path[1]}`;
	}
	if (token.path[0] === "component" && token.path[1]) {
		return `component/${token.path[1]}`;
	}
	return "primitive";
}

function colorToRgb(value) {
	if (typeof value !== "string" || !value.startsWith("#")) return null;
	const hex = value.slice(1);
	if (hex.length !== 6 && hex.length !== 8) return null;
	const r = Number.parseInt(hex.slice(0, 2), 16);
	const g = Number.parseInt(hex.slice(2, 4), 16);
	const b = Number.parseInt(hex.slice(4, 6), 16);
	return `${r}, ${g}, ${b}`;
}

function cssNamePart(part) {
	const cssPropertyName = new Map([
		["fontFamily", "font-family"],
		["fontWeight", "font-weight"],
		["lineHeight", "line-height"],
		["fontSize", "font-size"],
		["letterSpacing", "letter-spacing"],
		["paragraphSpacing", "paragraph-spacing"],
		["paragraphIndent", "paragraph-indent"],
		["textCase", "text-case"],
		["textDecoration", "text-decoration"],
	]).get(part);

	return sanitizeNamePart(cssPropertyName ?? part);
}

function sanitizeNamePart(part) {
	return String(part)
		.replaceAll("_", "-")
		.replaceAll(/\s+/g, "-")
		.replaceAll("%", "pct")
		.replaceAll(/[^a-zA-Z0-9-]/g, "-")
		.toLowerCase();
}

function isToken(value) {
	return isRecord(value) && (Object.hasOwn(value, "$value") || Object.hasOwn(value, "value"));
}

function isRecord(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
