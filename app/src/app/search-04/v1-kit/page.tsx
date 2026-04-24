import {
	DetailShell,
	KeyboardPlaceholder,
	SearchField,
	SuggestionRow,
} from "@/components/search-kit";
import { step04Suggestions } from "@/fixtures/search-flow";

export default function Search04V1Kit() {
	return (
		<DetailShell
			bottom={
				<>
					<SearchField value="요금" action="search" />
					<KeyboardPlaceholder />
				</>
			}
		>
			
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 0,
				}}
			>
				{step04Suggestions.map((s) => (
					<SuggestionRow key={s.label} label={s.label} kind={s.kind} />
				))}
			</div>
		</DetailShell>
	);
}
