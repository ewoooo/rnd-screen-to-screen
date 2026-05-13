import { StatusBar } from "@pxds/cx-components";
import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import {
	MembershipFormSection,
	MembershipHeroSection,
	MembershipPrimaryActionBar,
	MembershipSelectableSection,
} from "@/organisms/legacy-mbr";

export function Screen() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<ProgressTopBar
					title="탈퇴 사유"
					leading="back"
					progress={{ label: "회원 탈퇴 2/6", percent: 33.33, showLabel: true }}
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<MembershipHeroSection
					titleLines={["탈퇴하시는 이유가", "무엇인가요?"]}
					description="더 나은 서비스를 위해 알려주세요. (1개 이상 선택)"
				/>
				<MembershipSelectableSection
					name="leave-reason"
					selectionMode="multi"
					items={[
						{ id: "price", title: "가격이 부담돼요" },
						{ id: "rare-use", title: "이용 빈도가 낮아요" },
						{ id: "alt-service", title: "다른 서비스로 옮겨요" },
						{ id: "ux", title: "사용이 불편해요" },
						{ id: "error", title: "오류·결제 문제가 있었어요" },
						{ id: "etc", title: "기타 (직접 입력)" },
					]}
				/>
				<MembershipFormSection
					fields={[
						{
							id: "free-text",
							label: "자유 의견 (선택)",
							placeholder: "더 자세한 의견이 있다면 알려주세요. (최대 500자)",
							helperText: "0/500자",
						},
					]}
				/>
			</AppScreen.Content>
			<AppScreen.Bottom>
				<MembershipPrimaryActionBar primaryLabel="다음" disabled />
			</AppScreen.Bottom>
		</AppScreen>
	);
}
