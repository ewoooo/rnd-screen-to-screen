import { InfoList, SectionCard, type InfoListItem } from "@/components/molecules";
import { ContentSection } from "@/components/templates/app-screen";

type BenefitItem = {
	id: string;
	title: string;
	sub: string;
	pill: string;
};

type Props = {
	label: string;
	title: string;
	items: readonly BenefitItem[];
};

export function ProductBenefitList({ label, title, items }: Props) {
	const listItems: InfoListItem[] = items.map((item) => ({
		id: item.id,
		title: item.title,
		sub: item.sub,
		trailingLabel: item.pill,
		mediaLabel: item.title,
	}));

	return (
		<ContentSection>
			<SectionCard label={label} title={title}>
				<InfoList items={listItems} />
			</SectionCard>
		</ContentSection>
	);
}
