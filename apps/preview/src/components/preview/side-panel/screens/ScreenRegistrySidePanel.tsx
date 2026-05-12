"use client";

import { SidePanelHeader } from "@/components/preview/side-panel/SidePanelHeader";
import { ScreenRouteGroups } from "@/components/preview/side-panel/screens/ScreenRouteGroups";
import { Separator } from "@/components/ui/separator";
import { useScreenRegistry } from "@/contexts/screen-registry-context";

export function ScreenRegistrySidePanel() {
	const { screens, groups, groupedScreens, selectedRoute, selectRoute } =
		useScreenRegistry();

	return (
		<>
			<SidePanelHeader title="Screens" description={`${screens.length} routes`} />
			<Separator />

			<ScreenRouteGroups
				groups={groups}
				groupedScreens={groupedScreens}
				selectedRoute={selectedRoute}
				onSelectRoute={selectRoute}
			/>
		</>
	);
}
