"use client";

import { useState } from "react";
import type { ComponentRegistryEntry } from "@pxds/component-registry";

import { PreviewSpinner } from "@/components/preview/render-view/shared/PreviewSpinner";

type ComponentRenderFrameProps = {
	component: ComponentRegistryEntry;
};

export function ComponentRenderFrame({ component }: ComponentRenderFrameProps) {
	const [status, setStatus] = useState<"loading" | "loaded" | "error">(
		"loading",
	);
	const showSpinner = status !== "loaded";
	const src = `/component-render/${component.id}`;

	return (
		<figure className="relative m-0 min-h-[560px] w-full">
			<figcaption className="sr-only">
				{component.name} component render · {src}
			</figcaption>
			<iframe
				className="block h-full min-h-[560px] w-full border-0"
				src={src}
				title={`${component.name} component render`}
				onLoad={() => setStatus("loaded")}
				onError={() => setStatus("error")}
			/>
			{showSpinner ? (
				<div className="absolute inset-0 grid place-items-center bg-white/80 backdrop-blur-sm">
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
