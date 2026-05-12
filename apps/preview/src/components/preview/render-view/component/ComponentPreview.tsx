"use client";

import { getComponentPreviewExample } from "@/components/preview/examples/component-preview-examples";
import { ComponentExampleMissing } from "@/components/preview/render-view/component/ComponentExampleMissing";
import { PreviewCanvas } from "@/components/preview/render-view/shared/PreviewCanvas";
import { PreviewHeader } from "@/components/preview/render-view/shared/PreviewHeader";
import { ComponentRender } from "@/components/preview/render-view/component/ComponentRender";
import type { PreviewComponentRegistryEntry } from "@/utils/component-registry";

type ComponentPreviewProps = {
	component: PreviewComponentRegistryEntry;
};

export function ComponentPreview({ component }: ComponentPreviewProps) {
	const example = getComponentPreviewExample(component.id);

	return (
		<section className="flex min-w-0 flex-col">
			<PreviewHeader
				eyebrow={component.layer}
				title={component.name}
				description={component.importPath}
			/>
			<PreviewCanvas>
				{example ? (
					<ComponentRender component={component} />
				) : (
					<ComponentExampleMissing componentName={component.name} />
				)}
			</PreviewCanvas>
		</section>
	);
}
