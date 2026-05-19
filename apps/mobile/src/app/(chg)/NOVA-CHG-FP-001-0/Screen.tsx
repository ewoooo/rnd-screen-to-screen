"use client";

import { ActionButton, AppBar, StatusBar } from "@pxds/cx-components";
import {
	ChangeEligibility,
	CurrentPlanSummary,
} from "@/organisms/chg";
import {
	AppScreen,
	PageStackContents,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";
import { VStack } from "@pxds/cx-layout/components/primitives";

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
							<CurrentPlanSummary />
							<ChangeEligibility />
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
