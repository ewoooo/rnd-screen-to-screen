"use client";

import Link from "next/link";

import { SidePanelHeader } from "@/components/preview/side-panel/SidePanelHeader";
import { Separator } from "@/components/ui/separator";
import { useComponentRegistry } from "@/contexts/component-registry-context";

type ComponentRegistrySidePanelProps = {
	selectedComponentId?: string;
};

export function ComponentRegistrySidePanel({
	selectedComponentId,
}: ComponentRegistrySidePanelProps) {
	const { componentCount, componentLayers, componentsByLayer } =
		useComponentRegistry();

	return (
		<>
			<SidePanelHeader
				title="Components"
				description={`${componentCount} components`}
			/>
			<Separator />

			<nav className="flex flex-1 flex-col gap-5 overflow-auto p-3">
				{componentLayers.map((layer) => (
					<section key={layer} className="flex flex-col gap-1">
						<h2 className="px-3 py-1 text-xs font-semibold uppercase text-neutral-500">
							{layer}
						</h2>
						<div className="flex flex-col gap-1">
							{(componentsByLayer[layer] ?? []).map((component) => (
								<Link
									key={component.id}
									href={`/components/${component.id}`}
									className={`rounded-md px-5 py-2 text-sm ${
										component.id === selectedComponentId
											? "bg-neutral-100 text-neutral-950"
											: "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
									}`}
								>
									<p className="truncate font-medium">{component.name}</p>
									<p className="truncate text-xs text-neutral-500">
										{component.group}
									</p>
								</Link>
							))}
						</div>
					</section>
				))}
			</nav>
		</>
	);
}
