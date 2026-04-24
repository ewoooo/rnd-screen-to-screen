import { Placeholder, Shell, T_BRAND } from "@/components/home-kit";
import { SearchField, SuggestionChip } from "@/components/search-kit";
import { searchEntryFixture } from "@/fixtures/search-flow";

const gnbTabs = [
	{ key: "my", label: "MY", active: false },
	{ key: "search", label: "검색", active: true },
	{ key: "shop", label: "쇼핑", active: false },
];

export default function Search01V1Kit() {
	const f = searchEntryFixture;
	return (
		<Shell gnbTabs={gnbTabs}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-12)",
					padding: "0 var(--spacing-16)",
				}}
			>
				<p
					style={{
						margin: 0,
						fontSize: 20,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
						letterSpacing: "-1px",
						lineHeight: 1.3,
						whiteSpace: "pre-line",
					}}
				>
					{f.title}
				</p>
				{/* Pager dots */}
				<div style={{ display: "flex", gap: 6 }}>
					{Array.from({ length: f.pageCount }).map((_, i) => (
						<span
							key={i}
							style={{
								width: 6,
								height: 6,
								borderRadius: 999,
								background:
									i === f.pageIndex ? T_BRAND : "var(--semantic-fill-normal)",
							}}
						/>
					))}
				</div>
			</div>
			<Placeholder w="100%" h={360} label="product collage" />
			<div
				style={{
					display: "flex",
					gap: "var(--spacing-8)",
					padding: "0 var(--spacing-16)",
					flexWrap: "wrap",
				}}
			>
				{f.prompts.map((p, i) => (
					<SuggestionChip key={`${i}-${p}`} label={p} />
				))}
			</div>
			<SearchField />
		</Shell>
	);
}
