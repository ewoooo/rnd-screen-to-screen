"use client";

import { Button, Callout, Notice } from "@pxds/cx-components";
import { VStack } from "@pxds/cx-layout/primitives";
import type { GuardianResultProps } from "./GuardianResult.config";

export function GuardianResult({
	visible = false,
	status = "waiting",
	onRetry,
}: GuardianResultProps) {
	// out-of-state: 초기 wire 미노출 — 레이아웃 점유 0.
	if (!visible) {
		return null;
	}

	const isExpired = status === "expired";

	return (
		<VStack
			data-section-id="guardianResult"
			gap="var(--semantic-spacing-gap-comfortable)"
		>
			{isExpired ? (
				// REQ-003 error copy 원문(POL-MBR-TERM-002-05). ERR_1 인접 안내.
				<Notice aria-live="polite" tone="negative">
					동의 요청 유효시간이 만료되어 다시 요청해 주세요
				</Notice>
			) : (
				<Callout icon="info">법정대리인 동의 요청을 보냈어요. 응답을 기다리고 있어요.</Callout>
			)}
			{/* 만료 시에만 재요청. 보조 위계(BTN_4) — Bottom Primary 아님. */}
			{isExpired ? (
				<Button variant="secondary" size="large" onClick={onRetry}>
					동의 재요청
				</Button>
			) : null}
		</VStack>
	);
}
