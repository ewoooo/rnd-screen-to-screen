import type { ComponentLayer } from "@pxds/pxds-components/registry";

import { ComponentLayerGroup } from "@/components/preview/side-panel/components/ComponentLayerGroup";
import type { PreviewComponentRegistryEntry } from "@/utils/component-registry";

type ComponentLayerGroupsProps = {
	layers: readonly ComponentLayer[];
	componentsByLayer: Partial<
		Record<ComponentLayer, readonly PreviewComponentRegistryEntry[]>
	>;
	selectedComponentId?: string;
	onSelectComponent: (id: string) => void;
};

export function ComponentLayerGroups({
	layers,
	componentsByLayer,
	selectedComponentId,
	onSelectComponent,
}: ComponentLayerGroupsProps) {
	return (
		<nav className="flex flex-1 flex-col gap-5 overflow-auto p-3">
			{layers.map((layer) => (
				<ComponentLayerGroup
					key={layer}
					layer={layer}
					components={componentsByLayer[layer] ?? []}
					selectedComponentId={selectedComponentId}
					onSelectComponent={onSelectComponent}
				/>
			))}
		</nav>
	);
}
