import { AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import {
	MbrPrimaryCTABar,
	SectionHeaderPage,
	SectionMessageJoinCompleteView,
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
				<SectionHeaderPage title="가입 완료" />
				<SectionMessageJoinCompleteView />
			</AppScreen.Content>
			<AppScreen.Bottom>
				<MbrPrimaryCTABar primaryLabel="홈으로 이동" />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
