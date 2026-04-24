"use client";

import { Typography } from "@wanteddev/wds";

// Figma input (molecule, 304 wide, focused/filled variant)
// Source: data/binding/overrides/input.json
export function InputPilot({
	state = "focused",
	text = "",
	placeholder = "국문 기준 최대 60자까지 입력 가능",
}: {
	state?: "focused" | "filled";
	text?: string;
	placeholder?: string;
}) {
	const isFilled = state === "filled";
	const display = isFilled && text ? text : placeholder;
	const color = isFilled && text ? "#1a1a1a" : "#666";

	return (
		<div
			style={{
				width: 304,
				padding: "14px 20px",
				border: "1px solid #000",
				borderRadius: 16,
				background: "#ffffff",
				display: "flex",
				alignItems: "center",
				gap: 0,
				position: "relative",
			}}
		>
			{state === "focused" && (
				<div
					aria-hidden="true"
					style={{
						width: 2,
						height: 16,
						background: "#3014b8",
						borderRadius: 1,
						marginRight: 4,
					}}
				/>
			)}
			<Typography variant="caption1" weight="medium" sx={{ color, flex: 1 }}>
				{display}
			</Typography>
			{isFilled && text && (
				<div
					aria-hidden="true"
					style={{
						width: 2,
						height: 16,
						background: "#3014b8",
						borderRadius: 1,
						marginLeft: 2,
					}}
				/>
			)}
		</div>
	);
}
