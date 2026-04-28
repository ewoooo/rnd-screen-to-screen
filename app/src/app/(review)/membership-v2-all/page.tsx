import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import {
	ActionChip,
	CharCountTextarea,
	CheckIndicator,
	CheckList,
	MethodToggle,
	StatusRowList,
	TermsRow,
} from "@/components/auth-kit";
import { Heading20, ListSub, SectionLabel } from "@/components/home-kit";
import { GNB_BORDER, PAGE_BG, T_BRAND, T_BRAND_SHADOW } from "@/components/home-kit/tokens";
import {
	DetailGrid,
	FieldGroup,
	FieldInput,
	FieldLabel,
	Hero,
	InfoBox,
	ResultIcon,
	StepBar,
} from "@/components/payment-kit";
import { ButtonCallToActionPilot } from "@/components/pilot-kit/ButtonCallToActionPilot";

/**
 * 멤버십 v2 — 정책서 fresh re-read 결과 22 화면을 가로 트랙으로 펼친 리뷰 페이지.
 * v1(/membership-all)과 어휘는 같지만 분할이 다름 — 일관성 테스트 산출물.
 *
 * 라우트 폭발을 막기 위해 22 standalone 라우트는 만들지 않고 한 페이지 inline JSX.
 * DetailShell(position: fixed sticky)을 못 쓰는 폰 프레임 환경이라 미니 PhoneFrame 사용.
 */

type Frame = {
	step: string;
	title: string;
	policy: string;
	cluster: "join" | "dormancy" | "withdrawal" | "rejoin";
	cta?: string;
	render: () => ReactNode;
};

const PHONE_W = 360;
const PHONE_H = 740;

const VIOLET_FILL = "rgba(94,63,247,0.08)";

export default function MembershipV2AllPage() {
	return (
		<div style={pageStyle}>
			<header style={headerStyle}>
				<div>
					<h1 style={titleStyle}>멤버십 화면 v2 — 정책서 fresh re-read (22 화면)</h1>
					<p style={subStyle}>
						v1(17화면)과 동일 정책서를 두 번째로 읽고 fresh 분할. 본인인증이 라이프사이클마다 별도
						게이트로 분리되어 +5 증가. 어휘(auth-kit/payment-kit)는 v1과 동일 — 일관성 테스트 변수 통제.
					</p>
				</div>
				<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
					<Link href="/membership-all" style={altLinkStyle}>v1 (17) ›</Link>
					<Link href="/" style={homeLinkStyle}>홈으로 ›</Link>
				</div>
			</header>
			<div style={scrollWrapStyle}>
				<div style={trackStyle}>
					{frames.map((f) => (
						<FrameCell key={f.step} frame={f} />
					))}
				</div>
			</div>
		</div>
	);
}

function FrameCell({ frame }: { frame: Frame }) {
	return (
		<div style={frameWrapStyle}>
			<div style={metaRowStyle}>
				<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<span style={{ ...stepBadgeStyle, background: clusterColor(frame.cluster) }}>
						{frame.step}
					</span>
					<span style={frameTitleStyle}>{frame.title}</span>
					<span style={frameMetaStyle}>{frame.policy}</span>
				</div>
			</div>
			<PhoneFrame title={frame.title} cta={frame.cta}>
				{frame.render()}
			</PhoneFrame>
		</div>
	);
}

function PhoneFrame({
	title,
	children,
	cta,
}: {
	title: string;
	children: ReactNode;
	cta?: string;
}) {
	return (
		<div style={phoneOuterStyle}>
			<div style={statusBarStyle}>
				<span>7:28</span>
				<span style={{ opacity: 0.6 }}>status</span>
			</div>
			<div style={phoneHeaderStyle}>
				<span style={{ fontSize: 22, fontWeight: 500, color: "var(--semantic-label-normal)" }}>‹</span>
				<span style={phoneTitleStyle}>{title}</span>
			</div>
			<div style={{ ...phoneBodyStyle, paddingBottom: cta ? 96 : 24 }}>
				<div style={contentStyle}>{children}</div>
			</div>
			{cta ? (
				<div style={ctaBarStyle}>
					<ButtonCallToActionPilot text={cta} />
				</div>
			) : null}
		</div>
	);
}

