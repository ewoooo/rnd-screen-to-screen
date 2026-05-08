type WdsTokenRegistry = {
	tiers?: Record<string, unknown>;
};

type FigmaTokenNode = {
	value: unknown;
};

type FigmaTokenTree = Record<string, unknown>;

const ROOT_FONT_SIZE = 16;

export function createPxdsFigmaTokens(registry: WdsTokenRegistry): FigmaTokenTree {
	const tiers = registry.tiers ?? {};
	const tokens: FigmaTokenTree = {
		atomic: {},
		semantic: {},
		spacing: {},
		typography: {},
		project: {},
		foundation: {
			dimension: {
				spacing: {},
				size: {
					"screen-mobile": tokenValue("375px"),
					"screen-content-width": tokenValue("327px"),
					"header-compact": tokenValue("56px"),
				},
			},
			typography: {
				fontFamily: {
					primary: tokenValue("Pretendard"),
					fallback: tokenValue("Inter"),
				},
				fontWeight: {},
			},
		},
	};

	assignColorGroups(tokens.atomic as FigmaTokenTree, readTierGroups(tiers.atomic));
	assignSemanticGroups(
		tokens.semantic as FigmaTokenTree,
		readTierGroups(tiers.semantic),
	);
	(tokens.semantic as FigmaTokenTree).typography = {};
	assignSpacing(
		tokens.spacing as FigmaTokenTree,
		(tokens.foundation as FigmaTokenTree).dimension as FigmaTokenTree,
		readTierValues(tiers.spacing),
	);
	assignTypography(
		tokens.typography as FigmaTokenTree,
		(tokens.semantic as FigmaTokenTree).typography as FigmaTokenTree | undefined,
		((tokens.foundation as FigmaTokenTree).typography as FigmaTokenTree)
			.fontWeight as FigmaTokenTree,
		tiers.typography,
	);
	assignProjectGroups(tokens.project as FigmaTokenTree, readTierGroups(tiers.project));

	return tokens;
}

function readTierGroups(tier: unknown): Record<string, unknown> {
	return isRecord(tier) && isRecord(tier.groups) ? tier.groups : {};
}

function readTierValues(tier: unknown): unknown[] {
	return isRecord(tier) && Array.isArray(tier.values) ? tier.values : [];
}

function assignColorGroups(target: FigmaTokenTree, groups: Record<string, unknown>) {
	for (const [groupName, group] of Object.entries(groups)) {
		if (!isRecord(group)) continue;
		target[groupName] = mapLeafValues(group);
	}
}

function assignSemanticGroups(
	target: FigmaTokenTree,
	groups: Record<string, unknown>,
) {
	for (const [groupName, group] of Object.entries(groups)) {
		if (!isRecord(group)) continue;
		target[groupName] = mapSemanticGroup(group);
	}
}

function assignSpacing(
	spacingTarget: FigmaTokenTree,
	dimensionTarget: FigmaTokenTree,
	values: unknown[],
) {
	const foundationSpacing = dimensionTarget.spacing as FigmaTokenTree;

	for (const item of values) {
		if (!isRecord(item) || typeof item.key !== "string") continue;
		const value = typeof item.px === "string" ? item.px : item.key;
		spacingTarget[item.key] = tokenValue(value);
		foundationSpacing[item.key] = tokenValue(value);
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
		const node = spacingTarget[key];
		if (node) foundationSpacing[alias] = node;
	}
}

function assignTypography(
	typographyTarget: FigmaTokenTree,
	semanticTypographyTarget: FigmaTokenTree | undefined,
	fontWeightTarget: FigmaTokenTree,
	tier: unknown,
) {
	if (!isRecord(tier)) return;

	const variants = isRecord(tier.variants) ? tier.variants : {};
	const weights = isRecord(tier.weights) ? tier.weights : {};
	const semanticTypography = semanticTypographyTarget ?? {};

	for (const [weightName, weight] of Object.entries(weights)) {
		if (!isRecord(weight) || typeof weight.fontWeight !== "number") continue;
		fontWeightTarget[weightName] = tokenValue(weight.fontWeight);
	}

	for (const [variantName, variant] of Object.entries(variants)) {
		if (!isRecord(variant)) continue;
		const variantNode: FigmaTokenTree = {};
		const semanticVariantNode: FigmaTokenTree = {};

		for (const [weightName, weight] of Object.entries(weights)) {
			if (!isRecord(weight) || typeof weight.fontWeight !== "number") continue;
			const value = {
				fontSize: toPx(variant.fontSize),
				lineHeight: toPx(variant.lineHeight),
				fontWeight: weight.fontWeight,
				letterSpacing: toPx(variant.letterSpacing ?? "0px"),
			};
			variantNode[weightName] = tokenValue(value);
			semanticVariantNode[weightName] = tokenValue(value);
		}

		typographyTarget[variantName] = variantNode;
		semanticTypography[variantName] = semanticVariantNode;
	}

	if (semanticTypographyTarget) {
		Object.assign(semanticTypographyTarget, semanticTypography);
	}
}

function assignProjectGroups(target: FigmaTokenTree, groups: Record<string, unknown>) {
	for (const [groupName, group] of Object.entries(groups)) {
		if (!isRecord(group)) continue;
		target[groupName] = mapLeafValues(group);
	}
}

function mapSemanticGroup(group: Record<string, unknown>): FigmaTokenTree {
	const out: FigmaTokenTree = {};
	for (const [key, value] of Object.entries(group)) {
		if (isRecord(value) && typeof value.light === "string") {
			out[key] = tokenValue(value.light);
		} else if (isRecord(value)) {
			out[key] = mapSemanticGroup(value);
		} else {
			out[key] = tokenValue(value);
		}
	}
	return out;
}

function mapLeafValues(group: Record<string, unknown>): FigmaTokenTree {
	const out: FigmaTokenTree = {};
	for (const [key, value] of Object.entries(group)) {
		out[key] = isRecord(value) ? mapLeafValues(value) : tokenValue(value);
	}
	return out;
}

function tokenValue(value: unknown): FigmaTokenNode {
	return { value };
}

function toPx(value: unknown): string {
	if (typeof value === "number") return `${value}px`;
	if (typeof value !== "string") return "0px";
	if (value.endsWith("rem")) {
		return `${parseFloat(value) * ROOT_FONT_SIZE}px`;
	}
	if (value.endsWith("em")) {
		return `${parseFloat(value) * ROOT_FONT_SIZE}px`;
	}
	if (/^-?\d+(\.\d+)?$/.test(value)) {
		return `${parseFloat(value)}px`;
	}
	return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
