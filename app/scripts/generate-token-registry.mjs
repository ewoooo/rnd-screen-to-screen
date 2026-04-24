#!/usr/bin/env node
// WDS 토큰(@wanteddev/wds-theme + typography variants)을 레지스트리 JSON으로 추출한다.
// 출력: registry/wds-token-registry.json
// 실행: cd app && node scripts/generate-token-registry.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const themePkg = require("@wanteddev/wds-theme");
const themePkgJson = require("@wanteddev/wds-theme/package.json");

const OUT_FILE = resolve(process.cwd(), "../registry/wds-token-registry.json");
const TYPO_SRC = resolve(
	process.cwd(),
	"node_modules/@wanteddev/wds/dist/components/typography/style.mjs",
);

// ---------- atomic palette → hex-only terse, pattern declared in tier ----------
const atomicTree = themePkg.lightOriginTheme.atomic;
const atomicGroups = {};
for (const family of Object.keys(atomicTree).sort()) {
	const tones = atomicTree[family];
	// Skip rgb duplicates: `{ 10: "#001536", "10-rgb": "0, 21, 54" ... }` — wds-theme runtime uses separate path,
	// but the tones record only holds raw entries keyed by tone. Just stringify.
	atomicGroups[family] = {};
	for (const key of Object.keys(tones).sort(
		(a, b) => Number(a) - Number(b),
	)) {
		atomicGroups[family][key] = tones[key];
	}
}

// ---------- hex → atomic reverse index, for semantic `from` provenance ----------
const hexToAtomic = new Map();
for (const [family, tones] of Object.entries(atomicGroups)) {
	for (const [tone, hex] of Object.entries(tones)) {
		const norm = hex.toLowerCase();
		if (!hexToAtomic.has(norm)) {
			hexToAtomic.set(norm, `atomic.${family}[${tone}]`);
		}
	}
}

const opacityTable = themePkg.lightOriginTheme.opacity;
// value (0..1) → key
const opacityValueToKey = new Map(
	Object.entries(opacityTable).map(([k, v]) => [Number(v).toFixed(4), k]),
);

// ---------- resolve `from` annotation for a semantic value ----------
const resolveFrom = (value) => {
	if (typeof value !== "string") return null;
	const v = value.toLowerCase();

	// 7-char hex → direct atomic match
	if (/^#[0-9a-f]{6}$/.test(v)) {
		return hexToAtomic.get(v) ?? null;
	}

	// 9-char hex (#RRGGBBAA) → atomic @ opacity
	if (/^#[0-9a-f]{8}$/.test(v)) {
		const base = v.slice(0, 7);
		const alphaHex = v.slice(7);
		const alphaFloat = Number.parseInt(alphaHex, 16) / 255;
		const atomicPath = hexToAtomic.get(base);
		if (!atomicPath) return null;
		// find closest opacity key
		let bestKey = null;
		let bestDiff = Infinity;
		for (const [keyStr, val] of Object.entries(opacityTable)) {
			const diff = Math.abs(Number(val) - alphaFloat);
			if (diff < bestDiff) {
				bestDiff = diff;
				bestKey = keyStr;
			}
		}
		return bestKey != null
			? `${atomicPath} @ opacity[${bestKey}]`
			: `${atomicPath} @ alpha ${alphaHex}`;
	}

	// shadow / filter / other composite: not resolvable to single atomic
	return null;
};

const walkSemanticGroup = (node, modes) => {
	// node: possibly nested object. leaves are strings (hex) for light/dark theme.
	// We assume shape is identical across modes; traverse light and dark together.
	const walk = (lightVal, darkVal) => {
		if (typeof lightVal === "string") {
			const entry = { light: lightVal };
			if (darkVal !== undefined) entry.dark = darkVal;
			const fromLight = resolveFrom(lightVal);
			const fromDark = darkVal ? resolveFrom(darkVal) : null;
			if (fromLight || fromDark) {
				entry.from = {};
				if (fromLight) entry.from.light = fromLight;
				if (fromDark) entry.from.dark = fromDark;
			}
			return entry;
		}
		const out = {};
		for (const k of Object.keys(lightVal)) {
			out[k] = walk(lightVal[k], darkVal ? darkVal[k] : undefined);
		}
		return out;
	};
	return walk(modes.light, modes.dark);
};

const semanticLight = themePkg.lightOriginTheme.semantic;
const semanticDark = themePkg.darkOriginTheme.semantic;
const semanticGroups = {};
for (const group of Object.keys(semanticLight).sort()) {
	// skip `elevation` group — holds CSS shadow strings, not hex
	if (group === "elevation") {
		semanticGroups[group] = {
			_note: "CSS shadow/filter strings. from/resolved 생략",
			light: semanticLight[group],
			dark: semanticDark[group],
		};
		continue;
	}
	semanticGroups[group] = walkSemanticGroup(semanticLight[group], {
		light: semanticLight[group],
		dark: semanticDark[group],
	});
}