const clusterColor = (c: Frame["cluster"]) => {
	switch (c) {
		case "join":
			return T_BRAND;
		case "dormancy":
			return "#7a4ff5";
		case "withdrawal":
			return "#c84e3a";
		case "rejoin":
			return "#3a8ec8";
	}
};

// ─────────────────────────── Reusable blocks ───────────────────────────

function Result({
	tone,
	glyph,
	rotate,
	title,
	sub,
}: {
	tone: "success" | "warning";
	glyph: string;
	rotate?: boolean;
	title: string;
	sub?: string;
}) {
	return (
		<div style={resultBlockStyle}>
			<div className={rotate ? "rotate-cw" : undefined}>
				<ResultIcon tone={tone} glyph={glyph} />
			</div>
			<div style={{ paddingTop: 6, textAlign: "center" }}>
				<Heading20>{title}</Heading20>
			</div>
			{sub ? (
				<div style={{ textAlign: "center", padding: "0 var(--spacing-8)" }}>
					<ListSub>{sub}</ListSub>
				</div>
			) : null}
		</div>
	);
}

function IdentityAuthScreen({ stepIndex, stepTotal }: { stepIndex: number; stepTotal: number }) {
	return (
		<>
			<StepBar index={stepIndex} total={stepTotal} />
			<Hero
				title={["본인인증을", "진행해 주세요"]}
				sub="안전한 처리를 위해 휴대폰 또는 이메일로 본인을 확인해요."
			/>
			<MethodToggle
				items={[
					{ key: "phone", label: "휴대폰 인증", active: true },
					{ key: "email", label: "이메일 인증" },
				]}
			/>
			<div style={formStackStyle}>
				<FieldGroup>
					<FieldLabel>휴대폰 번호</FieldLabel>
					<FieldInput value="010-1234-5678" trailing={<ActionChip label="인증번호 받기" />} />
				</FieldGroup>
				<FieldGroup>
					<FieldLabel>인증번호</FieldLabel>
					<FieldInput
						value="428••"
						focused
						letterSpacing={6}
						trailing={<ActionChip label="02:48" tone="plain" tabular />}
					/>
				</FieldGroup>
			</div>
			<InfoBox
				bullets={[
					"인증번호 유효시간은 3분이에요.",
					"3회 실패 시 일정 시간 동안 인증이 제한될 수 있어요.",
				]}
			/>
		</>
	);
}

function TermsConsentScreen({
	heading,
	sub,
	noticeBullets,
}: {
	heading: readonly string[];
	sub: string;
	noticeBullets: readonly string[];
}) {
	return (
		<>
			<Hero title={heading} sub={sub} />
			<TermsRow label="전체 동의 (선택 항목 포함)" checked emphasized />
			<div style={groupStyle}>
				<SectionLabel>필수 약관</SectionLabel>
				<TermsRow label="서비스 이용약관" required checked />
				<TermsRow label="개인정보 수집·이용 동의" required checked />
			</div>
			<div style={groupStyle}>
				<SectionLabel>선택 약관</SectionLabel>
				<TermsRow label="마케팅 정보 수신 동의" checked />
				<TermsRow label="맞춤형 혜택 제공 동의" />
			</div>
			<InfoBox bullets={noticeBullets} />
		</>
	);
}

// ─────────────────────────── 22 Frames ───────────────────────────

