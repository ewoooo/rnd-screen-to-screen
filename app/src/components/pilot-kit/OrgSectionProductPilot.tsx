"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import type { ReactNode } from "react";

import { Placeholder } from "@/components/home-kit";
import { BadgeAiPickPilot } from "./BadgeAiPickPilot";

// Figma .org/section-product (336 wide, slot 312h default) — title + slot wrapper organism
// Source: data/binding/overrides/org-section-product.json
export function OrgSectionProductPilot({
	showTxt = true,
	title = "타이틀 컨텍스트 영역 최대 두 줄까지 가능",
	showSub = true,
	showIco = true,
	sub = "서브 텍스트 최대 한 줄",
	icon,
	slot,
}: {
	showTxt?: boolean;
	title?: string;
	showSub?: boolean;
	showIco?: boolean;
	sub?: string;
	icon?: ReactNode;
	slot?: ReactNode;
}) {
	return (
		<FlexBox flexDirection="column" gap={20} alignItems="flex-start" sx={{ width: 336 }}>
			{showTxt && (
				<FlexBox flexDirection="column" gap={8} sx={{ width: "100%", padding: "0 12px" }}>
					<Typography
						variant="heading2"
						weight="medium"
						sx={{
							fontSize: 28,
							lineHeight: "32px",
							letterSpacing: "-0.05em",
							color: "#000",
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							whiteSpace: "pre-line",
						}}
					>
						{title}
					</Typography>
					{showSub && (
						<FlexBox flexDirection="row" gap={4} alignItems="center" sx={{ width: "100%" }}>
							{showIco && (icon ?? <BadgeAiPickPilot />)}
							<Typography
								variant="label1"
								weight="regular"
								sx={{
									fontSize: 14,
									lineHeight: "20px",
									color: "#000",
									flex: 1,
									minWidth: 0,
									display: "block",
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								{sub}
							</Typography>
						</FlexBox>
					)}
				</FlexBox>
			)}
			<div
				style={{
					width: 336,
					minHeight: slot ? "auto" : 312,
					display: "flex",
					alignItems: "stretch",
					justifyContent: "stretch",
					gap: 40,
					flexDirection: "column",
				}}
			>
				{slot ?? <Placeholder w="100%" h="100%" label="slot" />}
			</div>
		</FlexBox>
	);
}
