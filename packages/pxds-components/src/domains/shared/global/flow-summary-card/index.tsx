import {
	InfoSection,
	type InfoListItem,
} from "../../../../molecules";

export type FlowSummaryItem = InfoListItem;

type Props = {
	label: string;
	title: string;
	items: readonly FlowSummaryItem[];
};

export function FlowSummaryCard({ label, title, items }: Props) {
	return <InfoSection label={label} title={title} items={items} />;
}
