import { FilterTabs } from "./FilterTabs";

export const filterTabsPreviewExample = {
	componentId: "filter-tabs",
	description: "Selection tabs for filtering a result set.",
	render: () => (
		<FilterTabs
			activeId="all"
			tabs={[
				{ id: "all", label: "전체" },
				{ id: "popular", label: "인기" },
				{ id: "recent", label: "최신" },
			]}
		/>
	),
} as const;
