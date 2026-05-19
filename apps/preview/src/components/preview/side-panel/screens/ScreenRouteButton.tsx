import type { ScreenRoute } from "@screen/mobile/screens";

import type { SidePanelRouteSelectHandler } from "@/components/preview/side-panel/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getScreenGenerationPhase } from "@/utils/screen-generation-phase";

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
	const phase = getScreenGenerationPhase(route);

	return (
		<Button
			type="button"
			variant={active ? "secondary" : "ghost"}
			className="h-auto items-start justify-start gap-3 px-5 py-2 text-left"
			onClick={() => onSelectRoute(route.route)}
		>
			<span className="min-w-0 flex-1">
				<span className="block truncate">{route.label}</span>
				<span className="mt-1 block text-xs font-normal text-neutral-500">
					{phase.step} {phase.label}
				</span>
			</span>
			<Badge className="ml-auto font-normal">{route.createdAt}</Badge>
		</Button>
	);
}
