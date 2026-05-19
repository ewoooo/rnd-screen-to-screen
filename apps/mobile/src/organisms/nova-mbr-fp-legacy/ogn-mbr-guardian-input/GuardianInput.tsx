"use client";

import {
	ActionButton,
	Callout,
	Notice,
	TextField,
	TitleSection,
} from "@pxds/cx-components";
import { FieldStack } from "@pxds/cx-layout/components/compositions";
import { VStack } from "@pxds/cx-layout/primitives";
import type { GuardianInputProps } from "./GuardianInput.config";

export function GuardianInput({
	visible = false,
	showError = false,
	onRequestSend,
}: GuardianInputProps) {
	if (!visible) {
		return (
			<div
				aria-hidden="true"
				data-section-id="guardianInput"
				data-ogn-id="ogn-mbr-guardian-input"
				hidden
			/>
		);
	}

	return (
		<VStack
			data-section-id="guardianInput"
			data-ogn-id="ogn-mbr-guardian-input"
			gap="var(--semantic-spacing-gap-comfortable)"
		>
			{/* REQ-002 requirement copy 원문(POL-MBR-TERM-002-01). */}
			<TitleSection title="만 14세 미만 고객은 법정대리인 동의가 필요합니다" />
			{/* REQ-003 requirement copy 원문(POL-MBR-TERM-002-05). info 유지 — 강조 과다 금지. */}
			<Callout icon="info">동의 요청 유효시간 24시간</Callout>
			<FieldStack>
				<TextField label="법정대리인 이름" placeholder="이름 입력" />
				{/* 연락처 인증수단(SB-only TERM-002-03)은 단정 금지 — 입력 필드 구조만. */}
				<TextField label="법정대리인 연락처" placeholder="연락처 입력" />
			</FieldStack>
			{/* REQ-002 error copy 원문. ERR_1 인접 안내 — 상단 통합 알림 금지. */}
			{showError ? (
				<Notice aria-live="polite" tone="negative">
					법정대리인 동의를 완료해 주세요
				</Notice>
			) : null}
			{/* 보조 위계(BTN_4). Bottom Primary와 시각 경쟁 금지 — secondary variant. */}
			<ActionButton
				type="default"
				actions={[
					{
						label: "동의 요청 발송하기",
						variant: "secondary",
						onClick: onRequestSend,
					},
				]}
			/>
		</VStack>
	);
}
