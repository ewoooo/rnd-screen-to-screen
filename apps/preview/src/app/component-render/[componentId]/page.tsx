"use client";

import { useParams } from "next/navigation";

import { ComponentExampleMissing } from "@/components/preview/render-view/component/ComponentExampleMissing";
import { getComponentPreviewExample } from "@/components/preview/examples/component-preview-examples";
import { getCxComponentById } from "@/utils/cx-component-registry";

export default function ComponentRenderRoutePage() {
	const params = useParams<{ componentId?: string }>();
	const componentId = params.componentId ?? "";
	const component = getCxComponentById(componentId);

	if (!component) {
		return (
			<main className="grid min-h-dvh place-items-center bg-transparent p-8">
				<ComponentExampleMissing componentName={componentId || "Unknown"} />
			</main>
		);
	}

	const example = getComponentPreviewExample(component.id);

	return (
		<main className="grid min-h-dvh place-items-center bg-transparent p-8">
			{example ? (
				example.render()
			) : (
				<ComponentExampleMissing componentName={component.name} />
			)}
		</main>
	);
}
