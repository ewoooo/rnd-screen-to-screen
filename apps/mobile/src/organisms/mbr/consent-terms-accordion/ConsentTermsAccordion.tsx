"use client";

import { AccordionList, Checkbox, Text } from "@pxds/cx-components";
import { FieldStack } from "@pxds/pxds-layout/components/compositions";
import type { ConsentTermsAccordionProps } from "./ConsentTermsAccordion.config";

type ConsentItem = {
	id: string;
	required: boolean;
	title: string;
	caption: string;
	bodyPlaceholder: string;
};

const CONSENT_ITEMS: readonly ConsentItem[] = [
	{
		id: "service",
		required: true,
		title: "[필수] T 우주 서비스 이용약관 (v3.2)",
		caption: "회원 가입 및 서비스 이용을 위한 기본 약관입니다.",
		bodyPlaceholder:
			"제1조 (목적) 본 약관은 T 우주 서비스의 이용 조건과 운영에 관한 사항을 규정합니다. (전문 표시 자리)",
	},
	{
		id: "privacy",
		required: true,
		title: "[필수] 개인정보 수집·이용 동의 (v5.1)",
		caption: "이름, 연락처 등 회원 식별·운영에 필요한 정보를 수집합니다.",
		bodyPlaceholder:
			"수집 항목: 이름, 생년월일, 연락처. 보유 기간: 회원 탈퇴 시까지. (전문 표시 자리)",
	},
	{
		id: "marketing",
		required: false,
		title: "[선택] 혜택·이벤트 정보 수신 동의",
		caption: "동의하지 않아도 가입할 수 있어요.",
		bodyPlaceholder:
			"신규 혜택, 이벤트, 추천 상품 안내를 SMS/이메일로 보내드립니다. (전문 표시 자리)",
	},
];

export function ConsentTermsAccordion({
	allChecked,
	onAllCheckedChange,
	checkedById,
	onItemCheckedChange,
}: ConsentTermsAccordionProps) {
	return (
		<FieldStack>
			<Checkbox
				checked={allChecked}
				label="전체 동의 (필수·선택 약관 모두)"
				onCheckedChange={onAllCheckedChange}
			/>
			<AccordionList
				allowMultiple
				items={CONSENT_ITEMS.map((item) => ({
					id: item.id,
					title: item.title,
					leftText: (
						<Checkbox
							checked={Boolean(checkedById[item.id])}
							onCheckedChange={(next) => onItemCheckedChange(item.id, next)}
						/>
					),
					content: (
						<>
							<Text variant="helper">{item.caption}</Text>
							<Text variant="body">{item.bodyPlaceholder}</Text>
						</>
					),
				}))}
			/>
		</FieldStack>
	);
}

export const CONSENT_ITEM_IDS = CONSENT_ITEMS.map((item) => item.id);
export const REQUIRED_CONSENT_IDS = CONSENT_ITEMS.filter(
	(item) => item.required,
).map((item) => item.id);
