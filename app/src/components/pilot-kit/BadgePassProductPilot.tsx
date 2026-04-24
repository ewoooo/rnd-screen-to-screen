"use client";

import { ContentBadge } from "@wanteddev/wds";

// Figma badge-pass-product (atom) → WDS ContentBadge small
// Source: data/binding/overrides/badge-pass-product.json
export function BadgePassProductPilot({ text }: { text: string }) {
	return (
		<ContentBadge size="small" variant="solid" color="accent">
			{text}
		</ContentBadge>
	);
}
