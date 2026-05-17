import {
	ActionButton,
	StatusBar,
	TitleSection,
} from "@pxds/cx-components";
import {
	AppScreen,
	PageStackContents,
	SectionDivider,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";
import { EntryCheck } from "@/organisms/nova-mbr-fp/ogn-mbr-entry-check";
import { MemberInput } from "@/organisms/nova-mbr-fp/ogn-mbr-member-input";
import { ProgressAppBar } from "@/patterns/nova-mbr-fp";

/**
 * NOVA-MBR-FP-002-0 개인정보 입력
 *
 * AppScreen rails owned here. ProgressAppBar (NEW pattern) is Header chrome.
 * member-input policy body is the OGN; entry-check is reserved (visible=false,
 * renders null → zero spacing). Section Divider separates the two sections.
 * Single primary CTA `다음` lives in the fixed Bottom rail.
 */
export function Screen() {
	return (
		<AppScreen
			headerPreset="form-entry"
			background="var(--semantic-color-bg-default)"
		>
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<ProgressAppBar
					title="회원 가입"
					currentStep={2}
					totalSteps={5}
					progressLabel="약관 동의 > 개인정보 입력"
					showProgressLabel
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<PageStackContents title={<TitleSection title="회원 정보 입력" />}>
					<MemberInput />
				</PageStackContents>

				<SectionDivider thickness="section" />

				<EntryCheck visible={false} />
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
	);
}
