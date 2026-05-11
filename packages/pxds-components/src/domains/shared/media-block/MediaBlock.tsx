import { CardThumbnail, ContentBadge, Thumbnail } from "../../../core";
import type { CSSProperties } from "react";
import type { ReactNode } from "react";

type MediaRatio =
	| "1:1"
	| "5:4"
	| "4:3"
	| "3:2"
	| "16:10"
	| "1.618:1"
	| "16:9"
	| "2:1"
	| "21:9";

type Props = {
	alt: string;
	ratio?: MediaRatio;
	width?: CSSProperties["width"];
	badge?: ReactNode;
	border?: boolean;
};

type BadgeProps = {
	text: string;
};

export function MediaBadge({ text }: BadgeProps) {
	return (
		<ContentBadge size="small" color="accent" variant="solid">
			{text}
		</ContentBadge>
	);
}

export function MediaBlock({
	alt,
	ratio = "1:1",
	width = "100%",
	badge,
	border,
}: Props) {
	if (width === "100%") {
		return (
			<CardThumbnail
				alt={alt}
				ratio={ratio}
				trailingContent={badge}
				style={{ width: "100%" }}
			/>
		);
	}

	return (
		<Thumbnail
			width={width}
			ratio={ratio}
			radius
			border={border}
			alt={alt}
		/>
	);
}
