"use client";

import { VStack } from "@pxds/pxds-layout/primitives";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

import { SectionMessage } from "../../../core";
import { TextBlock } from "../../../atoms/typography";
import { PrimaryCTABar } from "../../../molecules/cta-bar";

type SlotFilter = "content" | "bottom";

type Props = {
	slot?: SlotFilter;
};

export function SectionMessageJoinCompleteView({
	slot = "content",
}: Props) {
	if (slot === "bottom") {
		return <PrimaryCTABar primaryLabel="홈으로 이동" />;
	}

	return (
		<ContentSection
			exportNode={{
				type: "SectionMessageJoinCompleteView",
				id: "section-message-join-complete-view",
				props: {
					actionGuide: "· 가입 완료 후 홈으로 이동합니다",
					componentId: "ogn-mbr-section-message-join-complete-view",
					description:
						"가입이 정상 처리되었습니다. 일반 회원으로 자동 로그인됩니다.",
					guideTitle: "가입 후 이용 안내",
					sessionGuide: "· 세션 유효시간 24시간",
					title: "가입이 완료되었습니다",
				},
			}}
		>
			<VStack gap="block">
				<SectionMessage
					variant="positive"
					description="가입이 정상 처리되었습니다. 일반 회원으로 자동 로그인됩니다."
				>
					가입이 완료되었습니다
				</SectionMessage>
				<VStack gap="inline">
					<TextBlock variant="bodySubtle" text="가입 후 이용 안내" />
					<TextBlock variant="caption" text="· 세션 유효시간 24시간" />
					<TextBlock variant="caption" text="· 가입 완료 후 홈으로 이동합니다" />
				</VStack>
			</VStack>
		</ContentSection>
	);
}