const frames: readonly Frame[] = [
	// 가입 (5)
	{
		step: "01",
		title: "약관 동의",
		policy: "PR-MBR-CS-001-01",
		cluster: "join",
		cta: "동의하고 계속하기",
		render: () => (
			<TermsConsentScreen
				heading={["T우주 시작을 위해", "약관에 동의해 주세요"]}
				sub="필수 약관에 동의해야 가입을 진행할 수 있어요."
				noticeBullets={[
					"만 14세 미만 고객은 법정대리인 동의가 필요해요.",
					"동의한 약관 버전은 동의이력에 안전하게 저장돼요.",
				]}
			/>
		),
	},
	{
		step: "02",
		title: "개인정보 입력",
		policy: "PR-MBR-CS-001-02",
		cluster: "join",
		cta: "본인인증 받기",
		render: () => (
			<>
				<StepBar index={0} total={3} />
				<Hero title={["기본 정보를", "입력해 주세요"]} sub="다음 단계인 본인인증 후 가입이 완료돼요." />
				<div style={formStackStyle}>
					<FieldGroup>
						<FieldLabel>이름</FieldLabel>
						<FieldInput value="이정훈" />
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>아이디</FieldLabel>
						<FieldInput value="junghoon99" trailing={<ActionChip label="중복확인" />} />
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>비밀번호</FieldLabel>
						<FieldInput value="•••••••••••" letterSpacing={4} />
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>이메일</FieldLabel>
						<FieldInput value="junghoon99@example.com" trailing={<ActionChip label="중복확인" />} />
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>휴대폰 번호</FieldLabel>
						<FieldInput value="010-1234-5678" focused />
					</FieldGroup>
				</div>
				<InfoBox
					bullets={[
						"비밀번호는 영문·숫자·특수문자를 모두 포함해야 해요.",
						"이미 가입된 정보는 사용할 수 없어요.",
					]}
				/>
			</>
		),
	},
	{
		step: "03",
		title: "본인인증 (가입)",
		policy: "PR-MBR-CS-001-03",
		cluster: "join",
		cta: "인증하고 계속하기",
		render: () => <IdentityAuthScreen stepIndex={1} stepTotal={3} />,
	},
	{
		step: "04",
		title: "회원 검증",
		policy: "PR-MBR-CS-001-04",
		cluster: "join",
		cta: "로그인 페이지로 이동",
		render: () => (
			<>
				<Result
					tone="warning"
					glyph="ⓘ"
					title={"이미 가입한\n계정이 있어요"}
					sub="you@example.com 으로 가입된 정상 회원이에요."
				/>
				<DetailGrid
					items={[
						{ key: "회원 상태", value: "정상 회원" },
						{ key: "가입일", value: "2023.04.18" },
						{ key: "판정 코드", value: "DUPLICATE_CI", tone: "violet" },
					]}
				/>
				<InfoBox
					title="다음 단계 안내"
					bullets={[
						"이미 가입된 계정으로 로그인해 주세요.",
						"비밀번호가 기억나지 않으면 비밀번호 찾기를 이용하세요.",
					]}
				/>
			</>
		),
	},
	{
		step: "05",
		title: "가입 완료",
		policy: "PR-MBR-CS-001-05",
		cluster: "join",
		cta: "T우주 시작하기",
		render: () => (
			<>
				<Result tone="success" glyph="✓" title={"회원가입이\n완료됐어요"} sub="2026년 4월 28일 오후 2:14" />
				<DetailGrid
					items={[
						{ key: "회원 ID", value: "u-2826-9410" },
						{ key: "가입 채널", value: "앱" },
						{ key: "처리 결과", value: "정상", tone: "violet" },
					]}
				/>
				<StatusRowList
					title="가입 안내 발송"
					items={[
						{ id: "email", label: "📩 가입 안내 이메일", value: "발송 완료", tone: "success" },
						{ id: "sms", label: "💬 가입 안내 SMS", value: "발송 완료", tone: "success" },
					]}
				/>
				<InfoBox bullets={["자동 로그인된 상태로 T우주 홈으로 이동해요."]} />
			</>
		),
	},
	// 휴면 (6)
	{
		step: "06",
		title: "로그인",
		policy: "PR-MBR-CS-002-01",
		cluster: "dormancy",
		cta: "로그인",
		render: () => (
			<>
				<Hero title={["T우주에", "로그인해 주세요"]} />
				<div style={formStackStyle}>
					<FieldGroup>
						<FieldLabel>아이디</FieldLabel>
						<FieldInput value="junghoon99" />
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>비밀번호</FieldLabel>
						<FieldInput value="•••••••••••" letterSpacing={4} focused />
					</FieldGroup>
				</div>
				<div style={auxLinksStyle}>
					<span style={auxItemStyle}>아이디 찾기</span>
					<span style={auxSepStyle}>·</span>
					<span style={auxItemStyle}>비밀번호 찾기</span>
					<span style={auxSepStyle}>·</span>
					<span style={auxItemStyle}>회원가입</span>
				</div>
				<InfoBox bullets={["1년 이상 미접속 계정은 휴면 상태로 전환돼요."]} />
			</>
		),
	},
	{
		step: "07",
		title: "휴면 여부 확인",
		policy: "PR-MBR-CS-002-02",
		cluster: "dormancy",
		cta: "휴면 해제 진행하기",
		render: () => (
			<>
				<Result
					tone="warning"
					glyph="💤"
					title={"휴면 상태\n계정이에요"}
					sub="1년 이상 미접속으로 휴면 처리된 계정이에요."
				/>
				<DetailGrid
					items={[
						{ key: "회원 상태", value: "휴면", tone: "violet" },
						{ key: "휴면 전환일", value: "2025.04.10" },
						{ key: "마지막 접속", value: "2024.04.09" },
					]}
				/>
				<InfoBox
					title="휴면 해제 조건"
					bullets={["본인인증을 진행해요.", "이용약관·개인정보 처리방침에 다시 동의해요."]}
				/>
			</>
		),
	},
	{
		step: "08",
		title: "본인인증 (휴면 해제)",
		policy: "PR-MBR-CS-002-03",
		cluster: "dormancy",
		cta: "인증하고 계속하기",
		render: () => <IdentityAuthScreen stepIndex={0} stepTotal={3} />,
	},
	{
		step: "09",
		title: "약관 재동의 (휴면)",
		policy: "PR-MBR-CS-002-04",
		cluster: "dormancy",
		cta: "동의하고 해제하기",
		render: () => (
			<TermsConsentScreen
				heading={["휴면 해제를 위해", "약관에 다시 동의해 주세요"]}
				sub="휴면 기간 중 변경된 약관에 다시 동의해야 해제가 진행돼요."
				noticeBullets={[
					"휴면 기간 중 변경된 항목만 재동의 대상이에요.",
					"동의 이력은 갱신되어 저장돼요.",
				]}
			/>
		),
	},
	{
		step: "10",
		title: "휴면 해제 처리 중",
		policy: "PR-MBR-CS-002-05",
		cluster: "dormancy",
		render: () => (
			<>
				<Result
					tone="success"
					glyph="⟳"
					rotate
					title={"휴면 해제를\n처리하고 있어요"}
					sub="잠시만 기다려 주세요."
				/>
				<StatusRowList
					title="처리 단계"
					items={[
						{ id: "auth", label: "본인 확인", value: "완료", tone: "success" },
						{ id: "agree", label: "약관 재동의 반영", value: "완료", tone: "success" },
						{ id: "state", label: "회원 상태 전환", value: "진행 중" },
						{ id: "restore", label: "분리 보관 데이터 복원", value: "대기 중" },
					]}
				/>
			</>
		),
	},
	{
		step: "11",
		title: "휴면 해제 완료",
		policy: "PR-MBR-CS-002-06",
		cluster: "dormancy",
		cta: "T우주 시작하기",
		render: () => (
			<>
				<Result tone="success" glyph="✓" title={"휴면이\n해제됐어요"} sub="2026년 4월 28일 오후 2:47" />
				<DetailGrid
					items={[
						{ key: "회원 상태", value: "정상 회원", tone: "violet" },
						{ key: "복원된 항목", value: "프로필, 약관 동의" },
					]}
				/>
				<StatusRowList
					title="복원 결과"
					items={[
						{ id: "p", label: "기본 프로필", value: "복원 완료", tone: "success" },
						{ id: "c", label: "약관 동의 이력", value: "복원 완료", tone: "success" },
						{ id: "h", label: "이전 알림 설정", value: "재설정 필요", tone: "warning" },
					]}
				/>
			</>
		),
	},
	// 탈퇴 (6)
	{
		step: "12",
		title: "본인인증 (탈퇴)",
		policy: "PR-MBR-CS-003-01",
		cluster: "withdrawal",
		cta: "인증하고 계속하기",
		render: () => <IdentityAuthScreen stepIndex={0} stepTotal={4} />,
	},
	{
		step: "13",
		title: "탈퇴 사유 입력",
		policy: "PR-MBR-CS-003-02",
		cluster: "withdrawal",
		cta: "다음",
		render: () => (
			<>
				<StepBar index={1} total={4} />
				<Hero
					title={["탈퇴하시는 이유가", "무엇인가요?"]}
					sub="더 나은 서비스를 위해 알려주세요."
				/>
				<CheckList
					items={[
						{ key: "price", label: "가격이 부담돼요", checked: true },
						{ key: "use", label: "이용 빈도가 낮아요" },
						{ key: "alt", label: "다른 서비스로 옮겨요" },
						{ key: "ux", label: "사용이 불편해요" },
						{ key: "etc", label: "기타 (직접 입력)", checked: true },
					]}
				/>
				<CharCountTextarea
					label="자유 의견 (선택)"
					value="구독료가 다른 서비스 대비 부담돼서요."
					placeholder="더 자세한 의견을 들려주세요. (최대 500자)"
					max={500}
				/>
			</>
		),
	},
	{
		step: "14",
		title: "탈퇴 전 안내",
		policy: "PR-MBR-CS-003-03",
		cluster: "withdrawal",
		cta: "다음",
		render: () => (
			<>
				<StepBar index={2} total={4} />
				<Hero title={["탈퇴 전", "꼭 확인해 주세요"]} />
				<DetailGrid
					items={[
						{ key: "보유 T+ 포인트", value: "12,400P" },
						{ key: "보유 쿠폰", value: "2장" },
						{ key: "다음 정기결제일", value: "2026.05.10" },
					]}
				/>
				<InfoBox
					title="탈퇴 시 처리 사항"
					bullets={[
						"보유 포인트(12,400P)는 탈퇴 즉시 소멸돼요.",
						"발급된 쿠폰 2장은 모두 회수돼요.",
						"미납 금액이 있으면 탈퇴를 진행할 수 없어요.",
					]}
				/>
				<TermsRow label="위 내용을 모두 확인했어요" checked emphasized />
			</>
		),
	},
	{
		step: "15",
		title: "탈퇴 최종 동의",
		policy: "PR-MBR-CS-003-04",
		cluster: "withdrawal",
		cta: "최종 동의하고 탈퇴",
		render: () => (
			<>
				<StepBar index={3} total={4} />
				<Hero title={["정말로", "탈퇴하시겠어요?"]} />
				<InfoBox
					title="철회 가능 기간"
					bullets={[
						"탈퇴 후 7일 이내(2026-05-05까지) 철회 가능해요.",
						"7일이 지나면 철회할 수 없어요.",
					]}
				/>
				<InfoBox
					title="개인정보 처리"
					bullets={["즉시 파기: 프로필, 마케팅 동의 이력", "법정 보관: 결제 내역(5년)"]}
				/>
				<div style={groupStyle}>
					<TermsRow label="탈퇴 및 개인정보 처리에 동의해요" required checked />
					<TermsRow label="철회 가능 기간(7일)을 확인했어요" required checked />
				</div>
			</>
		),
	},
	{
		step: "16",
		title: "탈퇴 처리 중",
		policy: "PR-MBR-CS-003-05",
		cluster: "withdrawal",
		render: () => (
			<>
				<Result
					tone="warning"
					glyph="⟳"
					rotate
					title={"탈퇴를\n처리하고 있어요"}
					sub="잠시만 기다려 주세요."
				/>
				<StatusRowList
					title="처리 단계"
					items={[
						{ id: "state", label: "회원 상태 전환", value: "완료", tone: "success" },
						{ id: "session", label: "로그인 세션 종료", value: "완료", tone: "success" },
						{ id: "classify", label: "데이터 분류(파기/보관)", value: "진행 중" },
						{ id: "queue", label: "후속 처리 큐 등록", value: "대기 중" },
					]}
				/>
			</>
		),
	},
	{
		step: "17",
		title: "탈퇴 완료",
		policy: "PR-MBR-CS-003-06",
		cluster: "withdrawal",
		cta: "앱 종료",
		render: () => (
			<>
				<Result tone="warning" glyph="👋" title={"탈퇴가\n완료됐어요"} sub="2026년 4월 28일 오후 2:30" />
				<DetailGrid
					items={[
						{ key: "회원 상태", value: "탈퇴 유예", tone: "violet" },
						{ key: "철회 가능 기한", value: "2026.05.05 23:59", tone: "violet" },
					]}
				/>
				<StatusRowList
					title="데이터 처리 결과"
					items={[
						{ id: "p", label: "프로필·기기 정보", value: "즉시 파기", tone: "success" },
						{ id: "m", label: "결제 내역", value: "법정 보관 5년", tone: "warning" },
					]}
				/>
			</>
		),
	},
	// 재가입 (5)
	{
		step: "18",
		title: "본인인증 (재가입)",
		policy: "PR-MBR-CS-004-01",
		cluster: "rejoin",
		cta: "인증하고 계속하기",
		render: () => <IdentityAuthScreen stepIndex={0} stepTotal={4} />,
	},
	{
		step: "19",
		title: "기존 회원 이력 확인",
		policy: "PR-MBR-CS-004-02",
		cluster: "rejoin",
		cta: "재가입 가능 여부 확인",
		render: () => (
			<>
				<Hero
					title={["이전 가입 이력을", "확인했어요"]}
					sub="동일한 본인인증 정보로 가입한 계정 이력이에요."
				/>
				<DetailGrid
					items={[
						{ key: "기존 회원 ID", value: "u-1820-0042" },
						{ key: "원 가입일", value: "2024.01.15" },
						{ key: "탈퇴일", value: "2025.10.20" },
					]}
				/>
				<StatusRowList
					title="이력 타임라인"
					items={[
						{ id: "j", label: "가입", value: "2024.01.15", tone: "success" },
						{ id: "d", label: "휴면 전환", value: "2025.04.10", tone: "warning" },
						{ id: "r", label: "휴면 해제", value: "2025.06.02", tone: "success" },
						{ id: "l", label: "탈퇴", value: "2025.10.20", tone: "warning" },
					]}
				/>
			</>
		),
	},
	{
		step: "20",
		title: "재가입 가능 여부",
		policy: "PR-MBR-CS-004-03",
		cluster: "rejoin",
		cta: "복원하고 재가입",
		render: () => (
			<>
				<Result
					tone="success"
					glyph="✓"
					title={"재가입이\n가능해요"}
					sub="이전 계정의 일부 정보를 복원해서 시작할 수 있어요."
				/>
				<DetailGrid
					items={[
						{ key: "재가입 가능 여부", value: "가능", tone: "violet" },
						{ key: "탈퇴일", value: "2025.10.20" },
						{ key: "제한 종료일", value: "해당 없음" },
					]}
				/>
				<StatusRowList
					title="복원 가능 항목"
					items={[
						{ id: "p", label: "기본 프로필", value: "복원 가능", tone: "success" },
						{ id: "i", label: "관심 카테고리", value: "복원 가능", tone: "success" },
						{ id: "c", label: "쿠폰·포인트", value: "복원 불가", tone: "warning" },
					]}
				/>
			</>
		),
	},
	{
		step: "21",
		title: "정보 입력 (재가입)",
		policy: "PR-MBR-CS-004-04",
		cluster: "rejoin",
		cta: "재가입 진행",
		render: () => (
			<>
				<StepBar index={2} total={3} />
				<Hero
					title={["복원할 정보를", "확인해 주세요"]}
					sub="이전 계정에서 복원할 항목을 선택하고 변경된 약관에 다시 동의해요."
				/>
				<div style={formStackStyle}>
					<FieldGroup>
						<FieldLabel>이름 (이전 정보)</FieldLabel>
						<FieldInput value="이정훈" trailing={<ActionChip label="유지" />} />
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>이메일</FieldLabel>
						<FieldInput value="junghoon99@example.com" trailing={<ActionChip label="중복확인" />} />
					</FieldGroup>
					<FieldGroup>
						<FieldLabel>휴대폰 번호</FieldLabel>
						<FieldInput value="010-1234-5678" focused />
					</FieldGroup>
				</div>
				<TermsRow label="변경된 약관에 다시 동의해요" required checked emphasized />
			</>
		),
	},
	{
		step: "22",
		title: "재가입 완료",
		policy: "PR-MBR-CS-004-05",
		cluster: "rejoin",
		cta: "T우주 시작하기",
		render: () => (
			<>
				<Result
					tone="success"
					glyph="✓"
					title={"다시 만나서\n반가워요"}
					sub="2026년 4월 28일 오후 2:55"
				/>
				<DetailGrid
					items={[
						{ key: "회원 상태", value: "정상 회원", tone: "violet" },
						{ key: "회원 ID", value: "u-1820-0042 (복원)" },
						{ key: "처리 결과", value: "정상" },
					]}
				/>
				<StatusRowList
					title="복원 결과"
					items={[
						{ id: "p", label: "기본 프로필", value: "복원 완료", tone: "success" },
						{ id: "i", label: "관심 카테고리", value: "복원 완료", tone: "success" },
						{ id: "c", label: "쿠폰·포인트", value: "복원 불가", tone: "warning" },
					]}
				/>
			</>
		),
	},
];

