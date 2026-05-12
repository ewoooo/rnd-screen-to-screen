import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import {
	MembershipFormSection,
	MembershipHeroSection,
	MembershipPrimaryActionBar,
	MembershipSelectableSection,
} from "@/organisms/membership";

export default function MembershipPersonalInfoPage() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader />
			<AppScreen.Header>
				<ProgressTopBar
					title="회원가입"
					leading="back"
					progress={{ label: "회원 가입 2/5", percent: 40, showLabel: true }}
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<MembershipHeroSection
					titleLines={["기본 정보를", "입력해주세요"]}
					description="본인인증과 회원 식별에 사용해요. 입력값은 서비스 이용 외에 활용되지 않습니다."
				/>
				<MembershipFormSection
					fields={[
						{ id: "name", label: "이름", required: true, placeholder: "실명을 입력해주세요" },
						{
							id: "birth",
							label: "생년월일",
							required: true,
							placeholder: "YYYYMMDD",
							helperText: "예: 19900101 (8자리 숫자)",
						},
						{
							id: "phone",
							label: "휴대전화",
							required: true,
							placeholder: "010-1234-5678",
							helperText: "본인인증과 알림 발송에 사용해요",
						},
					]}
				/>
				<MembershipSelectableSection
					name="gender"
					items={[
						{ id: "male", title: "남성" },
						{ id: "female", title: "여성" },
						{ id: "none", title: "선택 안 함" },
					]}
				/>
			</AppScreen.Content>
			<AppScreen.Bottom>
				<MembershipPrimaryActionBar primaryLabel="다음으로" disabled />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
