import type { CSSProperties } from "react";

import { homeManageFixture } from "@/fixtures/home-manage";

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

const labelStyle: CSSProperties = {
	fontSize: 13,
	fontWeight: 700,
	letterSpacing: "-0.39px",
	color: "var(--semantic-label-neutral)",
	lineHeight: 1.4,
};

const titleLargeStyle: CSSProperties = {
	fontSize: 20,
	fontWeight: 700,
	letterSpacing: "-1px",
	color: "var(--semantic-label-normal)",
	lineHeight: 1.3,
	whiteSpace: "pre-line",
};

const badgeStyle: CSSProperties = {
	background: "#f4f5fa",
	borderRadius: 6,
	padding: "var(--spacing-4) var(--spacing-6)",
	fontSize: 11,
	fontWeight: 700,
	color: "var(--semantic-label-alternative)",
	letterSpacing: "-0.44px",
	lineHeight: 1.3,
	whiteSpace: "nowrap",
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

export default function HomeManageV1Wds() {
	const f = homeManageFixture;

	return (
		<div style={frame}>
			{/* Status + Header */}
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
						fontSize: 15,
						fontWeight: 600,
						color: "var(--semantic-label-normal)",
					}}
				>
					<span>7:28</span>
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
					<p
						style={{
							fontSize: 12,
							fontWeight: 700,
							color: "var(--semantic-label-alternative)",
							letterSpacing: "-0.48px",
							margin: 0,
						}}
					>
						{f.headerBanner.text}
					</p>
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
							<span style={labelStyle}>{f.diagnosis.label}</span>
							<p style={{ ...titleLargeStyle, margin: 0 }}>
								{f.diagnosis.headline}
							</p>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "var(--spacing-2)",
							}}
						>
							<div style={placeholder(18, 18, "ai")} />
							<span
								style={{
									fontSize: 13,
									fontWeight: 700,
									color: T_BRAND,
									letterSpacing: "-0.39px",
								}}
							>
								{f.diagnosis.aiText}
							</span>
						</div>
					</div>
					<button
						type="button"
						style={{
							background: T_BRAND,
							color: "#fff",
							height: 36,
							padding: "0 var(--spacing-16)",
							borderRadius: 12,
							border: "none",
							fontSize: 12,
							fontWeight: 600,
							letterSpacing: "-0.48px",
							boxShadow: "0 8px 16px rgba(27, 11, 102, 0.16)",
							cursor: "pointer",
						}}
					>
						{f.diagnosis.ctaText}
					</button>
				</section>

				{/* Stat Cards × 2 */}
				{f.stats.slice(0, 2).map((s) => {
					const g = graphicLabel[s.graphic];
					return (
						<section
							key={s.id}
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
								<span style={labelStyle}>{s.label}</span>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: "var(--spacing-6)",
									}}
								>
									<span style={titleLargeStyle}>{s.value}</span>
									<span style={badgeStyle}>{s.badge}</span>
								</div>
							</div>
							<div style={placeholder(g.w, g.h, g.label)} />
						</section>
					);
				})}

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
							<span
								style={{
									fontSize: 14,
									fontWeight: 600,
									color: "var(--semantic-label-normal)",
									letterSpacing: "-0.7px",
								}}
							>
								{m.label}
							</span>
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
					<p
						style={{
							fontSize: 14,
							fontWeight: 600,
							color: "var(--semantic-label-normal)",
							letterSpacing: "-0.56px",
							margin: 0,
						}}
					>
						{f.offeringBanner.text}
					</p>
					<div style={placeholder(72, 62, "image")} />
				</section>

				{/* Stat Cards × 2 (remaining) */}
				{f.stats.slice(2).map((s) => {
					const g = graphicLabel[s.graphic];
					return (
						<section
							key={s.id}
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
								<span style={labelStyle}>{s.label}</span>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: "var(--spacing-6)",
									}}
								>
									<span style={titleLargeStyle}>{s.value}</span>
									<span style={badgeStyle}>{s.badge}</span>
								</div>
							</div>
							<div style={placeholder(g.w, g.h, g.label)} />
						</section>
					);
				})}

				{/* Barcode Card */}
				<section style={cardBase}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "var(--spacing-12)",
						}}
					>
						<span style={labelStyle}>{f.barcode.label}</span>
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
										fontSize: 11,
										fontWeight: 700,
										color: "var(--semantic-label-alternative)",
										letterSpacing: "-0.44px",
									}}
								>
									{f.barcode.digits.map((d) => (
										<span key={d}>{d}</span>
									))}
								</div>
								<span
									style={{
										fontSize: 11,
										fontWeight: 700,
										color: T_BRAND,
										letterSpacing: "-0.44px",
									}}
								>
									{f.barcode.timerText}
								</span>
							</div>
						</div>
					</div>
				</section>

				{/* MY 편집 */}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "var(--spacing-4)",
					}}
				>
					<button
						type="button"
						style={{
							background: "rgba(5, 0, 26, 0.05)",
							borderRadius: 999,
							padding: "var(--spacing-8) var(--spacing-14)",
							fontSize: 13,
							fontWeight: 700,
							color: "var(--semantic-label-alternative)",
							letterSpacing: "-0.52px",
							border: "none",
							cursor: "pointer",
						}}
					>
						MY 편집
					</button>
				</div>
			</div>

			{/* GNB */}
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
