"use client";

import { ComponentLayerGroups } from "@/components/preview/side-panel/components/ComponentLayerGroups";
import { SidePanelHeader } from "@/components/preview/side-panel/SidePanelHeader";
import { Separator } from "@/components/ui/separator";
import { useComponentRegistry } from "@/contexts/component-registry-context";

export function ComponentRegistrySidePanel() {
	const { componentCount, componentLayers, componentsByLayer, selectedComponent, selectComponent } =
		useComponentRegistry();

	return (
		<>
			<SidePanelHeader
				title="Components"
				description={`${componentCount} components`}
			/>
			<Separator />

			<ComponentLayerGroups
				layers={componentLayers}
				componentsByLayer={componentsByLayer}
				selectedComponentId={selectedComponent?.id}
				onSelectComponent={selectComponent}
			/>
		</>
	);
}
