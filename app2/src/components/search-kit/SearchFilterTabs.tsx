import { FilterTabs } from "@/components/patterns";

type TabItem = {
	id: string;
	label: string;
};

type Props = {
	tabs: readonly TabItem[];
	activeId: string;
};

export function SearchFilterTabs({ tabs, activeId }: Props) {
	return <FilterTabs tabs={tabs} activeId={activeId} />;
}
