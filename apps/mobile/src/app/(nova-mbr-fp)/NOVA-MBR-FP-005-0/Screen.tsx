import { AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import {
	FpPageHeader,
	JoinComplete,
	MbrFpActionBar,
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
					title="회원 가입이 완료됐어요"
					subTitle="잠시 후 홈으로 이동할 수 있어요"
				/>
				<JoinComplete />
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<MbrFpActionBar primaryLabel="홈으로 이동" />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
