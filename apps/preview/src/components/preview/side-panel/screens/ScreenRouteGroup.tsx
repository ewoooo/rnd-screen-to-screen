import { ChevronDownIcon } from "lucide-react";
import type { ScreenGroup, ScreenRoute } from "@screen/mobile/screens";

import { ScreenRouteButton } from "@/components/preview/side-panel/screens/ScreenRouteButton";
import type { SidePanelRouteSelectHandler } from "@/components/preview/side-panel/types";
import { Button } from "@/components/ui/button";

type ScreenRouteGroupProps = {
	group: ScreenGroup;
	open: boolean;
	routes: readonly ScreenRoute[];
	selectedRoute: ScreenRoute;
	onSelectRoute: SidePanelRouteSelectHandler;
	onToggleGroup: () => void;
};

export function ScreenRouteGroup({
	group,
	open,
	routes,
	selectedRoute,
	onSelectRoute,
	onToggleGroup,
}: ScreenRouteGroupProps) {
	const routeCount = routes.length;

	return (
		<section className="flex flex-col gap-1">
			<Button
				type="button"
				variant="ghost"
				className="h-9 justify-start gap-2 px-3 text-left"
				aria-expanded={open}
				onClick={onToggleGroup}
			>
				<ChevronDownIcon
					data-icon="inline-start"
					className={`transition-transform ${open ? "" : "-rotate-90"}`}
				/>
				<span className="min-w-0 flex-1 truncate text-xs font-semibold uppercase text-neutral-600">
					{group}
				</span>
				<span className="text-xs font-normal text-neutral-400">{routeCount}</span>
			</Button>

			{open ? (
				<div className="flex flex-col gap-1 pb-2">
					{routes.map((route) => (
						<ScreenRouteButton
							key={route.route}
							route={route}
							active={route.route === selectedRoute.route}
							onSelectRoute={onSelectRoute}
						/>
					))}
				</div>
			) : null}
		</section>
	);
}
