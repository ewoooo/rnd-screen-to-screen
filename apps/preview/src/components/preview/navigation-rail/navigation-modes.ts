import type { NavigationModeItem } from "@/components/preview/navigation-rail/types";

export const NAVIGATION_MODES = [
	{ id: "components", label: "Components", href: "/components" },
	{ id: "screens", label: "Screens", href: "/screens" },
	{ id: "policies", label: "Policies", href: "/policies" },
] as const satisfies readonly NavigationModeItem[];
