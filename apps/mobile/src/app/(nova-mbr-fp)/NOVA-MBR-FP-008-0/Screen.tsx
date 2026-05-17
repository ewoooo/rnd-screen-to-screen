"use client";

import { ActionButton, AppBar, StatusBar, Text } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import { SinglePrimaryAction } from "@pxds/cx-layout/components/compositions";
import { PageStackContents } from "@pxds/cx-layout/components/contents";
import { SectionDivider } from "@pxds/cx-layout/components/patterns";
import { VStack } from "@pxds/cx-layout/primitives";
import { useState } from "react";
import {
	AuthRequest,
	type AuthRequestErrorState,
} from "@/organisms/nova-mbr-fp/ogn-mbr-auth-request";
import {
	AuthSelect,
	type AuthMethodId,
} from "@/organisms/nova-mbr-fp/ogn-mbr-auth-select";

/**
 * NOVA-MBR-FP-008-0 · 본인인증 (휴면 해제 플로우)
 *
 * FP-003-0와 동일한 두 NEW OGN을 OGN 레벨 재사용. 차이는 flow/intro 문맥(휴면 해제)
 * 과 전이 대상(FP-009)뿐.
 *
 * Content = [intro] 휴면 해제 flow-context note(structural-only, 얇은 텍스트 —
 * callout/hero 금지) → authSelect ── SectionDivider(4px) ── authRequest.
 * intro→authSelect 사이에는 section band를 두지 않는다(Diagram 명시).
 * Bottom = 단일 Primary "본인 확인 완료하기", 본인 확인 완료 전 비활성
 * (POL-MBR-AUTH-001-01 / UXPT_BTN_3·4).
 */

export function Screen() {
	const [selectedMethod, setSelectedMethod] = useState<
		AuthMethodId | undefined
	>(undefined);
	const [verified, setVerified] = useState(false);
	const [errorState, setErrorState] = useState<AuthRequestErrorState>("none");
	const [codeLength, setCodeLength] = useState(0);

	// 본인 확인은 인증번호 6자리 + 인증수단 선택이 모두 충족돼야 활성.
	const confirmDisabled = codeLength < 6 || !selectedMethod;

	function handleConfirm() {
		// 본인 확인 완료 → Bottom Primary 게이트 해제(POL-MBR-AUTH-001-01).
		setErrorState("none");
		setVerified(true);
	}

	return (
		<AppScreen>
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="휴면 해제" showLeftItem showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<VStack data-section-id="identityVerificationFlow">
					<PageStackContents
						data-section-id="intro"
						title={
							<Text variant="sectionTitle">
							휴면 해제를 위해 본인 확인이 필요해요
							</Text>
						}
					>
						<AuthSelect
							selected={selectedMethod}
							onSelect={setSelectedMethod}
						/>
					</PageStackContents>
					<SectionDivider thickness="section" />
					<PageStackContents data-section-id="authRequest" showTitle={false}>
						<AuthRequest
							errorState={errorState}
							blocked={errorState === "blocked"}
							confirmDisabled={confirmDisabled}
							onCodeChange={(code) => setCodeLength(code.length)}
							onConfirm={handleConfirm}
						/>
					</PageStackContents>
				</VStack>
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<SinglePrimaryAction>
					<ActionButton
						actions={[
							{
								label: "본인 확인 완료하기",
								variant: "primary",
								disabled: !verified,
							},
						]}
					/>
				</SinglePrimaryAction>
			</AppScreen.Bottom>
		</AppScreen>
	);
}
