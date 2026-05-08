import type {
	ComponentLayer,
	ComponentRegistryEntry,
} from "@pxds/component-registry";

import { ComponentRouteButton } from "@/components/preview/side-panel/components/ComponentRouteButton";

type ComponentLayerGroupProps = {
	layer: ComponentLayer;
	components: readonly ComponentRegistryEntry[];
	selectedComponentId?: string;
};

export function ComponentLayerGroup({
	layer,
	components,
	selectedComponentId,
}: ComponentLayerGroupProps) {
	return (
		<section className="flex flex-col gap-1">
			<h2 className="px-3 py-1 text-xs font-semibold uppercase text-neutral-500">
				{layer}
			</h2>

			<div className="flex flex-col gap-1">
				{components.map((component) => (
					<ComponentRouteButton
						key={component.id}
						component={component}
						active={component.id === selectedComponentId}
					/>
				))}
			</div>
		</section>
	);
}
