import { InfoList, SectionCard, type InfoListItem } from "@/components/molecules";
import { ContentSection } from "@/components/templates/app-screen";

export type MembershipSummaryItem = InfoListItem;

type Props = {
	label: string;
	title: string;
	items: readonly MembershipSummaryItem[];
};

export function MembershipSummaryCard({ label, title, items }: Props) {
	return (
		<ContentSection>
			<SectionCard label={label} title={title}>
				<InfoList items={items} />
			</SectionCard>
		</ContentSection>
	);
}
