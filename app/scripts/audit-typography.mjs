#!/usr/bin/env node
/**
 * audit-typography.mjs
 *
 * Pilot.tsx 의 <Typography> 사용처를 추출해서 effective font-size/line-height 를
 * 같은 이름의 data/design/components/<kebab>.json 의 typography 명세와 비교한다.
 *
 * 출력:
 * - 각 Pilot 별 Typography 호출과 effective size
 * - design.json typography 명세 사이즈 목록
 * - 사람이 양쪽 비교해서 mismatch 식별
 *
 * 자동 매칭 안 함 (Typography 가 어느 spec 항목에 대응하는지 코드만으론 모호).
 * 대신 양쪽을 나란히 보여줘 빠르게 mismatch 찾도록 설계.
 *
 * Usage: node scripts/audit-typography.mjs [--only=BannerContentsPilot]
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "../../..");
const PILOT_DIR = join(ROOT, "app/src/components/pilot-kit");
const DESIGN_DIR = join(ROOT, "data/design/components");
const REGISTRY = join(ROOT, "registry/wds-token-registry.json");

// 1rem = 16px
const REM_PX = 16;

const remToPx = (val) => {
	if (typeof val !== "string") return null;
	const m = val.match(/^([\d.]+)rem$/);
	if (m) return Math.round(parseFloat(m[1]) * REM_PX);
	const px = val.match(/^(\d+)px$/);
	if (px) return parseInt(px[1], 10);
	return null;
};

// --- 1. Load WDS variant native sizes ----
const tokenRegistry = JSON.parse(readFileSync(REGISTRY, "utf8"));
const variantTable = tokenRegistry.tiers?.typography?.variants
	?? tokenRegistry.tiers?.typography;
const variantSize = {};
for (const [name, def] of Object.entries(variantTable)) {
	if (!def || typeof def !== "object" || !("fontSize" in def)) continue;
	variantSize[name] = {
		fontSize: remToPx(def.fontSize),
		lineHeight: remToPx(def.lineHeight),
	};
}

// --- 2. Pilot file → kebab name (PascalCase + 'Pilot' → kebab without 'pilot') ----
const pascalToKebab = (pascal) =>
	pascal
		.replace(/Pilot$/, "")
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
		.toLowerCase();

// --- 3. Parse <Typography ...> from Pilot ----
// 아주 단순한 정규식 파서. JSX prop 이 multi-line 도 한 줄도 모두 잡힌다.
const TYPO_BLOCK = /<Typography\b([\s\S]*?)>/g;

const extractAttr = (block, name) => {
	// variant="X" or variant={"X"}
	const re = new RegExp(`${name}\\s*=\\s*(?:"([^"]+)"|\\{\\s*"([^"]+)"\\s*\\})`);
	const m = block.match(re);
	return m ? (m[1] ?? m[2]) : null;
};

const extractSxValue = (block, key) => {
	// fontSize: 18  | fontSize: "18px" | lineHeight: "20px"
	const re = new RegExp(`${key}\\s*:\\s*("([^"]+)"|(\\d+))`);
	const m = block.match(re);
	if (!m) return null;
	if (m[2]) {
		const px = m[2].match(/^(\d+)px$/);
		return px ? parseInt(px[1], 10) : m[2];
	}
	return parseInt(m[3], 10);
};

const parsePilot = (filePath) => {
	const src = readFileSync(filePath, "utf8");
	const calls = [];
	let m;
	TYPO_BLOCK.lastIndex = 0;
	while ((m = TYPO_BLOCK.exec(src))) {
		const block = m[0];
		const lineNo = src.slice(0, m.index).split("\n").length;
		const variant = extractAttr(block, "variant");
		const weight = extractAttr(block, "weight");
		const sxFontSize = extractSxValue(block, "fontSize");
		const sxLineHeight = extractSxValue(block, "lineHeight");
		const native = variant && variantSize[variant] ? variantSize[variant] : null;
		const effective = {
			fontSize: sxFontSize ?? native?.fontSize ?? null,
			lineHeight:
				typeof sxLineHeight === "number"
					? sxLineHeight
					: sxLineHeight && /^\d+$/.test(sxLineHeight)
						? parseInt(sxLineHeight, 10)
						: native?.lineHeight ?? null,
			source: sxFontSize ? "sx-override" : variant ? `variant=${variant}` : "?",
		};
		calls.push({ lineNo, variant, weight, sxFontSize, sxLineHeight, effective });
	}
	return calls;
};

// --- 4. Parse design.json typography ----
const parseDesign = (kebab) => {
	const path = join(DESIGN_DIR, `${kebab}.json`);
	let json;
	try {
		json = JSON.parse(readFileSync(path, "utf8"));
	} catch {
		return null;
	}
	const typo = json.typography;
	if (!typo || typeof typo !== "object") return [];
	const entries = [];
	for (const [name, def] of Object.entries(typo)) {
		if (typeof def !== "object" || def === null) continue;
		entries.push({
			name,
			size: def.size ?? null,
			lh: def.line_height ?? def.lh ?? null,
			weight: def.weight ?? def.w ?? null,
			maxLines: def.max_lines ?? null,
		});
	}
	return entries;
};

// --- 5. Walk and report ----
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.split("=")[1] : null;

const files = readdirSync(PILOT_DIR)
	.filter((f) => f.endsWith("Pilot.tsx"))
	.filter((f) => (only ? basename(f, ".tsx") === only : true));

let totalCalls = 0;
let totalMismatches = 0;

for (const file of files) {
	const pascal = basename(file, ".tsx");
	const kebab = pascalToKebab(pascal);
	const calls = parsePilot(join(PILOT_DIR, file));
	if (calls.length === 0) continue;
	const designEntries = parseDesign(kebab);

	totalCalls += calls.length;

	// Heuristic mismatch: any effective size that doesn't exist in design entries
	const designSizes = designEntries
		? new Set(designEntries.filter((e) => e.size).map((e) => `${e.size}/${e.lh ?? "?"}`))
		: null;
	// sx-override 는 개발자가 명시적으로 사이즈를 박은 케이스 → 의도된 강제로 간주.
	// 진짜 mismatch 는 variant 의 native 사이즈가 spec 과 어긋나는 경우만.
	const mismatches = !designSizes || designSizes.size === 0
		? []
		: calls.filter((c) => {
				if (c.effective.source === "sx-override") return false;
				const key = `${c.effective.fontSize}/${c.effective.lineHeight}`;
				return c.effective.fontSize && !designSizes.has(key);
			});
	totalMismatches += mismatches.length;

	const flag = mismatches.length > 0 ? "⚠️ " : designEntries === null ? "📭 " : "✅ ";
	console.log(`\n${flag}${pascal}  (kebab: ${kebab}, calls: ${calls.length}, mismatch: ${mismatches.length})`);

	if (designEntries === null) {
		console.log(`   design.json 없음`);
	} else if (designEntries.length === 0) {
		console.log(`   design.json 에 typography 명세 없음 (수동 검토 필요)`);
	} else {
		console.log(`   spec: ${designEntries.map((e) => `${e.name}=${e.size}/${e.lh}`).join("  ")}`);
	}
	for (const c of calls) {
		const flag2 = mismatches.includes(c) ? "  ⚠️" : "    ";
		console.log(
			`${flag2} L${c.lineNo}  variant=${c.variant ?? "-"}  weight=${c.weight ?? "-"}  → ${c.effective.fontSize}/${c.effective.lineHeight}  (${c.effective.source})`,
		);
	}
}

console.log(`\n=== Summary ===\nTotal Typography calls: ${totalCalls}\nLikely mismatches: ${totalMismatches}\n`);
process.exit(totalMismatches > 0 ? 1 : 0);
