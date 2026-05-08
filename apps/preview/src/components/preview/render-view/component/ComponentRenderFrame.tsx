"use client";

import { useState } from "react";
import type { ComponentRegistryEntry } from "@pxds/component-registry";


type ComponentRenderFrameProps = {
	component: ComponentRegistryEntry;
};

export function ComponentRenderFrame({ component }: ComponentRenderFrameProps) {
	const [status, setStatus] = useState<"loading" | "loaded" | "error">(
		"loading",
	);
	const src = `/component-render/${component.id}`;

	return (
		<figure className="relative m-0 min-h-[560px] bg-transparent w-full">
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

		</figure>
	);
}
