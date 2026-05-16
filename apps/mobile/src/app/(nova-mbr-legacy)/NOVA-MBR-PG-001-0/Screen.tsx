import { AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import {
	ActionAreaTerms,
	CheckboxTerms,
	SectionHeaderPage,
	TextFieldGuardianRequest,
} from "@/organisms/nova-mbr-legacy";

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
				<SectionHeaderPage
					title="약관 동의"
					subTitle="회원 가입을 위한 필수·선택 약관에 동의해 주세요"
				/>
				<CheckboxTerms />
				<TextFieldGuardianRequest visible={false} />
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<ActionAreaTerms disabled />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
