import {
	DetailShell,
	KeyboardPlaceholder,
	SearchField,
	SuggestionRow,
} from "@/components/search-kit";
import { step07Suggestions } from "@/fixtures/search-flow";

export default function Search07V1Kit() {
	return (
		<DetailShell
			bottom={
				<>
					<SearchField value="아이폰 2" action="search" />
					<KeyboardPlaceholder />
				</>
			}
		>
			
			<div
				style={{ display: "flex", flexDirection: "column", gap: 0 }}
			>
				{step07Suggestions.map((s) => (
					<SuggestionRow key={s.label} label={s.label} kind={s.kind} />
				))}
			</div>
		</DetailShell>
	);
}
