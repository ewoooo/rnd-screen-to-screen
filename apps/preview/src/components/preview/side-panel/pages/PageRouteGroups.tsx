import { useState } from "react";
import type { ScreenGroup, ScreenRoute } from "@screen/registry";

import { PageRouteGroup } from "@/components/preview/side-panel/pages/PageRouteGroup";
import type { SidePanelRouteSelectHandler } from "@/components/preview/side-panel/types";
import type { PageGroups } from "@/utils/page-groups";

type PageRouteGroupsProps = {
	groups: readonly ScreenGroup[];
	groupedPages: PageGroups;
	selectedRoute: ScreenRoute;
	onSelectRoute: SidePanelRouteSelectHandler;
};

export function PageRouteGroups({
	groups,
	groupedPages,
	selectedRoute,
	onSelectRoute,
}: PageRouteGroupsProps) {
	const [openGroups, setOpenGroups] = useState<ScreenGroup[]>([
		selectedRoute.group,
	]);

	return (
		<nav className="flex flex-1 flex-col gap-2 overflow-auto p-3">
			{groups.map((group) => {
				const open =
					group === selectedRoute.group || openGroups.includes(group);

				return (
					<PageRouteGroup
						key={group}
						group={group}
						open={open}
						routes={groupedPages[group] ?? []}
						selectedRoute={selectedRoute}
						onSelectRoute={onSelectRoute}
						onToggleGroup={() => {
							setOpenGroups((currentGroups) =>
								currentGroups.includes(group)
									? currentGroups.filter((currentGroup) => currentGroup !== group)
									: [...currentGroups, group],
							);
						}}
					/>
				);
			})}
		</nav>
	);
}
