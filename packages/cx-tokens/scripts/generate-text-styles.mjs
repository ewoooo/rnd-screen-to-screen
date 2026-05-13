/**
 * Generate src/text-styles.css from primitive typography composite tokens.
 */
import { readFile, writeFile } from "node:fs/promises";

const PRIMITIVE_SET_FILE = new URL(
	"../src/originals/_skt/primitive/default.json",
	import.meta.url,
);
const OUTPUT_FILE = new URL("../src/text-styles.css", import.meta.url);

const registry = JSON.parse(await readFile(PRIMITIVE_SET_FILE, "utf8"));
const textStyles = collectTextStyles(registry);

const lines = [
	"/* Generated from @pxds/cx-tokens/src/originals/_skt/primitive/default.json. */",
	"/* Do not edit text style classes here by hand. */",
	"",
];

for (const style of textStyles) {
	lines.push(`.text-${style.name} {`);
	lines.push(`\tfont-family: var(--${style.name}-font-family);`);
	lines.push(`\tfont-weight: var(--${style.name}-font-weight);`);
	lines.push(`\tline-height: var(--${style.name}-line-height);`);
	lines.push(`\tfont-size: var(--${style.name}-font-size);`);
	lines.push(`\tletter-spacing: var(--${style.name}-letter-spacing);`);
	lines.push(`\ttext-indent: var(--${style.name}-paragraph-indent);`);
	lines.push(`\ttext-transform: var(--${style.name}-text-case);`);
	lines.push(`\ttext-decoration: var(--${style.name}-text-decoration);`);
	lines.push("}");
	lines.push("");
}

await writeFile(OUTPUT_FILE, `${lines.join("\n").trimEnd()}\n`);

function collectTextStyles(node) {
	return Object.entries(node)
		.filter(([, value]) => isTypographyToken(value))
		.map(([name]) => ({ name: cssNameFromTokenName(name) }))
		.sort((a, b) => compareTextStyleName(a.name, b.name));
}

function isTypographyToken(value) {
	return (
		Boolean(value) &&
		typeof value === "object" &&
		!Array.isArray(value) &&
		value.$type === "typography"
	);
}

function compareTextStyleName(a, b) {
	const [aSize, aWeight] = a.split("-");
	const [bSize, bWeight] = b.split("-");
	const sizeDelta = Number.parseInt(bSize, 10) - Number.parseInt(aSize, 10);
	if (sizeDelta !== 0) return sizeDelta;
	return weightRank(aWeight) - weightRank(bWeight);
}

function weightRank(weight) {
	return new Map([
		["bold", 0],
		["semi", 1],
		["med", 2],
		["reg", 3],
	]).get(weight) ?? 99;
}

function cssNameFromTokenName(name) {
	return name
		.replaceAll("_", "-")
		.replaceAll(/\s+/g, "-")
		.replaceAll(/[^a-zA-Z0-9-]/g, "-")
		.toLowerCase();
}
