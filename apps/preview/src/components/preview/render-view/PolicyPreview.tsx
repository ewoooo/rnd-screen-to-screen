"use client";

import { PreviewCanvas } from "@/components/preview/render-view/PreviewCanvas";
import { PreviewHeader } from "@/components/preview/render-view/PreviewHeader";
import { useScreenSpecs } from "@/hooks/use-screen-specs";

export function PolicyPreview() {
	const { specCount } = useScreenSpecs();

	return (
		<section className="flex min-w-0 flex-col">
			<PreviewHeader eyebrow="policies" title="Policy Specs" />
			<PreviewCanvas>
				<div className="max-w-sm text-center">
					<p className="text-sm font-medium">{specCount} screen specs</p>
					<p className="mt-2 text-sm text-neutral-500">
						Policy document lookup and spec diagnostics will render here.
					</p>
				</div>
			</PreviewCanvas>
		</section>
	);
}
