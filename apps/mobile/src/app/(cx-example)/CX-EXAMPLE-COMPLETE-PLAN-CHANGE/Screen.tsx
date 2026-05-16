"use client";

import {
	ActionButton,
	AppBar,
	RQRContentsDetail,
	StatusBar,
	TitleMain,
} from "@pxds/cx-components";
import {
	AppScreen,
	PageStackContents,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";

const planChangeSummaryRows = [
	{ id: "changed-plan", label: "변경한 요금제", value: "5GX 프라임" },
	{ id: "effective-date", label: "적용일", value: "2026.05.16" },
	{ id: "monthly-price", label: "월정액", value: "89,000원" },
] as const;

export function Screen() {
	return (
		<AppScreen headerPreset="standard">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="요금제 변경" showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<PageStackContents
					title={
						<TitleMain
							type="complete"
							title="요금제 변경이 완료되었어요"
							subTitle="변경된 요금제는 다음 청구 주기부터 적용돼요."
						/>
					}
				>
					<RQRContentsDetail title="변경 정보" rows={planChangeSummaryRows} />
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<SinglePrimaryAction>
					<ActionButton
						type="default"
						buttonCount={1}
						actions={[{ label: "확인", variant: "primary" }]}
					/>
				</SinglePrimaryAction>
			</AppScreen.Bottom>
		</AppScreen>
	);
}
