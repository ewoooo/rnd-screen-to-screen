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
} from "@pxds/cx-layout/components";

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
					<SectionItem type="card">
						<ListText table text="개통 휴대폰" tableText="갤럭시 S25" />
						<ListText table text="요금제" tableText="5GX 프라임" />
						<ListText table text="개통일" tableText="2026.05.15" />
					</SectionItem>
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.Bottom preset="guided-action">
				<SinglePrimaryAction>
					<ActionButton
						type="ai"
						buttonCount={2}
						showText
						text="사진이나 연락처, 앱도 새 휴대폰으로 한 번에 옮겨볼까요?"
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
