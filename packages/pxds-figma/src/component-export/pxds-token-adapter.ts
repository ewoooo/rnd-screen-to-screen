type TokenLeaf = {
	$type?: string;
	$value: unknown;
	$extensions?: Record<string, unknown>;
};

type PxdsTokenRegistry = {
	foundation?: Record<string, unknown>;
	semantic?: Record<string, unknown>;
	project?: Record<string, unknown>;
};

type FigmaTokenNode = { value: unknown };

export type PxdsFigmaTokenTree = Record<string, unknown>;

const ROOT_FONT_SIZE = 16;

/**
 * Derived transport view of the PXDS token registry for Figma runtimes.
 *
 * SSOT stays in `@pxds/cx-tokens/registry/tokens.original.json` (Tokens
 * Studio single-file format: foundation/semantic/project Sets, DTCG leaves).
 * This tree reshapes the registry into paths the Figma component generator
 * and token sync runtime consume. Figma Variables built from this are an
 * external mirror.
 */
export function createPxdsFigmaTokenTree(
	registry: PxdsTokenRegistry,
): PxdsFigmaTokenTree {
	const foundation = isRecord(registry.foundation) ? registry.foundation : {};
	const semantic = isRecord(registry.semantic) ? registry.semantic : {};
	const project = isRecord(registry.project) ? registry.project : {};

	const tokens: PxdsFigmaTokenTree = {
		color: { atomic: {}, semantic: {} },
		spacing: {},
		opacity: {},
		typography: {},
		dimension: {
			size: {
				"screen-mobile": tokenValue("375px"),
				"screen-content-width": tokenValue("327px"),
				"header-compact": tokenValue("56px"),
			},
		},
		project: {},
	};

	assignAtomicColors(
		(tokens.color as PxdsFigmaTokenTree).atomic as PxdsFigmaTokenTree,
		isRecord(foundation.atomic) ? foundation.atomic : {},
	);
	assignSemanticColors(
		(tokens.color as PxdsFigmaTokenTree).semantic as PxdsFigmaTokenTree,
		semantic,
	);
	assignSpacing(
		tokens.spacing as PxdsFigmaTokenTree,
		isRecord(foundation.spacing) ? foundation.spacing : {},
	);
	assignKeyValueMap(
		tokens.opacity as PxdsFigmaTokenTree,
		isRecord(foundation.opacity) ? foundation.opacity : {},
	);
	assignTypography(
		tokens.typography as PxdsFigmaTokenTree,
		isRecord(semantic.typography) ? semantic.typography : {},
	);
	assignProject(
		tokens.project as PxdsFigmaTokenTree,
		project,
	);

	return tokens;
}

/**
 * @deprecated Use `createPxdsFigmaTokenTree`.
 */
export const createPxdsFigmaTokens = createPxdsFigmaTokenTree;

function assignAtomicColors(
	target: PxdsFigmaTokenTree,
	atomicNode: Record<string, unknown>,
) {
	for (const [family, tones] of Object.entries(atomicNode)) {
		if (!isRecord(tones)) continue;
		const familyOut: PxdsFigmaTokenTree = {};
		for (const [key, leaf] of Object.entries(tones)) {
			if (!isLeaf(leaf)) continue;
			familyOut[key] = tokenValue(leaf.$value);
		}
		target[family] = familyOut;
	}
}

function assignSemanticColors(
	target: PxdsFigmaTokenTree,
	semanticNode: Record<string, unknown>,
) {
	const SKIP = new Set(["typography", "spacing", "elevation", "platform"]);
	for (const [group, node] of Object.entries(semanticNode)) {
		if (SKIP.has(group)) continue;
		if (!isRecord(node)) continue;
		target[group] = mapSemanticColorNode(node);
	}
}

