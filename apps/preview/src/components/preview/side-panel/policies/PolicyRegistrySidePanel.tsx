"use client";

import { SidePanelHeader } from "@/components/preview/side-panel/SidePanelHeader";
import { Separator } from "@/components/ui/separator";
import { useScreenSpecs } from "@/hooks/use-screen-specs";

export function PolicyRegistrySidePanel() {
	const { specCount, renderableSpecCount } = useScreenSpecs();

	return (
		<>
			<SidePanelHeader
				title="Policies"
				description={`${specCount} specs · ${renderableSpecCount} render specs`}
			/>
			<Separator />

			<div className="flex flex-1 flex-col gap-3 overflow-auto p-3 text-sm text-neutral-600">
				<div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
					<p className="font-medium text-neutral-900">Policy lookup</p>
					<p className="mt-1 text-xs leading-5 text-neutral-500">
						Spec and policy-document browsing will attach here.
					</p>
				</div>
			</div>
		</>
	);
}
