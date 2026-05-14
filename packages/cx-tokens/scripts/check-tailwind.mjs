/**
 * Validate generated Tailwind adapter files.
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
const aliasesPath = path.join(tailwindRoot, "aliases.css");
const tailwindPath = path.join(tailwindRoot, "tailwind.css");
const stylePath = path.join(tailwindRoot, "style.css");

const errors = [];
const tokenDeclarations = parseDeclarations(fs.readFileSync(tokensPath, "utf8"));
const aliasDeclarations = parseDeclarations(fs.readFileSync(aliasesPath, "utf8"));
const themeDeclarations = parseThemeDeclarations(
	fs.readFileSync(tailwindPath, "utf8"),
);
const textStyleUtilities = parseTextStyleUtilities(
	fs.readFileSync(textStylesPath, "utf8"),
);
const tailwindUtilities = parseTailwindUtilities(
	fs.readFileSync(tailwindPath, "utf8"),
);
const styleCss = fs.readFileSync(stylePath, "utf8");

checkPublicAdapter();
checkSelfReferences("tailwind.css @theme", themeDeclarations);
checkSelfReferences("aliases.css", aliasDeclarations);
checkExactTokenExposure();
checkThemeNeutralAliases();
checkTextStyleUtilities();

if (errors.length > 0) {
	console.error(`tailwind adapter check failed (${errors.length} issues)`);
	for (const error of errors) console.error(`- ${error}`);
	process.exit(1);
}

console.log(
	`tailwind adapter ready (${themeDeclarations.size} theme variables, ${aliasDeclarations.size} aliases, ${tailwindUtilities.size} utilities).`,
);

function checkPublicAdapter() {
	for (const expected of [
		'@import "tailwindcss";',
		'@import "./tailwind.css";',
		'@import "../tokens.css";',
		'@import "./aliases.css";',
	]) {
		if (!styleCss.includes(expected)) {
			errors.push(`tailwind/style.css is missing ${expected}`);
		}
	}
}

function checkSelfReferences(label, declarations) {
	for (const [name, value] of declarations) {
		if (value === `var(${name})`) {
			errors.push(`${label} has recursive alias ${name}: ${value}`);
		}
	}
}

function checkExactTokenExposure() {
	for (const [name] of tokenDeclarations) {
		if (!shouldExposeExactToken(name)) continue;
		if (!themeDeclarations.has(name)) {
			errors.push(`tailwind.css is missing exact token exposure for ${name}`);
		}
	}
}

function checkThemeNeutralAliases() {
	for (const [name] of tokenDeclarations) {
		const semanticMatch = name.match(/^--semantic-light-(.+)$/);
		if (semanticMatch) {
			const tokenName = semanticMatch[1];
			const darkName = `--semantic-dark-${tokenName}`;
			const aliasName = `--semantic-${tokenName}`;
			checkAliasPair(darkName, aliasName);
			continue;
		}

		const componentMatch = name.match(/^--component-light-(.+)$/);
		if (componentMatch) {
			const tokenName = componentMatch[1];
			const darkName = `--component-dark-${tokenName}`;
			const aliasName = `--component-${tokenName}`;
			checkAliasPair(darkName, aliasName);
		}
	}
}

function checkAliasPair(darkName, aliasName) {
	if (!tokenDeclarations.has(darkName)) return;

	if (!aliasDeclarations.has(aliasName)) {
		errors.push(`aliases.css is missing ${aliasName}`);
	}
	if (!themeDeclarations.has(aliasName)) {
		errors.push(`tailwind.css is missing theme variable ${aliasName}`);
	}
}

function checkTextStyleUtilities() {
	for (const utility of textStyleUtilities) {
		if (!tailwindUtilities.has(utility)) {
			errors.push(`tailwind.css is missing @utility ${utility}`);
		}
	}
}

function shouldExposeExactToken(name) {
	return (
		name.startsWith("--color-") ||
		name.startsWith("--spacing-") ||
		name.startsWith("--radius-") ||
		name.startsWith("--font-size-") ||
		name.startsWith("--font-weight-") ||
		name.startsWith("--semantic-") ||
		name.startsWith("--component-")
	);
}

function parseDeclarations(contents) {
	const declarations = new Map();
	const declarationPattern = /^\s*(--[a-zA-Z0-9-]+):\s*([^;]+);/gm;

	for (const match of contents.matchAll(declarationPattern)) {
		declarations.set(match[1], match[2].trim());
	}

	return declarations;
}

function parseThemeDeclarations(contents) {
	const themeMatch = contents.match(/@theme\s*\{([\s\S]*?)\n\}/);
	if (!themeMatch) {
		errors.push("tailwind.css is missing @theme block");
		return new Map();
	}

	return parseDeclarations(themeMatch[1]);
}

function parseTextStyleUtilities(contents) {
	const utilities = new Set();
	const textStylePattern = /^\.text-([a-zA-Z0-9-]+)\s*\{/gm;

	for (const match of contents.matchAll(textStylePattern)) {
		utilities.add(`text-${match[1]}`);
	}

	return utilities;
}

function parseTailwindUtilities(contents) {
	const utilities = new Set();
	const utilityPattern = /^@utility\s+([a-zA-Z0-9-]+)\s*\{/gm;

	for (const match of contents.matchAll(utilityPattern)) {
		utilities.add(match[1]);
	}

	return utilities;
}
