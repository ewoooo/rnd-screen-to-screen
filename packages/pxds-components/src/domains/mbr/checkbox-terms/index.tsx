"use client";

import { ContentSection } from "@pxds/pxds-layout/app-screen";

import { ConsentList, type ConsentListItem } from "../../../molecules/consent-list";
import type { ComponentRenderReact } from "../../../render-react";

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

type Props = {
	items?: readonly ConsentListItem[];
};

export function CheckboxTerms({ items = DEFAULT_ITEMS }: Props) {
	return (
		<ContentSection
			exportNode={{
				type: "CheckboxTerms",
				id: "checkbox-terms",
				props: {
					componentId: "ogn-mbr-checkbox-terms",
					allCaption: "필수·선택 약관을 모두 동의합니다",
					allLabel: "전체 동의",
					itemCount: items.length,
				},
			}}
		>
			<ConsentList
				allLabel="전체 동의"
				allCaption="필수·선택 약관을 모두 동의합니다"
				items={items}
			/>
		</ContentSection>
	);
}

export const checkboxTermsRenderReact: ComponentRenderReact = () => (
	<CheckboxTerms />
);
