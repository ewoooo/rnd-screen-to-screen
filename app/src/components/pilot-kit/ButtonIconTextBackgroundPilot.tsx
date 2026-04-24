"use client";

import type { ReactNode } from "react";
import { Button } from "@wanteddev/wds";

// Figma button-icon-text-background (atom) → WDS Button (solid|outlined)
// Source: data/binding/overrides/button-icon-text-background.json
export function ButtonIconTextBackgroundPilot({
	text,
	icon,
	type = "fill",
	size = "middle",
	onClick,
}: {
	text: string;
	icon?: ReactNode;
	type?: "fill" | "stroke";
	size?: "middle" | "small";
	onClick?: () => void;
}) {
	return (
		<Button
			variant={type === "fill" ? "solid" : "outlined"}
			size={size === "middle" ? "medium" : "small"}
			trailingContent={icon}
			onClick={onClick}
		>
			{text}
		</Button>
	);
}
