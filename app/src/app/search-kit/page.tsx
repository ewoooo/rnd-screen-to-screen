import type { ReactNode } from "react";

import { PAGE_BG } from "@/components/home-kit";
import {
	AiSuggestions,
	CategoryHeader,
	CategoryTabs,
	ChatBubble,
	InfoCard,
	KeyboardPlaceholder,
	ProductCardPrice,
	ProductCardWide,
	RecentChip,
	SearchField,
	SearchPill,
	SuggestionChip,
	SuggestionRow,
} from "@/components/search-kit";

export default function SearchKitCatalog() {
	return (
		<div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
			<header>
				<h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>search-kit</h1>
				<p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>
					검색 11 스텝 조립용 래퍼 카탈로그.
				</p>
			</header>

			<Item id="DetailShell" title="DetailShell" note="화면 프레임 — 실제 스텝에서 확인">
				<a href="/search-01" style={linkStyle}>→ /search-01</a>
			</Item>

			<Item id="SearchField" title="SearchField">
				<SearchField placeholder="검색 또는 질문하기" action="ai" />
			</Item>
			<Item id="SearchField-filled" title="SearchField (value + clearable)">
				<SearchField value="갤럭시 S30 울트라" action="send" clearable withBackChip />
			</Item>

			<Item id="SearchPill" title="SearchPill">
				<SearchPill query="갤럭시 S30 울트라" />
			</Item>

			<Item id="RecentChip" title="RecentChip">
				<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
					<RecentChip label="갤럭시 S30" />
					<RecentChip label="아이폰 16" />
				</div>
			</Item>

			<Item id="SuggestionChip" title="SuggestionChip">
				<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
					<SuggestionChip label="최신 아이폰 비교" />
					<SuggestionChip label="5G 요금제" />
				</div>
			</Item>

			<Item id="SuggestionRow" title="SuggestionRow">
				<SuggestionRow label="갤럭시 S30 울트라 스펙" kind="search" />
				<SuggestionRow label="내게 맞는 요금제 찾기" kind="ai" />
			</Item>

			<Item id="CategoryTabs" title="CategoryTabs">
				<CategoryTabs
					tabs={[
						{ id: "all", label: "전체" },
						{ id: "device", label: "단말기" },
						{ id: "promo", label: "기획전" },
						{ id: "service", label: "부가서비스" },
					]}
					activeId="all"
				/>
			</Item>

			<Item id="CategoryHeader" title="CategoryHeader">
				<CategoryHeader label="기획전" count={2} />
			</Item>

			<Item id="ProductCardWide" title="ProductCardWide">
				<ProductCardWide
					title="T 다이렉트 기획전"
					sub="최대 20만원 할인"
				/>
			</Item>

			<Item id="ProductCardPrice" title="ProductCardPrice">
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
					<ProductCardPrice
						title="갤럭시 S30 울트라"
						originalPrice="1,490,000원"
						monthlyPrice="월 54,800원"
						tags={["추천", "5G"]}
						primaryTag
					/>
					<ProductCardPrice
						title="아이폰 16 Pro"
						originalPrice="1,550,000원"
						monthlyPrice="월 58,200원"
						tags={["신규"]}
					/>
				</div>
			</Item>

			<Item id="InfoCard" title="InfoCard">
				<InfoCard
					title="T 다이렉트 플러스"
					description="원하는 요금제를 온라인으로 저렴하게 가입할 수 있는 T 다이렉트 전용 플랜입니다."
				/>
			</Item>

			<Item id="AiSuggestions" title="AiSuggestions">
				<AiSuggestions
					label="이어서 검색해보세요"
					items={["5G 요금제 비교", "자급제 단말 추천", "가족 결합 할인"]}
				/>
			</Item>

			<Item id="ChatBubble" title="ChatBubble">
				<ChatBubble side="user">내게 맞는 요금제 추천해줘</ChatBubble>
				<ChatBubble side="ai">
					사용 패턴을 알려주시면 맞춤 요금제를 추천해드릴게요.
				</ChatBubble>
			</Item>

			<Item id="KeyboardPlaceholder" title="KeyboardPlaceholder">
				<KeyboardPlaceholder />
			</Item>
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
