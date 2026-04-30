#!/usr/bin/env node
/**
 * generate-composition.mjs
 *
 * 각 Pilot.tsx 를 분석해서 같은 이름의 design.json 에 starter `composition[]` 을
 * 채워 넣는다. 이미 composition 이 있으면 건너뛴다 (--force 로 덮어쓰기).
 *
 * 생성 규칙:
 *   - 각 imported Pilot → { name, kind (heuristic from name), pilot: "X" }
 *   - WDS Typography import 가 있으면 → 단일 entry { kind: "typography", pilot: null, raw_reason: "WDS Typography 직접 사용" }
 *   - raw HTML tags 가 있으면 → 단일 entry { kind: "layout", pilot: null, raw_reason: "raw layout wrapper × N" }
 *
 * 사람이 나중에 정밀 편집 가능. audit-composition 가 핵심 누락은 잡아준다.
 *
 * Usage:
 *   node scripts/generate-composition.mjs            # 기존 composition 있으면 skip
 *   node scripts/generate-composition.mjs --force    # 덮어쓰기
 *   node scripts/generate-composition.mjs --dry-run  # 변경 출력만
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "../../..");
const PILOT_DIR = join(ROOT, "app/src/components/pilot-kit");
const DESIGN_DIR = join(ROOT, "data/design/components");

const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");

const pascalToKebab = (pascal) =>
	pascal
		.replace(/Pilot$/, "")
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
		.replace(/([A-Za-z])(\d+)/g, "$1-$2")
		.toLowerCase();

const RAW_TAG_RE = /<(div|span|button|p|a|img|ul|li|section|header|main|nav|h[1-6]|input|form|label)([\s/>]|$)/g;

const kindFromPilotName = (p) => {
	const n = p.replace(/Pilot$/, "");
	if (/Badge/i.test(n)) return "badge";
	if (/^Btn|Button/i.test(n)) return "button";
	if (/Card/i.test(n)) return "card";
	if (/Img|Image|Thumbnail/i.test(n)) return "image";
	if (/Icon/i.test(n)) return "icon";
	if (/Chip/i.test(n)) return "chip";
	if (/Header|Gnb|Nav/i.test(n)) return "navigation";
	if (/Banner/i.test(n)) return "banner";
	if (/Input|Dropdown|Accordion|Form/i.test(n)) return "form";
	if (/Divider/i.test(n)) return "divider";
	if (/TextArea|Link/i.test(n)) return "typography";
	if (/Indicator|PageIndicator|ProgressBar/i.test(n)) return "indicator";
	if (/List/i.test(n)) return "list";
	if (/Org/i.test(n)) return "organism";
	if (/Com/i.test(n)) return "composite";
	return "component";
};

const kebabify = (camel) =>
	camel
		.replace(/Pilot$/, "")
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Za-z])(\d+)/g, "$1-$2")
		.toLowerCase();

const parsePilot = (file) => {
	const src = readFileSync(file, "utf8");
	const importedPilots = [
		...new Set(
			[...src.matchAll(/from\s+"\.\/([A-Z][A-Za-z0-9]+Pilot)"/g)].map((m) => m[1]),
		),
	];
	const usesTypography = /from\s+"@wanteddev\/wds[^"]*"/.test(src) && /\bTypography\b/.test(src);
	const codeOnly = src.replace(/^import .*$/gm, "").replace(/\/\/.*$/gm, "");
	const rawTags = [...codeOnly.matchAll(RAW_TAG_RE)].map((m) => m[1]);
	return { importedPilots, usesTypography, rawCount: rawTags.length };
};

const buildComposition = ({ importedPilots, usesTypography, rawCount }) => {
	const items = [];
	for (const p of importedPilots) {
		items.push({
			name: kebabify(p),
			kind: kindFromPilotName(p),
			pilot: p,
		});
	}
	if (usesTypography) {
		items.push({
			name: "typography-inline",
			kind: "typography",
			pilot: null,
			raw_reason: "WDS Typography 직접 사용 (variant + sx)",
		});
	}
	if (rawCount > 0) {
		items.push({
			name: "raw-layout-wrappers",
			kind: "layout",
			pilot: null,
			raw_reason: `raw HTML wrapper ${rawCount}회 (div/span/button 등 layout-only). 추후 의미 있는 부품은 atom 추출 후보.`,
		});
	}
	return items;
};

const files = readdirSync(PILOT_DIR).filter((f) => f.endsWith("Pilot.tsx"));

let updated = 0;
let skipped = 0;
let missing = 0;

for (const file of files) {
	const pascal = basename(file, ".tsx");
	const kebab = pascalToKebab(pascal);
	const designPath = join(DESIGN_DIR, `${kebab}.json`);
	if (!existsSync(designPath)) {
		console.log(`📭 ${pascal}  design.json 없음 (${kebab}.json)`);
		missing++;
		continue;
	}
	const design = JSON.parse(readFileSync(designPath, "utf8"));
	if (Array.isArray(design.composition) && !force) {
		console.log(`⏭  ${pascal}  composition 이미 있음 (${design.composition.length} entries)`);
		skipped++;
		continue;
	}
	const parsed = parsePilot(join(PILOT_DIR, file));
	const composition = buildComposition(parsed);
	if (composition.length === 0) {
		console.log(`📭 ${pascal}  부품 없음 — skip`);
		continue;
	}
	design.composition = composition;
	if (!dryRun) {
		writeFileSync(designPath, JSON.stringify(design, null, "\t") + "\n");
	}
	console.log(`✅ ${pascal}  ${composition.length} entries (pilots=${parsed.importedPilots.length}, typo=${parsed.usesTypography}, raw=${parsed.rawCount})`);
	updated++;
}

console.log(`\n=== Summary ===`);
console.log(`Updated: ${updated}`);
console.log(`Skipped (already): ${skipped}`);
console.log(`Missing design.json: ${missing}`);
if (dryRun) console.log("(dry-run, no files written)");
