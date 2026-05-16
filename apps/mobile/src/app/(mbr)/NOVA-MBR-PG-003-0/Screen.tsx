import { AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
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
				<SectionHeaderPage
					title="본인 인증"
					subTitle="본인 명의 인증 수단으로 가입자를 확인해 주세요"
				/>
				<ListCellAuthMethod />
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<MbrPrimaryCTABar primaryLabel="인증 완료" disabled />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
