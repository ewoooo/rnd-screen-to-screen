"use client";

import { DescriptionList, type DescriptionListItem } from "../../../molecules";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

export type ReusedInfoItem = {
	id: string;
	title: string;
	trailingLabel: string;
	action?: string | null;
};

type Props = {
	label?: string;
	items: readonly ReusedInfoItem[];
	onActionClick?: (id: string) => void;
};

export function ReusedInfoList({ label, items, onActionClick }: Props) {
	const descriptionItems: DescriptionListItem[] = items.map((item) => ({
		id: item.id,
		label: item.title,
		value: item.trailingLabel,
		actionLabel: item.action,
	}));

	return (
		<ContentSection>
			<DescriptionList
				label={label}
				items={descriptionItems}
				onActionClick={onActionClick}
			/>
		</ContentSection>
	);
}
