import type { ReactNode } from "react";

import {
	AiText,
	BarcodeCard,
	Card,
	DualMenuCard,
	Heading20,
	HeroCard,
	ListRow,
	ListSub,
	ListTitle,
	MonoCaption,
	MyEditButton,
	OfferingBanner,
	PAGE_BG,
	PillChip,
	Placeholder,
	SectionLabel,
	StatBadge,
	StatCard,
	TopBanner,
} from "@/components/home-kit";

export default function HomeKitCatalog() {
	return (
		<div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
			<header>
				<h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>home-kit</h1>
				<p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>
					홈 5화면 조립용 래퍼 카탈로그. 샘플 props로 미리보기.
				</p>
			</header>

			<Item id="Shell" title="Shell" note="화면 전체 프레임 — 카탈로그 대신 home-benefit 등 실제 화면에서 확인">
				<a href="/home-benefit" style={linkStyle}>→ /home-benefit</a>
			</Item>

			<Item id="HeroCard" title="HeroCard">
				<HeroCard
					label="T멤버십 포인트"
					headline={"5곳에서\n사용가능"}
					aiText="AI 제안: 이번 주 영화 추천"
					ctaText="바로 쓰기"
				/>
			</Item>

			<Item id="StatCard" title="StatCard">
				<StatCard
					label="남은 데이터"
					value="32GB"
					badge="+2GB"
					graphic={{ w: 60, h: 60, label: "chart" }}
				/>
			</Item>

			<Item id="BarcodeCard" title="BarcodeCard">
				<BarcodeCard
					label="T멤버십 바코드"
					digits={["1234", "5678", "9012"]}
					timerText="02:34"
				/>
			</Item>

			<Item id="OfferingBanner" title="OfferingBanner">
				<OfferingBanner
					text="T 신용카드로 혜택받기"
					imageSize={{ w: 72, h: 62 }}
					imageLabel="card"
				/>
			</Item>

			<Item id="DualMenuCard" title="DualMenuCard">
				<DualMenuCard
					items={[
						{ id: "a", label: "T 가족모아데이터" },
						{ id: "b", label: "가족 결합" },
					]}
				/>
			</Item>

			<Item id="TopBanner" title="TopBanner">
				<TopBanner
					text="오늘만 특별 혜택!"
					imageSize={{ w: 40, h: 40 }}
					imageLabel="promo"
				/>
			</Item>

			<Item id="ListRow" title="ListRow">
				<Card>
					<ListRow
						thumb={{ w: 48, h: 48, label: "img" }}
						title="왕과 사는 남자"
						sub="VVIP CGV 1인 무료"
						pill="예매"
					/>
				</Card>
			</Item>

			<Item id="Card" title="Card">
				<Card>
					<span style={{ fontSize: 14 }}>임의의 children이 들어가는 기본 카드</span>
				</Card>
			</Item>

			<Item id="MyEditButton" title="MyEditButton">
				<MyEditButton />
			</Item>

			<Item id="Placeholder" title="Placeholder">
				<div style={{ display: "flex", gap: 12 }}>
					<Placeholder w={60} h={60} label="60×60" />
					<Placeholder w={120} h={60} label="120×60" />
				</div>
			</Item>

			<Section title="Text slots" />

			<Item id="SectionLabel" title="SectionLabel">
				<SectionLabel>T멤버십 포인트</SectionLabel>
			</Item>
			<Item id="Heading20" title="Heading20">
				<Heading20>5곳에서{"\n"}사용가능</Heading20>
			</Item>
			<Item id="AiText" title="AiText">
				<AiText>AI가 제안해요</AiText>
			</Item>
			<Item id="ListTitle" title="ListTitle">
				<ListTitle>왕과 사는 남자</ListTitle>
			</Item>
			<Item id="ListSub" title="ListSub">
				<ListSub>VVIP CGV 1인 무료 이용</ListSub>
			</Item>
			<Item id="MonoCaption" title="MonoCaption">
				<div style={{ display: "flex", gap: 12 }}>
					<MonoCaption>1234</MonoCaption>
					<MonoCaption brand>02:34</MonoCaption>
				</div>
			</Item>
			<Item id="StatBadge" title="StatBadge">
				<StatBadge>+2GB</StatBadge>
			</Item>
			<Item id="PillChip" title="PillChip">
				<PillChip>예매</PillChip>
			</Item>
		</div>
	);
}

function Section({ title }: { title: string }) {
	return (
		<div
			style={{
				marginTop: 16,
				paddingBottom: 4,
				fontSize: 13,
				fontWeight: 700,
				letterSpacing: 0.4,
				color: "#6b7280",
				textTransform: "uppercase",
				borderBottom: "1px solid #e5e7eb",
			}}
		>
			{title}
		</div>
	);
}

function Item({
	id,
	title,
	note,
	children,
}: {
	id: string;
	title: string;
	note?: string;
	children: ReactNode;
}) {
	return (
		<section id={id} style={{ display: "flex", flexDirection: "column", gap: 8, scrollMarginTop: 16 }}>
			<div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
				<h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{title}</h3>
				{note ? (
					<span style={{ fontSize: 11, color: "#9ca3af" }}>{note}</span>
				) : null}
			</div>
			<div
				style={{
					width: 360,
					padding: 16,
					background: PAGE_BG,
					borderRadius: 12,
					border: "1px solid #e5e7eb",
				}}
			>
				{children}
			</div>
		</section>
	);
}

const linkStyle = {
	fontSize: 13,
	color: "#3617ce",
	textDecoration: "underline",
} as const;
