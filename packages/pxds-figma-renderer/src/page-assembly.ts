import {
	figmaRendererComponentRegistry,
	getFigmaRendererComponentSpec,
	type FigmaRendererComponentRegistry,
} from "./component-registry";
import type {
	ComponentSpecChild,
	ComponentSpecDraft,
	ComponentSpecGroupChild,
	ComponentSpecRefChild,
	ComponentSpecTextChild,
	PageFigmaExportSpec,
	PageFigmaNodeSpec,
} from "./types";

export type PageComponentAssembly = {
	pageSpec: ComponentSpecDraft;
	requiredComponentSpecs: readonly ComponentSpecDraft[];
	missingComponentIds: readonly string[];
};

export type PageComponentAssemblyOptions = {
	componentSpecs?: FigmaRendererComponentRegistry;
};

type AssemblyContext = {
	data: Record<string, unknown>;
	componentSpecs: FigmaRendererComponentRegistry;
	requiredComponentIds: Set<string>;
};

export function createPageComponentAssembly(
	spec: PageFigmaExportSpec,
	options: PageComponentAssemblyOptions = {},
): PageComponentAssembly {
	const ctx: AssemblyContext = {
		data: spec.data,
		componentSpecs: options.componentSpecs ?? figmaRendererComponentRegistry,
		requiredComponentIds: new Set<string>(),
	};
	const pageSpec: ComponentSpecDraft = {
		$schema: "component-spec-v1",
		name: `page/${spec.id}`,
		category: "page",
		description:
			"PXDS page assembled recursively from registered Figma component instances.",
		base: {
			layout: {
				mode: "VERTICAL",
				primaryAxisSizingMode: "FIXED",
				counterAxisSizingMode: "FIXED",
				width: `${spec.frame.width}px`,
				height: `${spec.frame.height}px`,
			},
			visual: {
				fill: spec.frame.background,
			},
			children: createScreenChildren(spec.root, ctx),
		},
	};
	const registeredComponentIds = new Set(
		ctx.componentSpecs.map((entry) => entry.componentId),
	);
	const requiredComponentSpecs = ctx.componentSpecs
		.filter((entry) => ctx.requiredComponentIds.has(entry.componentId))
		.map((entry) => entry.spec);
	const missingComponentIds = Array.from(ctx.requiredComponentIds).filter(
		(componentId) => !registeredComponentIds.has(componentId),
	);

	return { pageSpec, requiredComponentSpecs, missingComponentIds };
}

function createScreenChildren(
	root: PageFigmaNodeSpec,
	ctx: AssemblyContext,
) {
	if (root.type === "AppScreen") return createAppScreenChildren(root, ctx);

	const child = mapNodeToAssemblyChild(root, ctx);
	return child ? [child] : [];
}

function createAppScreenChildren(
	root: PageFigmaNodeSpec,
	ctx: AssemblyContext,
): ComponentSpecChild[] {
	const headerChildren = root.children?.filter((child) => child.slot === "top") ?? [];
	const contentChildren =
		root.children?.filter((child) => child.slot === "content" || !child.slot) ?? [];
	const bottomChildren =
		root.children?.filter((child) => child.slot === "bottom") ?? [];

	return [
		createSystemHeader(),
		...(headerChildren.length > 0
			? [createChromeSlot("app-header", mapChildren(headerChildren, ctx))]
			: []),
		createContentSlot(contentChildren, ctx),
		...(bottomChildren.length > 0
			? [createChromeSlot("app-bottom", mapChildren(bottomChildren, ctx))]
			: []),
	];
}

function createSystemHeader(): ComponentSpecGroupChild {
	return {
		kind: "group",
		id: "system-header",
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "CENTER",
			paddingLeft: "{spacing.24}",
			paddingRight: "{spacing.24}",
			width: "FILL",
			height: "36px",
		},
		visual: { fill: "{color.semantic.surface.page.normal}" },
		children: [
			createTextChild("time", "7:28", "{typography.body1.medium}", {
				color: "{color.semantic.label.normal}",
			}),
		],
	};
}

function createChromeSlot(
	id: string,
	children: ComponentSpecChild[],
): ComponentSpecGroupChild {
	return {
		kind: "group",
		id,
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			height: "HUG",
		},
		visual: { fill: "{color.semantic.surface.page.normal}" },
		children,
	};
}

