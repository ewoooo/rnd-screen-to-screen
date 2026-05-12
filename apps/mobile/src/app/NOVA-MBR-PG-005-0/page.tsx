import { PrimaryCTABar } from "@pxds/pxds-components/molecules";
import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import { MbrJoinCompleteSection, MbrPageHeaderSection } from "@/organisms/mbr";

export default function NovaMbrPg0050Page() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader />
			<AppScreen.Header>
				<ProgressTopBar
					title="회원 가입"
					leading="back"
					progress={{ label: "5 / 5", percent: 100, showLabel: true }}
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<MbrPageHeaderSection title="가입 완료" />
				<MbrJoinCompleteSection />
			</AppScreen.Content>
			<AppScreen.Bottom>
				<PrimaryCTABar primaryLabel="홈으로 이동" />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
