import { Button, SectionMessage } from "@pxds/pxds-components/core";
import { FormField, TextField } from "@pxds/pxds-components/molecules";
import { MbrOgnSectionLayout } from "../_layout";
import type { TextFieldGuardianRequestProps } from "./TextFieldGuardianRequest.config";

export function TextFieldGuardianRequest({
	visible = false,
}: TextFieldGuardianRequestProps) {
	if (!visible) return null;

	return (
		<MbrOgnSectionLayout>
			<SectionMessage
				variant="info"
				description="만 14세 미만 고객의 가입은 법정대리인 동의가 필요합니다."
			>
				법정대리인 동의 안내
			</SectionMessage>
			<FormField label="법정대리인 이름">
				<TextField value="" placeholder="법정대리인 이름" readOnly />
			</FormField>
			<FormField label="법정대리인 연락처" helperText="동의 요청 유효시간 24시간">
				<TextField value="" placeholder="법정대리인 연락처" readOnly />
			</FormField>
			<Button variant="solid" size="large">
				동의 요청 보내기
			</Button>
		</MbrOgnSectionLayout>
	);
}
