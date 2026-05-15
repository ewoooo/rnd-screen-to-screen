import type { ComponentProps, CSSProperties } from "react";
import { Typography } from "../../../core";
import {
	type ComponentRenderReact,
	renderString,
	renderStringArray,
} from "../../../render-react";

type TypographyProps = ComponentProps<typeof Typography>;

export type TextBlockVariant =
	| "displayTitle"
	| "hero"
	| "headline"
	| "sectionTitle"
	| "cardTitle"
	| "body"
	| "bodySubtle"
	| "caption"
	| "sectionLabel"
	| "contentTitle"
	| "listTitle"
	| "supportText"
	| "meta"
	| "assistive"
	| "price"
	| "rating"
	| "promoLabel"
	| "promoText";

export type TextBlockOverflow = "wrap" | "truncate";

type TextBlockBaseProps = {
	variant: TextBlockVariant;
	maxLines?: number;
	overflow?: TextBlockOverflow;
	align?: TypographyProps["align"];
	color?: TypographyProps["color"];
	balance?: boolean;
	style?: CSSProperties;
};

type TextBlockTextProps = TextBlockBaseProps & {
	text: string;
	lines?: never;
};

type TextBlockLinesProps = TextBlockBaseProps & {
	lines: readonly string[];
	text?: never;
};

export type TextBlockProps = TextBlockTextProps | TextBlockLinesProps;

const textBlockVariantMap = {
	displayTitle: { variant: "title2", weight: "bold" },
	hero: { variant: "title2", weight: "bold" },
	headline: { variant: "title3", weight: "bold" },
	sectionTitle: { variant: "headline1", weight: "bold" },
	cardTitle: { variant: "headline2", weight: "bold" },
	body: { variant: "body1", weight: "medium" },
	bodySubtle: { variant: "body2", weight: "medium" },
	caption: { variant: "caption1", weight: "medium" },
	sectionLabel: { variant: "caption1", weight: "bold" },
	contentTitle: { variant: "title3", weight: "bold" },
	listTitle: { variant: "label1", weight: "bold" },
	supportText: { variant: "caption1", weight: "bold" },
	meta: { variant: "caption2", weight: "bold" },
	assistive: { variant: "caption1", weight: "bold" },
	price: { variant: "headline1", weight: "bold" },
	rating: { variant: "label2", weight: "bold" },
	promoLabel: { variant: "caption2", weight: "bold" },
	promoText: { variant: "label1", weight: "medium" },
} as const satisfies Record<
	TextBlockVariant,
	Pick<TypographyProps, "variant" | "weight">
>;

export function TextBlock({
	variant,
	text,
	lines,
	maxLines,
	overflow = "wrap",
	align,
	color = "semantic.label.normal",
	balance,
	style,
}: TextBlockProps) {
	const textStyle = getTextBlockStyle({
		hasManualLines: lines !== undefined,
		maxLines,
		overflow,
		balance,
		style,
	});
	const content = lines
		? lines.map((line) => (
				<span key={line} style={{ display: "block" }}>
					{line}
				</span>
			))
		: text;
	const mapped = textBlockVariantMap[variant];

	return (
		<Typography
			variant={mapped.variant}
			weight={mapped.weight}
			align={align}
			color={color}
			style={textStyle}
		>
			{content}
		</Typography>
	);
}

export const textBlockRenderReact: ComponentRenderReact = ({ node }) => {
	const variant = textBlockVariant(node.props?.variant);
	const lines = renderStringArray(node.props?.lines);
	const text =
		renderString(node.props?.text) ??
		renderString(node.props?.title) ??
		renderString(node.props?.label) ??
		"";
	const color = renderString(node.props?.color) as TypographyProps["color"];

	return (
		<TextBlock
			variant={variant}
			{...(lines ? { lines } : { text })}
			color={color || undefined}
		/>
	);
};

function textBlockVariant(value: unknown): TextBlockVariant {
	if (
		value === "displayTitle" ||
		value === "hero" ||
		value === "headline" ||
		value === "sectionTitle" ||
		value === "cardTitle" ||
		value === "body" ||
		value === "bodySubtle" ||
		value === "caption" ||
		value === "sectionLabel" ||
		value === "contentTitle" ||
		value === "listTitle" ||
		value === "supportText" ||
		value === "meta" ||
		value === "assistive" ||
		value === "price" ||
		value === "rating" ||
		value === "promoLabel" ||
		value === "promoText"
	) {
		return value;
	}
	return "body";
}

function getTextBlockStyle({
	hasManualLines,
	maxLines,
	overflow,
	balance,
	style,
}: {
	hasManualLines: boolean;
	maxLines?: number;
	overflow: TextBlockOverflow;
	balance?: boolean;
	style?: CSSProperties;
}): CSSProperties {
	const shouldClamp = maxLines !== undefined && overflow === "truncate";

	return {
		...(hasManualLines ? { whiteSpace: "pre-line" } : null),
		...(balance ? { textWrap: "balance" } : null),
		...(shouldClamp
			? {
					display: "-webkit-box",
					WebkitBoxOrient: "vertical",
					WebkitLineClamp: maxLines,
					overflow: "hidden",
				}
			: null),
		...style,
	};
}
