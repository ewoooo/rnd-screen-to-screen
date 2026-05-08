import { notFound } from "next/navigation";
import { getComponentById } from "@pxds/component-registry";

import { ComponentPreview } from "@/components/preview/render-view/component/ComponentPreview";
import { PreviewSidePanel } from "@/components/preview/side-panel/PreviewSidePanel";
import { ComponentRegistrySidePanel } from "@/components/preview/side-panel/components/ComponentRegistrySidePanel";

type ComponentsPreviewRoutePageProps = {
	params: Promise<{
		componentId: string;
	}>;
};

export default async function ComponentsPreviewRoutePage({
	params,
}: ComponentsPreviewRoutePageProps) {
	const { componentId } = await params;
	const component = getComponentById(componentId);

	if (!component) {
		notFound();
	}

	return (
		<>
			<PreviewSidePanel>
				<ComponentRegistrySidePanel selectedComponentId={componentId} />
			</PreviewSidePanel>
			<ComponentPreview component={component} />
		</>
	);
}
