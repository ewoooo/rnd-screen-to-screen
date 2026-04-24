"use client";

import type { ReactNode } from "react";
import { IconButton, PushBadge } from "@wanteddev/wds";
import { IconBusinessBag } from "@wanteddev/wds-icon";

// Figma button-icon (C2) → WDS IconButton (+ optional PushBadge)
// Source: data/binding/overrides/button-icon.json
export function ButtonIconPilot({
	icon = <IconBusinessBag width={24} height={24} />,
	badgeCount,
	onClick,
}: {
	icon?: ReactNode;
	badgeCount?: number;
	onClick?: () => void;
}) {
	const content =
		badgeCount === undefined ? (
			icon
		) : (
			<PushBadge variant="number" count={badgeCount} position="top-right">
				{icon}
			</PushBadge>
		);

	return (
		<IconButton variant="normal" size="medium" onClick={onClick}>
			{content}
		</IconButton>
	);
}
