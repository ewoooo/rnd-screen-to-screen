import { AppBar, Icon, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import {
	JoinCompleteResult,
	MbrPrimaryCTABar,
} from "@/organisms/nova-mbr-legacy";

export function Screen() {
	return (
		<AppScreen headerPreset="standard">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar
					title="회원 가입"
					showLeftItem
					showTitle
					leftLabel="닫기"
					leftIcon={<Icon type="close" size={24} color="primary" />}
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<JoinCompleteResult />
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<MbrPrimaryCTABar primaryLabel="홈으로 이동" />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
