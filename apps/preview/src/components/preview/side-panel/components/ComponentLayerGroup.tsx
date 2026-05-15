import { ComponentRouteButton } from "@/components/preview/side-panel/components/ComponentRouteButton";
import type {
	ComponentLayer,
	PreviewComponentRegistryEntry,
} from "@/utils/component-registry";

const COMPONENT_LAYER_LABEL = {
	base: "Base",
} as const satisfies Record<ComponentLayer, string>;

type ComponentLayerGroupProps = {
	layer: ComponentLayer;
	components: readonly PreviewComponentRegistryEntry[];
	selectedComponentId?: string;
	onSelectComponent: (id: string) => void;
};

export function ComponentLayerGroup({
	layer,
	components,
	selectedComponentId,
	onSelectComponent,
}: ComponentLayerGroupProps) {
	return (
		<section className="flex flex-col gap-1">
			<h2 className="px-3 py-1 text-xs font-semibold uppercase text-neutral-500">
				{COMPONENT_LAYER_LABEL[layer]}
			</h2>

			<div className="flex flex-col gap-1">
				{components.map((component) => (
					<ComponentRouteButton
						key={component.id}
						component={component}
						active={component.id === selectedComponentId}
						onSelect={() => onSelectComponent(component.id)}
					/>
				))}
			</div>
		</section>
	);
}
