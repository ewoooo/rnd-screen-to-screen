"use client";

import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { ConsentList } from "@pxds/pxds-components/molecules";
import { MembershipContentSection } from "../MembershipContentSection";

export function MembershipTermsSection() {
	return (
		<MembershipContentSection>
			<TextBlock variant="sectionTitle" text="필수 약관" />
			<ConsentList
				allLabel="전체 동의"
				allCaption="선택 약관까지 한 번에 동의"
				items={[
					{
						id: "service",
						title: "T 우주 서비스 이용약관",
						caption: "v3.2",
						required: true,
						defaultChecked: true,
					},
					{
						id: "privacy",
						title: "개인정보 수집 및 이용 동의",
						caption: "v5.1",
						required: true,
						defaultChecked: true,
					},
					{
						id: "marketing",
						title: "혜택·이벤트 정보 수신 동의",
						caption: "동의하지 않아도 가입 가능",
						required: false,
						defaultChecked: false,
					},
				]}
			/>
		</MembershipContentSection>
	);
}
