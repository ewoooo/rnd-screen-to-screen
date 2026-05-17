"use client";

import { ActionButton, AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import { SinglePrimaryAction } from "@pxds/cx-layout/components/compositions";
import { PageStackContents } from "@pxds/cx-layout/components/contents";
import { SectionDivider } from "@pxds/cx-layout/components/patterns";
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
 * NOVA-MBR-FP-003-0 · 본인인증 (가입 플로우)
 *
 * AppScreen rails: Header(AppBar 회원 가입) / Content(scroll) / Bottom(primary-cta).
 * Content = authSelect ── SectionDivider(4px) ── authRequest (C2 섹션 밴드).
 * Bottom = 단일 Primary ActionButton "본인인증 완료하기", 본인인증 완료 전 비활성
 * (POL-MBR-AUTH-001-01 / UXPT_BTN_3·4). 인증 확인은 organism 내 secondary action
 * 으로 Bottom Primary와 시각 경쟁 금지(C6).
 *
 * 검증 게이트 상태는 screen이 소유하고 organism에 확정 값으로 내려준다.
 */

export function Screen() {
	const [selectedMethod, setSelectedMethod] = useState<
		AuthMethodId | undefined
	>(undefined);
	const [verified, setVerified] = useState(false);
	const [errorState, setErrorState] = useState<AuthRequestErrorState>("none");
	const [codeLength, setCodeLength] = useState(0);

	// 인증 확인은 인증번호 6자리 + 인증수단 선택이 모두 충족돼야 활성.
	const confirmDisabled = codeLength < 6 || !selectedMethod;

	function handleConfirm() {
		// 본인인증 완료 → Bottom Primary 게이트 해제(POL-MBR-AUTH-001-01).
		setErrorState("none");
		setVerified(true);
	}

	return (
		<AppScreen>
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="회원 가입" showLeftItem showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<PageStackContents showTitle={false}>
					<AuthSelect
						selected={selectedMethod}
						onSelect={setSelectedMethod}
					/>
				</PageStackContents>
				{/* section 경계 = SectionDivider(393×4) between PageStackContents.
				    route-level gap 금지(C2). */}
				<SectionDivider thickness="section" />
				<PageStackContents showTitle={false}>
					<AuthRequest
						errorState={errorState}
						blocked={errorState === "blocked"}
						confirmDisabled={confirmDisabled}
						onCodeChange={(code) => setCodeLength(code.length)}
						onConfirm={handleConfirm}
					/>
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<SinglePrimaryAction>
					<ActionButton
						actions={[
							{
								label: "본인인증 완료하기",
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
