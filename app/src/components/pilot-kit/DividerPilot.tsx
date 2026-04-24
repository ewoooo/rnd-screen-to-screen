"use client";

import { Divider } from "@wanteddev/wds";

// Figma divider (atom) → WDS Divider
// Source: data/binding/overrides/divider.json
export function DividerPilot({
	type = "light",
	vertical = false,
}: {
	type?: "light" | "heavy" | "dot";
	vertical?: boolean;
}) {
	const thickness = type === "heavy" ? "10px" : "1px";
	const sx = type === "dot" ? { borderStyle: "dotted" as const } : undefined;
	return <Divider vertical={vertical} thickness={thickness} sx={sx} />;
}
