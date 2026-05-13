import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import {
	SectionHeaderPage,
	SectionMessageEntryBranch,
	TextFieldMemberInfo,
} from "@/organisms/mbr";

export function Screen() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader />
			<AppScreen.Header>
				<ProgressTopBar
					title="회원 가입"
					leading="back"
					progress={{ label: "2 / 5", percent: 40, showLabel: true }}
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
