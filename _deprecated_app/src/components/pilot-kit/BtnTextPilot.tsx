"use client";

import { TextButton } from "@wanteddev/wds";

// Figma btn-text (atom) → WDS TextButton
// Source: data/binding/overrides/btn-text.json
export function BtnTextPilot({
	text,
	type = "default",
	weight = "bold",
	onClick,
}: {
	text: string;
	type?: "default" | "line";
	weight?: "bold" | "medium";
	onClick?: () => void;
}) {
	return (
		<TextButton
			color={type === "line" ? "assistive" : "primary"}
			size="small"
			sx={{
				fontWeight: weight === "bold" ? 700 : 500,
				...(type === "line" ? { textDecoration: "underline" } : {}),
			}}
			onClick={onClick}
		>
			{text}
		</TextButton>
	);
}
