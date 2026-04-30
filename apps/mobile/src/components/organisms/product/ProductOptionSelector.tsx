"use client";

import { useState } from "react";

import { SectionCard, SelectableList, type SelectableItem } from "@/components/molecules";
import { ContentSection } from "@/components/templates/app-screen";

type OptionItem = {
	id: string;
	title: string;
	sub: string;
	pill: string;
	disabled?: boolean;
	disabledReason?: string;
};

type Props = {
	label: string;
	title: string;
	items: readonly OptionItem[];
	selectedId: string;
};

export function ProductOptionSelector({ label, title, items, selectedId }: Props) {
	const [value, setValue] = useState(selectedId);
	const listItems: SelectableItem[] = items.map((item) => ({
		id: item.id,
		title: item.title,
		sub: item.sub,
		trailingLabel: item.pill,
		disabled: item.disabled,
		disabledReason: item.disabledReason,
	}));

	return (
		<ContentSection>
			<SectionCard label={label} title={title}>
				<SelectableList
					name="product-option"
					items={listItems}
					value={value}
					onChange={setValue}
				/>
			</SectionCard>
		</ContentSection>
	);
}
