import { StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import {
	SectionHeaderPage,
	SectionMessageEntryBranch,
	TextFieldMemberInfo,
} from "../../../organisms/nova-mbr-legacy";
import { ProgressAppBar } from "../../../patterns/nova-mbr-legacy";

export function Screen() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<ProgressAppBar
					title="회원 가입"
					currentStep={2}
					totalSteps={5}
					progressLabel="2 / 5"
					showProgressLabel
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<SectionHeaderPage title="개인정보 입력" />
				<TextFieldMemberInfo />
				<SectionMessageEntryBranch visible={false} />
			</AppScreen.Content>
		</AppScreen>
	);
}
