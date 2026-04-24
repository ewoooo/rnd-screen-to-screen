"use client";

import { Chip } from "@wanteddev/wds";

// Figma button-chip (atom) → WDS Chip (variant=outlined)
// Source: data/binding/overrides/button-chip.json
export function ButtonChipPilot({
	text,
	size = "middle",
	active,
	onClick,
}: {
	text: string;
	size?: "middle" | "small";
	active?: boolean;
	onClick?: () => void;
}) {
	return (
		<Chip
			variant="outlined"
			size={size === "middle" ? "medium" : "small"}
			active={active}
			onClick={onClick}
		>
			{text}
		</Chip>
	);
}
