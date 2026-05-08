import { ComponentPreview } from "@/components/preview/render-view/ComponentPreview";
import { PreviewSidePanel } from "@/components/preview/side-panel/PreviewSidePanel";
import { ComponentRegistrySidePanel } from "@/components/preview/side-panel/components/ComponentRegistrySidePanel";

export default function ComponentsPreviewRoutePage() {
	return (
		<>
			<PreviewSidePanel>
				<ComponentRegistrySidePanel />
			</PreviewSidePanel>
			<ComponentPreview />
		</>
	);
}
