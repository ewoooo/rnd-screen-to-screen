import { CardThumbnail, ContentBadge, Thumbnail } from "@wanteddev/wds";
import type { ReactNode } from "react";

type Props = {
	alt: string;
	ratio?: "1:1" | "5:4" | "4:3" | "3:2" | "16:10" | "16:9" | "2:1";
	width?: number | string;
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
