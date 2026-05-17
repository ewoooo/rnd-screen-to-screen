"use client";

import {
	ActionButton,
	AppBar,
	RQRContentsDetail,
	RQRNotice,
	StatusBar,
} from "@pxds/cx-components";
import {
	AppScreen,
	PageStackContents,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";
import { VStack } from "@pxds/cx-layout/components/primitives";

const currentPlanRows = [
	{ id: "plan-name", label: "현재 요금제", value: "5GX 프라임" },
	{ id: "monthly-price", label: "월정액", value: "89,000원" },
	{ id: "data", label: "데이터", value: "무제한" },
	{ id: "discount", label: "할인", value: "선택약정 적용 중" },
] as const;

export function Screen() {
	return (
		<div data-theme="light">
			<AppScreen
				headerPreset="standard"
				background="var(--semantic-color-bg-default)"
			>
				<AppScreen.SystemHeader>
					<StatusBar />
				</AppScreen.SystemHeader>
				<AppScreen.Header>
					<AppBar title="요금제 변경" showLeftItem showTitle />
				</AppScreen.Header>
				<AppScreen.Content>
					<PageStackContents>
						<VStack gap="var(--spacing-16)">
							<RQRContentsDetail title="현재 이용 상품" rows={currentPlanRows} />
							<RQRNotice title="변경 가능" tone="positive">
								현재 회선은 앱에서 요금제 변경을 진행할 수 있어요. 최근 변경
								이력, 미납, 정지 상태가 있으면 변경이 제한될 수 있어요.
							</RQRNotice>
							<RQRNotice title="확인해 주세요" tone="cautionary">
								월 중 변경 시 요금과 혜택은 적용 시점에 따라 달라질 수 있어요.
							</RQRNotice>
						</VStack>
					</PageStackContents>
				</AppScreen.Content>
				<AppScreen.Bottom preset="primary-cta">
					<SinglePrimaryAction>
						<ActionButton
							type="default"
							buttonCount={1}
							actions={[{ label: "요금제 보러가기", variant: "primary" }]}
						/>
					</SinglePrimaryAction>
				</AppScreen.Bottom>
			</AppScreen>
		</div>
	);
}
