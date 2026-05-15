import { redirect } from "next/navigation";
import { cxComponentRegistry } from "@/utils/cx-component-registry";

export default function ComponentRenderRoutePage() {
	const firstComponent = cxComponentRegistry[0];
	if (!firstComponent) {
		redirect("/component-render/empty");
	}

	redirect(`/component-render/${firstComponent.id}`);
}
