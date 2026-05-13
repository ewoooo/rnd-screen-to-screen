import { SectionMessage } from "@pxds/pxds-components/core";
import { Button, TextField } from "@pxds/cx-components";
import { VStack } from "@pxds/pxds-layout/primitives";
import type { TextFieldGuardianRequestProps } from "./TextFieldGuardianRequest.config";

export function TextFieldGuardianRequest({
	visible = false,
}: TextFieldGuardianRequestProps) {
	if (!visible) return null;

	return (
		<VStack gap="var(--semantic-spacing-block)">
			<SectionMessage
				variant="info"
				description="만 14세 미만 고객의 가입은 법정대리인 동의가 필요합니다."
			>
				법정대리인 동의 안내
			</SectionMessage>
			<TextField
				label="법정대리인 이름"
				value=""
				placeholder="법정대리인 이름"
				readOnly
			/>
			<TextField
				label="법정대리인 연락처"
				value=""
				placeholder="법정대리인 연락처"
				helperText="동의 요청 유효시간 24시간"
				readOnly
			/>
			<Button variant="primary" size="large">
				동의 요청 보내기
			</Button>
		</VStack>
	);
}
