import { Placeholder } from "@/components/home-kit";
import {
	AiSuggestions,
	CategoryHeader,
	CategoryTabs,
	DetailShell,
	InfoCard,
	ProductCardPrice,
	SearchPill,
} from "@/components/search-kit";
import {
	aiFollowups,
	categoryTabs,
	deviceCards,
	infoCard,
} from "./_mock";

export default function Search06V1Kit() {
	return (
		<DetailShell
			title="아이폰 20"
			trailing={<Placeholder w={24} h={24} label="↻" />}
			bottom={<SearchPill query="아이폰 20" />}
		>
			<CategoryTabs tabs={categoryTabs} activeId="all" />

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "var(--spacing-8)",
				}}
			>
				{deviceCards.map((c) => (
					<ProductCardPrice
						key={c.id}
						title={c.title}
						originalPrice={c.originalPrice}
						monthlyPrice={c.monthlyPrice}
						tags={c.tags}
						primaryTag={c.primaryTag}
					/>
				))}
			</div>

			<CategoryHeader label="부가서비스" count={1} />
			<InfoCard title={infoCard.title} description={infoCard.description} />

			<AiSuggestions label="이어서 검색해보세요" items={aiFollowups} />
		</DetailShell>
	);
}
