"use client";

import { useState } from "react";

import { MobilePreviewFrame } from "@/components/mobile-preview/MobilePreviewFrame";
import { PreviewSpinner } from "@/components/preview/render-view/shared/PreviewSpinner";
import type { PreviewComponentRegistryEntry } from "@/utils/component-registry";

type ComponentRenderFrameProps = {
	component: PreviewComponentRegistryEntry;
};

export function ComponentRenderFrame({ component }: ComponentRenderFrameProps) {
	const src = `/component-render/${component.id}`;
	const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
	const showSpinner = status !== "loaded";

	return (
		<figure className="relative m-0">
			<figcaption className="sr-only">
				{component.name} component render · {src}
			</figcaption>
			<MobilePreviewFrame
				src={src}
				title={`${component.name} component render`}
				onLoad={() => setStatus("loaded")}
				onError={() => setStatus("error")}
			/>
			{showSpinner ? (
				<div className="absolute inset-0 grid place-items-center rounded-[inherit] bg-white/80 backdrop-blur-sm">
					<PreviewSpinner
						label={
							status === "error"
								? "Component preview unavailable"
								: "Loading component preview"
						}
					/>
				</div>
			) : null}
		</figure>
	);
}
