"use client";

import { Suspense } from "react";
import { ExternalLinkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PreviewCanvas } from "@/components/preview/render-view/shared/PreviewCanvas";
import { PreviewHeader } from "@/components/preview/render-view/shared/PreviewHeader";
import { PreviewPageRenderItem } from "@/components/preview/render-view/page/PreviewPageRenderItem";
import { PreviewSpinner } from "@/components/preview/render-view/shared/PreviewSpinner";
import { usePageRegistry } from "@/contexts/page-registry-context";

const MOBILE_ORIGIN =
	process.env.NEXT_PUBLIC_MOBILE_ORIGIN ?? "http://localhost:3001";

export function PagePreview() {
	const { selectedRoute } = usePageRegistry();
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
				<Suspense fallback={<PreviewSpinner label="Loading page preview" />}>
					<PreviewPageRenderItem
						key={iframeSrc}
						src={iframeSrc}
						title={selectedRoute.label}
					/>
				</Suspense>
			</PreviewCanvas>
		</section>
	);
}
