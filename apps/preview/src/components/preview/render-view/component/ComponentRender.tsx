"use client";

import { lazy, Suspense } from "react";
import type { ComponentRegistryEntry } from "@pxds/component-registry";

import { PreviewSpinner } from "@/components/preview/render-view/shared/PreviewSpinner";

const ComponentRenderFrame = lazy(() =>
	import("@/components/preview/render-view/component/ComponentRenderFrame").then(
		(module) => ({
			default: module.ComponentRenderFrame,
		}),
	),
);

type ComponentRenderProps = {
	component: ComponentRegistryEntry;
};

export function ComponentRender({ component }: ComponentRenderProps) {
	return (
		<Suspense
			fallback={
				<div className="grid min-h-[560px] w-full place-items-center">
					<PreviewSpinner label="Loading component preview" />
				</div>
			}
		>
			<ComponentRenderFrame key={component.id} component={component} />
		</Suspense>
	);
}
