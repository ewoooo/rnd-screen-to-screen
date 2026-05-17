import { Notice, TextField } from "@pxds/cx-components";
import { FieldStack } from "@pxds/cx-layout/components/compositions";
import { VStack } from "@pxds/cx-layout/primitives";

// SB ogn-mbr-member-input: 항상 노출되는 입력·검증 영역.
// POL-MBR-INFO-002-03/-04 아이디 문자 종류·길이, POL-MBR-INFO-002-05/-06 비밀번호 길이·조합,
// POL-MBR-INFO-002-08 연락처 숫자 11자리 가시 계약.
// 검증 실패 시 필드 인접 negative Notice 로 정책 에러 카피 노출(UXPT_ERR).
export function MemberInput() {
	return (
		<VStack gap="var(--semantic-spacing-block)">
			<FieldStack data-component-id="ogn-mbr-member-input">
				<TextField
					label="아이디"
					value=""
					placeholder="영문, 숫자 6~20자"
					helperText="영문과 숫자만 6~20자로 입력해 주세요"
					maxLength={20}
					readOnly
				/>
				<TextField
					label="비밀번호"
					value=""
					placeholder="영문/숫자/특수문자 조합 10~20자"
					helperText="10~20자, 영문 대/소문자·숫자·특수문자 중 3종 이상 조합해 주세요"
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
					label="연락처"
					value=""
					placeholder="숫자 11자리"
					inputMode="numeric"
					maxLength={11}
					readOnly
				/>
			</FieldStack>
			<Notice tone="negative" title="입력 정보를 확인해 주세요">
				아이디는 영문과 숫자만 6~20자로 입력해 주세요
			</Notice>
		</VStack>
	);
}
