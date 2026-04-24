"use client";

import { ContentBadge } from "@wanteddev/wds";

// Figma badge-product-state (atom) → WDS ContentBadge
// Source: data/binding/overrides/badge-product-state.json
export function BadgeProductStatePilot({
	text,
	type = "blue",
}: {
	text: string;
	type?: "blue" | "gray";
}) {
	return (
		<ContentBadge
			size="xsmall"
			variant="solid"
			color={type === "blue" ? "accent" : "neutral"}
		>
			{text}
		</ContentBadge>
	);
}
