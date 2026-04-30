"use client";

import { FlexBox, IconButton, TextButton, Typography } from "@wanteddev/wds";
import { IconChevronRight, IconMoreVertical } from "@wanteddev/wds-icon";
import type { ReactNode } from "react";

import { Placeholder } from "@/components/home-kit";

// Figma .org/card-product-info (336×~441) — 쿠폰/바코드 카드 organism
// Source: data/binding/overrides/org-card-product-info.json
export function OrgCardProductInfoPilot({
	showImg = true,
	slotImg,
	title = "타이틀 최대 한 줄 입력 가능",
	showSlotBadge = true,
	slotBadge,
	showSub = true,
	state = "사용전",
	showDate = true,
	date = "남은 기간 D-6",
	showTime = true,
	time = "남은 시간 00:00",
	slotContents,
	showBtn = true,
	btnLabel = "전체보기",
	onBtn,
	showMore = true,
	onMore,
}: {
	showImg?: boolean;
	slotImg?: ReactNode;
	title?: string;
	showSlotBadge?: boolean;
	slotBadge?: ReactNode;
	showSub?: boolean;
	state?: string;
	showDate?: boolean;
	date?: string;
	showTime?: boolean;
	time?: string;
	slotContents?: ReactNode;
	showBtn?: boolean;
	btnLabel?: string;
	onBtn?: () => void;
	showMore?: boolean;
	onMore?: () => void;
}) {
	return (
		<div
			style={{
				position: "relative",
				width: 336,
				background: "white",
				borderRadius: 30,
				boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
				padding: "24px 20px 0",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<FlexBox
				flexDirection="column"
				gap={20}
				alignItems="center"
				sx={{ width: "100%", paddingBottom: 24 }}
			>
				{showImg && (
					<div
						style={{
							minWidth: 36,
							height: 36,
							display: "flex",
							alignItems: "stretch",
							justifyContent: "stretch",
							padding: "0 12px",
						}}
					>
						{slotImg ?? <Placeholder w="100%" h="100%" label="image" />}
					</div>
				)}

				<FlexBox flexDirection="column" gap={10} alignItems="center" sx={{ width: "100%" }}>
					<Typography
						variant="heading1"
						weight="medium"
						sx={{
							fontSize: 22,
							lineHeight: "26px",
							letterSpacing: "-0.05em",
							color: "#000",
							textAlign: "center",
							display: "block",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							maxWidth: "100%",
						}}
					>
						{title}
					</Typography>

					{showSlotBadge && (
						<div
							style={{
								width: "100%",
								display: "flex",
								alignItems: "stretch",
								justifyContent: "stretch",
								padding: "4px 0",
							}}
						>
							{slotBadge ?? <Placeholder w="100%" h="100%" label="badge" />}
						</div>
					)}

					{showSub && (
						<FlexBox flexDirection="column" gap={3} alignItems="center" sx={{ width: "100%" }}>
							<Typography
								variant="caption1"
								weight="medium"
								sx={{ fontSize: 12, lineHeight: "14px", color: "#6c6c6c", textAlign: "center" }}
							>
								{state}
							</Typography>
							{showDate && (
								<Typography
									variant="caption1"
									weight="medium"
									sx={{ fontSize: 12, lineHeight: "14px", color: "#6c6c6c", textAlign: "center" }}
								>
									{date}
								</Typography>
							)}
							{showTime && (
								<Typography
									variant="caption1"
									weight="medium"
									sx={{ fontSize: 12, lineHeight: "14px", color: "#6c6c6c", textAlign: "center" }}
								>
									{time}
								</Typography>
							)}
						</FlexBox>
					)}
				</FlexBox>

				<div
					style={{
						width: "100%",
						minHeight: slotContents ? "auto" : 148,
						display: "flex",
						alignItems: "stretch",
						justifyContent: "stretch",
						overflow: "hidden",
					}}
				>
					{slotContents ?? <Placeholder w="100%" h="100%" label="slot" />}
				</div>
			</FlexBox>

			{showBtn && (
				<FlexBox flexDirection="column" alignItems="center" sx={{ width: "100%" }}>
					<div style={{ width: 267.81, height: 1, background: "#f6f6f6" }} />
					<FlexBox
						flexDirection="column"
						alignItems="center"
						sx={{ width: "100%", padding: "14px 10px 20px" }}
					>
						<TextButton
							color="primary"
							size="small"
							trailingContent={<IconChevronRight width={16} height={16} />}
							onClick={onBtn}
						>
							{btnLabel}
						</TextButton>
					</FlexBox>
				</FlexBox>
			)}

			{showMore && (
				<div style={{ position: "absolute", top: 20, right: 20 }}>
					<IconButton variant="normal" size="small" onClick={onMore} aria-label="more">
						<IconMoreVertical width={24} height={24} />
					</IconButton>
				</div>
			)}
		</div>
	);
}
