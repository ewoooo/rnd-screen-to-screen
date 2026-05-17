"use client";

import {
	ActionButton,
	AppBar,
	Divider,
	StatusBar,
	TitleSection,
} from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import { SinglePrimaryAction } from "@pxds/cx-layout/components/compositions";
import { PageStackContents } from "@pxds/cx-layout/components/contents";
import { useState } from "react";
import { GuardianInput } from "@/organisms/nova-mbr-fp/ogn-mbr-guardian-input";
import { GuardianResult } from "@/organisms/nova-mbr-fp/ogn-mbr-guardian-result";
import { TermAgree } from "@/organisms/nova-mbr-fp/ogn-mbr-term-agree";
import { TermList } from "@/organisms/nova-mbr-fp/ogn-mbr-term-list";

export function Screen() {
	// REQ-001 게이트 상태는 Screen이 소유(BTN_4: 진행 Primary 단일).
	const [allRequiredAgreed, setAllRequiredAgreed] = useState(false);
	const [attemptedProgress, setAttemptedProgress] = useState(false);

	function handleRequiredAgreedChange(next: boolean) {
		setAllRequiredAgreed(next);
		if (next) {
			setAttemptedProgress(false);
		}
	}

	function handleProgress() {
		if (!allRequiredAgreed) {
			setAttemptedProgress(true);
			return;
		}
		// 진행: NOVA-MBR-FP-002-0 (동의이력ID, 세션ID 전달은 라우팅 경계 책임).
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
				<PageStackContents
					title={
						<TitleSection title="회원 가입에 필요한 약관을 확인해 주세요" />
					}
				>
					<TermList />
				</PageStackContents>
				{/* section 경계 = section Divider(393×4). route-level gap 금지(C2). */}
				<Divider type="section" />
				<PageStackContents title={<TitleSection title="약관 동의" />}>
					<TermAgree
						showRequiredError={attemptedProgress && !allRequiredAgreed}
						onRequiredAgreedChange={handleRequiredAgreedChange}
					/>
				</PageStackContents>
				{/* mounted-hidden / out-of-state 예약. visible=false → 점유 0. */}
				<GuardianInput visible={false} />
				<GuardianResult visible={false} />
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<SinglePrimaryAction>
					<ActionButton
						actions={[
							{
								label: "다음",
								variant: "primary",
								disabled: !allRequiredAgreed,
								onClick: handleProgress,
							},
						]}
					/>
				</SinglePrimaryAction>
			</AppScreen.Bottom>
		</AppScreen>
	);
}
