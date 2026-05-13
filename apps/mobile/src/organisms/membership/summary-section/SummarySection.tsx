"use client";

import { FlowSummaryCard } from "@pxds/pxds-components/shared/global";
import type { SummarySectionProps } from "./SummarySection.config";

export function MembershipSummarySection({
	label,
	title,
	items,
}: SummarySectionProps) {
	return <FlowSummaryCard label={label} title={title} items={items} />;
}
