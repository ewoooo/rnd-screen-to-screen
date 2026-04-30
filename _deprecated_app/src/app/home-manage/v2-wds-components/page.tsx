"use client";

import { Button, Chip, Typography } from "@wanteddev/wds";
import type { CSSProperties } from "react";

import { homeManageFixture } from "./_mock";

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

const graphicLabel: Record<string, { w: number; h: number; label: string }> = {
	family: { w: 48, h: 48, label: "family" },
	"progress-large": { w: 50, h: 50, label: "prog" },
	bill: { w: 48, h: 48, label: "bill" },
	"progress-small": { w: 40, h: 40, label: "prog" },
};

type StatCardProps = { stat: (typeof homeManageFixture.stats)[number] };

function StatCard({ stat }: StatCardProps) {
	const g = graphicLabel[stat.graphic];
	return (
		<section
			style={{
				...cardBase,
				height: 112,
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
					{stat.label}
				</Typography>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "var(--spacing-6)",
					}}
				>
					<Typography variant="title2" weight="bold">
						{stat.value}
					</Typography>
					<Chip size="xsmall" variant="outlined">
						{stat.badge}
					</Chip>
				</div>
			</div>
			<div style={placeholder(g.w, g.h, g.label)} />
		</section>
	);
}

export default function HomeManageV2WdsComponents() {
	const f = homeManageFixture;

	return (
		<div style={frame}>
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
					<div style={placeholder(59, 47, "gift")} />
				</div>

				{/* Card L3 — 진단 */}
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
								{f.diagnosis.label}
							</Typography>
							<Typography
								variant="title2"
								weight="bold"
								sx={{ whiteSpace: "pre-line" }}
							>
								{f.diagnosis.headline}
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
								{f.diagnosis.aiText}
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
						{f.diagnosis.ctaText}
					</Button>
				</section>

				{f.stats.slice(0, 2).map((s) => (
					<StatCard key={s.id} stat={s} />
				))}

				{/* Card L1 — 이중 메뉴 */}
				<section
					style={{
						...cardBase,
						padding: 0,
						display: "flex",
						alignItems: "stretch",
					}}
				>
					{f.dualMenu.map((m, i) => (
						<div
							key={m.id}
							style={{
								flex: 1,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "var(--spacing-2)",
								padding: "var(--spacing-20) var(--spacing-24)",
								borderLeft:
									i === 0
										? undefined
										: "1px solid var(--semantic-line-solid-alternative)",
							}}
						>
							<div style={placeholder(20, 20, "ic")} />
							<Typography variant="body2" weight="medium">
								{m.label}
							</Typography>
						</div>
					))}
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

				{f.stats.slice(2).map((s) => (
					<StatCard key={s.id} stat={s} />
				))}

				{/* Barcode */}
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
