import { Button, Notice, TextField } from "@pxds/cx-components";
import { VStack } from "@pxds/cx-layout/primitives";
import type { GuardianInputProps } from "./GuardianInput.config";

// SB ogn-mbr-guardian-input: [고객유형]=미성년자일 때만 노출.
// POL-MBR-TERM-002-01(법정대리인 동의 대상), POL-MBR-TERM-002-05(유효시간 24시간) 가시 계약.
// POL-MBR-TERM-002-03/-002-06 은 policy-core 미작성 → SB 근거.
export function GuardianInput({ visible = false }: GuardianInputProps) {
	if (!visible) return null;

	return (
		<VStack data-section-id="guardian" gap="var(--semantic-spacing-block)">
			<Notice tone="info" title="법정대리인 동의 안내">
				만 14세 미만 고객은 법정대리인 동의가 필요합니다. 동의 요청 유효시간은
				24시간입니다.
			</Notice>
			<TextField
				label="법정대리인 이름"
				value=""
				placeholder="법정대리인 이름"
				readOnly
			/>
			<TextField
				label="법정대리인 연락처"
				value=""
				placeholder="숫자 11자리"
				helperText="동의 요청 유효시간 24시간"
				inputMode="numeric"
				maxLength={11}
				readOnly
			/>
			<Button variant="primary" size="large" fullWidth>
				동의 요청 발송
			</Button>
		</VStack>
	);
}
