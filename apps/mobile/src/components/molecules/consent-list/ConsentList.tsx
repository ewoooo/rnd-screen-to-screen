"use client";

import { useEffect, useMemo, useState } from "react";

import { Checkbox } from "@pxds/pxds-components/patterns";
import { Divider } from "@pxds/pxds-components/feedback";
import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/typography";

export type ConsentListItem = {
	id: string;
	title: string;
	caption: string;
	required: boolean;
	defaultChecked?: boolean;
};

export type ConsentListState = {
	allRequiredChecked: boolean;
	missingRequiredCount: number;
};

type Props = {
	allLabel: string;
	allCaption: string;
	items: readonly ConsentListItem[];
	onStateChange?: (state: ConsentListState) => void;
};

export function ConsentList({
	allLabel,
	allCaption,
	items,
	onStateChange,
}: Props) {
	const [checked, setChecked] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(items.map((item) => [item.id, Boolean(item.defaultChecked)])),
	);
	const allChecked = items.every((item) => checked[item.id]);
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

	const setAll = (next: boolean) => {
		setChecked(Object.fromEntries(items.map((item) => [item.id, next])));
	};

	const setItem = (id: string, next: boolean) => {
		setChecked((current) => ({ ...current, [id]: next }));
	};

	return (
		<VStack>
			<ConsentRow
				title={allLabel}
				caption={allCaption}
				checked={allChecked}
				onCheckedChange={setAll}
				emphasis
			/>
			<Divider />
			{items.map((item, index) => (
				<VStack key={item.id}>
					<ConsentRow
						title={item.title}
						caption={`${item.required ? "필수" : "선택"} · ${item.caption}`}
						checked={Boolean(checked[item.id])}
						invalid={item.required && !checked[item.id]}
						onCheckedChange={(next) => setItem(item.id, next)}
					/>
					{index < items.length - 1 ? <Divider /> : null}
				</VStack>
			))}
			{requiredUnchecked.length > 0 ? (
				<VStack pt="inline">
					<TextBlock
						variant="assistive"
						text={`${requiredUnchecked.length}개의 필수 약관 동의가 필요합니다.`}
						color="semantic.status.negative"
					/>
				</VStack>
			) : null}
		</VStack>
	);
}

function ConsentRow({
	title,
	caption,
	checked,
	invalid,
	onCheckedChange,
	emphasis,
}: {
	title: string;
	caption: string;
	checked: boolean;
	invalid?: boolean;
	onCheckedChange: (checked: boolean) => void;
	emphasis?: boolean;
}) {
	return (
		<HStack
			align="center"
			gap="stack"
			style={{
				minHeight: emphasis ? 60 : 64,
			}}
		>
			<Checkbox
				checked={checked}
				invalid={invalid}
				onCheckedChange={onCheckedChange}
			/>
			<VStack minWidth={0} gap="row">
				<TextBlock
					variant={emphasis ? "cardTitle" : "listTitle"}
					text={title}
					maxLines={2}
				/>
				<TextBlock
					variant="supportText"
					text={caption}
					color={invalid ? "semantic.status.negative" : "semantic.label.alternative"}
					maxLines={1}
					overflow="truncate"
				/>
			</VStack>
		</HStack>
	);
}
