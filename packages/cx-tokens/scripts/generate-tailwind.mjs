/**
 * Generate Tailwind adapter files from src/tokens.css.
 *
 * This keeps Tailwind as an adapter over CX tokens:
 * - aliases.css maps light/dark semantic and component tokens to stable names.
 * - tailwind.css exposes stable names through Tailwind @theme variables.
 * - style.css is the public import boundary for consumers.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(packageRoot, "src");
const tokensPath = path.join(srcRoot, "tokens.css");
const textStylesPath = path.join(srcRoot, "text-styles.css");
const tailwindRoot = path.join(srcRoot, "tailwind");

const tokenDeclarations = parseTokenDeclarations(
	fs.readFileSync(tokensPath, "utf8"),
);
const textStyleUtilities = parseTextStyleUtilities(
	fs.readFileSync(textStylesPath, "utf8"),
);
const aliases = collectThemeNeutralAliases(tokenDeclarations);
const themeVariables = collectTailwindThemeVariables(tokenDeclarations, aliases);

fs.mkdirSync(tailwindRoot, { recursive: true });
fs.writeFileSync(
	path.join(tailwindRoot, "aliases.css"),
	formatAliasesCss(aliases),
);
fs.writeFileSync(
	path.join(tailwindRoot, "tailwind.css"),
	formatTailwindCss(themeVariables, textStyleUtilities),
);
fs.writeFileSync(
	path.join(tailwindRoot, "style.css"),
	formatStyleCss(),
);

function parseTokenDeclarations(contents) {
	const declarations = [];
	const declarationPattern = /^\s*(--[a-zA-Z0-9-]+):\s*([^;]+);/gm;

	for (const match of contents.matchAll(declarationPattern)) {
		const name = match[1];
		declarations.push({ name, value: match[2].trim() });
	}

	return declarations;
}

function parseTextStyleUtilities(contents) {
	const utilities = [];
	const textStylePattern = /^\.text-([a-zA-Z0-9-]+)\s*\{([\s\S]*?)^\}/gm;

	for (const match of contents.matchAll(textStylePattern)) {
		const name = `text-${match[1]}`;
		const declarations = match[2]
			.trim()
			.split("\n")
			.map((line) => line.trim())
			.filter(Boolean);
		utilities.push({ name, declarations });
	}

	return utilities;
}

function collectThemeNeutralAliases(declarations) {
	const declarationNames = new Set(declarations.map((declaration) => declaration.name));
	const aliases = [];

	for (const declaration of declarations) {
		const semanticMatch = declaration.name.match(/^--semantic-light-(.+)$/);
		if (semanticMatch) {
			const tokenName = semanticMatch[1];
			const darkName = `--semantic-dark-${tokenName}`;
			if (declarationNames.has(darkName)) {
				aliases.push({
					alias: `--semantic-${tokenName}`,
					light: declaration.name,
					dark: darkName,
				});
			}
			continue;
		}

		const componentMatch = declaration.name.match(/^--component-light-(.+)$/);
		if (componentMatch) {
			const tokenName = componentMatch[1];
			const darkName = `--component-dark-${tokenName}`;
			if (declarationNames.has(darkName)) {
				aliases.push({
					alias: `--component-${tokenName}`,
					light: declaration.name,
					dark: darkName,
				});
			}
		}
	}

	return aliases.sort((a, b) => a.alias.localeCompare(b.alias));
}

function collectTailwindThemeVariables(declarations, aliases) {
	const variables = [];

	for (const declaration of declarations) {
		const rawVariable = tailwindRawVariableName(declaration.name);
		if (rawVariable) {
			variables.push({ name: rawVariable, value: declaration.value });
		}
	}

	for (const alias of aliases) {
		variables.push({
			name: tailwindAliasVariableName(alias.alias),
			value: `var(${alias.light})`,
		});

		const colorUtilityName = tailwindColorUtilityVariableName(alias.alias);
		if (colorUtilityName) {
			variables.push({
				name: colorUtilityName,
				value: `var(${alias.alias})`,
			});
		}
	}

	return dedupeVariables(variables).sort((a, b) =>
		variableSortKey(a.name).localeCompare(variableSortKey(b.name)),
	);
}

function tailwindRawVariableName(name) {
	if (name.startsWith("--semantic-") || name.startsWith("--component-")) {
		return `--${name.slice(2)}`;
	}

	if (
		name.startsWith("--color-") ||
		name.startsWith("--spacing-") ||
		name.startsWith("--radius-") ||
		name.startsWith("--font-size-") ||
		name.startsWith("--font-weight-")
	) {
		return name;
	}

	return null;
}

function tailwindAliasVariableName(aliasName) {
	return `--${aliasName.slice(2)}`;
}

function tailwindColorUtilityVariableName(aliasName) {
	const semanticMatch = aliasName.match(/^--semantic-color-(.+)$/);
	if (semanticMatch) return `--color-${semanticMatch[1]}`;

	const componentMatch = aliasName.match(/^--component-(.+)$/);
	if (!componentMatch) return null;

	const name = componentMatch[1]
		.replace(/-bg-/g, "-")
		.replace(/-color-/g, "-");

	return `--color-${name}`;
}

function dedupeVariables(variables) {
	const byName = new Map();
	for (const variable of variables) byName.set(variable.name, variable);
	return [...byName.values()];
}

function formatAliasesCss(aliases) {
	const lightLines = aliases.map(
		(alias) => `\t${alias.alias}: var(${alias.light});`,
	);
	const darkLines = aliases.map(
		(alias) => `\t${alias.alias}: var(${alias.dark});`,
	);

	return [
		"/* Generated from @pxds/cx-tokens/src/tokens.css. */",
		"/* Do not edit by hand. */",
		"",
		":root,",
		'[data-theme="light"] {',
		...lightLines,
		"}",
		"",
		'[data-theme="dark"] {',
		...darkLines,
		"}",
		"",
	].join("\n");
}

