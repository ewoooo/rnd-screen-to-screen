"use client";

import {
	ActionButton,
	Notice,
	TextField,
	TitleSection,
} from "@pxds/cx-components";
import { FieldStack } from "@pxds/cx-layout/components/compositions";
import { VStack } from "@pxds/cx-layout/primitives";
import { useEffect, useState } from "react";

/**
 * ogn-mbr-auth-request (NEW)
 *
 * 본인인증 요청/확인 OGN.
 * - POL-MBR-AUTH-001-01: 본인인증 완료가 다음 단계의 필수 게이트
 * - POL-MBR-AUTH-003-01: 인증번호 6자리 숫자 (maxLength=6, numeric)
 * - POL-MBR-AUTH-003-03: 유효시간 180초, 잔여 시간 표시
 * - POL-MBR-AUTH-004-01: 재요청 쿨다운 60초
 * - POL-MBR-AUTH-004-02: 재요청 최대 5회
 * - POL-MBR-AUTH-005-01: 인증 실패 최대 5회
 * - POL-MBR-AUTH-005-03: 한도 초과 시 10분 인증 제한 (blocked)
 * - POL-MBR-AUTH-005-07: 실패 시 재시도/제한 안내 문구
 *
 * 레이아웃 계약: label(TitleSection) + 단일 numeric code field(TextField),
 * 재요청은 TextField의 inline actionButton(C1: 별도 sibling 버튼 금지),
 * 타이머/유효시간/한도는 helperText(C1: 필드 hint slot 소유),
 * 상태 메시지는 상태 레벨만 Notice tone(만료=cautionary 복구가능 /
 * 한도초과·시스템오류=negative) — Callout은 tone 분기가 없어 Diagram 기록상
 * rqr-notice(Notice) tone으로 충족(C1).
 * 인증 확인은 영역 내 secondary action(C6: Bottom primary와 2 Primary 경쟁 금지).
 */

const CODE_LENGTH = 6; // POL-MBR-AUTH-003-01
const VALIDITY_SECONDS = 180; // POL-MBR-AUTH-003-03 (3분)

export type AuthRequestErrorState =
	| "none"
	/** FP-E1 인증번호 만료 — cautionary, 재요청으로 복구 가능 */
	| "expired"
	/** FP-E2 인증번호 불일치 — negative, 재시도 가능 */
	| "mismatch"
	/** FP-E3 인증 실패 한도 초과 — negative + blocked (입력/재요청 차단) */
	| "blocked"
	/** 재요청 쿨다운 차단 (POL-MBR-AUTH-004-01) */
	| "resendCooldown"
	/** 재요청 한도 초과 (POL-MBR-AUTH-004-02) */
	| "resendLimit"
	/** SB-only E4 외부 인증기관 오류 — 일반 시스템 오류 copy만 (UXPT_ERR_3) */
	| "system";

// 정책 copy (policy-core 원문 기준 — Screen.map.md)
const ERROR_COPY: Record<
	Exclude<AuthRequestErrorState, "none">,
	{ tone: "cautionary" | "negative"; title: string; body: string }
> = {
	expired: {
		tone: "cautionary",
		title: "인증번호 만료",
		body: "유효시간이 만료되어 다시 요청해 주세요",
	},
	mismatch: {
		tone: "negative",
		title: "인증번호 불일치",
		body: "인증번호를 확인하거나 잠시 후 다시 시도해 주세요",
	},
	blocked: {
		tone: "negative",
		title: "인증 제한",
		body: "인증 실패 한도(5회)를 초과했습니다 · 10분 후 다시 시도해 주세요",
	},
	resendCooldown: {
		tone: "cautionary",
		title: "재요청 대기",
		body: "60초 후 다시 요청해 주세요",
	},
	resendLimit: {
		tone: "negative",
		title: "재요청 제한",
		body: "재요청 한도(5회)를 초과했습니다",
	},
	system: {
		tone: "negative",
		title: "일시적인 오류",
		body: "일시적으로 처리할 수 없어요, 잠시 후 다시 시도해 주세요",
	},
};

function formatTimer(totalSeconds: number): string {
	const safe = Math.max(0, totalSeconds);
	const mm = String(Math.floor(safe / 60)).padStart(2, "0");
	const ss = String(safe % 60).padStart(2, "0");
	return `${mm}:${ss}`;
}

