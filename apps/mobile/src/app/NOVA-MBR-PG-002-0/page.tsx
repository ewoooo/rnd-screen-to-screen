import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import {
	MbrEntryBranchMessageSection,
	MbrMemberInfoFormSection,
	MbrPageHeaderSection,
} from "@/organisms/mbr";

export default function NovaMbrPg0020Page() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader />
			<AppScreen.Header>
				<ProgressTopBar
					title="회원 가입"
					leading="back"
					progress={{ label: "2 / 5", percent: 40, showLabel: true }}
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<MbrPageHeaderSection title="개인정보 입력" />
				<MbrMemberInfoFormSection />
				<MbrEntryBranchMessageSection visible={false} />
			</AppScreen.Content>
		</AppScreen>
	);
}
