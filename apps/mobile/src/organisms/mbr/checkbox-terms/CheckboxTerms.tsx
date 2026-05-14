"use client";

import { Checkbox, Divider, Notice, Text } from "@pxds/cx-components";
import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { useState } from "react";

type ConsentItem = {
	id: string;
	title: string;
	caption: string;
	required: boolean;
	defaultChecked?: boolean;
};

const CONSENT_ITEMS: readonly ConsentItem[] = [
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

export function CheckboxTerms() {
	const [checked, setChecked] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(
			CONSENT_ITEMS.map((item) => [item.id, Boolean(item.defaultChecked)]),
		),
	);
	const allChecked = CONSENT_ITEMS.every((item) => checked[item.id]);
	const requiredUnchecked = CONSENT_ITEMS.filter(
		(item) => item.required && !checked[item.id],
	);

	const setAll = (next: boolean) => {
		setChecked(Object.fromEntries(CONSENT_ITEMS.map((item) => [item.id, next])));
	};

	const setItem = (id: string, next: boolean) => {
		setChecked((current) => ({ ...current, [id]: next }));
	};

	return (
		<VStack gap="var(--semantic-spacing-block)">
			<VStack gap="var(--semantic-spacing-stack)">
				<ConsentRow
					title="전체 동의"
					caption="필수·선택 약관을 모두 동의합니다"
					checked={allChecked}
					onCheckedChange={setAll}
					emphasis
				/>
				<Divider type="contents" />
				<VStack gap="var(--semantic-spacing-stack)">
					{CONSENT_ITEMS.map((item) => (
						<ConsentRow
							key={item.id}
							title={item.title}
							caption={item.caption}
							checked={Boolean(checked[item.id])}
							onCheckedChange={(next) => setItem(item.id, next)}
						/>
					))}
				</VStack>
			</VStack>
			{requiredUnchecked.length > 0 ? (
				<Notice tone="negative" title="필수 약관 동의가 필요합니다">
					{requiredUnchecked.length}개의 필수 약관에 동의해 주세요.
				</Notice>
			) : null}
		</VStack>
	);
}

function ConsentRow({
	title,
	caption,
	checked,
	onCheckedChange,
	emphasis,
}: {
	title: string;
	caption: string;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	emphasis?: boolean;
}) {
	return (
		<HStack align="flex-start" gap="var(--semantic-spacing-stack)">
			<Checkbox checked={checked} onCheckedChange={onCheckedChange} />
			<VStack minWidth={0} gap="var(--semantic-spacing-row)">
				<Text variant={emphasis ? "sectionTitle" : "listTitle"}>{title}</Text>
				<Text variant="helper">{caption}</Text>
			</VStack>
		</HStack>
	);
}
