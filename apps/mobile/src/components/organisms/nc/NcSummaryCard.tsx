import { InfoList, SectionCard, type InfoListItem } from "@/components/molecules";
import { ContentSection } from "@/components/templates/app-screen";

export type NcSummaryItem = InfoListItem;

type Props = {
	label: string;
	title: string;
	items: readonly NcSummaryItem[];
};

export function NcSummaryCard({ label, title, items }: Props) {
	return (
		<ContentSection>
			<SectionCard label={label} title={title}>
				<InfoList items={items} />
			</SectionCard>
		</ContentSection>
	);
}
