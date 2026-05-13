import { AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import {
	ListCellAuthMethod,
	MbrPrimaryCTABar,
	SectionHeaderPage,
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
				<SectionHeaderPage title="본인인증" />
				<ListCellAuthMethod />
			</AppScreen.Content>
			<AppScreen.Bottom>
				<MbrPrimaryCTABar primaryLabel="인증 완료" disabled />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
