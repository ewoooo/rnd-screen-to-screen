import {
	DetailShell,
	KeyboardPlaceholder,
	RecentChip,
	SearchField,
} from "@/components/search-kit";
import { recentQueries } from "@/fixtures/search-flow";

export default function Search08V1Kit() {
	return (
		<DetailShell
			bottom={
				<>
					<SearchField
						value="아이폰 20"
						withBackChip
						clearable
						action="search"
					/>
					<KeyboardPlaceholder />
				</>
			}
		>
			
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-12)",
				}}
			>
				<span
					style={{
						fontSize: 13,
						fontWeight: 700,
						color: "var(--semantic-label-neutral)",
					}}
				>
					최근 검색어
				</span>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "var(--spacing-8)",
					}}
				>
					{recentQueries.map((q) => (
						<RecentChip key={q} label={q} />
					))}
				</div>
			</div>
		</DetailShell>
	);
}
