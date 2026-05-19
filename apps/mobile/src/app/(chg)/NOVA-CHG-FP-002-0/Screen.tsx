"use client";

import { ActionButton, AppBar, StatusBar } from "@pxds/cx-components";
import { PlanFilter, PlanList, planCount } from "@/organisms/chg";
import {
	AppScreen,
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
					<AppBar title="요금제 선택" showLeftItem showTitle />
				</AppScreen.Header>
				<AppScreen.Content>
					<VStack gap="var(--spacing-0)">
						<PlanFilter totalCount={planCount} />
						<PlanList />
					</VStack>
				</AppScreen.Content>
				<AppScreen.Bottom preset="primary-cta">
					<SinglePrimaryAction>
						<ActionButton
							type="default"
							buttonCount={1}
							actions={[{ label: "다음", variant: "primary" }]}
						/>
					</SinglePrimaryAction>
				</AppScreen.Bottom>
			</AppScreen>
		</div>
	);
}
