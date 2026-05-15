"use client";

import {
	type CSSProperties,
	createContext,
	type ElementType,
	type ReactNode,
	useContext,
} from "react";
import type { FigmaLayoutBridgeAttributes } from "../../types/figma-bridge";

export type ContentLayoutMode = "legacy" | "screen";
export type ContentSectionInset = "inherit" | "bleed";
export type ContentRailKind = "full" | "inset" | "measure";
export type ContentRailMeasure = "title" | "body" | "caption";

type ContentLayoutContextValue = {
	inlineInset: string;
	sectionInset: ContentSectionInset;
};

type DataAttributes = FigmaLayoutBridgeAttributes & {
	[key: `data-${string}`]: string | undefined;
};

const ContentLayoutContext = createContext<ContentLayoutContextValue>({
	inlineInset: "0px",
	sectionInset: "inherit",
});

export function ContentLayoutProvider({
	inlineInset,
	children,
}: {
	inlineInset: string;
	children: ReactNode;
}) {
	return (
		<ContentLayoutContext.Provider
			value={{ inlineInset, sectionInset: "inherit" }}
		>
			{children}
		</ContentLayoutContext.Provider>
	);
}

function useContentInsetContext() {
	return useContext(ContentLayoutContext);
}

export function ContentSection({
	as = "section",
	inset = "inherit",
	children,
	style,
	"data-figma-render": dataFigmaRender = "layout",
	"data-figma-component-id": dataFigmaComponentId = "content-section",
	"data-figma-layout-kind": dataFigmaLayoutKind = "chrome",
	"data-figma-layout-layer": dataFigmaLayoutLayer = "section",
	"data-figma-layout-auto": dataFigmaLayoutAuto = "true",
	"data-figma-layout-direction": dataFigmaLayoutDirection = "vertical",
	"data-figma-layout-align": dataFigmaLayoutAlign = "stretch",
	"data-figma-layout-sizing": dataFigmaLayoutSizing = "fill",
	"data-figma-property-inset": dataFigmaInset,
	...props
}: {
	as?: ElementType;
	inset?: ContentSectionInset;
	children: ReactNode;
	style?: CSSProperties;
} & DataAttributes) {
	const { inlineInset } = useContentInsetContext();
	const bleedStyle =
		inset === "bleed"
			? {
					marginLeft: `calc(-1 * ${inlineInset})`,
					marginRight: `calc(-1 * ${inlineInset})`,
				}
			: null;

	return (
		<Element
			as={as}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-layout-kind={dataFigmaLayoutKind}
			data-figma-layout-layer={dataFigmaLayoutLayer}
			data-figma-layout-auto={dataFigmaLayoutAuto}
			data-figma-layout-direction={dataFigmaLayoutDirection}
			data-figma-layout-align={dataFigmaLayoutAlign}
			data-figma-layout-sizing={dataFigmaLayoutSizing}
			data-figma-property-inset={dataFigmaInset ?? inset}
			style={{ ...bleedStyle, ...style }}
			{...props}
		>
			<ContentLayoutContext.Provider
				value={{ inlineInset, sectionInset: inset }}
			>
				{children}
			</ContentLayoutContext.Provider>
		</Element>
	);
}

const measureWidth: Record<ContentRailMeasure, string> = {
	title: "18ch",
	body: "34ch",
	caption: "28ch",
};

export function ContentRail({
	as = "div",
	rail = "inset",
	measure = "body",
	children,
	style,
	"data-figma-render": dataFigmaRender = "layout",
	"data-figma-component-id": dataFigmaComponentId = "content-rail",
	"data-figma-layout-kind": dataFigmaLayoutKind = "chrome",
	"data-figma-layout-layer": dataFigmaLayoutLayer = "content",
	"data-figma-layout-auto": dataFigmaLayoutAuto = "false",
	"data-figma-layout-sizing": dataFigmaLayoutSizing = "fill",
	"data-figma-property-rail": dataFigmaRail,
	"data-figma-property-measure": dataFigmaMeasure,
	...props
}: {
	as?: ElementType;
	rail?: ContentRailKind;
	measure?: ContentRailMeasure;
	children: ReactNode;
	style?: CSSProperties;
} & DataAttributes) {
	const { inlineInset, sectionInset } = useContentInsetContext();
	const shouldRestoreInset = sectionInset === "bleed" && rail !== "full";
	const maxWidth =
		rail === "measure"
			? shouldRestoreInset
				? `calc(${measureWidth[measure]} + (${inlineInset} * 2))`
				: measureWidth[measure]
			: undefined;

	return (
		<Element
			as={as}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			data-figma-layout-kind={dataFigmaLayoutKind}
			data-figma-layout-layer={dataFigmaLayoutLayer}
			data-figma-layout-auto={dataFigmaLayoutAuto}
			data-figma-layout-sizing={dataFigmaLayoutSizing}
			data-figma-property-rail={dataFigmaRail ?? rail}
			data-figma-property-measure={dataFigmaMeasure ?? measure}
			style={{
				boxSizing: "border-box",
				width: "100%",
				...(shouldRestoreInset ? { paddingInline: inlineInset } : null),
				...(maxWidth ? { maxWidth } : null),
				...style,
			}}
			{...props}
		>
			{children}
		</Element>
	);
}

function Element({
	as: As,
	children,
	style,
	...props
}: {
	as: ElementType;
	children: ReactNode;
	style?: CSSProperties;
} & DataAttributes) {
	return (
		<As
			style={style}
			{...props}
		>
			{children}
		</As>
	);
}
