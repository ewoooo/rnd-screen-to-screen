import type { ReactNode } from "react";

import {
	Card,
	Heading20,
	ListRow,
	ListSub,
	PillChip,
	Placeholder,
	SectionLabel,
	StatBadge,
	T_BRAND,
} from "@/components/home-kit";
import {
	GNB_BORDER,
	PAGE_BG_SEMI,
	T_BRAND_SHADOW,
} from "@/components/home-kit/tokens";
import { ButtonCallToActionPilot } from "@/components/pilot-kit/ButtonCallToActionPilot";
import { DetailShell } from "@/components/search-kit";
import { paymentMethodRegisterMock as mock } from "./_mock";

export default function PaymentMethodRegisterV1PolicyPage() {
	return (
		<DetailShell title="결제 수단 등록" bottom={<StickyFooter />}>
			<PolicyIntro />
			<MethodTypeCard />
			<PayerCard />
			<DetailFieldsCard />
			<RankCard />
			<PolicyNoticeCard />
		</DetailShell>
	);
}

function PolicyIntro() {
	return (
		<Card
			style={{
				padding: "var(--spacing-24)",
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-14)",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "var(--spacing-12)",
				}}
			>
				<SectionLabel>PAY 정책 기반 PoC</SectionLabel>
				<StatBadge>draft</StatBadge>
			</div>
			<Heading20>{"정기 결제에 사용할\n주 결제 수단을 등록해요"}</Heading20>
			<ListSub>
				정책서의 결제 수단 유형, 명의 확인, 차수 제한을 화면 후보로
				옮긴 정적 프로토타입입니다.
			</ListSub>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "var(--spacing-6)",
				}}
			>
				{mock.policyRefs.map((ref) => (
					<PolicyTag key={ref}>{ref}</PolicyTag>
				))}
			</div>
		</Card>
	);
}

function MethodTypeCard() {
	return (
		<SectionCard label="결제 수단 유형" title="사용할 수단을 먼저 고릅니다">
			<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
				{mock.methodTypes.map((method) => (
					<ListRow
						key={method.id}
						thumb={{ w: 40, h: 40, label: method.thumb }}
						title={method.label}
						sub={method.sub}
						trailing={<PillChip>{method.status}</PillChip>}
					/>
				))}
			</div>
		</SectionCard>
	);
}

function PayerCard() {
	return (
		<SectionCard label="결제자 명의 확인" title="명의 기준으로 후보가 달라집니다">
			<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
				{mock.payerTypes.map((payer) => (
					<OptionLine
						key={payer.id}
						title={payer.label}
						sub={payer.sub}
						status={payer.status}
					/>
				))}
			</div>
		</SectionCard>
	);
}

function DetailFieldsCard() {
	return (
		<SectionCard label="결제 정보 입력" title="수단별 필요한 정보를 확인합니다">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-10)",
				}}
			>
				{mock.detailFields.map((field) => (
					<FieldPreview key={field.id} label={field.label} sub={field.sub} />
				))}
			</div>
		</SectionCard>
	);
}

function RankCard() {
	return (
		<SectionCard label="주 결제 수단 차수" title="1차는 필수, 2차는 선택입니다">
			<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
				{mock.rankOptions.map((rank) => (
					<OptionLine
						key={rank.id}
						title={rank.label}
						sub={rank.sub}
						status={rank.status}
					/>
				))}
			</div>
			<div
				style={{
					marginTop: "var(--spacing-18)",
					padding: "var(--spacing-14)",
					borderRadius: 16,
					background: "var(--semantic-fill-normal)",
					display: "flex",
					gap: "var(--spacing-10)",
					alignItems: "flex-start",
				}}
			>
				<Placeholder w={28} h={28} label="!" />
				<ListSub>
					2차 결제 수단으로 계좌이체를 선택하면 이용 불가 안내가
					노출되어야 합니다.
				</ListSub>
			</div>
		</SectionCard>
	);
}

function PolicyNoticeCard() {
	return (
		<SectionCard label="정책 예외 안내" title="등록 전에 막아야 할 조건입니다">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-10)",
				}}
			>
				{mock.policyNotices.map((notice) => (
					<div
						key={notice.id}
						style={{
							display: "flex",
							alignItems: "flex-start",
							gap: "var(--spacing-12)",
							padding: "var(--spacing-14) 0",
							borderTop: `1px solid ${GNB_BORDER}`,
						}}
					>
						<Placeholder w={32} h={32} label="case" />
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: 3,
								minWidth: 0,
							}}
						>
							<span
								style={{
									fontSize: 14,
									fontWeight: 700,
									color: "var(--semantic-label-normal)",
									letterSpacing: 0,
								}}
							>
								{notice.label}
							</span>
							<ListSub>{notice.sub}</ListSub>
						</div>
					</div>
				))}
			</div>
		</SectionCard>
	);
}

function SectionCard({
	label,
	title,
	children,
}: {
	label: string;
	title: string;
	children: ReactNode;
}) {
	return (
		<Card
			style={{
				padding: "var(--spacing-24)",
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-18)",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-8)",
				}}
			>
				<SectionLabel>{label}</SectionLabel>
				<Heading20>{title}</Heading20>
			</div>
			{children}
		</Card>
	);
}

function OptionLine({
	title,
	sub,
	status,
}: {
	title: string;
	sub: string;
	status: string;
}) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "var(--spacing-14)",
			}}
		>
			<div
				style={{
					width: 22,
					height: 22,
					borderRadius: 999,
					border: `2px solid ${T_BRAND}`,
					boxSizing: "border-box",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flex: "0 0 auto",
				}}
			>
				<div
					style={{
						width: 10,
						height: 10,
						borderRadius: 999,
						background: T_BRAND,
					}}
				/>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
					flex: 1,
					minWidth: 0,
				}}
			>
				<span
					style={{
						fontSize: 14,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
						letterSpacing: 0,
					}}
				>
					{title}
				</span>
				<ListSub>{sub}</ListSub>
			</div>
			<PillChip>{status}</PillChip>
		</div>
	);
}

function FieldPreview({ label, sub }: { label: string; sub: string }) {
	return (
		<div
			style={{
				padding: "var(--spacing-16)",
				borderRadius: 16,
				background: "rgba(255, 255, 255, 0.66)",
				border: "1px solid rgba(255, 255, 255, 0.9)",
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-8)",
			}}
		>
			<span
				style={{
					fontSize: 13,
					fontWeight: 700,
					color: "var(--semantic-label-normal)",
					letterSpacing: 0,
				}}
			>
				{label}
			</span>
			<ListSub>{sub}</ListSub>
		</div>
	);
}

function PolicyTag({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				padding: "6px 9px",
				borderRadius: 999,
				background: "var(--semantic-fill-normal)",
				color: "var(--semantic-label-alternative)",
				fontSize: 11,
				fontWeight: 700,
				letterSpacing: 0,
				whiteSpace: "nowrap",
			}}
		>
			{children}
		</span>
	);
}

function StickyFooter() {
	return (
		<div
			style={{
				background: PAGE_BG_SEMI,
				backdropFilter: "blur(4px)",
				WebkitBackdropFilter: "blur(4px)",
				borderTop: `1px solid ${GNB_BORDER}`,
				padding:
					"var(--spacing-12) var(--spacing-20) var(--spacing-24)",
				boxShadow: T_BRAND_SHADOW,
			}}
		>
			<ButtonCallToActionPilot text="등록하기" />
		</div>
	);
}