function formatTailwindCss(variables, textStyleUtilities) {
	return [
		"/* Generated from @pxds/cx-tokens/src/tokens.css. */",
		"/* Do not edit by hand. */",
		"",
		"@theme {",
		...variables.map((variable) => `\t${variable.name}: ${variable.value};`),
		"}",
		"",
		...formatTextStyleUtilities(textStyleUtilities),
	].join("\n");
}

function formatTextStyleUtilities(utilities) {
	if (utilities.length === 0) return [];

	return utilities.flatMap((utility) => [
		`@utility ${utility.name} {`,
		...utility.declarations.map((declaration) => `\t${declaration}`),
		"}",
		"",
	]);
}

function formatStyleCss() {
	return [
		"/* Public Tailwind adapter for @pxds/cx-tokens. */",
		'@import "tailwindcss";',
		'@import "./tailwind.css";',
		'@import "../tokens.css";',
		'@import "./aliases.css";',
		"",
	].join("\n");
}

function variableSortKey(name) {
	if (name.startsWith("--color-")) return `0:${name}`;

	const spacingMatch = name.match(/^--spacing-(\d+)$/);
	if (spacingMatch) return `1:${Number(spacingMatch[1]).toString().padStart(6, "0")}`;

	const radiusMatch = name.match(/^--radius-(.+)$/);
	if (radiusMatch) return `2:${radiusSortValue(radiusMatch[1])}:${name}`;

	const fontSizeMatch = name.match(/^--font-size-(.+)$/);
	if (fontSizeMatch) return `3:${fontSizeSortValue(fontSizeMatch[1])}:${name}`;

	if (name.startsWith("--font-weight-")) return `4:${name}`;

	if (name.startsWith("--semantic-light-")) return `5:${name}`;
	if (name.startsWith("--semantic-dark-")) return `6:${name}`;
	if (name.startsWith("--semantic-")) return `7:${name}`;
	if (name.startsWith("--component-light-")) return `8:${name}`;
	if (name.startsWith("--component-dark-")) return `9:${name}`;
	if (name.startsWith("--component-")) return `10:${name}`;

	return `99:${name}`;
}

function radiusSortValue(name) {
	if (name === "full") return "999999";
	const match = name.match(/^r(\d+)(?:-(\d+))?$/);
	if (!match) return name;
	const whole = Number(match[1]);
	const fraction = match[2] ? Number(match[2]) / 10 : 0;
	return (whole + fraction).toFixed(1).padStart(8, "0");
}

function fontSizeSortValue(name) {
	const numeric = Number(name);
	if (Number.isFinite(numeric)) return numeric.toString().padStart(6, "0");
	return name;
}
