import { PagePreview } from "@/components/preview/render-view/PagePreview";
import { PreviewSidePanel } from "@/components/preview/side-panel/PreviewSidePanel";
import { PageRegistrySidePanel } from "@/components/preview/side-panel/pages/PageRegistrySidePanel";

export default function PagesPreviewRoutePage() {
	return (
		<>
			<PreviewSidePanel>
				<PageRegistrySidePanel />
			</PreviewSidePanel>
			<PagePreview />
		</>
	);
}