function createContentSlot(
	nodes: readonly PageFigmaNodeSpec[],
	ctx: AssemblyContext,
): ComponentSpecGroupChild {
	return {
		kind: "group",
		id: "content",
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			height: "FILL",
			itemSpacing: "{spacing.4}",
			paddingLeft: "{spacing.12}",
			paddingRight: "{spacing.12}",
			paddingBottom: "{spacing.16}",
		},
		layoutGrow: 1,
		scrollBehavior: "SCROLLS",
		children: mapChildren(nodes, ctx),
	};
}

function mapChildren(
	nodes: readonly PageFigmaNodeSpec[],
	ctx: AssemblyContext,
) {
	return nodes
		.map((child) => mapNodeToAssemblyChild(child, ctx))
		.filter((child): child is ComponentSpecChild => Boolean(child));
}

function mapNodeToAssemblyChild(
	node: PageFigmaNodeSpec,
	ctx: AssemblyContext,
): ComponentSpecChild | null {
	if (shouldSkipNode(node, ctx.data)) return null;
	if (node.type === "NcHero") return createFlowHero(node, ctx);
	if (node.type === "NcSummaryCard") return createFlowSummaryCard(node, ctx);
	if (node.type === "NcNotice") return createFlowNotice(node, ctx);
	if (node.type === "NcResultActions") return createFlowResultActions(node, ctx);
	if (node.type === "TermsAgreementGroup") return createTermsAgreementGroup(node, ctx);

	const componentSpec = getFigmaRendererComponentSpec(
		node.componentId,
		ctx.componentSpecs,
	);
	if (componentSpec) return createComponentRef(node, componentSpec, ctx);

	const children = mapChildren(node.children ?? [], ctx);
	if (children.length > 0) {
		return {
			kind: "group",
			id: node.id,
			layout: {
				mode: "VERTICAL",
				primaryAxisSizingMode: "AUTO",
				counterAxisSizingMode: "FIXED",
				width: "FILL",
				itemSpacing: "{spacing.4}",
			},
			children,
		};
	}

	return createMissingComponent(node);
}

function createFlowHero(
	node: PageFigmaNodeSpec,
	ctx: AssemblyContext,
): ComponentSpecRefChild {
	const data = getBoundData(node, ctx.data);
	const hero = isRecord(data) ? data : {};
	ctx.requiredComponentIds.add("flow-hero");

	return {
		kind: "ref",
		id: node.id,
		component: "ogn/flow-hero",
		props: compactProps({
			title: Array.isArray(hero.titleLines)
				? hero.titleLines.filter((line) => typeof line === "string").join("\n")
				: stringProp(hero.title),
			description: stringProp(hero.description),
		}),
		layoutAlign: "STRETCH",
	};
}

function createFlowSummaryCard(
	node: PageFigmaNodeSpec,
	ctx: AssemblyContext,
): ComponentSpecGroupChild {
	const data = getBoundData(node, ctx.data);
	const summary = isRecord(data) ? data : {};
	const items = Array.isArray(summary.items)
		? summary.items.filter(isRecord)
		: [];
	ctx.requiredComponentIds.add("flow-summary-card");
	ctx.requiredComponentIds.add("info-list-row");

	return {
		kind: "group",
		id: node.id,
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			paddingTop: "{spacing.16}",
			paddingBottom: "{spacing.16}",
			paddingLeft: "{spacing.16}",
			paddingRight: "{spacing.16}",
			itemSpacing: "{spacing.16}",
		},
		visual: {
			fill: "{color.semantic.background.elevated.normal}",
			stroke: {
				color: "{color.semantic.line.solid.alternative}",
				weight: 1,
			},
			cornerRadius: "{spacing.12}",
		},
		children: [
			createTextChild(
				"title",
				stringProp(summary.title) ?? "",
				"{typography.headline1.medium}",
				{ color: "{color.semantic.label.normal}" },
			),
			{
				kind: "group",
				id: "items",
				layout: {
					mode: "VERTICAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					width: "FILL",
				},
				children: items.flatMap((item, index) => [
					createInfoListRow(item, index),
					...(index < items.length - 1 ? [createDivider(`summary-divider-${index}`)] : []),
				]),
			},
		],
	};
}

