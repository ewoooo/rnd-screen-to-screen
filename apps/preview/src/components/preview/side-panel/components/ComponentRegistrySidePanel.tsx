"use client";

import { ComponentLayerGroups } from "@/components/preview/side-panel/components/ComponentLayerGroups";
import { SidePanelHeader } from "@/components/preview/side-panel/SidePanelHeader";
import { Separator } from "@/components/ui/separator";
import { useComponentRegistry } from "@/contexts/component-registry-context";

type ComponentRegistrySidePanelProps = {
	selectedComponentId?: string;
};

export function ComponentRegistrySidePanel({
	selectedComponentId,
}: ComponentRegistrySidePanelProps) {
	const { componentCount, componentLayers, componentsByLayer } =
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
				selectedComponentId={selectedComponentId}
			/>
		</>
	);
}
