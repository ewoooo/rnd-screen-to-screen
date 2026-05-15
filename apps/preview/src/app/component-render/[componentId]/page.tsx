"use client";

import { useParams } from "next/navigation";
import {
	getCxComponentPreviewById,
	getCxComponentPreviewExample,
} from "@pxds/cx-components/preview";

import { ComponentExampleMissing } from "@/components/preview/render-view/component/ComponentExampleMissing";

export default function ComponentRenderRoutePage() {
	const params = useParams<{ componentId?: string }>();
	const componentId = params.componentId ?? "";
	const component = getCxComponentPreviewById(componentId);

	if (!component) {
		return (
			<main className="grid min-h-dvh place-items-center bg-transparent p-8">
				<ComponentExampleMissing componentName={componentId || "Unknown"} />
			</main>
		);
	}

	const example = getCxComponentPreviewExample(component.id);

	return (
		<main className="min-h-dvh bg-neutral-50 p-6">
			{example ? (
				<section
					aria-label={`${component.name} preview cases`}
					className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4"
				>
					{example.cases.map((previewCase) => (
						<article
							key={previewCase.id}
							className="grid aspect-square min-w-0 grid-rows-[auto_1fr] overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
						>
							<header className="border-neutral-100 border-b px-4 py-3">
								<h2 className="truncate font-medium text-neutral-950 text-sm">
									{previewCase.label}
								</h2>
							</header>
							<div className="grid min-h-0 place-items-center overflow-auto p-4">
								<div className="w-full min-w-0">{previewCase.render()}</div>
							</div>
						</article>
					))}
				</section>
			) : (
				<ComponentExampleMissing componentName={component.name} />
			)}
		</main>
	);
}
