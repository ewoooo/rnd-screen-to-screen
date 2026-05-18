"use client";

import {
	ActionButton,
	AppBar,
	StatusBar,
	Text,
	TitleSection,
} from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import { SinglePrimaryAction } from "@pxds/cx-layout/components/compositions";
import { PageStackContents } from "@pxds/cx-layout/components/contents";
import { SectionDivider } from "@pxds/cx-layout/components/patterns";
import { VStack } from "@pxds/cx-layout/primitives";
import { useState } from "react";
import { TermAgree } from "@/organisms/nova-mbr-fp/ogn-mbr-term-agree";
import { TermList } from "@/organisms/nova-mbr-fp/ogn-mbr-term-list";

export function Screen() {
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
			window.requestAnimationFrame(() => {
				document
					.querySelector('[data-section-id="termAgreeError"]')
					?.scrollIntoView({ block: "nearest" });
			});
			return;
		}
		// 진행: NOVA-MBR-FP-010-0 (동의이력ID, 세션ID 전달은 라우팅 경계 책임).
	}

	return (
		<AppScreen>
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="약관 동의" showLeftItem showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				{/* [intro] structural-only status-message. callout surface 금지 —
				    재동의 안내는 SB-only 일반 안내(VOT_RUL 해요체), 정책 단정 금지. */}
				<PageStackContents
					data-section-id="intro"
					title={<TitleSection title="다시 동의가 필요한 약관이 있어요" />}
				>
					<VStack>
						<Text variant="bodySubtle" as="p">
							약관 및 고지 내용을 확인하고 동의해 주세요
						</Text>
					</VStack>
				</PageStackContents>
				<SectionDivider thickness="section" />
				<PageStackContents data-section-id="termList">
					<TermList />
				</PageStackContents>
				<SectionDivider thickness="section" />
				<PageStackContents
					data-section-id="termAgreeSection"
					title={<TitleSection title="약관 동의" />}
				>
					<TermAgree
						sectionId="termAgreeSection"
						keepErrorAnchorMounted
						showRequiredError={attemptedProgress && !allRequiredAgreed}
						onRequiredAgreedChange={handleRequiredAgreedChange}
					/>
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<SinglePrimaryAction data-section-id="actions">
					<ActionButton
						actions={[
							{
								label: "다음",
								variant: "primary",
								onClick: handleProgress,
							},
						]}
					/>
				</SinglePrimaryAction>
			</AppScreen.Bottom>
		</AppScreen>
	);
}
