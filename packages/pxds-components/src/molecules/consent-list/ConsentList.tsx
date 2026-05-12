"use client";

import { useEffect, useState } from "react";

import { Checkbox } from "../form-controls";
import { Divider } from "@pxds/pxds-components/atoms/feedback";
import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import {
	renderBoolean,
	renderString,
	type ComponentRenderReact,
	type RenderReactPropValue,
} from "../../render-react";

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
	const requiredUnchecked = items.filter(
		(item) => item.required && !checked[item.id],
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
				<VStack pt="var(--semantic-spacing-inline)">
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

const DEFAULT_ITEMS: readonly ConsentListItem[] = [
	{
		id: "service",
		title: "[필수] 서비스 이용약관 동의",
		caption: "회원 가입 및 서비스 이용을 위해 필요합니다.",
		required: true,
	},
	{
		id: "privacy",
		title: "[필수] 개인정보 수집·이용 동의",
		caption: "이름·연락처 등 회원 정보 처리에 필요합니다.",
		required: true,
	},
	{
		id: "marketing",
		title: "[선택] 마케팅 정보 수신 동의",
		caption: "혜택·이벤트 안내를 받습니다.",
		required: false,
	},
];

export const consentListRenderReact: ComponentRenderReact = ({ node }) => (
	<ConsentList
		allLabel={renderString(node.props?.allLabel) ?? "전체 동의"}
		allCaption={
			renderString(node.props?.allCaption) ??
			"필수·선택 약관을 모두 동의합니다"
		}
		items={renderConsentItems(node.props?.items)}
	/>
);

function renderConsentItems(
	value: RenderReactPropValue | undefined,
): readonly ConsentListItem[] {
	if (!Array.isArray(value)) return DEFAULT_ITEMS;
	const items = value.flatMap((item) => {
		if (!item || typeof item !== "object" || Array.isArray(item)) return [];
		return [
			{
				id: renderString(item.id) ?? "",
				title: renderString(item.title) ?? "",
				caption: renderString(item.caption) ?? "",
				required: renderBoolean(item.required, false),
				defaultChecked: renderBoolean(item.defaultChecked, false),
			},
		];
	});
	return items.length > 0 ? items : DEFAULT_ITEMS;
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
			gap="var(--semantic-spacing-stack)"
			style={{
				minHeight: emphasis ? 60 : 64,
			}}
		>
			<Checkbox
				checked={checked}
				invalid={invalid}
				onCheckedChange={onCheckedChange}
			/>
			<VStack minWidth={0} gap="var(--semantic-spacing-row)">
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
