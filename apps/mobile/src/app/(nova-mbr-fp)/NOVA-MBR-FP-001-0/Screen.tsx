import { AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import {
	FpPageHeader,
	GuardianInput,
	GuardianResult,
	MbrFpActionBar,
	TermAgree,
	TermList,
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
					title="약관 동의"
					subTitle="회원 가입에 필요한 약관을 확인해 주세요"
				/>
				<TermList />
				<TermAgree />
				<GuardianInput visible={false} />
				<GuardianResult visible={false} />
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<MbrFpActionBar primaryLabel="다음으로 가기" disabled />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
