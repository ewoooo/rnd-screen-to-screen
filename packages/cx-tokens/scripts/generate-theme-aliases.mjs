/**
 * Generate theme-neutral aliases from src/tokens.css.
 *
 * The generated aliases collapse light/dark semantic and component token pairs
 * into stable variables such as `--semantic-color-text-primary` and
 * `--component-button-bg-primary`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(packageRoot, "src");
const tokensPath = path.join(srcRoot, "tokens.css");
const aliasesPath = path.join(srcRoot, "theme-aliases.css");
const stylePath = path.join(srcRoot, "style.css");

const tokenDeclarations = parseTokenDeclarations(
	fs.readFileSync(tokensPath, "utf8"),
);
const aliases = collectThemeNeutralAliases(tokenDeclarations);

fs.writeFileSync(aliasesPath, formatAliasesCss(aliases));
fs.writeFileSync(stylePath, formatStyleCss());

function parseTokenDeclarations(contents) {
	const declarations = [];
	const declarationPattern = /^\s*(--[a-zA-Z0-9-]+):\s*([^;]+);/gm;

	for (const match of contents.matchAll(declarationPattern)) {
		declarations.push({ name: match[1], value: match[2].trim() });
	}

	return declarations;
}

function collectThemeNeutralAliases(declarations) {
	const declarationNames = new Set(
		declarations.map((declaration) => declaration.name),
	);
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

function formatStyleCss() {
	return [
		"/* Public token style adapter for @pxds/cx-tokens. */",
		'@import "./tokens.css";',
		'@import "./theme-aliases.css";',
		"",
	].join("\n");
}
