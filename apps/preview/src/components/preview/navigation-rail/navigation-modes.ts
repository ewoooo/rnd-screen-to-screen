import type { NavigationModeItem } from "@/components/preview/navigation-rail/types";

export const NAVIGATION_MODES = [
	{ id: "components", label: "Components", href: "/components" },
	{ id: "pages", label: "Pages", href: "/pages" },
	{ id: "policies", label: "Policies", href: "/policies" },
] as const satisfies readonly NavigationModeItem[];
