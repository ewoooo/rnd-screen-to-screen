#!/usr/bin/env node
import {
	existsSync,
	readFileSync,
	readdirSync,
	statSync,
} from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = path.resolve(import.meta.dirname, "..", "..", "..");
const policyRoot = path.join(repoRoot, "packages", "policy-core", "policies");
const componentsRoot = path.join(
	repoRoot,
	"packages",
	"pxds-components",
	"src",
);
const appsRoot = path.join(repoRoot, "apps", "mobile", "src", "app");

function readText(p) {
	return readFileSync(p, "utf8");
}

function walkFiles(dir, predicate) {
	if (!existsSync(dir)) return [];
	const out = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const child = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			out.push(...walkFiles(child, predicate));
		} else if (predicate(child)) {
			out.push(child);
		}
	}
	return out;
}

function parsePolicyFile(filePath) {
	const text = readText(filePath);
	const idMatch = text.match(/id:\s*"([^"]+)"/);
	const parentMatch = text.match(/parent:\s*"([^"]+)"/);
	const sourceTextMatch = text.match(/sourceText:\s*("([^"]+)"|"([^"]+)"\s*\+[\s\S]+?")/);
	let sourceText = null;
	const directQuote = text.match(/sourceText:\s*"([^"]+)"\s*,/);
	if (directQuote) sourceText = directQuote[1];
	const requirementMatch = text.match(/requirement:\s*"([^"]+)"/);
	const errorMatch = text.match(/error:\s*"([^"]+)"/);
	return {
		filePath,
		id: idMatch?.[1] ?? null,
		parent: parentMatch?.[1] ?? null,
		sourceText,
		copy: {
			requirement: requirementMatch?.[1] ?? null,
			error: errorMatch?.[1] ?? null,
		},
	};
}

function findBodyForPolicy(policy) {
	if (!policy.parent) return null;
	const candidate = path.join(
		path.dirname(policy.filePath),
		`${policy.parent}.md`,
	);
	return existsSync(candidate) ? candidate : null;
}

function checkDrift(policy) {
	const bodyPath = findBodyForPolicy(policy);
	if (!bodyPath) {
		return { ok: false, bodyPath: null, reason: "missing-body" };
	}
	if (!policy.sourceText) {
		return { ok: false, bodyPath, reason: "missing-source-text" };
	}
	const body = readText(bodyPath).replace(/\s+/g, " ").trim();
	const needle = policy.sourceText.replace(/\s+/g, " ").trim();
	return {
		ok: body.includes(needle),
		bodyPath,
		reason: body.includes(needle) ? null : "not-found-in-body",
	};
}

function parseSpec(filePath) {
	const text = readText(filePath);
	const idMatch = text.match(/id:\s*"(ogn-[^"]+)"/);
	const policyRefsBlock = text.match(/policyRefs:\s*\[([\s\S]*?)\]/);
	const policyRefs = [];
	if (policyRefsBlock) {
		for (const m of policyRefsBlock[1].matchAll(/"([^"]+)"/g)) {
			policyRefs.push(m[1]);
		}
	}
	const parts = [];
	const partsBlock = text.match(/parts:\s*\[([\s\S]*?)\n\t\],/);
	if (partsBlock) {
		const blocks = partsBlock[1].split(/\n\t\t\{/);
		for (const block of blocks) {
			const partIdMatch = block.match(/id:\s*"([^"]+)"/);
			const componentMatch = block.match(/component:\s*"([^"]+)"/);
			if (!partIdMatch) continue;
			const policiesMatch = block.match(/policies:\s*\[([^\]]+)\]/);
			const policySymbols = [];
			if (policiesMatch) {
				for (const m of policiesMatch[1].matchAll(/POL_[A-Z0-9_]+/g)) {
					policySymbols.push(m[0].replace(/_/g, "-").replace(/^POL-/, "POL-"));
				}
			}
			parts.push({
				id: partIdMatch[1],
				component: componentMatch?.[1] ?? null,
				bound: policySymbols,
			});
		}
	}
	return { filePath, id: idMatch?.[1] ?? null, policyRefs, parts };
}

