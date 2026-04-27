import Link from "next/link";
import type { CSSProperties } from "react";

import { GNB_BORDER, T_BRAND } from "@/components/home-kit/tokens";

type ReviewItem = {
	href: string;
	step: string;
	title: string;
	policy: string;
};

const screens: ReviewItem[] = [
	{ href: "/payment-method-register/v2-mockup", step: "01", title: "주 결제 수단 선택", policy: "3.1.1" },
	{ href: "/payment-card-form/v1-mockup", step: "02", title: "카드 정보 입력", policy: "3.1.1.2" },
	{ href: "/payment-account-form/v1-mockup", step: "03", title: "계좌 정보 입력", policy: "3.1.1.2" },
	{ href: "/payment-supplement-add/v1-mockup", step: "04", title: "보조 결제 수단 추가", policy: "3.1.2" },
	{ href: "/payment-tplus-setting/v1-mockup", step: "05", title: "T+ 포인트 설정", policy: "3.1.2.1" },
	{ href: "/payment-coupon-select/v1-mockup", step: "06", title: "쿠폰 선택", policy: "3.1.2.2" },
	{ href: "/payment-voucher-select/v1-mockup", step: "07", title: "이용권 선택", policy: "3.1.2.2" },
	{ href: "/payment-processing/v1-mockup", step: "08", title: "결제 처리 중", policy: "3.3.1.1" },
	{ href: "/payment-success/v1-mockup", step: "09", title: "결제 완료", policy: "3.3 / 3.5.2" },
	{ href: "/payment-recurring-failure/v1-mockup", step: "10", title: "정기 결제 실패", policy: "3.4.2.1" },
	{ href: "/payment-recurring-hold/v1-mockup", step: "11", title: "정기 결제 보류", policy: "3.4.2.1 D+3" },
	{ href: "/payment-instant/v1-mockup", step: "12", title: "즉시 결제", policy: "3.4.2.2" },
	{ href: "/subscription-canceled/v1-mockup", step: "13", title: "구독 해지", policy: "3.4 / 3.5.1" },
];

const PHONE_W = 360;
const PHONE_H = 800;

export default function PaymentAllReviewPage() {
	return (
		<div style={pageStyle}>
			{/* Figma capture handoff — 임시. 캡처 끝나면 제거. */}
			<script
				src="https://mcp.figma.com/mcp/html-to-design/capture.js"
				async
			/>
			<header style={headerStyle}>
				<div>
					<h1 style={titleStyle}>결제 화면 리뷰 — Figma SCREEN 1~9 매핑</h1>
					<p style={subStyle}>
						{screens.length}화면. 각 프레임 우상단 링크로 단독 페이지 열림. iframe 내부도 스크롤 가능.
					</p>
				</div>
				<Link href="/" style={homeLinkStyle}>
					홈으로 ›
				</Link>
			</header>
			<div style={scrollWrapStyle}>
				<div style={trackStyle}>
					{screens.map((s) => (
						<ReviewFrame key={s.href} item={s} />
					))}
				</div>
			</div>
		</div>
	);
}

function ReviewFrame({ item }: { item: ReviewItem }) {
	return (
		<div style={frameWrapStyle}>
			<div style={metaRowStyle}>
				<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<span style={stepBadgeStyle}>{item.step}</span>
					<span style={frameTitleStyle}>{item.title}</span>
					<span style={frameMetaStyle}>{item.policy}</span>
				</div>
				<Link href={item.href} target="_blank" rel="noreferrer" style={openLinkStyle}>
					열기 ›
				</Link>
			</div>
			<div style={phoneOuterStyle}>
				<iframe
					src={`${item.href}?embed=1`}
					title={item.title}
					style={iframeStyle}
				/>
			</div>
		</div>
	);
}

const pageStyle: CSSProperties = {
	minHeight: "100vh",
	background: "#FFFFFF",
	display: "flex",
	flexDirection: "column",
	gap: 24,
	padding: "24px 0",
};

const headerStyle: CSSProperties = {
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "space-between",
	padding: "0 24px",
	gap: 16,
};

const titleStyle: CSSProperties = {
	margin: 0,
	fontSize: 22,
	fontWeight: 800,
	color: "var(--semantic-label-normal)",
	letterSpacing: -0.5,
};

const subStyle: CSSProperties = {
	margin: "6px 0 0",
	fontSize: 13,
	color: "var(--semantic-label-alternative)",
};

const homeLinkStyle: CSSProperties = {
	fontSize: 13,
	fontWeight: 700,
	color: T_BRAND,
	textDecoration: "none",
	whiteSpace: "nowrap",
};

const scrollWrapStyle: CSSProperties = {
	overflowX: "auto",
	overflowY: "hidden",
	paddingBottom: 24,
};

const trackStyle: CSSProperties = {
	display: "flex",
	gap: 24,
	padding: "8px 24px",
	width: "max-content",
};

const frameWrapStyle: CSSProperties = {
	flex: "0 0 auto",
	width: PHONE_W,
	display: "flex",
	flexDirection: "column",
	gap: 12,
};

const metaRowStyle: CSSProperties = {
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "space-between",
	gap: 12,
};

const stepBadgeStyle: CSSProperties = {
	display: "inline-block",
	width: "fit-content",
	padding: "2px 8px",
	borderRadius: 999,
	background: T_BRAND,
	color: "#FFFFFF",
	fontSize: 11,
	fontWeight: 800,
	letterSpacing: 0.4,
};

const frameTitleStyle: CSSProperties = {
	fontSize: 14,
	fontWeight: 700,
	color: "var(--semantic-label-normal)",
};

const frameMetaStyle: CSSProperties = {
	fontSize: 11,
	color: "var(--semantic-label-alternative)",
};

const openLinkStyle: CSSProperties = {
	fontSize: 12,
	fontWeight: 700,
	color: T_BRAND,
	textDecoration: "none",
	whiteSpace: "nowrap",
	paddingBottom: 2,
};

const phoneOuterStyle: CSSProperties = {
	width: PHONE_W,
	height: PHONE_H,
	borderRadius: 32,
	overflow: "hidden",
	background: "#FFFFFF",
	border: `1px solid ${GNB_BORDER}`,
	boxShadow: "0 16px 40px rgba(27, 11, 102, 0.12)",
};

const iframeStyle: CSSProperties = {
	width: "100%",
	height: "100%",
	border: "none",
	background: "#FFFFFF",
};