export type AuthRequestCopyProps = {
	/** 상태 메시지 (만료/불일치/한도/시스템). 미설정 시 "none". */
	errorState?: AuthRequestErrorState;
	/** 6자리 미충족 인라인 에러 (POL-MBR-AUTH-003-01.copy.error). */
	fieldError?: boolean;
	/** 한도 초과 등 blocked 상태 — 입력/재요청 비활성 (POL-MBR-AUTH-005-03). */
	blocked?: boolean;
	/** 재요청 가능 여부 (쿨다운/한도 반영). */
	resendDisabled?: boolean;
	/** 인증 확인 가능 여부 (코드 6자리 입력 시 활성). */
	confirmDisabled?: boolean;
	/** 인증 확인 처리 중 — 인라인 로딩 (UXPT_LOD_1). */
	confirming?: boolean;
	onCodeChange?: (code: string) => void;
	onResend?: () => void;
	onConfirm?: () => void;
};

export function AuthRequestCopy({
	errorState = "none",
	fieldError = false,
	blocked = false,
	resendDisabled = false,
	confirmDisabled = true,
	confirming = false,
	onCodeChange,
	onResend,
	onConfirm,
}: AuthRequestCopyProps) {
	const [code, setCode] = useState("");
	const [remaining, setRemaining] = useState(VALIDITY_SECONDS);

	// 잔여 유효시간 카운트다운 (POL-MBR-AUTH-003-03). blocked/만료 시 정지.
	useEffect(() => {
		if (blocked || errorState === "expired") {
			return;
		}
		if (remaining <= 0) {
			return;
		}
		const id = window.setInterval(() => {
			setRemaining((prev) => (prev <= 0 ? 0 : prev - 1));
		}, 1000);
		return () => window.clearInterval(id);
	}, [blocked, errorState, remaining]);

	const handleCodeChange = (next: string) => {
		const digitsOnly = next.replace(/\D/g, "").slice(0, CODE_LENGTH);
		setCode(digitsOnly);
		onCodeChange?.(digitsOnly);
	};

	const isExpired = errorState === "expired" || remaining <= 0;
	const timerLabel = isExpired ? "00:00" : formatTimer(remaining);
	// 능동·긍정형 helper (VOT_RUL_1/2/3) + 잔여 시간(POL-MBR-AUTH-003-03).
	const helperText = fieldError
		? "6자리 인증번호를 입력해 주세요"
		: `유효시간 3분 · 재요청은 최대 5회 · 남은 시간 ${timerLabel}`;

	const message = errorState !== "none" ? ERROR_COPY[errorState] : null;
	const fieldDisabled = blocked;
	// blocked면 재요청도 차단 (POL-MBR-AUTH-005-03 Distortion Gate).
	const resendIsDisabled = blocked || resendDisabled;

	return (
		<VStack
			data-section-id="authRequest"
			data-ogn-id="ogn-mbr-auth-request"
			gap="var(--semantic-spacing-gap-loose)"
		>
			<TitleSection title="인증번호 6자리 입력" />

			<FieldStack>
				<TextField
					label="인증번호 입력"
					inputMode="numeric"
					maxLength={CODE_LENGTH}
					value={code}
					disabled={fieldDisabled}
					error={fieldError}
					helperText={helperText}
					onChange={(event) => handleCodeChange(event.currentTarget.value)}
					actionButton={{
						label: "재요청",
						disabled: resendIsDisabled,
						onClick: onResend,
					}}
				/>

				{message ? (
					<Notice tone={message.tone} title={message.title}>
						{message.body}
					</Notice>
				) : null}
			</FieldStack>

			{/* 인증 확인은 폼 필드가 아니라 OGN action — FieldStack 밖 sibling.
			    secondary 위계 유지(C6: Bottom Primary와 2 Primary 경쟁 금지). */}
			<ActionButton
				actions={[
					{
						label: confirming ? "확인 중" : "인증 확인",
						variant: "secondary",
						disabled: confirmDisabled || blocked || confirming,
						onClick: onConfirm,
					},
				]}
			/>
		</VStack>
	);
}
