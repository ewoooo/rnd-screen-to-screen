"use client";

import { getComponentPreviewExample } from "@/components/preview/examples/component-preview-examples";
import { ComponentExampleMissing } from "@/components/preview/render-view/component/ComponentExampleMissing";
import { PreviewCanvas } from "@/components/preview/render-view/shared/PreviewCanvas";
import { PreviewHeader } from "@/components/preview/render-view/shared/PreviewHeader";
import { ComponentRender } from "@/components/preview/render-view/component/ComponentRender";
import { useComponentRegistry } from "@/contexts/component-registry-context";

export function ComponentPreview() {
	const { selectedComponent } = useComponentRegistry();

	if (!selectedComponent) return null;

	const example = getComponentPreviewExample(selectedComponent.id);

	return (
		<section className="flex min-w-0 flex-col">
			<PreviewHeader
				eyebrow={selectedComponent.layer}
				title={selectedComponent.name}
				description={selectedComponent.importPath}
			/>
			<PreviewCanvas>
				{example ? (
					<ComponentRender component={selectedComponent} />
				) : (
					<ComponentExampleMissing componentName={selectedComponent.name} />
				)}
			</PreviewCanvas>
		</section>
	);
}
