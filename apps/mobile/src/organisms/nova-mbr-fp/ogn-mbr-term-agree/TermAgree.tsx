"use client";

import { Checkbox, Divider, Notice, RQRCard, Text } from "@pxds/cx-components";
import { HStack, VStack } from "@pxds/cx-layout/primitives";
import { Fragment, useState } from "react";
import type { TermAgreeProps } from "./TermAgree.config";

type AgreeItem = {
	id: string;
	label: string;
	required: boolean;
};

// SB-only 구조 행(absent policy-core). 개별 동의 행 구조만 유지 — 미동의 제약 단정 금지.
const AGREE_ITEMS: readonly AgreeItem[] = [
	{ id: "service", label: "[필수] 서비스 이용약관에 동의", required: true },
	{
		id: "privacy",
		label: "[필수] 개인정보 수집·이용에 동의",
		required: true,
	},
	{
		id: "marketing",
		label: "[선택] 마케팅 정보 수신에 동의",
		required: false,
	},
];

const REQUIRED_IDS = AGREE_ITEMS.filter((item) => item.required).map(
	(item) => item.id,
);

function allRequiredAgreedFrom(checked: Record<string, boolean>) {
	return REQUIRED_IDS.every((id) => checked[id]);
}

export function TermAgree({
	showRequiredError = false,
	onRequiredAgreedChange,
}: TermAgreeProps) {
	const [checked, setChecked] = useState<Record<string, boolean>>(() =>
		Object.fromEntries(AGREE_ITEMS.map((item) => [item.id, false])),
	);

	const allChecked = AGREE_ITEMS.every((item) => checked[item.id]);

	function commit(next: Record<string, boolean>) {
		setChecked(next);
		onRequiredAgreedChange?.(allRequiredAgreedFrom(next));
	}

	function setAll(next: boolean) {
		commit(Object.fromEntries(AGREE_ITEMS.map((item) => [item.id, next])));
	}

	function setItem(id: string, next: boolean) {
		commit({ ...checked, [id]: next });
	}

	return (
		<VStack
			data-section-id="term-agree"
			gap="var(--semantic-spacing-gap-comfortable)"
		>
			{/* card surface = RQRCard 후보 (DESIGN_PATTERNS §13.1 — component-owned
			    padding/radius). vocabularyGap resolved: rqr-card. */}
			<RQRCard>
				{/* C5: 전체 동의 → Divider(contents) → 개별 항목 순서 고정 */}
				<AgreeRow
					label="약관에 모두 동의"
					emphasis
					checked={allChecked}
					onCheckedChange={setAll}
				/>
				<Divider type="contents" />
				{AGREE_ITEMS.map((item, index) => (
					<Fragment key={item.id}>
						{index > 0 ? <Divider type="contents" /> : null}
						<AgreeRow
							label={item.label}
							checked={Boolean(checked[item.id])}
							onCheckedChange={(next) => setItem(item.id, next)}
						/>
					</Fragment>
				))}
			</RQRCard>
			{/* C1: 필수 미동의 그룹 에러 — 동의 그룹에 인접. 상단 통합 알림 금지(ERR_1).
			    copy = POL-MBR-TERM-001-06.copy.error 원문. */}
			{showRequiredError ? (
				<Notice aria-live="polite" tone="negative">
					필수 약관에 동의해 주세요
				</Notice>
			) : null}
		</VStack>
	);
}

function AgreeRow({
	label,
	checked,
	onCheckedChange,
	emphasis,
}: {
	label: string;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	emphasis?: boolean;
}) {
	return (
		<HStack
			align="center"
			gap="var(--semantic-spacing-gap-comfortable)"
			px="var(--semantic-spacing-inset-lg)"
			py="var(--semantic-spacing-inset-lg)"
		>
			<Checkbox checked={checked} onCheckedChange={onCheckedChange} />
			{/* emphasisRule: first-row-only — all-agree만 강조(sectionTitle),
			    개별 동의 행은 listTitle 균일(typography distortion 금지). */}
			<Text variant={emphasis ? "sectionTitle" : "listTitle"} as="span">
				{label}
			</Text>
		</HStack>
	);
}
