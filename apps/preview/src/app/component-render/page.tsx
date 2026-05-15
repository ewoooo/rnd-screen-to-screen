import { redirect } from "next/navigation";
import { getDefaultCxComponentPreviewId } from "@pxds/cx-components/preview";

export default function ComponentRenderRoutePage() {
	const firstComponentId = getDefaultCxComponentPreviewId();
	if (!firstComponentId) {
		redirect("/component-render/empty");
	}

	redirect(`/component-render/${firstComponentId}`);
}
