import { redirect } from "next/navigation";
import { componentRegistry } from "@pxds/component-registry";

export default function ComponentsPreviewRoutePage() {
	const firstComponent = componentRegistry[0];
	if (!firstComponent) {
		redirect("/components/empty");
	}

	redirect(`/components/${firstComponent.id}`);
}
