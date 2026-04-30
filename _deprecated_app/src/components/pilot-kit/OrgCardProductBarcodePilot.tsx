"use client";

import { FlexBox, Typography } from "@wanteddev/wds";
import { IconChevronRight } from "@wanteddev/wds-icon";
import type { ReactNode } from "react";

import { Placeholder } from "@/components/home-kit";
import { BtnTextIconPilot } from "./BtnTextIconPilot";
import { InformationBarcodePilot } from "./InformationBarcodePilot";

const dotDividerStyle = {
	width: "100%",
	height: 1,
	background:
		"repeating-linear-gradient(90deg, #d6d6d6 0 4px, transparent 4px 8px)",
} as const;

// Figma .org/card-product-barcode (336×~527) — 할인 바코드 단독 카드 organism
// Source: data/binding/overrides/org-card-product-barcode.json
export function OrgCardProductBarcodePilot({
	slotImg,
	showBrandRow = true,
	brandRowText = "{브랜드명, 브랜드명, 브랜드명}",
	onBrandRow,
	title = "15% 할인",
	showSlotBadge = true,
	slotBadge,
	barcode,
	noticeTitle = "매장에서 결제 전, 할인 바코드를 보여주세요.",
	noticeItems = [
		"T 멤버십의 매장 바코드를 제공하는 구독 상품을 통합 바코드로 이용할 수 있어요.",
		"오프라인 매장에서 할인 바코드 이용 시, 해당 구독 상품 혜택을 사용한 것으로 처리돼요.",
	],
	showBtn = true,
	btnLabel = "할인 내역 보기",
	onBtn,
	showTime = false,
	timeText = "남은 시간 16 : 55",
}: {
	slotImg?: ReactNode;
	showBrandRow?: boolean;
	brandRowText?: string;
	onBrandRow?: () => void;
	title?: string;
	showSlotBadge?: boolean;
	slotBadge?: ReactNode;
	barcode?: ReactNode;
	noticeTitle?: string;
	noticeItems?: readonly string[];
	showBtn?: boolean;
	btnLabel?: string;
	onBtn?: () => void;
	showTime?: boolean;
	timeText?: string;
}) {
	return (
		<FlexBox
			flexDirection="column"
			gap={20}
			alignItems="center"
			sx={{
				width: 336,
				boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
				borderRadius: 30,
			}}
		>
			<div style={{ width: "100%", borderRadius: 30, overflow: "hidden", background: "white" }}>
				{/* card-top */}
				<div
					style={{
						background: "white",
						padding: "24px 28px 16px",
						display: "flex",
						flexDirection: "column",
						gap: 20,
						alignItems: "center",
					}}
				>
					<div
						style={{
							minWidth: 32,
							height: 32,
							display: "flex",
							alignItems: "stretch",
							justifyContent: "stretch",
							padding: "0 12px",
						}}
					>
						{slotImg ?? <Placeholder w="100%" h="100%" label="image" />}
					</div>

					<FlexBox flexDirection="column" gap={5} alignItems="center" sx={{ width: "100%" }}>
						<FlexBox flexDirection="column" gap={10} alignItems="center" sx={{ width: "100%" }}>
							{showBrandRow && (
								<BtnTextIconPilot
									text={brandRowText}
									icon={<IconChevronRight width={14} height={14} />}
									iconPosition="trailing"
									size="small"
									onClick={onBrandRow}
								/>
							)}
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
									width: "100%",
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
						</FlexBox>
						{barcode ?? <InformationBarcodePilot />}
					</FlexBox>
				</div>

				{/* dot divider */}
				<div style={{ padding: "0 16px" }}>
					<div style={dotDividerStyle} />
				</div>

				{/* card-bottom */}
				<div
					style={{
						background: "white",
						padding: "16px 28px 0",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<FlexBox
						flexDirection="column"
						gap={8}
						sx={{ width: "100%", paddingBottom: 24 }}
					>
						<Typography
							variant="label1"
							weight="bold"
							sx={{ fontSize: 14, lineHeight: "20px", color: "#000" }}
						>
							{noticeTitle}
						</Typography>
						<FlexBox flexDirection="column" gap={8} sx={{ width: "100%" }}>
							{noticeItems.map((item, i) => (
								<FlexBox key={i} flexDirection="row" gap={2} alignItems="flex-start">
									<Typography
										variant="caption1"
										weight="medium"
										sx={{ fontSize: 12, lineHeight: "14px", color: "#6c6c6c" }}
									>
										-
									</Typography>
									<Typography
										variant="caption1"
										weight="medium"
										sx={{
											fontSize: 12,
											lineHeight: "14px",
											color: "#6c6c6c",
											flex: 1,
											minWidth: 0,
										}}
									>
										{item}
									</Typography>
								</FlexBox>
							))}
						</FlexBox>
					</FlexBox>

					{showBtn && (
						<FlexBox flexDirection="column" alignItems="center" sx={{ width: "100%" }}>
							<div style={{ width: 267.81, height: 1, background: "#f6f6f6" }} />
							<FlexBox
								flexDirection="column"
								alignItems="center"
								sx={{ width: "100%", padding: "14px 10px 20px" }}
							>
								<BtnTextIconPilot
									text={btnLabel}
									icon={<IconChevronRight width={16} height={16} />}
									iconPosition="trailing"
									size="middle"
									onClick={onBtn}
								/>
							</FlexBox>
						</FlexBox>
					)}
				</div>
			</div>

			{showTime && (
				<FlexBox flexDirection="row" gap={5}>
					<Typography
						variant="caption1"
						weight="medium"
						sx={{ fontSize: 12, lineHeight: "14px", color: "#fff" }}
					>
						{timeText}
					</Typography>
				</FlexBox>
			)}
		</FlexBox>
	);
}
