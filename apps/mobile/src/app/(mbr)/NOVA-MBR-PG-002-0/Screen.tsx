import { StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/pxds-layout/components/chrome";
import {
	SectionHeaderPage,
	SectionMessageEntryBranch,
	TextFieldMemberInfo,
} from "@/organisms/mbr";
import { ProgressAppBar } from "@/patterns/mbr";

export function Screen() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<ProgressAppBar title="회원 가입" currentStep={2} totalSteps={5} />
			</AppScreen.Header>
			<AppScreen.Content>
				<SectionHeaderPage title="개인정보 입력" />
				<TextFieldMemberInfo />
				<SectionMessageEntryBranch visible={false} />
			</AppScreen.Content>
		</AppScreen>
	);
}
