"use client";

import { SelectableList } from "@pxds/pxds-components/molecules";
import { MembershipOgnSectionLayout } from "../_layout";
import type { SelectableSectionProps } from "./SelectableSection.config";

export function MembershipSelectableSection({
	name,
	items,
	value,
	selectionMode,
	selectedIds,
}: SelectableSectionProps) {
	if (selectionMode === "multi") {
		return (
			<MembershipOgnSectionLayout inset="bleed" rail="inset">
				<SelectableList
					name={name}
					items={items}
					selectionMode="multi"
					selectedIds={selectedIds ?? []}
				/>
			</MembershipOgnSectionLayout>
		);
	}

	return (
		<MembershipOgnSectionLayout inset="bleed" rail="inset">
			<SelectableList name={name} items={items} value={value} />
		</MembershipOgnSectionLayout>
	);
}
