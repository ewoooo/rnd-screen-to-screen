"use client";

import {
	AppBar,
	Button,
	Callout,
	SectionItem,
	StatusBar,
	TitleMain,
	TitleSection,
} from "@pxds/cx-components";
import {
	AppScreen,
	PageStackContents,
	SectionDivider,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";
import { useState } from "react";
import {
	ConsentTermsAccordion,
	CONSENT_ITEM_IDS,
	REQUIRED_CONSENT_IDS,
} from "@/organisms/mbr";

const INITIAL_CHECKED: Record<string, boolean> = Object.fromEntries(
	CONSENT_ITEM_IDS.map((id) => [id, false]),
);

export function Screen() {
	const [checkedById, setCheckedById] = useState(INITIAL_CHECKED);

	const allChecked = CONSENT_ITEM_IDS.every((id) => checkedById[id]);
	const requiredSatisfied = REQUIRED_CONSENT_IDS.every((id) => checkedById[id]);

	function handleAllCheckedChange(next: boolean) {
		setCheckedById(
			Object.fromEntries(CONSENT_ITEM_IDS.map((id) => [id, next])),
		);
	}

	function handleItemCheckedChange(id: string, next: boolean) {
		setCheckedById((current) => ({ ...current, [id]: next }));
	}

	return (
		<AppScreen headerPreset="form-entry">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="회원 가입" showLeftItem showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<PageStackContents
					title={
						<TitleMain
							titleSubText="회원 가입 1단계 (1/5)"
							title={"약관에 동의하고\n가입을 시작하세요"}
							subTitle="필수 약관에 동의하면 다음 단계로 진행할 수 있어요. 선택 약관은 나중에 변경할 수 있습니다."
						/>
					}
				/>

				<SectionDivider thickness="section" />

				<PageStackContents title={<TitleSection title="약관 동의" />}>
					<SectionItem>
						<ConsentTermsAccordion
							allChecked={allChecked}
							onAllCheckedChange={handleAllCheckedChange}
							checkedById={checkedById}
							onItemCheckedChange={handleItemCheckedChange}
						/>
						<Callout title="법정대리인 동의 안내">
							만 14세 미만 고객은 법정대리인 동의 요청이 함께 진행됩니다.
						</Callout>
					</SectionItem>
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.ActionBar preset="primary-cta">
				<SinglePrimaryAction>
					<Button
						disabled={!requiredSatisfied}
						fullWidth
						size="xlarge"
						variant="primary"
					>
						동의하고 계속하기
					</Button>
				</SinglePrimaryAction>
			</AppScreen.ActionBar>
		</AppScreen>
	);
}