function createInfoListRow(
	item: Record<string, unknown>,
	index: number,
): ComponentSpecRefChild {
	return {
		kind: "ref",
		id: `summary-row-${stringProp(item.id) ?? index}`,
		component: "mol/info-list-row",
		props: compactProps({
			title: stringProp(item.label) ?? stringProp(item.title),
			value: stringProp(item.value) ?? stringProp(item.trailingLabel),
		}),
		layoutAlign: "STRETCH",
	};
}

function createFlowNotice(
	node: PageFigmaNodeSpec,
	ctx: AssemblyContext,
): ComponentSpecRefChild {
	const data = getBoundData(node, ctx.data);
	const notice = isRecord(data) ? data : {};
	ctx.requiredComponentIds.add("flow-notice");

	return {
		kind: "ref",
		id: node.id,
		component: "ogn/flow-notice",
		props: compactProps({
			badge: stringProp(notice.badge),
			text: stringProp(notice.text),
		}),
		layoutAlign: "STRETCH",
	};
}

function createFlowResultActions(
	node: PageFigmaNodeSpec,
	ctx: AssemblyContext,
): ComponentSpecRefChild {
	const data = getBoundData(node, ctx.data);
	const actions = isRecord(data) ? data : {};
	const primary = isRecord(actions.primary) ? actions.primary : null;
	const secondary = isRecord(actions.secondary) ? actions.secondary : null;
	ctx.requiredComponentIds.add("flow-result-actions");

	return {
		kind: "ref",
		id: node.id,
		component: "ogn/flow-result-actions",
		props: compactProps({
			primaryLabel:
				stringProp(primary?.label) ??
				stringProp(actions.primaryLabel) ??
				stringProp(actions.primaryAction),
			secondaryLabel:
				stringProp(secondary?.label) ?? stringProp(actions.secondaryLabel),
		}),
		layoutAlign: "STRETCH",
	};
}

function createTermsAgreementGroup(
	node: PageFigmaNodeSpec,
	ctx: AssemblyContext,
): ComponentSpecGroupChild {
	const data = getBoundData(node, ctx.data);
	const terms = isRecord(data) ? data : {};
	const items = Array.isArray(terms.items) ? terms.items.filter(isRecord) : [];
	ctx.requiredComponentIds.add("terms-agreement-row");

	return {
		kind: "group",
		id: node.id,
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			paddingTop: "{spacing.24}",
			paddingBottom: "{spacing.24}",
			paddingLeft: "{spacing.16}",
			paddingRight: "{spacing.16}",
			itemSpacing: "{spacing.8}",
		},
		visual: {
			fill: "{color.semantic.background.elevated.normal}",
			stroke: { color: "{color.semantic.line.normal.normal}", weight: 1 },
			cornerRadius: "{spacing.12}",
		},
		children: [
			createTextChild(
				"title",
				stringProp(terms.title) ?? "약관 동의",
				"{typography.heading1.medium}",
				{ color: "{color.semantic.label.normal}" },
			),
			createTermsAgreementRow("all", {
				title: stringProp(terms.allLabel) ?? "전체 동의",
				caption: stringProp(terms.allCaption) ?? "",
				tone: "all",
			}),
			createDivider("divider-all"),
			...items.flatMap((item, index) => [
				createTermsAgreementRow(stringProp(item.id) ?? `item-${index}`, {
					title: stringProp(item.title) ?? "",
					caption: `${item.required === true ? "필수" : "선택"}${
						stringProp(item.caption) ? ` · ${stringProp(item.caption)}` : ""
					}`,
					tone: item.required === true ? "required" : "optional",
				}),
				...(index < items.length - 1 ? [createDivider(`divider-${index}`)] : []),
			]),
		],
	};
}

function createTermsAgreementRow(
	id: string,
	props: {
		title: string;
		caption: string;
		tone: "required" | "optional" | "all";
	},
): ComponentSpecRefChild {
	return {
		kind: "ref",
		id: `terms-row-${id}`,
		component: "mol/terms-agreement-row",
		variant: { tone: props.tone },
		props: {
			title: props.title,
			caption: props.caption,
		},
		layoutAlign: "STRETCH",
	};
}

