import { AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import {
	EntryCheck,
	FpPageHeader,
	MbrFpActionBar,
	MemberInput,
} from "@/organisms/nova-mbr-fp";

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
				<FpPageHeader
					title="개인정보 입력"
					subTitle="가입에 필요한 기본 정보를 입력해 주세요"
				/>
				<MemberInput />
				<EntryCheck visible={false} />
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<MbrFpActionBar primaryLabel="다음" disabled />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