function mapSemanticColorNode(node: Record<string, unknown>): PxdsFigmaTokenTree {
	const out: PxdsFigmaTokenTree = {};
	for (const [key, child] of Object.entries(node)) {
		if (isLeaf(child)) {
			out[key] = tokenValue(toFigmaSemanticValue(child.$value));
		} else if (isRecord(child)) {
			out[key] = mapSemanticColorNode(child);
		}
	}
	return out;
}

function toFigmaSemanticValue(value: unknown): unknown {
	if (typeof value !== "string") return value;
	const alias = parseAlias(value);
	if (!alias) return value;
	if (alias[0] === "foundation" && alias[1] === "atomic") {
		return `{color.atomic.${alias.slice(2).join(".")}}`;
	}
	if (alias[0] === "semantic") {
		return `{color.semantic.${alias.slice(1).join(".")}}`;
	}
	return value;
}

function assignSpacing(
	target: PxdsFigmaTokenTree,
	spacingNode: Record<string, unknown>,
) {
	for (const [key, leaf] of Object.entries(spacingNode)) {
		if (!isLeaf(leaf)) continue;
		target[key] = tokenValue(leaf.$value);
	}

	const aliases: Record<string, string> = {
		none: "0",
		xxs: "2",
		xs: "4",
		sm: "8",
		md: "12",
		lg: "16",
		xl: "24",
		"2xl": "32",
	};
	for (const [alias, key] of Object.entries(aliases)) {
		const node = target[key];
		if (node) target[alias] = node;
	}
}

function assignKeyValueMap(
	target: PxdsFigmaTokenTree,
	scalarNode: Record<string, unknown>,
) {
	for (const [key, leaf] of Object.entries(scalarNode)) {
		if (!isLeaf(leaf)) continue;
		target[key] = tokenValue(leaf.$value);
	}
}

function assignTypography(
	target: PxdsFigmaTokenTree,
	typographyNode: Record<string, unknown>,
) {
	const weightsNode = isRecord(typographyNode.weights) ? typographyNode.weights : {};
	const fontWeightTarget: PxdsFigmaTokenTree = {};
	const fontWeightNameTarget: PxdsFigmaTokenTree = {};
	const fontSizeTarget: PxdsFigmaTokenTree = {};
	const lineHeightTarget: PxdsFigmaTokenTree = {};
	const letterSpacingTarget: PxdsFigmaTokenTree = {};

	target.fontFamily = {
		primary: tokenValue("Pretendard"),
		fallback: tokenValue("Inter"),
	};
	target.fontWeight = fontWeightTarget;
	target.fontWeightName = fontWeightNameTarget;
	target.fontSize = fontSizeTarget;
	target.lineHeight = lineHeightTarget;
	target.letterSpacing = letterSpacingTarget;

	const weights: { name: string; weight: number; weightName: string }[] = [];
	for (const [weightName, leaf] of Object.entries(weightsNode)) {
		if (!isLeaf(leaf) || typeof leaf.$value !== "number") continue;
		const friendlyName =
			isRecord(leaf.$extensions) &&
			isRecord(leaf.$extensions.pxds) &&
			typeof leaf.$extensions.pxds.fontWeightName === "string"
				? leaf.$extensions.pxds.fontWeightName
				: capitalize(weightName);
		fontWeightTarget[weightName] = tokenValue(leaf.$value);
		fontWeightNameTarget[weightName] = tokenValue(friendlyName);
		weights.push({ name: weightName, weight: leaf.$value, weightName: friendlyName });
	}

	for (const [variantName, leaf] of Object.entries(typographyNode)) {
		if (variantName === "weights") continue;
		if (!isLeaf(leaf) || leaf.$type !== "typography") continue;
		const style = isRecord(leaf.$value) ? leaf.$value : null;
		if (!style) continue;
		const fontSizeStr = typeof style.fontSize === "string" ? style.fontSize : "0px";
		const lineHeightStr = typeof style.lineHeight === "string" ? style.lineHeight : "0px";
		const letterSpacingStr =
			typeof style.letterSpacing === "string" ? style.letterSpacing : "0px";

		fontSizeTarget[variantName] = tokenValue(toPx(fontSizeStr));
		lineHeightTarget[variantName] = tokenValue(toPx(lineHeightStr));
		letterSpacingTarget[variantName] = tokenValue(toPx(letterSpacingStr));

		const variantNode: PxdsFigmaTokenTree = {};
		for (const { name: weightName, weight, weightName: friendlyName } of weights) {
			const typographyPath = `typography.${variantName}.${weightName}`;
			variantNode[weightName] = {
				value: {
					fontSize: `{${typographyPath}.fontSize}`,
					lineHeight: `{${typographyPath}.lineHeight}`,
					fontWeight: `{${typographyPath}.fontWeight}`,
					fontWeightName: `{${typographyPath}.fontWeightName}`,
					letterSpacing: `{${typographyPath}.letterSpacing}`,
				},
				fontSize: tokenValue(toPx(fontSizeStr)),
				lineHeight: tokenValue(toPx(lineHeightStr)),
				fontWeight: tokenValue(weight),
				fontWeightName: tokenValue(friendlyName),
				letterSpacing: tokenValue(toPx(letterSpacingStr)),
			};
		}
		target[variantName] = variantNode;
	}
}