function createDivider(id: string): ComponentSpecGroupChild {
	return {
		kind: "group",
		id,
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "FIXED",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			height: "1px",
		},
		visual: {
			fill: "{color.semantic.line.solid.alternative}",
		},
	};
}

function shouldSkipNode(node: PageFigmaNodeSpec, data: Record<string, unknown>) {
	const visibleWhen = node.props?.visibleWhen;
	if (visibleWhen === "user.isMinor") return getDataByPath(data, "user.isMinor") !== true;
	return false;
}

function createComponentRef(
	node: PageFigmaNodeSpec,
	componentSpec: ComponentSpecDraft,
	ctx: AssemblyContext,
): ComponentSpecRefChild {
	ctx.requiredComponentIds.add(node.componentId);
	return {
		kind: "ref",
		id: node.id,
		component: componentSpec.name,
		props: inferInstanceProps(node, ctx.data),
		layoutAlign: componentSpec.base.layout?.width === "FILL" ? "STRETCH" : undefined,
	};
}

function createMissingComponent(node: PageFigmaNodeSpec): ComponentSpecGroupChild {
	return {
		kind: "group",
		id: node.id,
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			paddingTop: "{spacing.8}",
			paddingBottom: "{spacing.8}",
			paddingLeft: "{spacing.8}",
			paddingRight: "{spacing.8}",
		},
		visual: {
			fill: "{color.semantic.background.elevated.alternative}",
			stroke: { color: "{color.semantic.status.negative}", weight: 1 },
			cornerRadius: "{spacing.8}",
		},
		children: [
			createTextChild(
				"missing-label",
				`${node.type} · missing component`,
				"{typography.body1.medium}",
				{ color: "{color.semantic.status.negative}" },
			),
		],
	};
}

function createTextChild(
	id: string,
	content: string,
	textStyle: `{${string}}`,
	options: { color?: `{${string}}` } = {},
): ComponentSpecTextChild {
	return {
		kind: "text",
		id,
		content,
		textStyle,
		color: options.color ?? "{color.semantic.label.alternative}",
		autoResize: "HEIGHT",
	};
}

function inferInstanceProps(
	node: PageFigmaNodeSpec,
	data: Record<string, unknown>,
) {
	const props = node.props ?? {};
	const result: Record<string, string | boolean | null | undefined> = {};
	const boundData = getBoundData(node, data);

	if (node.type === "NcTopBar") {
		result.title = stringProp(props.title);
		result.leadingIcon = props.leadingIcon === "back" ? "‹" : "×";
		return compactProps(result);
	}

	if (node.type === "NcHero" && isRecord(boundData)) {
		result.title = Array.isArray(boundData.titleLines)
			? boundData.titleLines.filter((line) => typeof line === "string").join("\n")
			: stringProp(boundData.title);
		result.description = stringProp(boundData.description);
		return compactProps(result);
	}

	if (node.type === "NcContinueBar" && isRecord(boundData)) {
		result.eyebrow = "필수 약관 3개 동의가 남았어요";
		result.primaryAction = stringProp(boundData.primaryAction);
		return compactProps(result);
	}

	for (const key of ["text", "value", "label", "helperText", "placeholder", "badgeText"]) {
		const value = props[key];
		if (typeof value === "string" || typeof value === "boolean" || value === null) {
			result[key] = value;
		}
	}
	return compactProps(result);
}

function getBoundData(node: PageFigmaNodeSpec, data: Record<string, unknown>) {
	const bind = node.props?.bind;
	return typeof bind === "string" ? getDataByPath(data, bind) : null;
}

function compactProps(props: Record<string, string | boolean | null | undefined>) {
	const compacted: Record<string, string | boolean | null> = {};
	for (const [key, value] of Object.entries(props)) {
		if (value !== undefined) compacted[key] = value;
	}
	return Object.keys(compacted).length > 0 ? compacted : undefined;
}

function getDataByPath(data: Record<string, unknown>, path: string) {
	return path.split(".").reduce<unknown>((current, key) => {
		if (!isRecord(current)) return undefined;
		return current[key];
	}, data);
}

function stringProp(value: unknown) {
	return typeof value === "string" ? value : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
