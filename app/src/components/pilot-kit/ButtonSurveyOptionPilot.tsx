"use client";

import { Button } from "@wanteddev/wds";

// Figma button-survey-option (atom) → WDS Button outlined/solid fullWidth
// Source: data/binding/overrides/button-survey-option.json
export function ButtonSurveyOptionPilot({
	text,
	selected = false,
	disabled = false,
	onClick,
}: {
	text: string;
	selected?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}) {
	return (
		<Button
			variant={selected ? "solid" : "outlined"}
			color="primary"
			size="medium"
			fullWidth
			disabled={disabled}
			onClick={onClick}
			sx={{ justifyContent: "flex-start", maxWidth: 336 }}
		>
			{text}
		</Button>
	);
}
