import Link from "next/link";

import type { PreviewComponentRegistryEntry } from "@/utils/component-registry";

type ComponentRouteButtonProps = {
	component: PreviewComponentRegistryEntry;
	active: boolean;
};

export function ComponentRouteButton({
	component,
	active,
}: ComponentRouteButtonProps) {
	return (
		<Link
			href={`/components/${component.id}`}
			className={`rounded-md px-5 py-2 text-sm ${
				active
					? "bg-neutral-100 text-neutral-950"
					: "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
			}`}
		>
			<p className="truncate font-medium">{component.name}</p>
			<p className="truncate text-xs text-neutral-500">{component.group}</p>
		</Link>
	);
}