// ─────────────────────────── Styles ───────────────────────────

const pageStyle: CSSProperties = {
	minHeight: "100vh",
	background: PAGE_BG,
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
	maxWidth: 720,
	lineHeight: 1.5,
};

const homeLinkStyle: CSSProperties = {
	fontSize: 13,
	fontWeight: 700,
	color: T_BRAND,
	textDecoration: "none",
	whiteSpace: "nowrap",
};

const altLinkStyle: CSSProperties = {
	fontSize: 13,
	fontWeight: 700,
	color: "var(--semantic-label-alternative)",
	textDecoration: "none",
	whiteSpace: "nowrap",
	padding: "6px 12px",
	borderRadius: 999,
	background: VIOLET_FILL,
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
	padding: "2px 10px",
	borderRadius: 999,
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

const phoneOuterStyle: CSSProperties = {
	position: "relative",
	width: PHONE_W,
	height: PHONE_H,
	borderRadius: 32,
	overflow: "hidden",
	background: PAGE_BG,
	border: `1px solid ${GNB_BORDER}`,
	boxShadow: "0 16px 40px rgba(27, 11, 102, 0.12)",
	display: "flex",
	flexDirection: "column",
};

const statusBarStyle: CSSProperties = {
	height: 44,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0 var(--spacing-20)",
	fontSize: 15,
	fontWeight: 600,
	color: "var(--semantic-label-normal)",
	flexShrink: 0,
};

const phoneHeaderStyle: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "var(--spacing-12)",
	padding: "var(--spacing-16) var(--spacing-20)",
	flexShrink: 0,
};

