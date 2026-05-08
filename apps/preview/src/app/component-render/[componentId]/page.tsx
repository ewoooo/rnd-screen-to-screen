import { notFound } from "next/navigation";
import { getComponentById } from "@pxds/component-registry";

import { ComponentExampleMissing } from "@/components/preview/render-view/component/ComponentExampleMissing";
import { getComponentPreviewExample } from "@/components/preview/examples/component-preview-examples";

type ComponentRenderRoutePageProps = {
	params: Promise<{
		componentId: string;
	}>;
};

export default async function ComponentRenderRoutePage({
	params,
}: ComponentRenderRoutePageProps) {
	const { componentId } = await params;
	const component = getComponentById(componentId);

	if (!component) {
		notFound();
	}

	const example = getComponentPreviewExample(component.id);

	return (
		<main className="grid min-h-dvh place-items-center bg-white p-8">
			{example ? (
				example.render()
			) : (
				<ComponentExampleMissing componentName={component.name} />
			)}
		</main>
	);
}
