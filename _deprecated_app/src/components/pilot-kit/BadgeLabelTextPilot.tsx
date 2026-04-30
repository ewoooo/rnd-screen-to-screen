"use client";

import { ContentBadge } from "@wanteddev/wds";

// Figma badge-label-text (atom) → WDS ContentBadge xsmall
// Source: data/binding/overrides/badge-label-text.json
export function BadgeLabelTextPilot({ text }: { text: string }) {
	return (
		<ContentBadge size="xsmall" variant="solid" color="accent">
			{text}
		</ContentBadge>
	);
}
