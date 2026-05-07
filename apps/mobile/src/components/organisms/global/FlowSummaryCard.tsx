import { InfoList, type InfoListItem, SectionCard } from "@/components/molecules";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

export type FlowSummaryItem = InfoListItem;

type Props = {
	label: string;
	title: string;
	items: readonly FlowSummaryItem[];
};

export function FlowSummaryCard({ label, title, items }: Props) {
	return (
		<ContentSection>
			<SectionCard label={label} title={title}>
				<InfoList items={items} />
			</SectionCard>
		</ContentSection>
	);
}
