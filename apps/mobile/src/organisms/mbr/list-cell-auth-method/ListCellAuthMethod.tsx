import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { Button, SectionMessage } from "@pxds/pxds-components/core";
import { FormField, SelectableList, TextField } from "@pxds/pxds-components/molecules";
import { MbrOgnSectionLayout } from "../_layout";

export function ListCellAuthMethod() {
	return (
		<MbrOgnSectionLayout inset="bleed" rail="inset">
			<FormField label="인증번호" helperText="유효시간 3분">
				<TextField value="" placeholder="6자리 숫자" readOnly />
			</FormField>
			<SelectableList
				name="auth-method"
				value="phone"
				density="compact"
				items={[
					{ id: "phone", title: "휴대폰 인증" },
					{ id: "pass", title: "PASS 인증" },
					{ id: "cert", title: "공동인증서" },
				]}
			/>
			<TextBlock variant="caption" text="남은 시간 02:48" />
			<Button variant="solid" size="large">
				인증번호 요청
			</Button>
			<Button variant="outlined" size="large">
				재요청
			</Button>
			<SectionMessage
				variant="negative"
				description="10분 후 다시 시도해 주세요"
			>
				인증 실패 한도 초과
			</SectionMessage>
		</MbrOgnSectionLayout>
	);
}
