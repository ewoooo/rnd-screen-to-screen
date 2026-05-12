import type {
	ComponentSpecChild,
	ComponentSpecDraft,
	ComponentSpecGroupChild,
	ComponentSpecLayout,
	ComponentSpecValue,
	ComponentSpecRefChild,
	ComponentSpecTextChild,
	ScreenFigmaExportSpec,
	ScreenFigmaNodeSpec,
} from "./types";

export type FigmaRendererComponentRegistryEntry = {
	componentId: string;
	spec?: ComponentSpecDraft;
	exportMode?: "instance" | "render-tree";
	render?: FigmaRendererRenderContract;
};

export type FigmaRendererComponentRegistry =
	readonly FigmaRendererComponentRegistryEntry[];

export type FigmaRendererRenderContract = {
	componentId: string;
	mode: "instance" | "render-tree";
	layout?: FigmaRendererRenderLayoutContract;
	children?: readonly FigmaRendererRenderChildContract[];
};

export type FigmaRendererRenderChildContract = {
	id: string;
	component: string;
	slot?: "header" | "content" | "bottom" | "system";
	variant?: string;
	props?: Record<string, unknown>;
	layout?: FigmaRendererRenderLayoutContract;
};

export type FigmaRendererRenderLayoutContract = {
	slot?: "header" | "content" | "bottom" | "system";
	section?: {
		inset?: "default" | "bleed" | "none";
		rail?: "inset" | "measure" | "full";
		measure?: "body" | "form" | "wide";
	};
	stack?: {
		direction: "vertical" | "horizontal" | "none";
		gap?: string;
		align?: "start" | "center" | "end" | "stretch";
	};
	sizing?: {
		width?: "fill" | "hug" | "fixed";
		height?: "fill" | "hug" | "fixed";
	};
};

export type ScreenComponentAssembly = {
	screenSpec: ComponentSpecDraft;
	requiredComponentSpecs: readonly ComponentSpecDraft[];
	missingComponentIds: readonly string[];
};

export type ScreenComponentAssemblyOptions = {
	componentSpecs?: FigmaRendererComponentRegistry;
};

type AssemblyContext = {
	data: Record<string, unknown>;
	componentSpecs: FigmaRendererComponentRegistry;
	requiredComponentIds: Set<string>;
};

export function createScreenComponentAssembly(
	spec: ScreenFigmaExportSpec,
	options: ScreenComponentAssemblyOptions = {},
): ScreenComponentAssembly {
	const ctx: AssemblyContext = {
		data: spec.data,
		componentSpecs: options.componentSpecs ?? [],
		requiredComponentIds: new Set<string>(),
	};
	const screenSpec: ComponentSpecDraft = {
		$schema: "component-spec-v1",
		name: `screen/${spec.id}`,
		category: "screen",
		description:
			"PXDS screen assembled recursively from registered Figma component instances.",
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
	const requiredComponentIds = collectTransitiveRequiredComponentIds(ctx);
	const requiredComponentSpecs = ctx.componentSpecs
		.filter((entry) => requiredComponentIds.has(entry.componentId))
		.flatMap((entry) => (entry.spec ? [entry.spec] : []));
	const missingComponentIds = Array.from(requiredComponentIds).filter(
		(componentId) => !registeredComponentIds.has(componentId),
	);

	return { screenSpec, requiredComponentSpecs, missingComponentIds };
}

function collectTransitiveRequiredComponentIds(ctx: AssemblyContext) {
	const specById = new Map(
		ctx.componentSpecs.flatMap((entry) =>
			entry.spec ? [[entry.componentId, entry.spec] as const] : [],
		),
	);
	const idBySpecName = new Map(
		ctx.componentSpecs.flatMap((entry) =>
			entry.spec ? [[entry.spec.name, entry.componentId] as const] : [],
		),
	);
	const ordered = new Set<string>();
	const visiting = new Set<string>();

	const visit = (componentId: string) => {
		if (ordered.has(componentId) || visiting.has(componentId)) return;
		visiting.add(componentId);

		const spec = specById.get(componentId);
		if (spec) {
			for (const refName of collectReferencedSpecNames(spec.base.children ?? [])) {
				const refComponentId = idBySpecName.get(refName);
				if (refComponentId) visit(refComponentId);
			}
		}

		visiting.delete(componentId);
		ordered.add(componentId);
	};

	for (const componentId of ctx.requiredComponentIds) visit(componentId);
	return ordered;
}

function collectReferencedSpecNames(children: readonly ComponentSpecChild[]) {
	const refs: string[] = [];
	const visit = (child: ComponentSpecChild) => {
		if (child.kind === "ref") {
			refs.push(child.component);
			return;
		}
		if (child.kind === "group") {
			for (const nested of child.children ?? []) visit(nested);
		}
	};

	for (const child of children) visit(child);
	return refs;
}

function createScreenChildren(
	root: ScreenFigmaNodeSpec,
	ctx: AssemblyContext,
) {
	if (root.type === "AppScreen") return createAppScreenChildren(root, ctx);

	const child = mapNodeToAssemblyChild(root, ctx);
	return child ? [child] : [];
}

function createAppScreenChildren(
	root: ScreenFigmaNodeSpec,
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
	nodes: readonly ScreenFigmaNodeSpec[],
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
			paddingBottom: "{spacing.16}",
		},
		layoutGrow: 1,
		scrollBehavior: "SCROLLS",
		children: mapContentChildren(nodes, ctx),
	};
}

