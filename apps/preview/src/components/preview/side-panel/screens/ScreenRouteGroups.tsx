import { useState } from "react";
import type { ScreenGroup, ScreenRoute } from "@screen/mobile/screens";

import { ScreenRouteGroup } from "@/components/preview/side-panel/screens/ScreenRouteGroup";
import type { SidePanelRouteSelectHandler } from "@/components/preview/side-panel/types";
import type { ScreenGroups } from "@/utils/screen-groups";

type ScreenRouteGroupsProps = {
	groups: readonly ScreenGroup[];
	groupedScreens: ScreenGroups;
	selectedRoute: ScreenRoute;
	onSelectRoute: SidePanelRouteSelectHandler;
};

export function ScreenRouteGroups({
	groups,
	groupedScreens,
	selectedRoute,
	onSelectRoute,
}: ScreenRouteGroupsProps) {
	const [openGroups, setOpenGroups] = useState<ScreenGroup[]>([
		selectedRoute.group,
	]);

	return (
		<nav className="flex flex-1 flex-col gap-2 overflow-auto p-3">
			{groups.map((group) => {
				const open =
					group === selectedRoute.group || openGroups.includes(group);

				return (
					<ScreenRouteGroup
						key={group}
						group={group}
						open={open}
						routes={groupedScreens[group] ?? []}
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
