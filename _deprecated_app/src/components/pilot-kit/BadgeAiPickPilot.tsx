"use client";

import { Typography } from "@wanteddev/wds";

// Figma ico/ai (atom, 38×13) → outlined "AI PICK" badge
// Source: data/binding/overrides/badge-ai-pick.json
export function BadgeAiPickPilot({ text = "AI PICK" }: { text?: string }) {
	return (
		<div
			style={{
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				height: 13,
				padding: "0 4px",
				border: "1px solid #1a1a1a",
				borderRadius: 3,
				background: "#ffffff",
				flexShrink: 0,
			}}
		>
			<Typography
				variant="caption2"
				weight="bold"
				sx={{
					fontSize: 9,
					lineHeight: "11px",
					letterSpacing: "-0.3px",
					color: "#1a1a1a",
				}}
			>
				{text}
			</Typography>
		</div>
	);
}
