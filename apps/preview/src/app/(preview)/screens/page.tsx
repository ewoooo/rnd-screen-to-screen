import { ScreenPreview } from "@/components/preview/render-view/screen/ScreenPreview";
import { PreviewSidePanel } from "@/components/preview/side-panel/PreviewSidePanel";
import { ScreenRegistrySidePanel } from "@/components/preview/side-panel/screens/ScreenRegistrySidePanel";

export default function ScreensPreviewRoutePage() {
	return (
		<>
			<PreviewSidePanel>
				<ScreenRegistrySidePanel />
			</PreviewSidePanel>
			<ScreenPreview />
		</>
	);
}
