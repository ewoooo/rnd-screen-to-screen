import type {
	CollectFigmaBridgeRenderTreeOptions,
	FigmaBridgeBounds,
	FigmaBridgeNode,
	FigmaBridgeNodeStyle,
	FigmaBridgeRenderMode,
	FigmaBridgeRenderTree,
} from "./types";

const RENDER_MODES = new Set([
	"component",
	"layout",
	"slot",
	"primitive",
	"ignore",
]);

export function collectFigmaBridgeRenderTree(
	rootElement: Element,
	options: CollectFigmaBridgeRenderTreeOptions,
): FigmaBridgeRenderTree {
	const rootRect = rootElement.getBoundingClientRect();
	const rootNode: FigmaBridgeNode = {
		id: options.rootId ?? options.screenId,
		render: "layout",
		componentId: "app-screen",
		bounds: toBounds(rootRect),
		localBounds: {
			x: 0,
			y: 0,
			width: round(rootRect.width),
			height: round(rootRect.height),
		},
		style: readStyle(rootElement),
		children: [],
	};

	for (const child of Array.from(rootElement.children)) {
		for (const collected of collectElement(child, rootRect, rootNode.id)) {
			rootNode.children?.push(collected);
		}
	}

	const stats = countNodes(rootNode);
	return {
		$schema: "pxds-figma-bridge-render-tree-v1",
		source: {
			url: window.location.href,
			route: options.route,
			capturedAt: new Date().toISOString(),
			viewport: {
				width: window.innerWidth,
				height: window.innerHeight,
			},
		},
		screen: {
			id: options.screenId,
			name: options.screenName,
			route: options.route,
		},
		root: rootNode,
		stats,
	};
}

function collectElement(
	element: Element,
	parentRect: DOMRect,
	parentId: string,
): FigmaBridgeNode[] {
	if (!(element instanceof HTMLElement)) return [];
	if (isHidden(element)) return [];

	const renderValue = element.dataset.figmaRender;
	const render = normalizeRenderMode(renderValue);
	if (renderValue === "ignore") {
		if (element.dataset.figmaIgnoreChildren === "true") return [];
		return collectChildren(element, parentRect, parentId);
	}

	if (!render) {
		return collectChildren(element, parentRect, parentId);
	}

	const rect = element.getBoundingClientRect();
	if (rect.width <= 0 || rect.height <= 0) return [];

	const node: FigmaBridgeNode = {
		id: stableNodeId(element, parentId),
		render,
		componentId: element.dataset.figmaComponentId,
		slot: readSlotName(element),
		properties: readProperties(element),
		bounds: toBounds(rect),
		localBounds: toLocalBounds(rect, parentRect),
		style: readStyle(element),
		children: [],
	};

	const children = collectChildren(element, rect, node.id);
	if (children.length > 0) {
		node.children = children;
	} else {
		delete node.children;
		const text = readNodeText(element);
		if (text) node.text = text;
	}

	return [node];
}

function collectChildren(
	element: HTMLElement,
	parentRect: DOMRect,
	parentId: string,
): FigmaBridgeNode[] {
	const children: FigmaBridgeNode[] = [];
	for (const child of Array.from(element.children)) {
		children.push(...collectElement(child, parentRect, parentId));
	}
	return children;
}

function normalizeRenderMode(value: string | undefined): FigmaBridgeRenderMode | null {
	if (!value || !RENDER_MODES.has(value) || value === "ignore") return null;
	return value as FigmaBridgeRenderMode;
}

function stableNodeId(element: HTMLElement, parentId: string) {
	const explicit =
		element.dataset.figmaNodeId ||
		element.id ||
		element.dataset.figmaComponentId ||
		element.dataset.figmaLayoutSlot ||
		element.dataset.figmaPropertyName ||
		element.tagName.toLowerCase();
	const index = siblingIndex(element);
	return `${parentId}/${slugify(explicit)}-${index}`;
}

