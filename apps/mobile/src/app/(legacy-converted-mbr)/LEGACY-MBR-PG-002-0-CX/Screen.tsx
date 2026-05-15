import {
	ActionButton,
	AppBar,
	Callout,
	Icon,
	ListText,
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

export function Screen() {
	return (
		<AppScreen headerPreset="form-entry">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar
					title="가입 완료"
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
							titleSubText="회원 가입 5/5 · 가입 완료"
							title={"환영합니다,\n우주에 오신 걸"}
							subTitle="가입이 완료되었어요. 자동 로그인 상태이며, 첫 화면부터 모든 서비스를 이용할 수 있어요."
						/>
					}
				/>

				<SectionDivider thickness="section" />

				<PageStackContents
					title={
						<TitleSection
							title="이 정보로 가입이 완료됐어요"
							subTitle="가입 정보"
						/>
					}
				>
					<SectionItem type="card">
						<ListText
							table
							tableText="회원 ID"
							text="wooseong****"
							rightItem={{ type: "text", text: "본인" }}
							showDivider
						/>
						<ListText
							table
							tableText="가입일"
							text="2026년 4월 30일 (수)"
							showRightItem={false}
							showDivider
						/>
						<ListText
							table
							tableText="자동 로그인"
							text="이 기기에서 30일 유지"
							rightItem={{ type: "text", text: "활성" }}
						/>
					</SectionItem>
				</PageStackContents>

				<SectionDivider thickness="section" />

				<PageStackContents>
					<SectionItem>
						<Callout title="혜택">
							신규 가입 첫 달 멤버십 무료 혜택이 자동 적용되었어요. 사용 내역은
							내정보에서 확인할 수 있어요.
						</Callout>
					</SectionItem>
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.ActionBar preset="primary-cta">
				<SinglePrimaryAction>
					<ActionButton
						type="gift"
						actions={[
							{ label: "내정보 확인", variant: "secondary" },
							{ label: "홈으로 가기", variant: "primary" },
						]}
					/>
				</SinglePrimaryAction>
			</AppScreen.ActionBar>
		</AppScreen>
	);
}
