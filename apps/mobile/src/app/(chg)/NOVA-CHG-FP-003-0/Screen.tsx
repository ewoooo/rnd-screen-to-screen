"use client";

import { useState } from "react";
import { ActionButton, AppBar, StatusBar } from "@pxds/cx-components";
import { PlanComparison, PlanNoticeAgree } from "@/organisms/chg";
import {
	AppScreen,
	SectionDivider,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";

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
					<PlanComparison />
					<SectionDivider thickness="section" />
					<PlanNoticeAgree agreed={agreed} onAgreedChange={setAgreed} />
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
