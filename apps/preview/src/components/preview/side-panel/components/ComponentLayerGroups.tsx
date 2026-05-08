import type {
	ComponentLayer,
	ComponentRegistryEntry,
} from "@pxds/component-registry";

import { ComponentLayerGroup } from "@/components/preview/side-panel/components/ComponentLayerGroup";

type ComponentLayerGroupsProps = {
	layers: readonly ComponentLayer[];
	componentsByLayer: Partial<
		Record<ComponentLayer, readonly ComponentRegistryEntry[]>
	>;
	selectedComponentId?: string;
};

export function ComponentLayerGroups({
	layers,
	componentsByLayer,
	selectedComponentId,
}: ComponentLayerGroupsProps) {
	return (
		<nav className="flex flex-1 flex-col gap-5 overflow-auto p-3">
			{layers.map((layer) => (
				<ComponentLayerGroup
					key={layer}
					layer={layer}
					components={componentsByLayer[layer] ?? []}
					selectedComponentId={selectedComponentId}
				/>
			))}
		</nav>
	);
}
