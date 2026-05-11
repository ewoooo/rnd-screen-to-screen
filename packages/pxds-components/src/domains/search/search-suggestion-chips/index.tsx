import { ChipGroup, SectionCard } from "../../../molecules";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

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
