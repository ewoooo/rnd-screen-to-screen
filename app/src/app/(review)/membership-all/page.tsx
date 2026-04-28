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
	{ href: "/signup-terms/v1-kit", step: "01", title: "약관 동의", policy: "PR-MBR-CS-001-01" },
	{ href: "/signup-info-form/v1-kit", step: "02", title: "개인정보 입력", policy: "PR-MBR-CS-001-02" },
	{ href: "/verification-identity/v1-kit", step: "03", title: "본인인증", policy: "PR-MBR-CS-001-03" },
	{ href: "/membership-validation/v1-kit", step: "04", title: "회원 검증", policy: "PR-MBR-CS-001-04" },
	{ href: "/signup-processing/v1-kit", step: "05", title: "가입 완료", policy: "PR-MBR-CS-001-05" },
	{ href: "/login/v1-kit", step: "06", title: "로그인", policy: "PR-MBR-CS-002-01" },
	{ href: "/dormancy-check/v1-kit", step: "07", title: "휴면 여부 확인", policy: "PR-MBR-CS-002-02" },
	{ href: "/dormancy-recovery/v1-kit", step: "08", title: "휴면 해제 처리", policy: "PR-MBR-CS-002-05" },
	{ href: "/dormancy-recovery-complete/v1-kit", step: "09", title: "휴면 해제 완료", policy: "PR-MBR-CS-002-06" },
	{ href: "/withdrawal-reason-input/v1-kit", step: "10", title: "탈퇴 사유 입력", policy: "PR-MBR-CS-003-02" },
	{ href: "/withdrawal-pre-notice/v1-kit", step: "11", title: "탈퇴 전 안내", policy: "PR-MBR-CS-003-03" },
	{ href: "/withdrawal-final-consent/v1-kit", step: "12", title: "탈퇴 최종 동의", policy: "PR-MBR-CS-003-04" },
	{ href: "/withdrawal-processing/v1-kit", step: "13", title: "탈퇴 처리 중", policy: "PR-MBR-CS-003-05" },
	{ href: "/withdrawal-complete/v1-kit", step: "14", title: "탈퇴 완료", policy: "PR-MBR-CS-003-06" },
	{ href: "/rejoin-history-check/v1-kit", step: "15", title: "기존 회원 이력 확인", policy: "PR-MBR-CS-004-02" },
	{ href: "/rejoin-eligibility/v1-kit", step: "16", title: "재가입 가능 여부", policy: "PR-MBR-CS-004-03" },
	{ href: "/rejoin-processing/v1-kit", step: "17", title: "재가입 완료", policy: "PR-MBR-CS-004-05" },
];

const PHONE_W = 360;
const PHONE_H = 800;

export default function MembershipAllReviewPage() {
	return (
		<div style={pageStyle}>
			<header style={headerStyle}>
				<div>
					<h1 style={titleStyle}>멤버십 화면 리뷰 — 가입 / 로그인·휴면 / 탈퇴 / 재가입</h1>
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
