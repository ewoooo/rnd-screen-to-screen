import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

import { generate, parse } from "css-tree";

const TOKEN_ROOT = new URL("../registry/tokens/", import.meta.url);
const tokens = await collectRegistryTokens();
const valueIndex = new Map();
const issues = [];

for (const token of tokens) {
	const normalized = normalizeCssValue(token.value);
	if (!normalized) continue;
	const matches = valueIndex.get(normalized) ?? [];
	matches.push(token);
	valueIndex.set(normalized, matches);
}

for (const [normalized, matches] of valueIndex) {
	const rawValues = new Set(matches.map((match) => match.value));
	if (rawValues.size > 1) {
		issues.push(
			`value "${normalized}" is represented by multiple raw values: ${[...rawValues].join(", ")}`,
		);
	}
}

if (issues.length > 0) {
	for (const issue of issues) {
		console.log(`warning: ${issue}`);
	}
}

console.log(
	`token value index ready (${tokens.length} tokens, ${valueIndex.size} normalized CSS values, ${issues.length} warnings).`,
);

async function collectRegistryTokens() {
	const metadataFile = new URL("$metadata.json", TOKEN_ROOT);
	if (!existsSync(metadataFile)) {
		throw new Error("Missing registry/tokens/$metadata.json token-set order.");
	}

	const metadata = JSON.parse(await readFile(metadataFile, "utf8"));
	const tokenSetOrder = Array.isArray(metadata.tokenSetOrder)
		? metadata.tokenSetOrder
		: [];

	const tokenSets = await Promise.all(
		tokenSetOrder.map(async (setName) => {
			const tokenSetFile = new URL(`${setName}.json`, TOKEN_ROOT);
			const tokenSet = JSON.parse(await readFile(tokenSetFile, "utf8"));
			return collectTokens(tokenSet, [setName]);
		}),
	);

	return tokenSets.flat();
}

function collectTokens(node, path = []) {
	if (!isRecord(node)) return [];
	if (Object.hasOwn(node, "$value")) {
		return [
			{
				path: path.join("."),
				type: typeof node.$type === "string" ? node.$type : "unknown",
				value: String(node.$value),
			},
		];
	}
	return Object.entries(node).flatMap(([key, value]) => {
		if (key.startsWith("$")) return [];
		return collectTokens(value, [...path, key]);
	});
}

function normalizeCssValue(value) {
	if (value.startsWith("{") || value.includes("}")) return null;
	try {
		return generate(parse(value, { context: "value" })).toLowerCase();
	} catch {
		return null;
	}
}

function isRecord(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
