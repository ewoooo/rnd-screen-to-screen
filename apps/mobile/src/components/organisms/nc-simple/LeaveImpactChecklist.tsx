"use client";

import { useEffect, useMemo, useState } from "react";

import { Divider } from "@pxds/pxds-components/feedback";
import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/typography";
import { Checkbox } from "@pxds/pxds-components/patterns";
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
	const [checked, setChecked] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(items.map((item) => [item.id, false])),
	);
	const requiredUnchecked = useMemo(
		() => items.filter((item) => item.required && !checked[item.id]),
		[checked, items],
	);

	useEffect(() => {
		onStateChange?.({
			allRequiredChecked: requiredUnchecked.length === 0,
			missingRequiredCount: requiredUnchecked.length,
		});
	}, [onStateChange, requiredUnchecked.length]);

	const setItem = (id: string, next: boolean) => {
		setChecked((current) => ({ ...current, [id]: next }));
	};

	return (
		<ContentSection>
			<VStack>
				{items.map((item, index) => (
					<VStack key={item.id}>
						<HStack gap="row" align="flex-start" justify="space-between">
							<HStack gap="row" align="flex-start">
								<Checkbox
									checked={Boolean(checked[item.id])}
									onCheckedChange={(next) => setItem(item.id, next)}
								/>
								<VStack gap="inline">
									<TextBlock variant="body" text={item.title} />
									<TextBlock
										variant="caption"
										color="semantic.label.alternative"
										text={item.sub}
										maxLines={2}
									/>
								</VStack>
							</HStack>
							{item.hasDetail ? (
								<button
									type="button"
									onClick={() => onDetailClick?.(item.id)}
									style={{
										flexShrink: 0,
										background: "transparent",
										border: "none",
										padding: "var(--spacing-2)",
										cursor: "pointer",
									}}
								>
									<TextBlock
										variant="caption"
										color="semantic.primary.normal"
										text={detailLabel}
									/>
								</button>
							) : null}
						</HStack>
						{index < items.length - 1 ? <Divider /> : null}
					</VStack>
				))}
			</VStack>
		</ContentSection>
	);
}
