"use client";

import { usePathname } from "next/navigation";

import { NAVIGATION_MODES } from "@/components/preview/navigation-rail/navigation-modes";
import { NavigationRailButton } from "@/components/preview/navigation-rail/NavigationRailButton";

export function PreviewNavigationRail() {
	const pathname = usePathname();

	return (
		<nav
			aria-label="Preview sections"
			className="flex border-r border-neutral-200 bg-neutral-50 p-2 sm:h-dvh sm:flex-col sm:items-center"
		>
			<div className="flex gap-1 sm:flex-col">
				{NAVIGATION_MODES.map((item) => (
					<NavigationRailButton
						key={item.id}
						mode={item.id}
						label={item.label}
						href={item.href}
						active={
							item.href === "/components"
								? pathname.startsWith("/components")
								: pathname === item.href
						}
					/>
				))}
			</div>
		</nav>
	);
}
