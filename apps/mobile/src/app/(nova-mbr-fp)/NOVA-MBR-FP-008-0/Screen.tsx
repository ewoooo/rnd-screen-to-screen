import { AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import {
	AuthRequest,
	AuthSelect,
	FpPageHeader,
	MbrFpActionBar,
} from "@/organisms/nova-mbr-fp";

export function Screen() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="본인인증" showLeftItem showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<FpPageHeader
					title="본인인증"
					subTitle="휴면 상태를 해제하려면 본인인증을 완료해 주세요"
				/>
				<AuthSelect />
				<AuthRequest />
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<MbrFpActionBar primaryLabel="인증 완료" disabled />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
