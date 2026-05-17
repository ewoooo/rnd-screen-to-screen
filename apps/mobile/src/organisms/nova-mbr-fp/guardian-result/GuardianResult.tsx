import { Button, Notice } from "@pxds/cx-components";
import { VStack } from "@pxds/cx-layout/primitives";
import type { GuardianResultProps } from "./GuardianResult.config";

// SB ogn-mbr-guardian-result: [고객유형]=미성년자일 때만 노출.
// POL-MBR-TERM-002-05(동의 유효시간 24시간) 가시 계약.
// POL-MBR-TERM-002-06(동의 미완료 처리)은 policy-core 미작성 → SB 근거.
export function GuardianResult({
	visible = false,
	expired = false,
}: GuardianResultProps) {
	if (!visible) return null;

	if (expired) {
		return (
			<VStack data-section-id="guardianResult" gap="var(--semantic-spacing-block)">
				<Notice tone="negative" title="동의 유효시간이 만료되었습니다">
					동의 요청 유효시간(24시간)이 지났습니다. 다시 요청해 주세요.
				</Notice>
				<Button variant="primary" size="large" fullWidth>
					동의 재요청
				</Button>
			</VStack>
		);
	}

	return (
		<VStack data-section-id="guardianResult" gap="var(--semantic-spacing-block)">
			<Notice tone="info" title="법정대리인 동의 대기 중">
				법정대리인이 동의를 완료하면 다음 단계로 진행할 수 있습니다. 유효시간은
				24시간입니다.
			</Notice>
		</VStack>
	);
}
