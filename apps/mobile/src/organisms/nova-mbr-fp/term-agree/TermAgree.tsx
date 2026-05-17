"use client";

import { Checkbox, Divider, Notice, Text } from "@pxds/cx-components";
import { Box, HStack, VStack } from "@pxds/cx-layout/primitives";
import { Fragment, useState } from "react";

type ConsentItem = {
	id: string;
	title: string;
	caption: string;
	required: boolean;
};

// SB ogn-mbr-term-agree: 전체 동의 + 개별 약관 동의 처리.
// POL-MBR-TERM-001-06(필수 약관 미동의 시 진행 차단) 가시 계약.
// POL-MBR-TERM-001-07(선택 약관 미동의 처리)는 policy-core 미작성 → SB 근거.
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

export function TermAgree() {
	const [checked, setChecked] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(CONSENT_ITEMS.map((item) => [item.id, false])),
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
		<VStack data-section-id="agreement" gap="var(--semantic-spacing-gap-loose)">
			<Box
				background="var(--component-card-bg-default)"
				borderColor="var(--component-card-border-default)"
				borderRadius="var(--semantic-radius-lg)"
				borderWidth="1px"
				overflow="hidden"
				style={{ borderStyle: "solid" }}
			>
				<ConsentRow
					title="전체 동의"
					caption="필수·선택 약관에 모두 동의합니다"
					checked={allChecked}
					onCheckedChange={setAll}
					emphasis
				/>
				<Divider type="contents" />
				{CONSENT_ITEMS.map((item, index) => (
					<Fragment key={item.id}>
						{index > 0 ? <Divider type="contents" /> : null}
						<ConsentRow
							title={item.title}
							caption={item.caption}
							checked={Boolean(checked[item.id])}
							onCheckedChange={(next) => setItem(item.id, next)}
						/>
					</Fragment>
				))}
			</Box>
			{requiredUnchecked.length > 0 ? (
				<Notice
					aria-live="polite"
					tone="negative"
					title="필수 약관에 동의해 주세요"
				>
					{requiredUnchecked.length}개의 필수 약관 동의가 필요합니다.
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
		<HStack
			align="flex-start"
			gap="var(--semantic-spacing-gap-comfortable)"
			px="var(--semantic-spacing-inset-lg)"
			py="var(--semantic-spacing-inset-lg)"
		>
			<Checkbox checked={checked} onCheckedChange={onCheckedChange} />
			<VStack minWidth={0} gap="var(--semantic-spacing-gap-tight)">
				<Text variant={emphasis ? "sectionTitle" : "listTitle"}>{title}</Text>
				<Text variant="helper">{caption}</Text>
			</VStack>
		</HStack>
	);
}
