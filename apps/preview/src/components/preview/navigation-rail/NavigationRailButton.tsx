import Link from "next/link";
import {
	BookOpenTextIcon,
	ComponentIcon,
	PanelTopIcon,
	type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { NavigationModeItem } from "@/components/preview/navigation-rail/types";

type NavigationModeId = NavigationModeItem["id"];

const MODE_ICON: Record<NavigationModeId, LucideIcon> = {
	components: ComponentIcon,
	pages: PanelTopIcon,
	policies: BookOpenTextIcon,
};

type NavigationRailButtonProps = {
	mode: NavigationModeId;
	label: string;
	href: NavigationModeItem["href"];
	active: boolean;
};

export function NavigationRailButton({
	mode,
	label,
	href,
	active,
}: NavigationRailButtonProps) {
	const Icon = MODE_ICON[mode];

	return (
		<Button
			asChild
			variant={active ? "secondary" : "ghost"}
			size="sm"
			className="h-10 w-10 justify-center px-0"
		>
			<Link href={href} aria-label={label} title={label}>
				<Icon aria-hidden="true" />
			</Link>
		</Button>
	);
}
