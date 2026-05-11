import { InfoList, type InfoListItem, SectionCard } from "../shared";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

type ResultItem = {
	id: string;
	title: string;
	sub: string;
	pill: string;
};

type Props = {
	label: string;
	title: string;
	countText: string;
	items: readonly ResultItem[];
};

export function SearchResultList({ label, title, countText, items }: Props) {
	const listItems: InfoListItem[] = items.map((item) => ({
		id: item.id,
		title: item.title,
		sub: item.sub,
		trailingLabel: item.pill,
		mediaLabel: item.title,
	}));

	return (
		<ContentSection>
			<SectionCard label={label} title={title} trailingText={countText}>
				<InfoList items={listItems} />
			</SectionCard>
		</ContentSection>
	);
}
