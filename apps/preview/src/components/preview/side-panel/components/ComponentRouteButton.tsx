import type { PreviewComponentRegistryEntry } from "@/utils/component-registry";

type ComponentRouteButtonProps = {
	component: PreviewComponentRegistryEntry;
	active: boolean;
	onSelect: () => void;
};

export function ComponentRouteButton({
	component,
	active,
	onSelect,
}: ComponentRouteButtonProps) {
	return (
		<button
			type="button"
			onClick={onSelect}
			className={`w-full rounded-md px-5 py-2 text-left text-sm ${
				active
					? "bg-neutral-100 text-neutral-950"
					: "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
			}`}
		>
			<span className="flex min-w-0 items-baseline justify-between gap-2">
				<span className="truncate font-medium">{component.name}</span>
				<span className="shrink-0 text-xs text-neutral-500">{component.group}</span>
			</span>
		</button>
	);
}