function symbolToPolicyId(sym) {
	// POL_MBR_INFO_002_05 → POL-MBR-INFO-002-05
	return sym.replace(/_/g, "-");
}

function color(text, code) {
	return process.stdout.isTTY ? `[${code}m${text}[0m` : text;
}
const red = (t) => color(t, "31");
const green = (t) => color(t, "32");
const yellow = (t) => color(t, "33");
const dim = (t) => color(t, "2");

// --- gather

const policies = walkFiles(policyRoot, (p) => p.endsWith(".policy.ts")).map(
	parsePolicyFile,
);

const ognSpecs = walkFiles(
	path.join(componentsRoot, "domains"),
	(p) => p.endsWith("/spec.ts"),
).map(parseSpec);

const screenSpecs = walkFiles(appsRoot, (p) => p.endsWith("/spec.json"))
	.filter((p) => {
		// only NOVA-* screens for now (SB-driven)
		return path.basename(path.dirname(p)).startsWith("NOVA-");
	})
	.map((filePath) => {
		const data = JSON.parse(readText(filePath));
		return { filePath, data };
	});

// --- report

let problems = 0;
let warnings = 0;

console.log("");
console.log(color("═══ Policy compliance report ═══", "1;36"));
console.log("");

// 1) Drift
console.log(color("[1] Policy drift — sourceText ↔ body .md", "1"));
for (const policy of policies) {
	const result = checkDrift(policy);
	const rel = path.relative(repoRoot, policy.filePath);
	if (result.ok) {
		console.log(`  ${green("✓")} ${policy.id}  ${dim(rel)}`);
	} else {
		problems += 1;
		console.log(
			`  ${red("✗")} ${policy.id}  ${dim(rel)}  ${red(result.reason ?? "drift")}`,
		);
	}
}
console.log("");

// 2) ogn policy ID coverage
console.log(color("[2] ogn policyRefs ↔ .policy.ts coverage", "1"));
const knownPolicyIds = new Set(policies.map((p) => p.id));
for (const spec of ognSpecs) {
	const rel = path.relative(repoRoot, spec.filePath);
	console.log(`  ${spec.id ?? "?"}  ${dim(rel)}`);
	for (const ref of spec.policyRefs) {
		if (ref.startsWith("PG-")) {
			// Group-level; we don't expect .policy.ts for groups
			console.log(`    ${dim("·")} ${ref}  ${dim("(group)")}`);
			continue;
		}
		if (knownPolicyIds.has(ref)) {
			console.log(`    ${green("✓")} ${ref}`);
		} else {
			warnings += 1;
			console.log(`    ${yellow("·")} ${ref}  ${yellow("no .policy.ts (out of scope)")}`);
		}
	}
}
console.log("");

// 3) Part-level binding
console.log(color("[3] ogn part → policy binding", "1"));
for (const spec of ognSpecs) {
	console.log(`  ${spec.id}`);
	for (const part of spec.parts) {
		const bound = part.bound.map(symbolToPolicyId);
		if (bound.length === 0) {
			console.log(
				`    ${dim("·")} ${part.id}  ${dim(`(${part.component}, no policy)`)}`,
			);
		} else {
			const allCovered = bound.every((id) => knownPolicyIds.has(id));
			const marker = allCovered ? green("✓") : red("✗");
			if (!allCovered) problems += 1;
			console.log(
				`    ${marker} ${part.id}  ${dim(`(${part.component})`)}  ←  ${bound.join(", ")}`,
			);
		}
	}
}
console.log("");

