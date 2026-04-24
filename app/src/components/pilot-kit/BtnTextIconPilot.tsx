"use client";

import type { ReactNode } from "react";
import { Button } from "@wanteddev/wds";

// Figma btn-text-icon (atom) → WDS Button (variant=outlined + icon slot)
// Source: data/binding/overrides/btn-text-icon.json
export function BtnTextIconPilot({
	text,
	icon,
	size = "middle",
	iconPosition = "trailing",
	onClick,
}: {
	text: string;
	icon: ReactNode;
	size?: "middle" | "small";
	iconPosition?: "leading" | "trailing";
	onClick?: () => void;
}) {
	const wdsSize = size === "middle" ? "medium" : "small";
	return (
		<Button
			variant="outlined"
			size={wdsSize}
			leadingContent={iconPosition === "leading" ? icon : undefined}
			trailingContent={iconPosition === "trailing" ? icon : undefined}
			onClick={onClick}
		>
			{text}
		</Button>
	);
}
