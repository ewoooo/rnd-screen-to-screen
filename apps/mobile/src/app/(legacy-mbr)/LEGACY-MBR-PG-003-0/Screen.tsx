import { StatusBar } from "@pxds/cx-components";
import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
import { AppScreen } from "@pxds/pxds-layout/components/chrome";
import {
	MembershipHeroSection,
	MembershipNoticeSection,
	MembershipPrimaryActionBar,
	MembershipSummarySection,
} from "@/organisms/legacy-mbr";

export function Screen() {
	return (
		<AppScreen>
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<ProgressTopBar
					title="탈퇴 완료"
					leading="close"
					progress={{ label: "회원 탈퇴 6/6", percent: 100, showLabel: true }}
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<MembershipHeroSection
					titleLines={["탈퇴 처리가", "완료되었습니다"]}
					description="30일 이내에 다시 가입하시면 일부 정보를 복원할 수 있어요. 그 이후엔 모두 파기됩니다."
				/>
				<MembershipSummarySection
					label="처리 정보"
					title="이 내용으로 처리됐어요"
					items={[
						{ id: "leave-at", title: "탈퇴 처리 시각", sub: "2026년 4월 30일 (수) 19:24" },
						{ id: "grace", title: "철회 가능 기간", sub: "5월 30일까지 (30일 유예)", trailingLabel: "철회 가능" },
						{ id: "purge", title: "개인정보 파기", sub: "유예 종료 시 자동 파기" },
					]}
				/>
				<MembershipNoticeSection
					badge="철회 안내"
					text="유예 기간 내 철회를 원하시면 탈퇴 시 사용한 본인인증으로 마이페이지에서 진행할 수 있어요."
				/>
			</AppScreen.Content>
			<AppScreen.Bottom>
				<MembershipPrimaryActionBar
					primaryLabel="홈으로 가기"
					secondaryLabel="철회하기"
				/>
			</AppScreen.Bottom>
		</AppScreen>
	);
}
