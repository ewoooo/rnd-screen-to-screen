import { PrimaryCTABar } from "@pxds/pxds-components/molecules";
import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import { MbrAuthMethodSection, MbrPageHeaderSection } from "@/organisms/mbr";

export default function NovaMbrPg0030Page() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader />
			<AppScreen.Header>
				<ProgressTopBar
					title="회원 가입"
					leading="back"
					progress={{ label: "3 / 5", percent: 20, showLabel: true }}
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<MbrPageHeaderSection title="본인인증" />
				<MbrAuthMethodSection />
			</AppScreen.Content>
			<AppScreen.Bottom>
				<PrimaryCTABar primaryLabel="인증 완료" disabled />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
