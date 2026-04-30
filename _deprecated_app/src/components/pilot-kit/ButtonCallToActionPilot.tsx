"use client";

import { Button } from "@wanteddev/wds";

// Figma button-calltoaction (atom) → WDS Button (solid, large, fullWidth)
// Source: data/binding/overrides/button-calltoaction.json
export function ButtonCallToActionPilot({
	text,
	state = "default",
	fullWidth = true,
	onClick,
}: {
	text: string;
	state?: "default" | "disabled" | "loading";
	fullWidth?: boolean;
	onClick?: () => void;
}) {
	return (
		<Button
			variant="solid"
			color="primary"
			size="large"
			fullWidth={fullWidth}
			disabled={state === "disabled"}
			loading={state === "loading"}
			onClick={onClick}
		>
			{text}
		</Button>
	);
}
