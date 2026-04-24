"use client";

import { FlexBox, ProgressIndicator, Typography } from "@wanteddev/wds";

// Figma product-progress-bar (atom) → WDS ProgressIndicator
// Source: data/binding/overrides/product-progress-bar.json
export function ProductProgressBarPilot({
	percent,
	label,
}: {
	percent: number;
	label?: string;
}) {
	if (!label) {
		return <ProgressIndicator percent={percent} sx={{ width: 288 }} />;
	}
	return (
		<FlexBox flexDirection="column" gap={6} sx={{ width: 288 }}>
			<Typography variant="caption1" weight="medium">
				{label}
			</Typography>
			<ProgressIndicator percent={percent} />
		</FlexBox>
	);
}