function assignProject(
	target: PxdsFigmaTokenTree,
	projectNode: Record<string, unknown>,
) {
	for (const [group, node] of Object.entries(projectNode)) {
		if (!isRecord(node)) continue;
		target[group] = mapProjectNode(node);
	}
}

function mapProjectNode(node: Record<string, unknown>): PxdsFigmaTokenTree {
	const out: PxdsFigmaTokenTree = {};
	for (const [key, child] of Object.entries(node)) {
		if (isLeaf(child)) {
			out[key] = tokenValue(toFigmaProjectValue(child.$value));
		} else if (isRecord(child)) {
			out[key] = mapProjectNode(child);
		}
	}
	return out;
}

function toFigmaProjectValue(value: unknown): unknown {
	if (typeof value !== "string") return value;
	const alias = parseAlias(value);
	if (!alias) return value;
	// Project tokens that reference semantic resolve to a CSS var so legacy
	// figma plugin consumers continue to read a runtime-usable string.
	if (alias[0] === "semantic") {
		return `var(--semantic-${alias.slice(1).join("-")})`;
	}
	if (alias[0] === "foundation") {
		const [, tier, ...path] = alias;
		const prefix =
			tier === "atomic"
				? "--atomic-"
				: tier === "spacing"
					? "--spacing-"
					: tier === "opacity"
						? "--opacity-"
						: tier === "breakpoint"
							? "--breakpoint-"
							: tier === "zIndex"
								? "--z-index-"
								: null;
		if (!prefix) return value;
		return `var(${prefix}${path.join("-")})`;
	}
	return value;
}

function parseAlias(value: string): string[] | null {
	const match = value.match(/^\{([^}]+)\}$/);
	if (!match) return null;
	return match[1].split(".");
}

function tokenValue(value: unknown): FigmaTokenNode {
	return { value };
}

function toPx(value: unknown): string {
	if (typeof value === "number") return `${value}px`;
	if (typeof value !== "string") return "0px";
	if (value.endsWith("rem") || value.endsWith("em")) {
		return `${parseFloat(value) * ROOT_FONT_SIZE}px`;
	}
	if (/^-?\d+(\.\d+)?$/.test(value)) {
		return `${parseFloat(value)}px`;
	}
	return value;
}

function capitalize(value: string): string {
	return value.replace(/(^|-)([a-z])/g, (_, prefix: string, letter: string) =>
		`${prefix}${letter.toUpperCase()}`,
	);
}

function isLeaf(value: unknown): value is TokenLeaf {
	return (
		Boolean(value) &&
		typeof value === "object" &&
		!Array.isArray(value) &&
		Object.hasOwn(value as object, "$value")
	);
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
