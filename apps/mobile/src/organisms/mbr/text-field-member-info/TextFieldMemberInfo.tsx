import { TextField } from "@pxds/cx-components";
import { FieldStack } from "@pxds/cx-layout/components/compositions";

export function TextFieldMemberInfo() {
	return (
		<FieldStack data-component-id="ogn-mbr-text-field-member-info">
			<TextField
				label="아이디"
				value=""
				placeholder="영문, 숫자 6~20자"
				helperText="영문 또는 숫자 6~20자"
				actionButton={{ label: "중복확인" }}
				maxLength={20}
				readOnly
			/>
			<TextField
				label="비밀번호"
				value=""
				placeholder="영문/숫자/특수문자 조합 10~20자"
				helperText="영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합해 주세요."
				type="password"
				maxLength={20}
				readOnly
			/>
			<TextField
				label="비밀번호 확인"
				value=""
				placeholder="비밀번호 재입력"
				type="password"
				maxLength={20}
				readOnly
			/>
			<TextField
				label="이메일"
				value=""
				placeholder="example@domain.com"
				type="email"
				readOnly
			/>
			<TextField
				label="휴대폰번호"
				value=""
				placeholder="숫자 11자리"
				inputMode="numeric"
				maxLength={11}
				readOnly
			/>
		</FieldStack>
	);
}
