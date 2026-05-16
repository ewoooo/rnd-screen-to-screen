"use client";

import {
	ActionButton,
	AppBar,
	ListText,
	SectionItem,
	StatusBar,
	TitleMain,
} from "@pxds/cx-components";
import {
	AppScreen,
	PageStackContents,
	SinglePrimaryAction,
} from "@pxds/pxds-layout/components";

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
					<SectionItem type="card">
						<ListText table text="변경한 요금제" tableText="5GX 프라임" />
						<ListText table text="적용일" tableText="2026.05.16" />
						<ListText table text="월정액" tableText="89,000원" />
					</SectionItem>
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
