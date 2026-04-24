"use client";

import { Button, Chip, Typography } from "@wanteddev/wds";
import type { CSSProperties } from "react";

import { homeBenefitFixture } from "@/fixtures/home-benefit";

// v1-wds와 동일한 도메인 상수. T멤버십 브랜드 컬러와 페이지 배경은 WDS 토큰에 없어 유지.
const T_BRAND = "#3617ce";
const PAGE_BG = "#ebeef6";
const CARD_BG = "rgba(255, 255, 255, 0.9)";
const CARD_BORDER = "rgba(255, 255, 255, 1)";
const CARD_RADIUS = 24;
const CARD_PAD = "var(--spacing-32)";

const frame: CSSProperties = {
	position: "relative",
	width: "100%",
	height: "100%",
	background: PAGE_BG,
	overflow: "hidden",
	display: "flex",
	flexDirection: "column",
};

const scrollArea: CSSProperties = {
	flex: 1,
	overflowY: "auto",
	padding: "106px var(--spacing-12) 120px",
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-24)",
};

const cardBase: CSSProperties = {
	background: CARD_BG,
	border: `1px solid ${CARD_BORDER}`,
	borderRadius: CARD_RADIUS,
	padding: CARD_PAD,
	width: "100%",
	boxSizing: "border-box",
};

const placeholder = (w: number | string, h: number | string, label: string): CSSProperties => ({
	width: typeof w === "number" ? `${w}px` : w,
	height: typeof h === "number" ? `${h}px` : h,
	border: "1px dashed var(--semantic-line-solid-normal)",
	borderRadius: 6,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	color: "var(--semantic-label-alternative)",
	fontSize: 10,
	fontWeight: 500,
	background: "var(--semantic-background-normal-alternative)",
	boxSizing: "border-box",
	flexShrink: 0,
});

const listRow: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--spacing-14)",
	width: "100%",
};

const listInfo: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--spacing-14)",
	flex: 1,
	minWidth: 0,
};

const listTextCol: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: 2,
	flex: 1,
	minWidth: 0,
};

