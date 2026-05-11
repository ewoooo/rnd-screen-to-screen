"use client";

import { useEffect } from "react";

import type {
	ScreenExportBounds,
	ScreenExportNode,
	ScreenExportStyle,
	ScreenExportTree,
} from "./types";

const REQUEST_TYPE = "pxds:screen-export:request";
const RESPONSE_TYPE = "pxds:screen-export:response";

type ScreenExportRequestMessage = {
	type: typeof REQUEST_TYPE;
	requestId?: string;
};

export function ScreenExportBridge() {
	useEffect(() => {
		const handleMessage = (event: MessageEvent<ScreenExportRequestMessage>) => {
			if (event.data?.type !== REQUEST_TYPE) return;
			const tree = collectScreenExportTree();
			event.source?.postMessage(
				{
					type: RESPONSE_TYPE,
					requestId: event.data.requestId,
					tree,
				},
				{ targetOrigin: event.origin },
			);
		};

		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, []);

	return null;
}

function collectScreenExportTree(): ScreenExportTree {
	const rootElement =
		document.querySelector<HTMLElement>("[data-pxds-screen-type='AppScreenRoot']") ??
		document.querySelector<HTMLElement>("[data-pxds-screen-node='true']");
	const rootRect = rootElement?.getBoundingClientRect();

	return {
		$schema: "pxds-screen-export-tree-v1",
		route: window.location.pathname,
		capturedAt: new Date().toISOString(),
		viewport: {
			width: window.innerWidth,
			height: window.innerHeight,
		},
		root: rootElement ? readExportNode(rootElement, rootRect ?? undefined) : null,
	};
}

function readExportNode(
	element: HTMLElement,
	rootRect: DOMRect | undefined,
	parentRect?: DOMRect,
): ScreenExportNode {
	const rect = element.getBoundingClientRect();
	const children = collectChildExportNodes(element, rootRect, rect);
	const text = children.length === 0 ? normalizeText(element.innerText) : undefined;

	return {
		id:
			element.dataset.pxdsScreenId ||
			`${element.dataset.pxdsScreenType ?? "node"}-${Math.random().toString(36).slice(2)}`,
		type: element.dataset.pxdsScreenType ?? "Unknown",
		slot: element.dataset.pxdsScreenSlot,
		props: parseProps(element.dataset.pxdsScreenProps),
		bounds: rootRect ? toBounds(rect, rootRect) : toBounds(rect),
		localBounds: parentRect ? toBounds(rect, parentRect) : toBounds(rect),
		style: readStyle(element),
		text,
		children,
	};
}

function collectChildExportNodes(
	element: HTMLElement,
	rootRect: DOMRect | undefined,
	parentRect: DOMRect,
) {
	const nodes: ScreenExportNode[] = [];
	for (const child of Array.from(element.children)) {
		if (!(child instanceof HTMLElement)) continue;
		if (child.dataset.pxdsScreenNode === "true") {
			nodes.push(readExportNode(child, rootRect, parentRect));
			continue;
		}
		nodes.push(...collectChildExportNodes(child, rootRect, parentRect));
	}
	return nodes;
}

function toBounds(rect: DOMRect, origin?: DOMRect): ScreenExportBounds {
	return {
		x: round(rect.left - (origin?.left ?? 0)),
		y: round(rect.top - (origin?.top ?? 0)),
		width: round(rect.width),
		height: round(rect.height),
	};
}

function readStyle(element: HTMLElement): ScreenExportStyle {
	const style = window.getComputedStyle(element);
	return {
		display: style.display,
		flexDirection: style.flexDirection,
		gap: style.gap,
		backgroundColor: style.backgroundColor,
		color: style.color,
		borderRadius: style.borderRadius,
	};
}

function parseProps(value: string | undefined) {
	if (!value) return undefined;
	try {
		const parsed = JSON.parse(value);
		return parsed && typeof parsed === "object" && !Array.isArray(parsed)
			? (parsed as Record<string, unknown>)
			: undefined;
	} catch {
		return undefined;
	}
}

function normalizeText(value: string | undefined) {
	const text = value?.replace(/\s+/g, " ").trim();
	return text || undefined;
}

function round(value: number) {
	return Math.round(value * 100) / 100;
}
