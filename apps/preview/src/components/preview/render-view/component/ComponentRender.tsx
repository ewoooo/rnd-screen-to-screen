import { ComponentRenderFrame } from "@/components/preview/render-view/component/ComponentRenderFrame";
import type { PreviewComponentRegistryEntry } from "@/utils/component-registry";

type ComponentRenderProps = {
	component: PreviewComponentRegistryEntry;
};

export function ComponentRender({ component }: ComponentRenderProps) {
	return <ComponentRenderFrame key={component.id} component={component} />;
}
