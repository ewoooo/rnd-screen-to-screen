import {
	ActionButton,
	AppBar,
	Callout,
	Icon,
	RQRContentsDetail,
	SectionItem,
	StatusBar,
	TitleMain,
	TitleSection,
} from "@pxds/cx-components";
import {
	AppScreen,
	PageStackContents,
	SectionDivider,
	SinglePrimaryAction,
} from "@pxds/pxds-layout/components";

const WITHDRAW_COMPLETE_SUMMARY_ROWS = [
	{
		id: "processed-at",
		label: "탈퇴 처리 시각",
		value: "2026년 4월 30일 (수) 19:24",
	},
	{
		id: "revocation-period",
		label: "철회 가능 기간",
		value: "5월 30일까지 (30일 유예)",
	},
	{
		id: "privacy-disposal",
		label: "개인정보 파기",
		value: "유예 종료 시 자동 파기",
	},
] as const;

export function Screen() {
	return (
		<AppScreen headerPreset="form-entry">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar
					title="탈퇴 완료"
					showLeftItem
					showTitle
					leftIcon={<Icon type="close" size={24} aria-label="닫기" />}
					leftLabel="닫기"
				/>
			</AppScreen.Header>
			<AppScreen.Content>
				<PageStackContents
					title={
						<TitleMain
							type="complete"
							titleSubText="회원 탈퇴 6/6"
							title={"탈퇴 처리가\n완료되었습니다"}
							subTitle="30일 이내에 다시 가입하시면 일부 정보를 복원할 수 있어요. 그 이후엔 모두 파기됩니다."
						/>
					}
				/>

				<SectionDivider thickness="section" />

				<PageStackContents
					title={<TitleSection title="이 내용으로 처리됐어요" />}
				>
					<RQRContentsDetail
						title="처리 정보"
						rows={WITHDRAW_COMPLETE_SUMMARY_ROWS}
					/>
				</PageStackContents>

				<SectionDivider thickness="section" />

				<PageStackContents>
					<SectionItem>
						<Callout title="철회 안내">
							유예 기간 내 철회를 원하시면 탈퇴 시 사용한 본인인증으로
							마이페이지에서 진행할 수 있어요.
						</Callout>
					</SectionItem>
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.ActionBar preset="primary-cta">
				<SinglePrimaryAction>
					<ActionButton
						actions={[
							{ label: "철회하기", variant: "secondary" },
							{ label: "홈으로 가기", variant: "primary" },
						]}
					/>
				</SinglePrimaryAction>
			</AppScreen.ActionBar>
		</AppScreen>
	);
}
