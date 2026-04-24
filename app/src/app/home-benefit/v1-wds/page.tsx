import type { CSSProperties } from "react";

import { homeBenefitFixture } from "@/fixtures/home-benefit";

// T멤버십 브랜드 컬러는 WDS 토큰에 없으므로 도메인 상수로 유지.
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

const pillButton: CSSProperties = {
	background: "var(--semantic-fill-normal)",
	borderRadius: 999,
	padding: "var(--spacing-6) var(--spacing-12)",
	fontSize: 12,
	fontWeight: 600,
	color: "var(--semantic-label-alternative)",
	letterSpacing: "-0.6px",
	lineHeight: 1.3,
	border: "none",
	cursor: "pointer",
	flexShrink: 0,
};

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

const listTitle: CSSProperties = {
	fontSize: 14,
	fontWeight: 600,
	color: "var(--semantic-label-normal)",
	letterSpacing: "-0.7px",
	lineHeight: 1.4,
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
};

const listSub: CSSProperties = {
	fontSize: 13,
	fontWeight: 700,
	color: "var(--semantic-label-alternative)",
	letterSpacing: "-0.52px",
	lineHeight: 1.3,
};

export default function HomeBenefitV1Wds() {
	const f = homeBenefitFixture;

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
					<div style={{ ...placeholder(56, 14, "status") }} />
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

			{/* Scroll area */}
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
							<span style={labelStyle}>{f.points.label}</span>
							<p style={{ ...titleLargeStyle, margin: 0 }}>
								{f.points.headline}
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
								T 멤버십 사용 가능 포인트{" "}
								{f.points.availablePoints.toLocaleString()}P
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
						{f.points.ctaText}
					</button>
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
						<span style={labelStyle}>{f.brands.label}</span>
						<span style={{ ...titleLargeStyle }}>{f.brands.countText}</span>
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

				{/* Card L2 — 영화예매 */}
				<section
					style={{
						...cardBase,
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-24)",
					}}
				>
					<span style={labelStyle}>{f.movieSection.label}</span>
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
										<span style={listTitle}>{m.title}</span>
										<span style={listSub}>{m.subText}</span>
									</div>
								</div>
								<button type="button" style={pillButton}>
									예매
								</button>
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
						<span style={labelStyle}>{f.couponSection.label}</span>
						<span style={titleLargeStyle}>{f.couponSection.countText}</span>
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
										<span style={listTitle}>{c.title}</span>
										<span style={listSub}>{c.subText}</span>
									</div>
								</div>
								<button type="button" style={pillButton}>
									상세
								</button>
							</div>
						))}
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
