"use client";

import { IconButton } from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";

// Figma button-add (atom) → WDS IconButton(solid) + IconPlus
// Source: data/binding/overrides/button-add.json
export function ButtonAddPilot({
	size = "middle",
	onClick,
}: {
	size?: "middle" | "small";
	onClick?: () => void;
}) {
	const wdsSize = size === "middle" ? "medium" : "small";
	const iconSize = size === "middle" ? 16 : 12;
	return (
		<IconButton variant="solid" size={wdsSize} onClick={onClick}>
			<IconPlus width={iconSize} height={iconSize} />
		</IconButton>
	);
}
