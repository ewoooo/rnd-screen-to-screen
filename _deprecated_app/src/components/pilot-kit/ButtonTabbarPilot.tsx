"use client";

import type { ReactNode } from "react";
import { FlexBox, Typography } from "@wanteddev/wds";

// Figma button-tabbar (atom) → 합성 (button + FlexBox + Typography)
// Source: data/binding/overrides/button-tabbar.json
export function ButtonTabbarPilot({
	label,
	icon,
	state = "default",
	onClick,
}: {
	label: string;
	icon: ReactNode;
	state?: "select" | "default";
	onClick?: () => void;
}) {
	const active = state === "select";
	return (
		<button
			type="button"
			onClick={onClick}
			style={{
				width: 68,
				height: 64,
				border: "none",
				background: "transparent",
				padding: 0,
				cursor: "pointer",
				opacity: active ? 1 : 0.5,
			}}
		>
			<FlexBox flexDirection="column" gap={4} alignItems="center">
				{icon}
				<Typography variant="caption2" weight="medium">
					{label}
				</Typography>
			</FlexBox>
		</button>
	);
}
