import {
	ActionAreaTerms,
	CheckboxTerms,
	SectionHeaderPage,
	TextFieldGuardianRequest,
} from "@pxds/pxds-components/mbr";
import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

export default function NovaMbrPg0010Page() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader />
			<AppScreen.Header>
				<ProgressTopBar
					title="회원 가입"
					leading="back"
					progress={{
						label: "1 / 5",
						percent: 20,
						showLabel: true,
					}}
				/>
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