// ---------- typography: parse style.mjs text ----------
const typoSource = readFileSync(TYPO_SRC, "utf8");
const typographyVariants = {};
const variantRegex =
	/"?([a-zA-Z0-9-]+)"?:\s*css`\s*font-size:\s*([^;]+);\s*line-height:\s*([^;]+);\s*letter-spacing:\s*([^;]+);/g;
let match;
while ((match = variantRegex.exec(typoSource)) !== null) {
	const [, name, fontSize, lineHeight, letterSpacing] = match;
	typographyVariants[name] = {
		fontSize: fontSize.trim(),
		lineHeight: lineHeight.trim(),
		letterSpacing: letterSpacing.trim(),
	};
}

// weight-only modifiers (composed on top of size variants)
const typographyWeights = {};
const weightRegex = /\b(\w+):\s*css`\s*font-weight:\s*(\d+);\s*`/g;
while ((match = weightRegex.exec(typoSource)) !== null) {
	const [, name, weight] = match;
	typographyWeights[name] = { fontWeight: Number(weight) };
}

// ---------- assemble ----------
const registry = {
	meta: {
		source: `@wanteddev/wds-theme@${themePkgJson.version}`,
		source_path: "app/node_modules/@wanteddev/wds-theme/dist/theme/",
		package: "@wanteddev/wds-theme",
		fetched_at: new Date().toISOString().slice(0, 10),
		generator: "app/scripts/generate-token-registry.mjs",
		note: "node_modules 기반 자동 추출. 공식 소스(wanteddev/montage-web) 기준 교정 시 재실행.",
		related_registries: {
			components: "./wds-component-registry.json",
		},
	},
	tiers: {
		atomic: {
			purpose:
				"semantic 토큰의 기반 색상 팔레트. 직접 사용 지양 — semantic이 먼저다.",
			css_prefix: "--atomic-",
			css_var_pattern: "--atomic-{family}-{key}",
			css_var_rgb_pattern: "--atomic-{family}-{key}-rgb",
			ts_path_pattern: "theme.{mode}.atomic.{family}[{key}]",
			groups: atomicGroups,
		},
		semantic: {
			purpose:
				"실제 컴포넌트 override에 쓰는 의미 기반 토큰. 이걸 먼저 사용한다.",
			css_prefix: "--semantic-",
			modes: ["light", "dark"],
			ts_path_pattern: "theme.{mode}.semantic.{group}.{...path}",
			groups: semanticGroups,
		},
		spacing: {
			purpose: "margin/padding/gap 공통 스케일",
			css_prefix: "--spacing-",
			ts_path: "theme.{mode}.spacing[{key}]",
			note: "키가 숫자(정수/소수 혼합)라 순서 보존을 위해 배열 형식 사용.",
			values: Object.entries(themePkg.lightOriginTheme.spacing)
				.sort((a, b) => Number(a[0]) - Number(b[0]))
				.map(([key, px]) => ({ key, px })),
		},
		breakpoint: {
			purpose: "반응형 분기",
			css_prefix: "--breakpoint-",
			ts_path: "theme.{mode}.breakpoint.{key}",
			values: Object.fromEntries(
				["xs", "sm", "md", "lg", "xl"]
					.filter((k) => k in themePkg.lightOriginTheme.breakpoint)
					.map((k) => [k, themePkg.lightOriginTheme.breakpoint[k]]),
			),
		},
		opacity: {
			purpose: "투명도 스케일 (semantic 합성에도 사용됨)",
			css_prefix: "--opacity-",
			ts_path: "theme.{mode}.opacity[{key}]",
			values: Object.fromEntries(
				Object.entries(themePkg.lightOriginTheme.opacity).sort(
					(a, b) => Number(a[0]) - Number(b[0]),
				),
			),
		},
		z_index: {
			purpose: "쌓임 순서",
			ts_path: "theme.{mode}.zIndex.{key}",
			values: themePkg.lightOriginTheme.zIndex,
			note: "WDS 공식 정의는 modal 하나. 추가 역할은 프로젝트 스코프.",
		},
		typography: {
			purpose: "Typography 컴포넌트의 variant",
			access: '<Typography variant="title1">',
			ts_path: "typographyStyle[variant]",
			source: "@wanteddev/wds/components/typography/style",
			variants: typographyVariants,
			weights: typographyWeights,
			note: "variant은 size/line-height/letter-spacing 세트. weights는 별도 composable modifier.",
		},
	},
	usage_rules: {
		override_order: [
			"1. semantic.{group}.{path}가 있으면 그것만 사용",
			"2. 없으면 atomic.{family}[{tone}]에서 가장 가까운 값 선택 + 사유를 커밋 메시지에 기록",
			"3. Figma hex 원값을 코드에 박지 말 것",
		],
		dark_mode_contract:
			"semantic만 자동 전환. atomic은 tone 선택을 수동으로 바꿔야 함.",
		css_var_pattern: "var(--semantic-primary-normal)",
		ts_pattern: "theme.light.semantic.primary.normal",
	},
};

writeFileSync(OUT_FILE, JSON.stringify(registry, null, 2) + "\n");

const atomicCount = Object.values(atomicGroups).reduce(
	(n, g) => n + Object.keys(g).length,
	0,
);
const semanticLeafCount = (() => {
	let n = 0;
	const walk = (o) => {
		if (typeof o !== "object" || o === null) return;
		if ("light" in o && typeof o.light === "string") {
			n += 1;
			return;
		}
		for (const v of Object.values(o)) walk(v);
	};
	walk(semanticGroups);
	return n;
})();

console.log(
	`[wds-token-registry] atomic ${Object.keys(atomicGroups).length} families / ${atomicCount} tones · ` +
		`semantic ${Object.keys(semanticGroups).length} groups / ${semanticLeafCount} leaves · ` +
		`typography ${Object.keys(typographyVariants).length} variants + ${Object.keys(typographyWeights).length} weights · ` +
		`spacing ${Object.keys(themePkg.lightOriginTheme.spacing).length} · ` +
		`opacity ${Object.keys(themePkg.lightOriginTheme.opacity).length} · ` +
		`breakpoint ${Object.keys(themePkg.lightOriginTheme.breakpoint).length}`,
);
console.log(`→ ${OUT_FILE.replace(resolve(process.cwd(), "..") + "/", "")}`);
