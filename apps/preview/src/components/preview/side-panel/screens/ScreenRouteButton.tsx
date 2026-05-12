import type { ScreenRoute } from "@screen/mobile/screens";

import type { SidePanelRouteSelectHandler } from "@/components/preview/side-panel/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ScreenRouteButtonProps = {
	route: ScreenRoute;
	active: boolean;
	onSelectRoute: SidePanelRouteSelectHandler;
};

export function ScreenRouteButton({
	route,
	active,
	onSelectRoute,
}: ScreenRouteButtonProps) {
	return (
		<Button
			type="button"
			variant={active ? "secondary" : "ghost"}
			className="h-auto justify-start gap-3 px-5 py-2 text-left"
			onClick={() => onSelectRoute(route.route)}
		>
			<span className="truncate">{route.label}</span>
			<Badge className="ml-auto font-normal">{route.createdAt}</Badge>
		</Button>
	);
}
