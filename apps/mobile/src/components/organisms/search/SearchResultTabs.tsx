import { FilterTabs } from "@pxds/pxds-components/patterns";

type TabItem = {
	id: string;
	label: string;
};

type Props = {
	tabs: readonly TabItem[];
	activeId: string;
};

export function SearchResultTabs({ tabs, activeId }: Props) {
	return <FilterTabs tabs={tabs} activeId={activeId} />;
}
