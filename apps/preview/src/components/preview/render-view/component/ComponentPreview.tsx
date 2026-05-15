"use client";

import { getCxComponentPreviewExample } from "@pxds/cx-components/preview";
import { ComponentExampleMissing } from "@/components/preview/render-view/component/ComponentExampleMissing";
import { PreviewCanvas } from "@/components/preview/render-view/shared/PreviewCanvas";
import { PreviewHeader } from "@/components/preview/render-view/shared/PreviewHeader";
import { ComponentRender } from "@/components/preview/render-view/component/ComponentRender";
import { useComponentRegistry } from "@/contexts/component-registry-context";

const COMPONENT_LAYER_LABEL = {
	base: "Base",
} as const;

export function ComponentPreview() {
	const { selectedComponent } = useComponentRegistry();

	if (!selectedComponent) return null;

	const example = getCxComponentPreviewExample(selectedComponent.id);

	return (
		<section className="flex min-w-0 flex-col">
			<PreviewHeader
				eyebrow={COMPONENT_LAYER_LABEL[selectedComponent.layer]}
				title={selectedComponent.name}
				description={selectedComponent.importPath}
			/>
			<PreviewCanvas layout="stack">
				{example ? (
					<ComponentRender component={selectedComponent} />
				) : (
					<ComponentExampleMissing componentName={selectedComponent.name} />
				)}
			</PreviewCanvas>
		</section>
	);
}
