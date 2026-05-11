import { componentRegistry } from "@pxds/pxds-components/registry";
import { redirect } from "next/navigation";

export default function ComponentRenderRoutePage() {
	const firstComponent = componentRegistry[0];
	if (!firstComponent) {
		redirect("/component-render/empty");
	}

	redirect(`/component-render/${firstComponent.id}`);
}
