"use client";

import { useEffect, useState } from "react";

import { TextButton } from "@pxds/pxds-components/core";
import { Divider } from "@pxds/pxds-components/atoms/feedback";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { Checkbox } from "../form-controls";

export type CheckListItem = {
	id: string;
	title: string;
	caption: string;
	required?: boolean;
	defaultChecked?: boolean;
	actionLabel?: string | null;
};

export type CheckListState = {
	allRequiredChecked: boolean;
	missingRequiredCount: number;
};

type Props = {
	items: readonly CheckListItem[];
	onActionClick?: (id: string) => void;
	onStateChange?: (state: CheckListState) => void;
};

export function CheckList({ items, onActionClick, onStateChange }: Props) {
	const [checked, setChecked] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(items.map((item) => [item.id, Boolean(item.defaultChecked)])),
	);
	const requiredUnchecked = items.filter(
		(item) => item.required && !checked[item.id],
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
		<VStack>
			{items.map((item, index) => (
				<VStack key={item.id}>
					<HStack gap="var(--semantic-spacing-row)" align="flex-start" justify="space-between">
						<HStack gap="var(--semantic-spacing-row)" align="flex-start">
							<Checkbox
								checked={Boolean(checked[item.id])}
								onCheckedChange={(next: boolean) => setItem(item.id, next)}
							/>
							<VStack gap="var(--semantic-spacing-inline)">
								<TextBlock variant="body" text={item.title} />
								<TextBlock
									variant="caption"
									color="semantic.label.alternative"
									text={item.caption}
									maxLines={2}
								/>
							</VStack>
						</HStack>
						{item.actionLabel ? (
							<TextButton
								color="primary"
								onClick={() => onActionClick?.(item.id)}
							>
								{item.actionLabel}
							</TextButton>
						) : null}
					</HStack>
					{index < items.length - 1 ? <Divider /> : null}
				</VStack>
			))}
		</VStack>
	);
}
