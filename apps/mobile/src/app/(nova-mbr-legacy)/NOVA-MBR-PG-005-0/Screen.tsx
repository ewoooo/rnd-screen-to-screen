import { AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import {
	MbrPrimaryCTABar,
	SectionHeaderPage,
	SectionMessageJoinCompleteView,
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
					title="가입이 완료되었습니다"
					subTitle="잠시 후 홈으로 이동합니다"
				/>
				<SectionMessageJoinCompleteView />
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<MbrPrimaryCTABar primaryLabel="홈으로 이동" />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
