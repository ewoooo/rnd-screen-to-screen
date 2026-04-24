"use client";

// Figma indicator-dot (atom) → 단순 span (WDS 매칭 없음)
// Source: data/binding/overrides/indicator-dot.json
export function IndicatorDotPilot({
	state = "default",
}: {
	state?: "selected" | "default";
}) {
	const isSelected = state === "selected";
	return (
		<span
			style={{
				display: "inline-block",
				width: isSelected ? 12 : 4,
				height: 4,
				borderRadius: 2,
				backgroundColor: isSelected
					? "var(--semantic-background-inverse)"
					: "var(--semantic-line-normal)",
				transition: "width .2s",
			}}
			aria-label={isSelected ? "현재 페이지" : undefined}
		/>
	);
}
