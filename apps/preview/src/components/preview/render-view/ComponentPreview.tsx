"use client";

import { PreviewCanvas } from "@/components/preview/render-view/PreviewCanvas";
import { PreviewHeader } from "@/components/preview/render-view/PreviewHeader";
import { useComponentRegistry } from "@/contexts/component-registry-context";

export function ComponentPreview() {
	const { componentCount } = useComponentRegistry();

	return (
		<section className="flex min-w-0 flex-col">
			<PreviewHeader eyebrow="components" title="Component Library" />
			<PreviewCanvas>
				<div className="max-w-sm text-center">
					<p className="text-sm font-medium">{componentCount} registered components</p>
					<p className="mt-2 text-sm text-neutral-500">
						Component examples and API previews will render here.
					</p>
				</div>
			</PreviewCanvas>
		</section>
	);
}