export default function HomeBenefitV2WdsComponents() {
	const f = homeBenefitFixture;

	return (
		<div style={frame}>
			{/* Status + Header — v1과 동일 (WDS 매핑 없음) */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 10,
					background: "rgba(235, 238, 246, 0.95)",
					backdropFilter: "blur(7px)",
					WebkitBackdropFilter: "blur(7px)",
				}}
			>
				<div
					style={{
						height: 44,
						display: "flex",
						alignItems: "center",
						padding: "0 var(--spacing-20)",
						justifyContent: "space-between",
					}}
				>
					<Typography variant="body2" weight="bold">
						7:28
					</Typography>
					<div style={placeholder(56, 14, "status")} />
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "var(--spacing-10) var(--spacing-24) var(--spacing-16)",
					}}
				>
					<div
						style={{
							width: 32,
							height: 32,
							borderRadius: 8,
							background: T_BRAND,
							color: "#fff",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontWeight: 800,
							fontSize: 18,
						}}
					>
						T
					</div>
					<div style={{ display: "flex", gap: "var(--spacing-20)" }}>
						<div style={placeholder(24, 24, "bar")} />
						<div style={placeholder(24, 24, "shop")} />
						<div style={placeholder(24, 24, "menu")} />
					</div>
				</div>
			</div>

			<div style={scrollArea}>
				{/* Banner/Small */}
				<div
					style={{
						height: 48,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "0 var(--spacing-16)",
					}}
				>
					<Typography
						variant="caption1"
						weight="bold"
						color="semantic.label.alternative"
					>
						{f.headerBanner.text}
					</Typography>
					<div style={placeholder(35, 56, "card")} />
				</div>

				{/* Card L3 — 포인트 */}
				<section
					style={{
						...cardBase,
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-24)",
						alignItems: "flex-end",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "var(--spacing-16)",
							width: "100%",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "var(--spacing-8)",
							}}
						>
							<Typography
								variant="caption1"
								weight="bold"
								color="semantic.label.neutral"
							>
								{f.points.label}
							</Typography>
							<Typography
								variant="title2"
								weight="bold"
								sx={{ whiteSpace: "pre-line" }}
							>
								{f.points.headline}
							</Typography>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "var(--spacing-2)",
							}}
						>
							<div style={placeholder(18, 18, "ai")} />
							<Typography
								variant="caption1"
								weight="bold"
								sx={{ color: T_BRAND }}
							>
								T 멤버십 사용 가능 포인트{" "}
								{f.points.availablePoints.toLocaleString()}P
							</Typography>
						</div>
					</div>
					<Button
						variant="solid"
						color="primary"
						size="small"
						sx={{
							background: T_BRAND,
							boxShadow: "0 8px 16px rgba(27, 11, 102, 0.16)",
						}}
					>
						{f.points.ctaText}
					</Button>
				</section>

				{/* Card L2 — 바코드 */}
				<section style={cardBase}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "var(--spacing-12)",
						}}
					>
						<Typography
							variant="caption1"
							weight="bold"
							color="semantic.label.neutral"
						>
							{f.barcode.label}
						</Typography>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "var(--spacing-4)",
							}}
						>
							<div style={placeholder("100%", 48, "barcode")} />
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<div
									style={{
										display: "flex",
										gap: "var(--spacing-8)",
									}}
								>
									{f.barcode.digits.map((d) => (
										<Typography
											key={d}
											variant="caption2"
											weight="bold"
											color="semantic.label.alternative"
										>
											{d}
										</Typography>
									))}
								</div>
								<Typography
									variant="caption2"
									weight="bold"
									sx={{ color: T_BRAND }}
								>
									{f.barcode.timerText}
								</Typography>
							</div>
						</div>
					</div>
				</section>

				{/* Card L2 — 혜택 브랜드 */}
				<section
					style={{
						...cardBase,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "var(--spacing-4)",
						}}
					>
						<Typography
							variant="caption1"
							weight="bold"
							color="semantic.label.neutral"
						>
							{f.brands.label}
						</Typography>
						<Typography variant="title2" weight="bold">
							{f.brands.countText}
						</Typography>
					</div>
					<div style={placeholder(40, 40, "icons")} />
				</section>

				{/* Offering Banner */}
				<section
					style={{
						...cardBase,
						height: 94,
						padding: "0 var(--spacing-32)",
						background: "rgba(253, 253, 254, 0.5)",
						borderColor: "rgba(255, 255, 255, 0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						overflow: "hidden",
					}}
				>
					<Typography variant="body2" weight="medium">
						{f.offeringBanner.text}
					</Typography>
					<div style={placeholder(72, 62, "image")} />
				</section>

				{/* Card L2 — 영화예매 */}
				<section
					style={{
						...cardBase,
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-24)",
					}}
				>
					<Typography
						variant="caption1"
						weight="bold"
						color="semantic.label.neutral"
					>
						{f.movieSection.label}
					</Typography>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "var(--spacing-12)",
						}}
					>
						{f.movieSection.items.map((m) => (
							<div key={m.id} style={listRow}>
								<div style={listInfo}>
									<div style={placeholder(40, 58, "poster")} />
									<div style={listTextCol}>
										<Typography
											variant="body2"
											weight="medium"
											noWrap
										>
											{m.title}
										</Typography>
										<Typography
											variant="caption1"
											weight="bold"
											color="semantic.label.alternative"
										>
											{m.subText}
										</Typography>
									</div>
								</div>
								<Chip size="small" variant="solid">
									예매
								</Chip>
							</div>
						))}
					</div>
				</section>

				{/* Card L2 — 쿠폰함 */}
				<section
					style={{
						...cardBase,
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-24)",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "var(--spacing-4)",
						}}
					>
						<Typography
							variant="caption1"
							weight="bold"
							color="semantic.label.neutral"
						>
							{f.couponSection.label}
						</Typography>
						<Typography variant="title2" weight="bold">
							{f.couponSection.countText}
						</Typography>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "var(--spacing-12)",
						}}
					>
						{f.couponSection.items.map((c) => (
							<div key={c.id} style={listRow}>
								<div style={listInfo}>
									<div style={placeholder(40, 40, c.brand)} />
									<div style={listTextCol}>
										<Typography
											variant="body2"
											weight="medium"
											noWrap
										>
											{c.title}
										</Typography>
										<Typography
											variant="caption1"
											weight="bold"
											color="semantic.label.alternative"
										>
											{c.subText}
										</Typography>
									</div>
								</div>
								<Chip size="small" variant="solid">
									상세
								</Chip>
							</div>
						))}
					</div>
				</section>

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "var(--spacing-4)",
					}}
				>
					<Chip size="small" variant="solid">
						MY 편집
					</Chip>
				</div>
			</div>

			{/* GNB — v1 그대로 유지 (사용자 요청) */}
			<nav
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					background: "rgba(235, 238, 246, 0.95)",
					backdropFilter: "blur(4px)",
					WebkitBackdropFilter: "blur(4px)",
					borderTop: "1px solid #ecf1ff",
					display: "flex",
					justifyContent: "center",
					gap: "var(--spacing-12)",
					padding: "var(--spacing-12) 0 var(--spacing-24)",
				}}
			>
				{[
					{ key: "my", label: "MY", active: true },
					{ key: "search", label: "검색", active: false },
					{ key: "shop", label: "쇼핑", active: false },
				].map((tab) => (
					<div
						key={tab.key}
						style={{
							width: 96,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "var(--spacing-2)",
							opacity: tab.active ? 1 : 0.4,
						}}
					>
						<div style={placeholder(24, 24, tab.key)} />
						<span
							style={{
								fontSize: 11,
								fontWeight: 600,
								color: tab.active
									? T_BRAND
									: "var(--semantic-label-normal)",
								letterSpacing: "-0.44px",
							}}
						>
							{tab.label}
						</span>
					</div>
				))}
			</nav>
		</div>
	);
}
