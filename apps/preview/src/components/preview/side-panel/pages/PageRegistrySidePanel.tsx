"use client";

import { SidePanelHeader } from "@/components/preview/side-panel/SidePanelHeader";
import { PageRouteGroups } from "@/components/preview/side-panel/pages/PageRouteGroups";
import { Separator } from "@/components/ui/separator";
import { usePageRegistry } from "@/contexts/page-registry-context";

export function PageRegistrySidePanel() {
	const { pages, groups, groupedPages, selectedRoute, selectRoute } =
		usePageRegistry();

	return (
		<>
			<SidePanelHeader title="Pages" description={`${pages.length} routes`} />
			<Separator />

			<PageRouteGroups
				groups={groups}
				groupedPages={groupedPages}
				selectedRoute={selectedRoute}
				onSelectRoute={selectRoute}
			/>
		</>
	);
}
