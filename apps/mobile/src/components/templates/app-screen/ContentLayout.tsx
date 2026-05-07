"use client";

import {
	createContext,
	type CSSProperties,
	type ElementType,
	type ReactNode,
	useContext,
} from "react";

import { Box } from "@/components/atoms/layout";

export type ContentLayoutMode = "legacy" | "screen";
export type ContentSectionInset = "inherit" | "bleed";
export type ContentRailKind = "full" | "inset" | "measure";
export type ContentRailMeasure = "title" | "body" | "caption";

type ContentLayoutContextValue = {
	inlineInset: string;
	sectionInset: ContentSectionInset;
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

export function useContentLayout() {
	return useContext(ContentLayoutContext);
}

export function ContentSection({
	as = "section",
	inset = "inherit",
	children,
	style,
}: {
	as?: ElementType;
	inset?: ContentSectionInset;
	children: ReactNode;
	style?: CSSProperties;
}) {
	const { inlineInset } = useContentLayout();
	const bleedStyle =
		inset === "bleed"
			? {
					marginLeft: `calc(-1 * ${inlineInset})`,
					marginRight: `calc(-1 * ${inlineInset})`,
				}
			: null;

	return (
		<Box as={as} style={{ ...bleedStyle, ...style }}>
			<ContentLayoutContext.Provider
				value={{ inlineInset, sectionInset: inset }}
			>
				{children}
			</ContentLayoutContext.Provider>
		</Box>
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
}: {
	as?: ElementType;
	rail?: ContentRailKind;
	measure?: ContentRailMeasure;
	children: ReactNode;
	style?: CSSProperties;
}) {
	const { inlineInset, sectionInset } = useContentLayout();
	const shouldRestoreInset = sectionInset === "bleed" && rail !== "full";
	const maxWidth =
		rail === "measure"
			? shouldRestoreInset
				? `calc(${measureWidth[measure]} + (${inlineInset} * 2))`
				: measureWidth[measure]
			: undefined;

	return (
		<Box
			as={as}
			style={{
				boxSizing: "border-box",
				width: "100%",
				...(shouldRestoreInset ? { paddingInline: inlineInset } : null),
				...(maxWidth ? { maxWidth } : null),
				...style,
			}}
		>
			{children}
		</Box>
	);
}
