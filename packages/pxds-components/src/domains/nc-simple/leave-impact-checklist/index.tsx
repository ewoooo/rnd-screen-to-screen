"use client";

import { CheckList, type CheckListItem } from "../../../molecules";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

export type LeaveImpactItem = {
	id: string;
	title: string;
	sub: string;
	hasDetail?: boolean;
	required: boolean;
};

export type LeaveImpactState = {
	allRequiredChecked: boolean;
	missingRequiredCount: number;
};

type Props = {
	items: readonly LeaveImpactItem[];
	detailLabel?: string;
	onDetailClick?: (id: string) => void;
	onStateChange?: (state: LeaveImpactState) => void;
};

export function LeaveImpactChecklist({
	items,
	detailLabel = "자세히",
	onDetailClick,
	onStateChange,
}: Props) {
	const checkItems: CheckListItem[] = items.map((item) => ({
		id: item.id,
		title: item.title,
		caption: item.sub,
		required: item.required,
		actionLabel: item.hasDetail ? detailLabel : null,
	}));

	return (
		<ContentSection>
			<CheckList
				items={checkItems}
				onActionClick={onDetailClick}
				onStateChange={onStateChange}
			/>
		</ContentSection>
	);
}
