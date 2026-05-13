import { TextField } from "@pxds/cx-components";
import { VStack } from "@pxds/pxds-layout/primitives";


export function TextFieldMemberInfo() {
	return (
		<VStack gap={16}>
			<TextField
				label="아이디"
				value=""
				placeholder="영문, 숫자 6~20자"
				helperText="영문 소문자 또는 숫자 6~20자"
				actionButton={{ label: "중복확인" }}
				readOnly
			/>
			<TextField
				label="비밀번호"
				value=""
				placeholder="영문/숫자/특수문자 조합 10~20자"
				helperText="영문/숫자/특수문자를 조합해 주세요."
				readOnly
			/>
			<TextField
				label="비밀번호 확인"
				value=""
				placeholder="비밀번호 재입력"
				readOnly
			/>
			<TextField
				label="이메일"
				value=""
				placeholder="example@domain.com"
				readOnly
			/>
			<TextField
				label="휴대폰번호"
				value=""
				placeholder="숫자만 입력"
				readOnly
			/>
		</VStack>
	);
}
