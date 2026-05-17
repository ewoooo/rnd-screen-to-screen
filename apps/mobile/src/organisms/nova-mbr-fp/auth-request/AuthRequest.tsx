import { Button, Notice, Text, TextField } from "@pxds/cx-components";
import { HStack, VStack } from "@pxds/cx-layout/primitives";

// SB ogn-mbr-auth-request: 인증번호 발송·입력·검증·재요청 처리.
// POL-MBR-AUTH-001-01(본인인증 적용), POL-MBR-AUTH-003-01(인증번호 6자리),
// POL-MBR-AUTH-003-03(유효시간 3분), POL-MBR-AUTH-004-01/-004-02(재요청 60초/최대 5회),
// POL-MBR-AUTH-005-01/-005-03/-005-07(실패 최대 5회/10분 제한/실패 안내) 가시 계약.
// 프로토타입이므로 만료 상태(cautionary) 1개만 정적 노출해 SB error 상태를 대표한다.
export function AuthRequest() {
	return (
		<VStack data-section-id="authRequest" gap="var(--semantic-spacing-block)">
			<Text variant="sectionTitle">6자리 인증번호를 입력해 주세요</Text>
			<TextField
				label="인증번호"
				value=""
				placeholder="6자리 숫자"
				helperText="유효시간 02:48"
				inputMode="numeric"
				maxLength={6}
				readOnly
			/>
			<Text variant="helper">인증번호는 3분 동안 유효해요</Text>
			<HStack
				display="grid"
				gap="var(--semantic-spacing-inline)"
				style={{ gridTemplateColumns: "1fr 1fr" }}
			>
				<Button variant="secondary" size="large" fullWidth>
					인증번호 재요청
				</Button>
				<Button variant="primary" size="large" fullWidth>
					인증 확인
				</Button>
			</HStack>
			<Notice
				aria-live="polite"
				tone="cautionary"
				title="유효시간이 만료되어 다시 요청해 주세요"
			>
				인증번호는 3분 동안 유효해요. 재요청은 최대 5회까지 할 수 있어요.
			</Notice>
		</VStack>
	);
}