const phoneTitleStyle: CSSProperties = {
	fontSize: 18,
	fontWeight: 700,
	color: "var(--semantic-label-normal)",
	letterSpacing: -0.9,
};

const phoneBodyStyle: CSSProperties = {
	flex: 1,
	overflowY: "auto",
	padding: "0 var(--spacing-20) 24px",
};

const contentStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-12)",
};

const ctaBarStyle: CSSProperties = {
	position: "absolute",
	left: 0,
	right: 0,
	bottom: 0,
	background: "rgba(235,238,246,0.95)",
	backdropFilter: "blur(4px)",
	WebkitBackdropFilter: "blur(4px)",
	borderTop: `1px solid ${GNB_BORDER}`,
	padding: "var(--spacing-12) var(--spacing-20) var(--spacing-20)",
	boxShadow: T_BRAND_SHADOW,
};

const formStackStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-12)",
};

const groupStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "var(--spacing-4)",
};

const resultBlockStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "var(--spacing-8)",
	paddingTop: "var(--spacing-16)",
};

const auxLinksStyle: CSSProperties = {
	display: "flex",
	justifyContent: "center",
	gap: "var(--spacing-8)",
	paddingTop: "var(--spacing-4)",
};

const auxItemStyle: CSSProperties = {
	fontSize: 13,
	color: "var(--semantic-label-alternative)",
};

const auxSepStyle: CSSProperties = {
	color: "var(--semantic-label-assistive)",
};
