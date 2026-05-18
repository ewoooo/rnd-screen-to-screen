"use client";

import {
	ActionButton,
	StatusBar,
	TitleSection,
} from "@pxds/cx-components";
import {
	AppScreen,
	PageStackContents,
	SectionDivider,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";
import { useState } from "react";
import { GuardianInput } from "@/organisms/nova-mbr-fp-legacy/ogn-mbr-guardian-input";
import { GuardianResult } from "@/organisms/nova-mbr-fp-legacy/ogn-mbr-guardian-result";
import { TermAgree } from "@/organisms/nova-mbr-fp-legacy/ogn-mbr-term-agree";
import { TermList } from "@/organisms/nova-mbr-fp-legacy/ogn-mbr-term-list";
import { ProgressAppBar } from "@/patterns/nova-mbr-fp";

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
		<AppScreen
			headerPreset="form-entry"
			background="var(--semantic-surface-page-normal)"
		>
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<ProgressAppBar
					title="회원 가입"
					currentStep={1}
					totalSteps={5}
					progressLabel="약관 동의"
					showProgressLabel
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<PageStackContents
					data-section-id="termList"
					data-ogn-id="ogn-mbr-term-list"
					title={
						<TitleSection title="회원 가입에 필요한 약관을 확인해 주세요" />
					}
				>
					<TermList />
				</PageStackContents>
				<SectionDivider thickness="section" />
				<PageStackContents
					data-section-id="termAgree"
					data-ogn-id="ogn-mbr-term-agree"
					title={<TitleSection title="약관 동의" />}
				>
					<TermAgree
						sectionId="termAgree"
						showRequiredError={attemptedProgress && !allRequiredAgreed}
						onRequiredAgreedChange={handleRequiredAgreedChange}
					/>
				</PageStackContents>
				{/* mounted-hidden / out-of-state 예약. visible=false → 점유 0. */}
				<GuardianInput visible={false} />
				<GuardianResult visible={false} />
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<SinglePrimaryAction data-section-id="actions">
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
