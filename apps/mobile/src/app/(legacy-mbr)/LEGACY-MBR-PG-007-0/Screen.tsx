import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import {
	MembershipHeroSection,
	MembershipNoticeSection,
	MembershipPrimaryActionBar,
	MembershipTermsSection,
} from "@/organisms/legacy-mbr";

export function Screen() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader />
			<AppScreen.Header>
				<ProgressTopBar
					title="회원 가입"
					leading="back"
					progress={{ label: "회원 가입 1/5", percent: 20, showLabel: true }}
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<MembershipHeroSection
					titleLines={["약관에 동의하고", "가입을 시작하세요"]}
					description="필수 약관에 동의하면 다음 단계로 진행할 수 있어요. 선택 약관은 나중에 변경할 수 있습니다."
				/>
				<MembershipTermsSection />
				<MembershipNoticeSection
					badge="안내"
					text="만 14세 미만 고객은 법정대리인 동의 요청이 함께 진행됩니다."
				/>
			</AppScreen.Content>
			<AppScreen.Bottom>
				<MembershipPrimaryActionBar primaryLabel="동의하고 계속하기" />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
