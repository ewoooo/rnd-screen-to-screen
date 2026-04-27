import { Placeholder } from "@/components/home-kit";
import {
	CategoryHeader,
	CategoryTabs,
	DetailShell,
	ProductCardPrice,
	ProductCardWide,
	SearchPill,
} from "@/components/search-kit";
import {
	categoryTabs,
	deviceCards,
	eventCards,
} from "./_mock";

export default function Search05V1Kit() {
	return (
		<DetailShell
			title="아이폰 20"
			trailing={<Placeholder w={24} h={24} label="↻" />}
			bottom={<SearchPill query="아이폰 20" />}
		>
			<CategoryTabs tabs={categoryTabs} activeId="all" />

			<CategoryHeader label="기획전" count={2} />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-8)",
				}}
			>
				{eventCards.map((c) => (
					<ProductCardWide key={c.id} title={c.title} sub={c.sub} />
				))}
			</div>

			<CategoryHeader label="단말기" count={4} />
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
		</DetailShell>
	);
}
