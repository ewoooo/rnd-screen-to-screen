import type { CSSProperties } from "react";

const CLUSTERS = [
	{
		key: "join",
		label: "가입 (5)",
		screens: [
			{ id: "signup-terms", title: "01 약관 동의" },
			{ id: "signup-info-form", title: "02 개인정보 입력" },
			{ id: "verification-identity", title: "03 본인인증 (가입)" },
			{ id: "membership-validation", title: "04 회원 검증" },
			{ id: "signup-processing", title: "05 가입 완료" },
		],
	},
	{
		key: "dormancy",
		label: "휴면 (6)",
		screens: [
			{ id: "login", title: "06 로그인" },
			{ id: "dormancy-check", title: "07 휴면 여부 확인" },
			{ id: "identity-auth-dormancy", title: "08 본인인증 (휴면)", isNew: true },
			{ id: "terms-reconsent-dormancy", title: "09 약관 재동의 (휴면)", isNew: true },
			{ id: "dormancy-recovery", title: "10 휴면 해제 처리 중" },
			{ id: "dormancy-recovery-complete", title: "11 휴면 해제 완료" },
		],
	},
	{
		key: "withdrawal",
		label: "탈퇴 (6)",
		screens: [
			{ id: "identity-auth-withdrawal", title: "12 본인인증 (탈퇴)", isNew: true },
			{ id: "withdrawal-reason-input", title: "13 탈퇴 사유" },
			{ id: "withdrawal-pre-notice", title: "14 탈퇴 전 안내" },
			{ id: "withdrawal-final-consent", title: "15 탈퇴 최종 동의" },
			{ id: "withdrawal-processing", title: "16 탈퇴 처리 중" },
			{ id: "withdrawal-complete", title: "17 탈퇴 완료" },
		],
	},
	{
		key: "rejoin",
		label: "재가입 (5)",
		screens: [
			{ id: "identity-auth-rejoin", title: "18 본인인증 (재가입)", isNew: true },
			{ id: "rejoin-history-check", title: "19 이력 확인" },
			{ id: "rejoin-eligibility", title: "20 재가입 가능 여부" },
			{ id: "personal-info-input-rejoin", title: "21 정보 입력 (재가입)", isNew: true },
			{ id: "rejoin-processing", title: "22 재가입 완료" },
		],
	},
] as const;

const FRAME_W = 360;
const FRAME_H = 740;
const SCALE = 0.6;
const CARD_W = FRAME_W * SCALE;
const CARD_H = FRAME_H * SCALE;

export default function MembershipV2AllPage() {
	return (
		<main style={pageStyle}>
			<header style={headerStyle}>
				<h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
					멤버십 v2 · 22 화면 모아보기
				</h1>
				<p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
					각 카드 클릭 시 해당 라우트로 이동 · 가로 스크롤로 클러스터 내 화면을 한눈에 비교
				</p>
			</header>

			{CLUSTERS.map((cluster) => (
				<section key={cluster.key} style={clusterStyle}>
					<div style={clusterHeadStyle}>
						<h2 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{cluster.label}</h2>
					</div>
					<div style={scrollerStyle}>
						{cluster.screens.map((screen) => (
							<a key={screen.id} href={`/${screen.id}/v2-kit`} style={cardLinkStyle}>
								<div style={cardHeaderStyle}>
									<span style={cardTitleStyle}>{screen.title}</span>
									{"isNew" in screen && screen.isNew ? (
										<span style={newBadgeStyle}>NEW</span>
									) : null}
								</div>
								<div style={frameWrapStyle}>
									<iframe
										src={`/${screen.id}/v2-kit?embed=1`}
										title={screen.title}
										style={iframeStyle}
										loading="lazy"
									/>
								</div>
								<span style={cardIdStyle}>{screen.id}</span>
							</a>
						))}
					</div>
				</section>
			))}
		</main>
	);
}

const pageStyle: CSSProperties = {
	padding: "20px 16px 40px",
	display: "flex",
	flexDirection: "column",
	gap: 24,
	background: "#f3f4f6",
	minHeight: "100vh",
};

const headerStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: 4,
	padding: "0 4px",
};

const clusterStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: 10,
};

const clusterHeadStyle: CSSProperties = {
	padding: "0 4px",
};

const scrollerStyle: CSSProperties = {
	display: "flex",
	gap: 16,
	overflowX: "auto",
	overflowY: "hidden",
	padding: "8px 4px 16px",
	scrollSnapType: "x proximity",
};

const cardLinkStyle: CSSProperties = {
	flex: "0 0 auto",
	display: "flex",
	flexDirection: "column",
	gap: 8,
	textDecoration: "none",
	color: "inherit",
	scrollSnapAlign: "start",
};

const cardHeaderStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: 8,
	width: CARD_W,
};

const cardTitleStyle: CSSProperties = {
	fontSize: 12,
	fontWeight: 600,
	color: "#111827",
};

const newBadgeStyle: CSSProperties = {
	fontSize: 10,
	fontWeight: 700,
	color: "#7c3aed",
	background: "#ede9fe",
	padding: "2px 6px",
	borderRadius: 999,
};

const frameWrapStyle: CSSProperties = {
	width: CARD_W,
	height: CARD_H,
	overflow: "hidden",
	borderRadius: 16,
	border: "1px solid #e5e7eb",
	background: "#fff",
	boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
};

const iframeStyle: CSSProperties = {
	width: FRAME_W,
	height: FRAME_H,
	border: 0,
	transform: `scale(${SCALE})`,
	transformOrigin: "top left",
	pointerEvents: "none",
};

const cardIdStyle: CSSProperties = {
	fontSize: 10,
	color: "#9ca3af",
	fontFamily: "ui-monospace, SFMono-Regular, monospace",
};
