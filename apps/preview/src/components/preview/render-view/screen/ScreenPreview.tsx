"use client";

import { Suspense } from "react";
import { ExternalLinkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PreviewCanvas } from "@/components/preview/render-view/shared/PreviewCanvas";
import { PreviewHeader } from "@/components/preview/render-view/shared/PreviewHeader";
import { PreviewScreenRenderItem } from "@/components/preview/render-view/screen/PreviewScreenRenderItem";
import { PreviewSpinner } from "@/components/preview/render-view/shared/PreviewSpinner";
import { useScreenRegistry } from "@/contexts/screen-registry-context";

const MOBILE_ORIGIN =
	process.env.NEXT_PUBLIC_MOBILE_ORIGIN ?? "http://localhost:3001";

export function ScreenPreview() {
	const { selectedRoute } = useScreenRegistry();
	const iframeSrc = `${MOBILE_ORIGIN}${selectedRoute.route}`;

	return (
		<section className="flex min-w-0 flex-col">
			<PreviewHeader
				eyebrow={selectedRoute.group}
				title={selectedRoute.label}
				action={
					<Button asChild variant="outline" size="sm">
						<a href={iframeSrc} target="_blank" rel="noreferrer">
							<ExternalLinkIcon data-icon="inline-start" />
							Open mobile
						</a>
					</Button>
				}
			/>

			<PreviewCanvas>
				<Suspense fallback={<PreviewSpinner label="Loading screen preview" />}>
					<PreviewScreenRenderItem
						height={selectedRoute.figma?.height}
						key={iframeSrc}
						src={iframeSrc}
						title={selectedRoute.label}
						width={selectedRoute.figma?.width}
					/>
				</Suspense>
			</PreviewCanvas>
		</section>
	);
}
