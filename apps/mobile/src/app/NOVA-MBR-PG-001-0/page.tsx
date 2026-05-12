import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import {
	MbrGuardianConsentSection,
	MbrPageHeaderSection,
	MbrTermsActionArea,
	MbrTermsAgreementSection,
} from "@/organisms/mbr";

export default function NovaMbrPg0010Page() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader />
			<AppScreen.Header>
				<ProgressTopBar
					title="회원 가입"
					leading="back"
					progress={{ label: "1 / 5", percent: 20, showLabel: true }}
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<MbrPageHeaderSection title="약관 동의" />
				<MbrTermsAgreementSection />
				<MbrGuardianConsentSection visible={false} />
			</AppScreen.Content>
			<AppScreen.Bottom>
				<MbrTermsActionArea disabled />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
