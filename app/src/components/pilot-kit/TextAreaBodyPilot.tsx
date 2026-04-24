"use client";

import { Typography } from "@wanteddev/wds";

// Figma text-area/body (atom) → WDS Typography body2
// Source: data/binding/overrides/text-area-body.json
export function TextAreaBodyPilot({
	text,
	emphasis = "normal",
}: {
	text: string;
	emphasis?: "normal" | "muted";
}) {
	return (
		<Typography
			variant="body2"
			weight="regular"
			sx={emphasis === "muted" ? { opacity: 0.6 } : undefined}
		>
			{text}
		</Typography>
	);
}
