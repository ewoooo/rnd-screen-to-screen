#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..", "..", "..");
const policyRoot = path.join(repoRoot, "packages", "policy-core", "policies");

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

function parsePolicyDefinition(filePath) {
	const source = readText(filePath);
	return {
		filePath,
		id: readStringProperty(source, "id"),
		parent: readStringProperty(source, "parent"),
		sourceText: readStringProperty(source, "sourceText"),
	};
}

function findPolicyBody(policy) {
	if (!policy.parent) return null;
	const candidate = path.join(path.dirname(policy.filePath), `${policy.parent}.md`);
	return existsSync(candidate) ? candidate : null;
}

function normalizeText(value) {
	return value.replace(/\s+/g, " ").trim();
}

function color(text, code) {
	return process.stdout.isTTY ? `\u001B[${code}m${text}\u001B[0m` : text;
}

const red = (text) => color(text, "31");
const green = (text) => color(text, "32");
const dim = (text) => color(text, "2");

const policies = walkFiles(policyRoot, (filePath) =>
	filePath.endsWith(".policy.ts"),
).map(parsePolicyDefinition);

let problems = 0;

console.log("");
console.log(color("═══ Policy source ↔ definition compliance ═══", "1;36"));
console.log("");

for (const policy of policies) {
	const rel = path.relative(repoRoot, policy.filePath);
	const label = policy.id ?? "(missing id)";
	const bodyPath = findPolicyBody(policy);

	if (!policy.id) {
		problems += 1;
		console.log(`  ${red("✗")} ${label}  ${dim(rel)}  ${red("missing id")}`);
		continue;
	}

	if (!bodyPath) {
		problems += 1;
		console.log(`  ${red("✗")} ${label}  ${dim(rel)}  ${red("missing policy body md")}`);
		continue;
	}

	if (!policy.sourceText) {
		problems += 1;
		console.log(`  ${red("✗")} ${label}  ${dim(rel)}  ${red("missing sourceText")}`);
		continue;
	}

	const body = normalizeText(readText(bodyPath));
	const sourceText = normalizeText(policy.sourceText);
	if (!body.includes(sourceText)) {
		problems += 1;
		console.log(
			`  ${red("✗")} ${label}  ${dim(rel)}  ${red("sourceText not found in body md")}`,
		);
		continue;
	}

	console.log(`  ${green("✓")} ${label}  ${dim(rel)}`);
}

console.log("");
console.log(color("─── summary ───", "1"));
console.log(`  policies : ${policies.length}`);
console.log(`  problems : ${problems > 0 ? red(String(problems)) : green("0")}`);
console.log("");

process.exit(problems > 0 ? 1 : 0);
