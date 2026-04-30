import { Tab, TabList, TabListItem } from "@wanteddev/wds";

type FilterTab = {
	id: string;
	label: string;
};

type Props = {
	tabs: readonly FilterTab[];
	activeId: string;
};

export function FilterTabs({ tabs, activeId }: Props) {
	return (
		<Tab value={activeId} disableScrollMoveOnChange>
			<TabList size="medium" resize="hug" horizontalPadding>
				{tabs.map((tab) => (
					<TabListItem key={tab.id} value={tab.id}>
						{tab.label}
					</TabListItem>
				))}
			</TabList>
		</Tab>
	);
}
