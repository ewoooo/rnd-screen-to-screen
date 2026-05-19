"use client";

import { ActionButton, AppBar, Icon, StatusBar } from "@pxds/cx-components";
import { ChangeComplete } from "@/organisms/chg";
import {
	AppScreen,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";

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
					<AppBar
						title="요금제 변경"
						showLeftItem
						showTitle
						leftIcon={<Icon type="close" size={24} aria-label="닫기" />}
						leftLabel="닫기"
					/>
				</AppScreen.Header>
				<AppScreen.Content>
					<ChangeComplete />
				</AppScreen.Content>
				<AppScreen.Bottom preset="primary-cta">
					<SinglePrimaryAction>
						<ActionButton
							type="default"
							buttonCount={2}
							actions={[
								{ label: "홈으로 이동", variant: "secondary" },
								{ label: "변경내역 보기", variant: "primary" },
							]}
						/>
					</SinglePrimaryAction>
				</AppScreen.Bottom>
			</AppScreen>
		</div>
	);
}
