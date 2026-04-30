import { ChipGroup, SectionCard } from "@/components/molecules";
import { ContentSection } from "@/components/templates/app-screen";

type Props = {
	label: string;
	items: readonly string[];
};

export function SearchSuggestionChips({ label, items }: Props) {
	return (
		<ContentSection>
			<SectionCard
				label={label}
				contentGap="var(--spacing-12)"
				padding="var(--spacing-16) var(--spacing-20)"
			>
				<ChipGroup items={items} />
			</SectionCard>
		</ContentSection>
	);
}
