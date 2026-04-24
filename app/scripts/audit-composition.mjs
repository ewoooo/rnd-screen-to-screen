#!/usr/bin/env node
/**
 * audit-composition.mjs
 *
 * design.json 의 `composition[]` 에 박힌 sub-component 매핑 (`pilot:` / `raw_reason:`) 을
 * 실제 Pilot.tsx 의 import/사용과 비교한다.
 *
 * 검출 대상:
 *  - composition[].pilot 으로 명시된 Pilot 이 Pilot.tsx 에 import 안 됨 → ⚠️ unused mapping
 *  - Pilot.tsx 가 raw <div>/<span>/<button>/<p>/<a> 사용 중인데 composition 에 raw_reason 으로
 *    명시된 항목 수보다 많음 → ⚠️ undeclared raw (heuristic)
 *  - composition 자체가 없는 design.json → 📭 (정보, 옵션)
 *
 * Limitations: design.json 의 composition 에 의존. 미작성된 spec 은 mismatch 안 잡음 (audit 외 의도).
 *
 * Usage: node scripts/audit-composition.mjs [--only=OrgCardProductPassPilot] [--strict]
 *   --strict: composition 없는 spec 도 ⚠️ (미작성 강제용)
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "../../..");
const PILOT_DIR = join(ROOT, "app/src/components/pilot-kit");
const DESIGN_DIR = join(ROOT, "data/design/components");

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.split("=")[1] : null;
const strict = process.argv.includes("--strict");

const pascalToKebab = (pascal) =>
	pascal
		.replace(/Pilot$/, "")
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
		.toLowerCase();

const RAW_TAG_RE = /<(div|span|button|p|a|img|ul|li|section|header|main|nav|h[1-6]|input|form|label)([\s/>]|$)/g;

const parsePilot = (file) => {
	const src = readFileSync(file, "utf8");
	// extract Pilot imports (./*Pilot)
	const importedPilots = [...src.matchAll(/from\s+"\.\/([A-Z][A-Za-z0-9]+Pilot)"/g)].map((m) => m[1]);
	const wdsImports = [...src.matchAll(/from\s+"@wanteddev\/wds(?:-icon)?"/g)].length;
	// count raw tag occurrences (skip inside import lines and comments — simple)
	const codeOnly = src.replace(/^import .*$/gm, "").replace(/\/\/.*$/gm, "");
	const rawTags = [...codeOnly.matchAll(RAW_TAG_RE)].map((m) => m[1]);
	return { importedPilots: [...new Set(importedPilots)], wdsImports, rawTags };
};

const loadDesign = (kebab) => {
	try {
		return JSON.parse(readFileSync(join(DESIGN_DIR, `${kebab}.json`), "utf8"));
	} catch {
		return null;
	}
};

const files = readdirSync(PILOT_DIR)
	.filter((f) => f.endsWith("Pilot.tsx"))
	.filter((f) => (only ? basename(f, ".tsx") === only : true));

let totalIssues = 0;
let totalDeclared = 0;
let totalUndeclared = 0;
let totalMissingSpec = 0;

for (const file of files) {
	const pascal = basename(file, ".tsx");
	const kebab = pascalToKebab(pascal);
	const { importedPilots, rawTags } = parsePilot(join(PILOT_DIR, file));
	const design = loadDesign(kebab);

	const composition = Array.isArray(design?.composition) ? design.composition : null;

	if (!composition) {
		if (strict) {
			console.log(`⚠️  ${pascal}  composition 미정의 (--strict)`);
			totalMissingSpec++;
		}
		continue;
	}

	const declaredPilots = composition.filter((c) => c.pilot).map((c) => c.pilot);
	// raw_reason 에 "N회" 가 있으면 그 수를 합산 (generator 가 박는 형식)
	const declaredRawCount = composition
		.filter((c) => !c.pilot)
		.reduce((sum, c) => {
			const m = (c.raw_reason ?? "").match(/(\d+)\s*회/);
			return sum + (m ? parseInt(m[1], 10) : 1);
		}, 0);
	const issues = [];

	// 1) declared Pilots not imported
	for (const p of declaredPilots) {
		if (!importedPilots.includes(p)) {
			issues.push(`declared pilot "${p}" not imported`);
		}
	}

	// 2) imported Pilots not in composition
	for (const p of importedPilots) {
		if (!declaredPilots.includes(p)) {
			issues.push(`imported pilot "${p}" not in composition`);
		}
	}

	// 3) raw tag count vs declared raw count (heuristic — layout wrappers 도 raw 로 잡힘)
	const rawDelta = rawTags.length - declaredRawCount;
	if (rawDelta > 5) {
		// 5 이상 초과면 의심 (layout wrapper buffer)
		issues.push(`raw tags=${rawTags.length}, declared raw=${declaredRawCount} (Δ${rawDelta} — layout wrapper 초과 가능, 점검)`);
	}

	totalDeclared += declaredPilots.length;
	totalUndeclared += Math.max(0, rawDelta);
	if (issues.length > 0) {
		totalIssues += issues.length;
		console.log(`\n⚠️  ${pascal}`);
		console.log(`   composition: ${composition.length} entries (pilots=${declaredPilots.length}, raw=${declaredRawCount})`);
		console.log(`   imported: ${importedPilots.join(", ") || "(none)"}`);
		console.log(`   raw tags: ${rawTags.length}`);
		for (const i of issues) console.log(`   - ${i}`);
	} else {
		console.log(`✅ ${pascal}  composition aligned (${composition.length} entries, raw Δ${rawDelta})`);
	}
}

console.log(`\n=== Summary ===`);
console.log(`Pilots audited: ${files.length}`);
console.log(`Composition issues: ${totalIssues}`);
console.log(`Declared pilot mappings: ${totalDeclared}`);
console.log(`Undeclared raw (Δ): ${totalUndeclared}`);
if (strict) console.log(`Composition-missing specs: ${totalMissingSpec}`);
process.exit(totalIssues > 0 ? 1 : 0);
