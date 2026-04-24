"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import type { ReactNode } from "react";

// Figma text-icon (molecule, 61×14) → 아이콘 + 짧은 텍스트 인라인
// Source: data/binding/overrides/text-icon.json
export function TextIconPilot({
	icon,
	text = "text",
}: {
	icon?: ReactNode;
	text?: string;
}) {
	return (
		<FlexBox flexDirection="row" gap={4} alignItems="center">
			{icon ?? (
				<div
					style={{
						width: 13,
						height: 13,
						borderRadius: 2,
						background: "#e5e7eb",
					}}
					aria-hidden="true"
				/>
			)}
			<Typography
				variant="caption1"
				weight="medium"
				sx={{
					display: "block",
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{text}
			</Typography>
		</FlexBox>
	);
}
