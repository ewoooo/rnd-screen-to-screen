import { AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import {
	ActionAreaTerms,
	CheckboxTerms,
	SectionHeaderPage,
	TextFieldGuardianRequest,
} from "@/organisms/mbr";

export function Screen() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="회원 가입" showLeftItem showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<SectionHeaderPage title="약관 동의" />
				<CheckboxTerms />
				<TextFieldGuardianRequest visible={false} />
			</AppScreen.Content>
			<AppScreen.Bottom>
				<ActionAreaTerms disabled />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
