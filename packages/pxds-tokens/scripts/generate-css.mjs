import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const registryPath = path.join(
	packageRoot,
	"registry",
	"wds-token-registry.json",
);
const outputPath = path.join(packageRoot, "src", "tokens.css");

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

const colorToRgb = (value) => {
	if (typeof value !== "string") return undefined;
	if (value.startsWith("#")) {
		const hex = value.slice(1);
		if (hex.length !== 6 && hex.length !== 8) return undefined;
		const r = Number.parseInt(hex.slice(0, 2), 16);
		const g = Number.parseInt(hex.slice(2, 4), 16);
		const b = Number.parseInt(hex.slice(4, 6), 16);
		return `${r}, ${g}, ${b}`;
	}
	const rgba = value.match(
		/^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)/,
	);
	if (!rgba) return undefined;
	return `${Number(rgba[1])}, ${Number(rgba[2])}, ${Number(rgba[3])}`;
};

const pushColorVar = (lines, name, value) => {
	lines.push(`\t--${name}: ${value};`);
	const rgb = colorToRgb(value);
	if (rgb) lines.push(`\t--${name}-rgb: ${rgb};`);
};

const walkAtomic = (lines) => {
	const groups = registry.tiers.atomic.groups;
	for (const [family, values] of Object.entries(groups)) {
		for (const [key, value] of Object.entries(values)) {
			pushColorVar(lines, `atomic-${family}-${key}`, value);
		}
	}
};

const walkSemantic = (lines, mode) => {
	const walk = (node, pathParts) => {
		if (!node || typeof node !== "object") return;
		if (pathParts[0] === "platform") return;
		if (Object.hasOwn(node, mode)) {
			const value = node[mode];
			if (typeof value === "string") {
				pushColorVar(lines, `semantic-${pathParts.join("-")}`, value);
			}
			return;
		}
		for (const [key, value] of Object.entries(node)) {
			if (key === "from") continue;
			walk(value, [...pathParts, key]);
		}
	};
	walk(registry.tiers.semantic.groups, []);
};

const pushKeyValueMap = (lines, prefix, values) => {
	for (const [key, value] of Object.entries(values)) {
		lines.push(`\t--${prefix}-${key}: ${value};`);
	}
};

const kebab = (value) =>
	value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const walkProject = (lines) => {
	const walk = (node, pathParts) => {
		if (!node || typeof node !== "object") return;
		for (const [key, value] of Object.entries(node)) {
			const nextPath = [...pathParts, kebab(key)];
			if (value && typeof value === "object") {
				walk(value, nextPath);
			} else {
				lines.push(`\t--pxds-${nextPath.join("-")}: ${value};`);
			}
		}
	};
	walk(registry.tiers.project.groups, []);
};

const spacingValues = Object.fromEntries(
	registry.tiers.spacing.values.map(({ key, px }) => [key.replace(".", "\\."), px]),
);

const typography = registry.tiers.typography;

const lines = [
	"/* Generated from @pxds/pxds-tokens/registry/wds-token-registry.json. */",
	"/* Do not edit token values here by hand. */",
	"",
	":root {",
];

walkAtomic(lines);
walkSemantic(lines, "light");
lines.push("");
lines.push("\t/* spacing */");
pushKeyValueMap(lines, "spacing", spacingValues);
lines.push("");
lines.push("\t/* opacity */");
pushKeyValueMap(lines, "opacity", registry.tiers.opacity.values);
lines.push("");
lines.push("\t/* breakpoint */");
pushKeyValueMap(lines, "breakpoint", registry.tiers.breakpoint.values);
lines.push("");
lines.push("\t/* z-index */");
pushKeyValueMap(lines, "z-index", registry.tiers.z_index.values);
lines.push("");
lines.push("\t/* project */");
walkProject(lines);
lines.push("");
lines.push("\t/* preview/device */");
lines.push("\t--pxds-device-mobile-view-width: 375px;");
lines.push("\t--pxds-device-mobile-view-height: 812px;");
lines.push("\t--pxds-device-mobile-view-radius: 28px;");
lines.push("\t--pxds-device-mobile-view-background: #ffffff;");
lines.push("\t--pxds-device-mobile-view-border-color: #e1e2e4;");
lines.push("\t--pxds-device-mobile-view-shadow: 0 8px 24px rgb(15 23 42 / 8%);");
lines.push("\t--pxds-surface-canvas: #f4f4f5;");
lines.push("}");
lines.push("");
lines.push("html[data-theme='dark'] {");
walkAtomic(lines);
walkSemantic(lines, "dark");
lines.push("}");
lines.push("");
lines.push("/* typography utility fallback. Prefer WDS Typography when possible. */");

for (const [variant, style] of Object.entries(typography.variants)) {
	lines.push("");
	lines.push(`.wds-${variant} {`);
	lines.push(`\tfont-size: ${style.fontSize};`);
	lines.push(`\tline-height: ${style.lineHeight};`);
	lines.push(`\tletter-spacing: ${style.letterSpacing};`);
	lines.push("}");
}

for (const [weight, style] of Object.entries(typography.weights)) {
	lines.push("");
	lines.push(`.wds-${weight} {`);
	lines.push(`\tfont-weight: ${style.fontWeight};`);
	lines.push("}");
}

fs.writeFileSync(outputPath, `${lines.join("\n")}\n`);
