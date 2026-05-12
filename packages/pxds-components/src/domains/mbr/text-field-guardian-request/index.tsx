"use client";

import { VStack } from "@pxds/pxds-layout/primitives";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

import { Button, SectionMessage } from "../../../core";
import { TextField } from "../../../molecules/form-controls";
import { FormField } from "../../../molecules/form-field";

type Props = {
	visible?: boolean;
};

export function TextFieldGuardianRequest({ visible = false }: Props) {
	if (!visible) return null;
	return (
		<ContentSection
			exportNode={{
				type: "TextFieldGuardianRequest",
				id: "text-field-guardian-request",
				props: {
					componentId: "ogn-mbr-text-field-guardian-request",
					visible,
				},
			}}
		>
			<VStack gap="block">
				<SectionMessage
					variant="info"
					description="만 14세 미만 고객의 가입은 법정대리인 동의가 필요합니다."
				>
					법정대리인 동의 안내
				</SectionMessage>
				<FormField label="법정대리인 이름" required>
					<TextField value="" placeholder="법정대리인 이름" readOnly />
				</FormField>
				<FormField
					label="법정대리인 연락처"
					required
					helperText="동의 요청 유효시간 24시간"
				>
					<TextField value="" placeholder="법정대리인 연락처" readOnly />
				</FormField>
				<Button variant="solid">동의 요청 보내기</Button>
			</VStack>
		</ContentSection>
	);
}
