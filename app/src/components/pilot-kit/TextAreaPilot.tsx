"use client";

import { FlexBox, Typography } from "@wanteddev/wds";

// synthesized atom/text-area (C5) → WDS Typography 매핑
// Source: data/binding/overrides/text-area.json
export function TextAreaPilot({
	text,
	subText,
}: {
	text: string;
	subText?: string;
}) {
	if (!subText) {
		return (
			<Typography
				variant="headline1"
				weight="bold"
				sx={{ fontSize: 18, lineHeight: "24px", letterSpacing: "-0.05em" }}
			>
				{text}
			</Typography>
		);
	}
	return (
		<FlexBox flexDirection="column" gap={4}>
			<Typography
				variant="headline1"
				weight="bold"
				sx={{ fontSize: 18, lineHeight: "24px", letterSpacing: "-0.05em" }}
			>
				{text}
			</Typography>
			<Typography
				variant="label1"
				weight="regular"
				sx={{ fontSize: 14, lineHeight: "20px", letterSpacing: "-0.05em" }}
			>
				{subText}
			</Typography>
		</FlexBox>
	);
}
