import { Button } from "@pxds/pxds-components/core";
import { FormField, TextField } from "@pxds/pxds-components/molecules";
import { MbrOgnSectionLayout } from "../_layout";

export function TextFieldMemberInfo() {
	return (
		<MbrOgnSectionLayout>
			<FormField
				label="아이디"
				helperText="영문 소문자 또는 숫자 6~20자"
			>
				<TextField value="" placeholder="영문, 숫자 6~20자" readOnly />
			</FormField>
			<Button variant="outlined" size="large">
				중복확인
			</Button>
			<FormField
				label="비밀번호"
				helperText="영문/숫자/특수문자를 조합해 주세요."
			>
				<TextField
					value=""
					placeholder="영문/숫자/특수문자 조합 10~20자"
					readOnly
				/>
			</FormField>
			<FormField label="비밀번호 확인">
				<TextField value="" placeholder="비밀번호 재입력" readOnly />
			</FormField>
			<FormField label="이메일">
				<TextField value="" placeholder="example@domain.com" readOnly />
			</FormField>
			<FormField label="휴대폰번호">
				<TextField value="" placeholder="숫자만 입력" readOnly />
			</FormField>
		</MbrOgnSectionLayout>
	);
}
