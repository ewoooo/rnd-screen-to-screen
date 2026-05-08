import { PolicyPreview } from "@/components/preview/render-view/policy/PolicyPreview";
import { PreviewSidePanel } from "@/components/preview/side-panel/PreviewSidePanel";
import { PolicyRegistrySidePanel } from "@/components/preview/side-panel/policies/PolicyRegistrySidePanel";

export default function PoliciesPreviewRoutePage() {
	return (
		<>
			<PreviewSidePanel>
				<PolicyRegistrySidePanel />
			</PreviewSidePanel>
			<PolicyPreview />
		</>
	);
}