function mapContentChildren(
	nodes: readonly ScreenFigmaNodeSpec[],
	ctx: AssemblyContext,
) {
	return nodes
		.map((node) => mapContentNode(node, ctx))
		.filter((child): child is ComponentSpecChild => Boolean(child));
}

function mapContentNode(
	node: ScreenFigmaNodeSpec,
	ctx: AssemblyContext,
): ComponentSpecChild | null {
	const child = mapNodeToAssemblyChild(node, ctx);
	if (!child) return null;

	const section = node.section ?? {};
	if (section.inset === "bleed") {
		return createBleedContentSection(node, child);
	}
	return createInsetContentSection(node, child);
}

function createInsetContentSection(
	node: ScreenFigmaNodeSpec,
	child: ComponentSpecChild,
): ComponentSpecGroupChild {
	return {
		kind: "group",
		id: `${node.id}-section`,
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
			paddingLeft: "{spacing.12}",
			paddingRight: "{spacing.12}",
		},
		children: [child],
	};
}

function createBleedContentSection(
	node: ScreenFigmaNodeSpec,
	child: ComponentSpecChild,
): ComponentSpecGroupChild {
	const section = node.section ?? {};
	const shouldRail =
		section.rail === "inset" ||
		section.rail === "measure" ||
		section.rail === undefined;
	return {
		kind: "group",
		id: `${node.id}-section`,
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
		},
		children: shouldRail
			? [
					{
						kind: "group",
						id: `${node.id}-rail`,
						layout: {
							mode: "VERTICAL",
							primaryAxisSizingMode: "AUTO",
							counterAxisSizingMode: "FIXED",
							width: "FILL",
							paddingLeft: "{spacing.12}",
							paddingRight: "{spacing.12}",
						},
						children: [child],
					},
				]
			: [child],
	};
}

function mapChildren(
	nodes: readonly ScreenFigmaNodeSpec[],
	ctx: AssemblyContext,
) {
	return nodes
		.map((child) => mapNodeToAssemblyChild(child, ctx))
		.filter((child): child is ComponentSpecChild => Boolean(child));
}

