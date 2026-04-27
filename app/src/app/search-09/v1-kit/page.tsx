import {
	DetailShell,
	KeyboardPlaceholder,
	RecentChip,
	SearchField,
} from "@/components/search-kit";
import { recentQueries } from "./_mock";

export default function Search09V1Kit() {
	return (
		<DetailShell
			bottom={
				<>
					<SearchField withBackChip />
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
