"use client";

import { useState } from "react";
import {
	ActionButton,
	AppBar,
	Callout,
	Checkbox,
	ListText,
	RQRContentsDetail,
	SectionItem,
	StatusBar,
	TitleMain,
	TitleSection,
} from "@pxds/cx-components";
import {
	AppScreen,
	FieldStack,
	PageStackContents,
	SectionDivider,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";
import { VStack } from "@pxds/cx-layout/components/primitives";

const currentPlanRows = [
	{ id: "current-plan", label: "요금제", value: "5GX 레귤러" },
	{ id: "current-price", label: "월정액", value: "69,000원" },
	{ id: "current-data", label: "데이터", value: "110GB" },
	{ id: "current-benefit", label: "주요 혜택", value: "공유 데이터 18GB" },
] as const;

const selectedPlanRows = [
	{ id: "selected-plan", label: "요금제", value: "5GX 프라임" },
	{ id: "selected-price", label: "월정액", value: "89,000원" },
	{ id: "selected-data", label: "데이터", value: "무제한" },
	{ id: "selected-benefit", label: "주요 혜택", value: "스마트기기 1회선 무료" },
] as const;

const noticeItems = [
	"월 중 변경 시 이용 기간에 따라 요금이 일할 계산될 수 있어요.",
	"할인 또는 결합 혜택 금액이 변경되거나 종료될 수 있어요.",
	"일부 부가서비스는 변경할 요금제에서 이용이 제한될 수 있어요.",
] as const;

export function Screen() {
	const [agreed, setAgreed] = useState(false);

	return (
		<div data-theme="light">
			<AppScreen
				headerPreset="form-entry"
				background="var(--semantic-color-bg-default)"
			>
				<AppScreen.SystemHeader>
					<StatusBar />
				</AppScreen.SystemHeader>
				<AppScreen.Header>
					<AppBar title="요금제 변경" showLeftItem showTitle />
				</AppScreen.Header>
				<AppScreen.Content>
					<PageStackContents
						title={
							<TitleMain
								title="변경할 요금제를 확인해 주세요"
								subTitle="현재 요금제와 변경 후 요금제의 월정액, 데이터, 주요 혜택을 비교해 보세요."
							/>
						}
					>
						<VStack gap="var(--spacing-16)">
							<RQRContentsDetail title="현재 요금제" rows={currentPlanRows} />
							<RQRContentsDetail
								title="변경할 요금제"
								rows={selectedPlanRows}
							/>
						</VStack>
					</PageStackContents>

					<SectionDivider thickness="section" />

					<PageStackContents title={<TitleSection title="예상 변경 정보" />}>
						<SectionItem>
							<VStack gap="var(--spacing-12)">
								<ListText
									table
									text="예상 월정액"
									tableText="89,000원"
									showRightItem={false}
								/>
								<ListText
									table
									text="예상 적용일"
									tableText="2026.05.18"
									showRightItem={false}
								/>
								<Callout title="요금 변동 안내">
									월 중 변경으로 이번 달 청구 금액은 실제 사용 기간과 할인 적용
									조건에 따라 달라질 수 있어요.
								</Callout>
							</VStack>
						</SectionItem>
					</PageStackContents>

					<SectionDivider thickness="section" />

					<PageStackContents title={<TitleSection title="변경 전 유의사항" />}>
						<SectionItem>
							<VStack gap="var(--spacing-12)">
								{noticeItems.map((item) => (
									<ListText key={item} text={item} showRightItem={false} />
								))}
								<FieldStack>
									<Checkbox
										checked={agreed}
										label="유의사항을 모두 확인했어요"
										onCheckedChange={setAgreed}
									/>
								</FieldStack>
							</VStack>
						</SectionItem>
					</PageStackContents>
				</AppScreen.Content>
				<AppScreen.Bottom preset="primary-cta">
					<SinglePrimaryAction>
						<ActionButton
							type="default"
							buttonCount={1}
							actions={[
								{ label: "변경 신청", variant: "primary", disabled: !agreed },
							]}
						/>
					</SinglePrimaryAction>
				</AppScreen.Bottom>
			</AppScreen>
		</div>
	);
}
