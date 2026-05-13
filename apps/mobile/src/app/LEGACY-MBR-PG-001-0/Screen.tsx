import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import {
	MembershipHeroSection,
	MembershipNoticeSection,
	MembershipPrimaryActionBar,
	MembershipSelectableSection,
} from "@/organisms/membership";

export function Screen() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader />
			<AppScreen.Header>
				<ProgressTopBar
					title="본인인증"
					leading="back"
					progress={{ label: "회원 가입 3/5", percent: 60, showLabel: true }}
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<MembershipHeroSection
					titleLines={["본인 확인을 위해", "인증 수단을 선택해주세요"]}
					description="한 번 인증하면 같은 단말에서 30일간 재인증이 면제돼요."
				/>
				<MembershipSelectableSection
					name="identity-method"
					value="kakao"
					items={[
						{
							id: "kakao",
							title: "카카오톡",
							sub: "가장 빠르고 간편하게 인증할 수 있어요",
							trailingLabel: "추천",
						},
						{ id: "pass", title: "통신사 PASS", sub: "통신 3사 명의 휴대전화로 인증" },
						{ id: "sms", title: "휴대전화 문자", sub: "문자로 받은 인증번호 입력" },
						{ id: "ipin", title: "아이핀(IPIN)", sub: "주민번호 대체 인증 수단" },
					]}
				/>
				<MembershipNoticeSection
					badge="정책"
					text="인증 5회 연속 실패 시 30분간 인증이 제한돼요. 인증기관 별 추가 약관에 동의가 필요할 수 있어요."
				/>
			</AppScreen.Content>
			<AppScreen.Bottom>
				<MembershipPrimaryActionBar primaryLabel="인증하기" />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
