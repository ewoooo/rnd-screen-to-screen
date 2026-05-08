"use client";

import { useState } from "react";
import { MobilePreviewFrame } from "@pxds/pxds-preview";

import { PreviewSpinner } from "@/components/preview/render-view/shared/PreviewSpinner";

type PreviewPageRenderItemProps = {
	src: string;
	title: string;
};

export function PreviewPageRenderItem({
	src,
	title,
}: PreviewPageRenderItemProps) {
	const [status, setStatus] = useState<"loading" | "loaded" | "error">(
		"loading",
	);
	const showSpinner = status !== "loaded";

	return (
		<figure className="relative m-0">
			<figcaption className="sr-only">
				{title} · {src}
			</figcaption>
			<MobilePreviewFrame
				src={src}
				title={title}
				onLoad={() => setStatus("loaded")}
				onError={() => setStatus("error")}
			/>
			{showSpinner ? (
				<div className="absolute inset-0 grid place-items-center rounded-[inherit] bg-white/80 backdrop-blur-sm">
					<PreviewSpinner
						label={
							status === "error"
								? "Page preview unavailable"
								: "Loading page preview"
						}
					/>
				</div>
			) : null}
		</figure>
	);
}