function siblingIndex(element: HTMLElement) {
	if (!element.parentElement) return 0;
	return Array.from(element.parentElement.children).filter(
		(child) => child instanceof HTMLElement && child.dataset.figmaRender,
	).indexOf(element);
}

function readSlotName(element: HTMLElement) {
	return (
		element.dataset.figmaSlot ||
		element.dataset.figmaLayoutSlot ||
		element.dataset.figmaPropertyName
	);
}

function readProperties(element: HTMLElement) {
	const props: Record<string, string | number | boolean | null> = {};
	for (const [key, value] of Object.entries(element.dataset)) {
		if (!key.startsWith("figmaProperty") || value === undefined) continue;
		const propName = kebabCase(key.replace(/^figmaProperty/, ""));
		props[propName] = parseDatasetValue(value);
	}
	return Object.keys(props).length > 0 ? props : undefined;
}

function parseDatasetValue(value: string): string | number | boolean | null {
	if (value === "true") return true;
	if (value === "false") return false;
	if (value === "null") return null;
	if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
	return value;
}

function readStyle(element: Element): FigmaBridgeNodeStyle {
	const style = window.getComputedStyle(element);
	return {
		display: style.display,
		flexDirection: style.flexDirection,
		gap: style.gap,
		paddingTop: style.paddingTop,
		paddingRight: style.paddingRight,
		paddingBottom: style.paddingBottom,
		paddingLeft: style.paddingLeft,
		backgroundColor: style.backgroundColor,
		color: style.color,
		borderRadius: style.borderRadius,
		fontSize: style.fontSize,
		fontWeight: style.fontWeight,
		lineHeight: style.lineHeight,
	};
}

function readNodeText(element: HTMLElement) {
	const explicit = element.dataset.figmaText;
	if (explicit) return explicit.trim();
	const formValues = Array.from(
		element.querySelectorAll("input, textarea, select"),
	).flatMap((control) => {
		if (control instanceof HTMLInputElement) return control.value ? [control.value] : [];
		if (control instanceof HTMLTextAreaElement) return control.value ? [control.value] : [];
		if (control instanceof HTMLSelectElement) return control.value ? [control.value] : [];
		return [];
	});
	const text = [element.innerText, ...formValues]
		.join("\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
	return text || undefined;
}

function isHidden(element: HTMLElement) {
	if (element.dataset.figmaIncludeHidden === "true") return false;
	if (element.getAttribute("aria-hidden") === "true") return true;
	const style = window.getComputedStyle(element);
	return style.display === "none" || style.visibility === "hidden";
}

function toBounds(rect: DOMRect): FigmaBridgeBounds {
	return {
		x: round(rect.x),
		y: round(rect.y),
		width: round(rect.width),
		height: round(rect.height),
	};
}

function toLocalBounds(rect: DOMRect, parentRect: DOMRect): FigmaBridgeBounds {
	return {
		x: round(rect.x - parentRect.x),
		y: round(rect.y - parentRect.y),
		width: round(rect.width),
		height: round(rect.height),
	};
}

function countNodes(root: FigmaBridgeNode) {
	const stats = {
		nodeCount: 0,
		componentCount: 0,
		layoutCount: 0,
		slotCount: 0,
		primitiveCount: 0,
	};
	const visit = (node: FigmaBridgeNode) => {
		stats.nodeCount += 1;
		if (node.render === "component") stats.componentCount += 1;
		if (node.render === "layout") stats.layoutCount += 1;
		if (node.render === "slot") stats.slotCount += 1;
		if (node.render === "primitive") stats.primitiveCount += 1;
		for (const child of node.children ?? []) visit(child);
	};
	visit(root);
	return stats;
}

function round(value: number) {
	return Math.round(value * 100) / 100;
}

function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9가-힣]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function kebabCase(value: string) {
	return value
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/^-/g, "")
		.toLowerCase();
}