function mapNodeToAssemblyChild(
	node: ScreenFigmaNodeSpec,
	ctx: AssemblyContext,
): ComponentSpecChild | null {
	if (shouldSkipNode(node, ctx.data)) return null;
	if (node.type === "NcHero") return createFlowHero(node, ctx);
	if (node.type === "NcSummaryCard") return createFlowSummaryCard(node, ctx);
	if (node.type === "NcNotice") return createFlowNotice(node, ctx);
	if (node.type === "NcResultActions") return createFlowResultActions(node, ctx);
	if (node.type === "TermsAgreementGroup") return createTermsAgreementGroup(node, ctx);

	const componentEntry = getFigmaRendererComponentEntry(
		node.componentId,
		ctx.componentSpecs,
	);
	if (componentEntry?.exportMode === "render-tree" && componentEntry.render) {
		return createRenderTreeGroup(node, componentEntry.render, ctx);
	}
	if (componentEntry?.spec && isLayoutPrimitiveNode(node)) {
		return createLayoutPrimitiveGroup(node, componentEntry.spec, ctx);
	}
	if (componentEntry?.spec) return createComponentRef(node, componentEntry.spec, ctx);
	if (node.registered === false) {
		if (node.props?.renderSource === "render-tree") return createMissingComponent(node);
		ctx.requiredComponentIds.add(node.componentId);
		return null;
	}

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

function createRenderTreeGroup(
	node: ScreenFigmaNodeSpec,
	render: FigmaRendererRenderContract,
	ctx: AssemblyContext,
): ComponentSpecGroupChild | null {
	const children = (render.children ?? [])
		.map((child) => mapNodeToAssemblyChild(renderChildToScreenNode(child, ctx), ctx))
		.filter((child): child is ComponentSpecChild => Boolean(child));

	if (children.length === 0) return null;

	return {
		kind: "group",
		id: node.id,
		layout: renderLayoutToComponentSpecLayout(render.layout),
		children,
	};
}

function renderChildToScreenNode(
	child: FigmaRendererRenderChildContract,
	ctx: AssemblyContext,
): ScreenFigmaNodeSpec {
	const componentEntry = getFigmaRendererComponentEntry(
		child.component,
		ctx.componentSpecs,
	);
	return {
		id: child.id,
		type: child.component,
		componentId: child.component,
		registered: Boolean(componentEntry),
		slot: toScreenFigmaSlot(child.slot) ?? toScreenFigmaSlot(child.layout?.slot),
		section: renderSectionToScreenSection(child.layout),
		props: {
			...(child.props ?? {}),
			...(child.variant ? { variant: child.variant } : {}),
			renderSource: "render-tree",
		},
	};
}

function renderLayoutToComponentSpecLayout(
	layout: FigmaRendererRenderLayoutContract | undefined,
): ComponentSpecLayout {
	const direction = layout?.stack?.direction;
	return {
		mode:
			direction === "vertical"
				? "VERTICAL"
				: direction === "horizontal"
					? "HORIZONTAL"
					: "VERTICAL",
		primaryAxisSizingMode: toComponentSizingMode(layout?.sizing?.height),
		counterAxisSizingMode: toComponentSizingMode(layout?.sizing?.width),
		width: toComponentDimension(layout?.sizing?.width),
		height: toComponentDimension(layout?.sizing?.height),
		itemSpacing: layout?.stack?.gap,
		counterAxisAlignItems: toComponentAlignItems(layout?.stack?.align),
	};
}

function toComponentSizingMode(
	sizing: "fill" | "hug" | "fixed" | undefined,
): ComponentSpecLayout["primaryAxisSizingMode"] {
	if (sizing === "fill") return "FIXED";
	if (sizing === "hug") return "AUTO";
	return "AUTO";
}

function toComponentDimension(
	sizing: "fill" | "hug" | "fixed" | undefined,
): ComponentSpecValue | undefined {
	if (sizing === "fill") return "FILL";
	if (sizing === "hug") return "HUG";
	return undefined;
}

function toComponentAlignItems(
	align: "start" | "center" | "end" | "stretch" | undefined,
): ComponentSpecLayout["counterAxisAlignItems"] {
	if (align === "center") return "CENTER";
	if (align === "end") return "MAX";
	if (align === "start") return "MIN";
	return undefined;
}

function toScreenFigmaSlot(
	slot: FigmaRendererRenderLayoutContract["slot"] | undefined,
): ScreenFigmaNodeSpec["slot"] | undefined {
	if (slot === "header") return "top";
	if (
		slot === "content" ||
		slot === "bottom"
	) {
		return slot;
	}
	return undefined;
}

function renderSectionToScreenSection(
	layout: FigmaRendererRenderLayoutContract | undefined,
): ScreenFigmaNodeSpec["section"] | undefined {
	if (!layout?.section) return undefined;
	return {
		inset: layout.section.inset === "bleed" ? "bleed" : "inherit",
		rail: layout.section.rail,
		measure:
			layout.section.measure === "wide"
				? "title"
				: layout.section.measure === "form"
					? "body"
					: layout.section.measure,
	};
}

function isLayoutPrimitiveNode(node: ScreenFigmaNodeSpec) {
	return (
		node.componentId === "flex" ||
		node.componentId === "h-stack" ||
		node.componentId === "v-stack"
	);
}

function createLayoutPrimitiveGroup(
	node: ScreenFigmaNodeSpec,
	componentSpec: ComponentSpecDraft,
	ctx: AssemblyContext,
): ComponentSpecGroupChild {
	return {
		kind: "group",
		id: node.id,
		layout: {
			...componentSpec.base.layout,
			...createLayoutPrimitiveOverrides(node),
		},
		visual: componentSpec.base.visual,
		children: mapChildren(node.children ?? [], ctx),
	};
}

function createLayoutPrimitiveOverrides(
	node: ScreenFigmaNodeSpec,
): ComponentSpecLayout {
	const props = node.props ?? {};
	const layout: ComponentSpecLayout = {};
	const mode = getLayoutMode(node);
	const gap = toSpacingValue(props.gap);
	const pt = toSpacingValue(props.pt ?? props.py ?? props.p);
	const pr = toSpacingValue(props.pr ?? props.px ?? props.p);
	const pb = toSpacingValue(props.pb ?? props.py ?? props.p);
	const pl = toSpacingValue(props.pl ?? props.px ?? props.p);
	const width = toFigmaDimension(props.width);
	const height = toFigmaDimension(props.height);

	if (mode) layout.mode = mode;
	if (gap) layout.itemSpacing = gap;
	if (pt) layout.paddingTop = pt;
	if (pr) layout.paddingRight = pr;
	if (pb) layout.paddingBottom = pb;
	if (pl) layout.paddingLeft = pl;
	if (width) layout.width = width;
	if (height) layout.height = height;

	const align = toFigmaAlignment(props.align);
	const justify = toFigmaAlignment(props.justify);
	if (align) layout.counterAxisAlignItems = align;
	if (justify) layout.primaryAxisAlignItems = justify;

	return layout;
}

function getLayoutMode(node: ScreenFigmaNodeSpec): ComponentSpecLayout["mode"] {
	if (node.componentId === "v-stack") return "VERTICAL";
	if (node.componentId === "h-stack") return "HORIZONTAL";
	if (node.props?.direction === "column") return "VERTICAL";
	if (node.props?.direction === "row") return "HORIZONTAL";
	return "HORIZONTAL";
}

function toSpacingValue(value: unknown): ComponentSpecValue | undefined {
	if (typeof value !== "string") return undefined;
	const spacingByIntent: Record<string, ComponentSpecValue> = {
		row: "{spacing.4}",
		inline: "{spacing.8}",
		stack: "{spacing.12}",
		group: "{spacing.16}",
		inset: "{spacing.20}",
		block: "{spacing.24}",
		section: "{spacing.32}",
	};
	return spacingByIntent[value] ?? value;
}

function toFigmaDimension(value: unknown): ComponentSpecValue | undefined {
	if (typeof value === "number") return `${value}px`;
	if (typeof value !== "string") return undefined;
	if (value === "100%" || value === "fill") return "FILL";
	if (value === "auto" || value === "hug") return "HUG";
	return value;
}

function toFigmaAlignment(
	value: unknown,
): ComponentSpecLayout["primaryAxisAlignItems"] | undefined {
	if (value === "center") return "CENTER";
	if (value === "flex-end" || value === "end") return "MAX";
	if (value === "space-between") return "SPACE_BETWEEN";
	if (value === "flex-start" || value === "start") return "MIN";
	return undefined;
}

function getFigmaRendererComponentEntry(
	componentId: string | null | undefined,
	registry: FigmaRendererComponentRegistry,
): FigmaRendererComponentRegistryEntry | null {
	if (!componentId) return null;
	return registry.find((entry) => entry.componentId === componentId) ?? null;
}

function createFlowHero(
	node: ScreenFigmaNodeSpec,
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
	node: ScreenFigmaNodeSpec,
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
	node: ScreenFigmaNodeSpec,
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
	node: ScreenFigmaNodeSpec,
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
	node: ScreenFigmaNodeSpec,
	ctx: AssemblyContext,
): ComponentSpecGroupChild {
	const data = getBoundData(node, ctx.data);
	const terms = isRecord(data) ? data : {};
	const items = Array.isArray(terms.items) ? terms.items.filter(isRecord) : [];

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
): ComponentSpecGroupChild {
	const captionColor =
		props.tone === "required"
			? "{color.semantic.status.negative}"
			: "{color.semantic.label.alternative}";
	return {
		kind: "group",
		id: `terms-row-${id}`,
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			counterAxisAlignItems: "CENTER",
			width: "FILL",
			minHeight: props.tone === "all" ? "60px" : "64px",
			itemSpacing: "{spacing.12}",
		},
		children: [
			{
				kind: "group",
				id: "checkbox",
				layout: {
					mode: "HORIZONTAL",
					primaryAxisSizingMode: "FIXED",
					counterAxisSizingMode: "FIXED",
					width: "20px",
					height: "20px",
				},
				visual: {
					fill: "{color.semantic.background.elevated.normal}",
					stroke: {
						color: "{color.semantic.line.normal.normal}",
						weight: 1.5,
					},
					cornerRadius: "{spacing.4}",
				},
			},
			{
				kind: "group",
				id: "copy",
				layout: {
					mode: "VERTICAL",
					primaryAxisSizingMode: "AUTO",
					counterAxisSizingMode: "FIXED",
					width: "FILL",
					itemSpacing: "{spacing.4}",
				},
				layoutGrow: 1,
				children: [
					createTextChild(
						"title",
						props.title,
						props.tone === "all"
							? "{typography.heading1.medium}"
							: "{typography.body1.medium}",
						{ color: "{color.semantic.label.normal}" },
					),
					...(props.caption
						? [
								createTextChild(
									"caption",
									props.caption,
									"{typography.body2.medium}",
									{ color: captionColor },
								),
							]
						: []),
				],
			},
		],
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

function shouldSkipNode(node: ScreenFigmaNodeSpec, data: Record<string, unknown>) {
	if (node.props?.visible === false) return true;
	const visibleWhen = node.props?.visibleWhen;
	if (visibleWhen === "user.isMinor") return getDataByPath(data, "user.isMinor") !== true;
	return false;
}

function createComponentRef(
	node: ScreenFigmaNodeSpec,
	componentSpec: ComponentSpecDraft,
	ctx: AssemblyContext,
): ComponentSpecRefChild {
	ctx.requiredComponentIds.add(node.componentId);
	return {
		kind: "ref",
		id: node.id,
		component: componentSpec.name,
		variant: inferInstanceVariant(node),
		props: inferInstanceProps(node, ctx.data),
		layoutAlign: componentSpec.base.layout?.width === "FILL" ? "STRETCH" : undefined,
	};
}

function inferInstanceVariant(
	node: ScreenFigmaNodeSpec,
): ComponentSpecRefChild["variant"] {
	if (node.componentId === "primary-cta-bar") {
		return {
			secondary: node.props?.hasSecondary === true ? "true" : "false",
		};
	}
	if (node.componentId === "progress-top-bar") {
		const progress = node.props?.progress;
		if (isRecord(progress) && typeof progress.percent === "number") {
			return {
				progress: progress.percent >= 100 ? "100" : "40",
			};
		}
	}
	return undefined;
}

function createMissingComponent(node: ScreenFigmaNodeSpec): ComponentSpecGroupChild {
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
	node: ScreenFigmaNodeSpec,
	data: Record<string, unknown>,
) {
	const props = node.props ?? {};
	const result: Record<string, string | boolean | null | undefined> = {};
	const boundData = getBoundData(node, data);

	if (node.componentId === "progress-top-bar") {
		const progress = props.progress;
		if (isRecord(progress)) {
			if (typeof progress.label === "string") result.progressLabel = progress.label;
			if (typeof progress.percent === "number") {
				result.progressFillWidth = `${Math.round(progress.percent * 3.27)}px`;
			}
		}
	}

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

	for (const key of [
		"text",
		"value",
		"label",
		"leading",
		"helperText",
		"placeholder",
		"badgeText",
		"primaryLabel",
		"secondaryLabel",
		"state",
		"title",
	]) {
		const value = props[key];
		if (typeof value === "string" || typeof value === "boolean" || value === null) {
			result[key] = value;
		}
	}
	return compactProps(result);
}

function getBoundData(node: ScreenFigmaNodeSpec, data: Record<string, unknown>) {
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
