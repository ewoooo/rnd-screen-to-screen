"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import type { ReactNode } from "react";

import { Placeholder } from "@/components/home-kit";
import { ButtonCallToActionPilot } from "./ButtonCallToActionPilot";
import { HeaderBottomsheetPilot } from "./HeaderBottomsheetPilot";

// Figma .bottomsheet-list (360×~478) — 바텀시트 list organism
// Source: data/binding/overrides/org-bottomsheet-list.json
export function OrgBottomsheetListPilot({
	showTitle = true,
	title = "타이틀 한 줄 입력 가능",
	showSub = true,
	sub = "어드민 지정 텍스트 한 줄 입력 가능",
	slot,
	showBtn = true,
	btnLabel = "추가",
	showHeaderClose = true,
	onClose,
	onBtn,
}: {
	showTitle?: boolean;
	title?: string;
	showSub?: boolean;
	sub?: string;
	slot?: ReactNode;
	showBtn?: boolean;
	btnLabel?: string;
	showHeaderClose?: boolean;
	onClose?: () => void;
	onBtn?: () => void;
}) {
	return (
		<FlexBox flexDirection="column" alignItems="flex-start" sx={{ width: 360 }}>
			{showHeaderClose && <HeaderBottomsheetPilot onClose={onClose} />}

			<div
				style={{
					background: "white",
					display: "flex",
					flexDirection: "column",
					gap: 10,
					alignItems: "flex-start",
					justifyContent: "flex-end",
					width: "100%",
				}}
			>
				{showTitle && (
					<FlexBox flexDirection="column" gap={5} sx={{ width: "100%", padding: "0 24px" }}>
						<Typography
							variant="headline1"
							weight="bold"
							sx={{ fontSize: 18, lineHeight: "24px", color: "#000" }}
						>
							{title}
						</Typography>
						{showSub && (
							<Typography
								variant="label1"
								weight="regular"
								sx={{ fontSize: 14, lineHeight: "20px", color: "#000" }}
							>
								{sub}
							</Typography>
						)}
					</FlexBox>
				)}

				<div
					style={{
						width: "100%",
						padding: "10px 12px 20px",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
					}}
				>
					<div
						style={{
							width: 336,
							minHeight: slot ? "auto" : 270,
							display: "flex",
							alignItems: "stretch",
							justifyContent: "stretch",
							overflow: "hidden",
						}}
					>
						{slot ?? <Placeholder w="100%" h="100%" label="slot" />}
					</div>
				</div>
			</div>

			{showBtn && (
				<div
					style={{
						width: "100%",
						height: 88,
						position: "relative",
						background: "white",
					}}
				>
					<div
						style={{
							position: "absolute",
							inset: "18px 15px",
						}}
					>
						<ButtonCallToActionPilot text={btnLabel} onClick={onBtn} />
					</div>
				</div>
			)}
		</FlexBox>
	);
}
