/**
 * One-shot migration: convert legacy 8-tier registry JSON to Tokens Studio
 * single-file format with 3 Sets (foundation / semantic / project).
 *
 * Light values only. dark fields dropped (decision 2026-05-11).
 * PXDS-internal meta (usage_rules, source notes) moved to $extensions.pxds.
 *
 * Run: node scripts/migrate-to-token-sets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const inputPath = path.join(packageRoot, "registry", "wds-token-registry.json");
const outputPath = inputPath;

const legacy = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const isComposedFrom = (fromValue) =>
	typeof fromValue === "string" && fromValue.includes("@");

const aliasFromAtomic = (fromValue) => {
	const match = fromValue.match(/^atomic\.([A-Za-z]+)\[(\d+)\]$/);
	if (!match) return null;
	return `{foundation.atomic.${match[1]}.${match[2]}}`;
};

const colorToken = ($value, extensions) => {
	const token = { $type: "color", $value };
	if (extensions) token.$extensions = { pxds: extensions };
	return token;
};

// ---- foundation ----
const foundation = {
	atomic: {},
	spacing: {},
	opacity: {},
	breakpoint: {},
	zIndex: {},
	size: {
		screen: {
			mobile: { $type: "sizing", $value: "375px" },
			contentWidth: { $type: "sizing", $value: "327px" },
		},
		header: {
			compact: { $type: "sizing", $value: "56px" },
		},
	},
};

for (const [family, tones] of Object.entries(legacy.tiers.atomic.groups)) {
	foundation.atomic[family] = {};
	for (const [key, hex] of Object.entries(tones)) {
		foundation.atomic[family][key] = { $type: "color", $value: hex };
	}
}

for (const { key, px } of legacy.tiers.spacing.values) {
	foundation.spacing[key] = { $type: "spacing", $value: px };
}

for (const [key, value] of Object.entries(legacy.tiers.opacity.values)) {
	foundation.opacity[key] = { $type: "opacity", $value: value };
}

for (const [key, value] of Object.entries(legacy.tiers.breakpoint.values)) {
	foundation.breakpoint[key] = { $type: "sizing", $value: value };
}

for (const [key, value] of Object.entries(legacy.tiers.z_index.values)) {
	foundation.zIndex[key] = { $type: "number", $value: value };
}

// ---- semantic ----
const semantic = {};

const walkSemanticGroup = (node, outNode, pathParts) => {
	if (!node || typeof node !== "object") return;

	// Leaf: { light, dark, from? }
	if (
		Object.hasOwn(node, "light") &&
		(typeof node.light === "string" || typeof node.dark === "string")
	) {
		const light = node.light;
		const fromLight =
			node.from && typeof node.from === "object" ? node.from.light : null;
		if (typeof fromLight === "string" && !isComposedFrom(fromLight)) {
			const alias = aliasFromAtomic(fromLight);
			if (alias) {
				outNode.$type = "color";
				outNode.$value = alias;
				return;
			}
		}
		// Raw light value. Trace composedFrom if present.
		outNode.$type = "color";
		outNode.$value = light;
		if (typeof fromLight === "string") {
			outNode.$extensions = { pxds: { composedFrom: fromLight } };
		}
		return;
	}

	// Recurse
	for (const [key, child] of Object.entries(node)) {
		if (key === "from" || key === "_note" || key === "_project_extension")
			continue;
		outNode[key] = {};
		walkSemanticGroup(child, outNode[key], [...pathParts, key]);
		// Clean empty groups
		if (Object.keys(outNode[key]).length === 0) delete outNode[key];
	}
};

for (const [groupName, groupNode] of Object.entries(
	legacy.tiers.semantic.groups,
)) {
	if (groupName === "platform") {
		// Multi-line CSS rule (ios.navigation) — preserve raw, dark dropped.
		semantic.platform = {};
		const ios = groupNode.ios;
		if (ios && ios.navigation && typeof ios.navigation.light === "string") {
			semantic.platform.ios = {
				navigation: {
					$type: "other",
					$value: ios.navigation.light,
				},
			};
		}
		continue;
	}

	if (groupName === "elevation") {
		// Structure: { light: { shadow: { normal: { xsmall: "..." } } }, dark: {...} }
		semantic.elevation = {};
		const lightShadow = groupNode.light && groupNode.light.shadow;
		if (lightShadow) {
			semantic.elevation.shadow = {};
			for (const [kind, levels] of Object.entries(lightShadow)) {
				semantic.elevation.shadow[kind] = {};
				for (const [name, value] of Object.entries(levels)) {
					semantic.elevation.shadow[kind][name] = {
						$type: "boxShadow",
						$value: value,
					};
				}
			}
		}
		continue;
	}

	semantic[groupName] = {};
	walkSemanticGroup(groupNode, semantic[groupName], [groupName]);
}

// semantic.typography (DTCG typography composite)
semantic.typography = {};
const typo = legacy.tiers.typography;
for (const [variant, style] of Object.entries(typo.variants)) {
	semantic.typography[variant] = {
		$type: "typography",
		$value: {
			fontSize: style.fontSize,
			lineHeight: style.lineHeight,
			letterSpacing: style.letterSpacing,
		},
	};
}
semantic.typography.weights = {};
for (const [name, w] of Object.entries(typo.weights)) {
	semantic.typography.weights[name] = {
		$type: "fontWeights",
		$value: w.fontWeight,
		$extensions: { pxds: { fontWeightName: w.fontWeightName } },
	};
}

// semantic.spacing (NEW — PXDS intent-based spacing previously hardcoded in src/spacing.ts)
semantic.spacing = {
	row: { $type: "spacing", $value: "{foundation.spacing.4}" },
	inline: { $type: "spacing", $value: "{foundation.spacing.8}" },
	stack: { $type: "spacing", $value: "{foundation.spacing.12}" },
	group: { $type: "spacing", $value: "{foundation.spacing.16}" },
	inset: { $type: "spacing", $value: "{foundation.spacing.20}" },
	block: { $type: "spacing", $value: "{foundation.spacing.24}" },
	section: { $type: "spacing", $value: "{foundation.spacing.32}" },
};

// ---- project ----
const project = {};
const kebab = (value) =>
	value.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

const cssVarToAlias = (value) => {
	if (typeof value !== "string") return value;
	const match = value.match(/^var\(--semantic-([a-zA-Z-]+)\)$/);
	if (!match) return value;
	const segments = match[1].split("-");
	return `{semantic.${segments.join(".")}}`;
};

const walkProjectGroup = (node, outNode) => {
	for (const [key, rawValue] of Object.entries(node)) {
		const value = cssVarToAlias(rawValue);
		if (value && typeof value === "object") {
			outNode[key] = {};
			walkProjectGroup(value, outNode[key]);
		} else {
			// Infer DTCG $type from key
			let $type = "other";
			if (
				key === "background" ||
				key === "border" ||
				key === "shadow" ||
				key === "backdrop" ||
				key === "tLogo" ||
				key === "gnbBorder" ||
				key === "fill"
			) {
				$type =
					key === "shadow"
						? "boxShadow"
						: key === "border"
							? "color"
							: "color";
				if (key === "shadow") $type = "boxShadow";
			}
			if (key === "radius") $type = "borderRadius";
			if (key === "fontSize") $type = "fontSizes";
			if (key === "fontWeight") $type = "fontWeights";
			if (key === "letterSpacing") $type = "letterSpacing";
			if (key === "lineHeight") $type = "lineHeights";

			outNode[key] = { $type, $value: value };
		}
	}
};
walkProjectGroup(legacy.tiers.project.groups, project);

// ---- $extensions.pxds ----
const extensions = {
	pxds: {
		meta: legacy.meta,
		usage_rules: legacy.usage_rules,
	},
};

const next = {
	$metadata: { tokenSetOrder: ["foundation", "semantic", "project"] },
	$themes: [],
	foundation,
	semantic,
	project,
	$extensions: extensions,
};

fs.writeFileSync(outputPath, `${JSON.stringify(next, null, "\t")}\n`);
console.log("registry written:", outputPath);
