"use client";

import { SelectableList } from "@pxds/pxds-components/molecules";
import { MembershipContentSection } from "../MembershipContentSection";
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
			<MembershipContentSection inset="bleed" rail="inset">
				<SelectableList
					name={name}
					items={items}
					selectionMode="multi"
					selectedIds={selectedIds ?? []}
				/>
			</MembershipContentSection>
		);
	}

	return (
		<MembershipContentSection inset="bleed" rail="inset">
			<SelectableList name={name} items={items} value={value} />
		</MembershipContentSection>
	);
}
