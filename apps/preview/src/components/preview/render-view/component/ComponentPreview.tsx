"use client";

import type { ComponentRegistryEntry } from "@pxds/component-registry";

import { PreviewCanvas } from "@/components/preview/render-view/shared/PreviewCanvas";
import { PreviewHeader } from "@/components/preview/render-view/shared/PreviewHeader";
import { ComponentRender } from "@/components/preview/render-view/component/ComponentRender";

type ComponentPreviewProps = {
	component: ComponentRegistryEntry;
};

export function ComponentPreview({ component }: ComponentPreviewProps) {
	return (
		<section className="flex min-w-0 flex-col">
			<PreviewHeader
				eyebrow={component.layer}
				title={component.name}
				description={component.importPath}
			/>
			<PreviewCanvas layout="stack">
				<ComponentRender component={component} />
			</PreviewCanvas>
		</section>
	);
}
