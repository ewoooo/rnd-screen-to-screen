import { InfoSection, type InfoListItem } from "../../../molecules";

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

	return <InfoSection label={label} title={title} items={listItems} />;
}
