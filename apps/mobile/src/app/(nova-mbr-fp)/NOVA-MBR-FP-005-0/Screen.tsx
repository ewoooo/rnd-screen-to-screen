import { ActionButton, AppBar, StatusBar } from "@pxds/cx-components";
import { AppScreen } from "@pxds/cx-layout/components/chrome";
import { SinglePrimaryAction } from "@pxds/cx-layout/components/compositions";
import { JoinComplete } from "@/organisms/nova-mbr-fp/ogn-mbr-join-complete";

export function Screen() {
	return (
		<AppScreen headerPreset="standard">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="가입 완료" showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<JoinComplete />
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<SinglePrimaryAction>
					<ActionButton actions={[{ label: "홈으로 이동하기" }]} />
				</SinglePrimaryAction>
			</AppScreen.Bottom>
		</AppScreen>
	);
}
