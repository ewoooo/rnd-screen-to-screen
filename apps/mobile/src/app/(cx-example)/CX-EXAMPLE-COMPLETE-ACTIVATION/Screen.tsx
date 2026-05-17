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

const completionSummaryRows = [
	{ id: "activation-device", label: "개통 휴대폰", value: "갤럭시 S25" },
	{ id: "plan", label: "요금제", value: "5GX 프라임" },
	{ id: "activation-date", label: "개통일", value: "2026.05.15" },
] as const;

export function Screen() {
	return (
		<AppScreen headerPreset="standard">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="개통 완료" showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<PageStackContents
					title={
						<TitleMain
							type="complete"
							title="개통이 완료되었어요"
							subTitle="지금부터 새로운 휴대폰 사용이 가능해요."
						/>
					}
				>
					<RQRContentsDetail title="개통 정보" rows={completionSummaryRows} />
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<SinglePrimaryAction>
					<ActionButton
						type="default"
						buttonCount={2}
						actions={[
							{ label: "홈으로 이동", variant: "secondary" },
							{ label: "데이터 옮기기", variant: "primary" },
						]}
					/>
				</SinglePrimaryAction>
			</AppScreen.Bottom>
		</AppScreen>
	);
}