// 4) screen ↔ ogn list
console.log(color("[4] screen → composed ogns (sb storyboard)", "1"));
for (const screen of screenSpecs) {
	const screenId = screen.data?.screen?.id;
	const composition = screen.data?.x_storyboard?.composition ?? [];
	console.log(`  ${screenId}`);
	for (const row of composition) {
		const known = ognSpecs.some(
			(s) => s.id === row.ogn_id,
		);
		const marker = known ? green("✓") : red("✗");
		if (!known) problems += 1;
		console.log(
			`    ${marker} no.${row.no}  ${row.ogn_id}  ${dim(`(min=${row.min} max=${row.max})`)}`,
		);
	}
}
console.log("");

// 5) SB source.md ↔ spec.ts reconciliation
console.log(color("[5] SB source.md `[정책:...]` ↔ spec.ts parts.policies", "1"));
for (const spec of ognSpecs) {
	const dir = path.dirname(spec.filePath);
	const sourceMd = path.join(dir, "source.md");
	if (!existsSync(sourceMd)) {
		console.log(`  ${dim("·")} ${spec.id}  ${dim("(no source.md)")}`);
		continue;
	}
	const text = readText(sourceMd);
	// match rows in the 컴포넌트 상세 table: | n | partId | name | montage | ...
	const sbBindings = new Map();
	const rowRe = /\|\s*\d+\s*\|\s*([a-z][a-z0-9-]+)\s*\|[^\n]*?(?:\|([^|\n]*))?$/gim;
	for (const line of text.split("\n")) {
		const cells = line.split("|").map((c) => c.trim());
		if (cells.length < 4) continue;
		const no = cells[1];
		if (!/^\d+$/.test(no)) continue;
		const partId = cells[2];
		if (!partId || !/^[a-z][a-z0-9-]+$/.test(partId)) continue;
		const note = cells[cells.length - 2] ?? "";
		const tags = [];
		for (const m of note.matchAll(/\[정책:([A-Z0-9|\\\-_ ]+?)\]/g)) {
			for (const id of m[1].split(/[|\\]+/)) {
				const trimmed = id.trim();
				if (trimmed) tags.push(trimmed);
			}
		}
		if (tags.length > 0) sbBindings.set(partId, tags);
	}

	console.log(`  ${spec.id}`);
	if (sbBindings.size === 0) {
		console.log(`    ${dim("·")} ${dim("source.md has no [정책:...] tags")}`);
		continue;
	}

	for (const [partId, sbIds] of sbBindings) {
		const specPart = spec.parts.find((p) => p.id === partId);
		const implIds = specPart ? specPart.bound.map(symbolToPolicyId) : [];
		const missing = sbIds.filter((id) => !implIds.includes(id));
		const extra = implIds.filter((id) => !sbIds.includes(id));
		if (missing.length === 0 && extra.length === 0) {
			console.log(`    ${green("✓")} ${partId}  ${dim("matches SB exactly")}`);
		} else {
			if (missing.length > 0) problems += 1;
			if (extra.length > 0) warnings += 1;
			console.log(`    ${missing.length > 0 ? red("✗") : yellow("·")} ${partId}`);
			console.log(`        SB requests : ${sbIds.join(", ")}`);
			console.log(`        impl binds  : ${implIds.join(", ") || "(none)"}`);
			if (missing.length > 0) {
				console.log(`        ${red(`missing: ${missing.join(", ")}`)}`);
			}
			if (extra.length > 0) {
				console.log(`        ${yellow(`extra: ${extra.join(", ")}`)}`);
			}
		}
	}
}
console.log("");

// 6) Summary
console.log(color("─── summary ───", "1"));
console.log(`  policies        : ${policies.length}`);
console.log(`  ogn specs       : ${ognSpecs.length}`);
console.log(`  screens         : ${screenSpecs.length}`);
console.log(
	`  problems        : ${problems > 0 ? red(String(problems)) : green("0")}`,
);
console.log(
	`  warnings        : ${warnings > 0 ? yellow(String(warnings)) : green("0")}`,
);
console.log("");

process.exit(problems > 0 ? 1 : 0);
