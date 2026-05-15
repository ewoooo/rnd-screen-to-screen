"use client";

import {
	AppBar,
	Button,
	Callout,
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

type ImpactItem = {
	id: string;
	text: string;
	rightText: string;
};

const IMPACT_ITEMS: ReadonlyArray<ImpactItem> = [
	{ id: "points", text: "T 멤버십 포인트", rightText: "소멸" },
	{ id: "coupons", text: "발급 쿠폰 6개", rightText: "소멸" },
	{ id: "auto-payments", text: "자동 결제 2건", rightText: "해지" },
	{ id: "identity-history", text: "본인인증 이력", rightText: "보관" },
];

export function Screen() {
	return (
		<AppScreen headerPreset="form-entry">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="회원 탈퇴" showLeftItem showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<PageStackContents
					title={
						<TitleMain
							titleSubText="회원 탈퇴 3/6"
							title={"탈퇴하면 아래 정보가\n사라지거나 제한돼요"}
							subTitle="탈퇴 후에는 같은 식별정보로 30일간 재가입이 제한될 수 있어요."
						/>
					}
				/>

				<SectionDivider thickness="section" />

				<PageStackContents
					title={<TitleSection title="사라지거나 정리되는 항목" />}
				>
					<SectionItem>
						{IMPACT_ITEMS.map((item) => (
							<ListText
								key={item.id}
								text={item.text}
								rightItem={{
									type: "badge",
									text: item.rightText,
									badgeType: "gray",
								}}
							/>
						))}
						<Callout title="미납 확인">
							현재 미납 요금 8,900원이 확인됐어요. 미납 정산 후 탈퇴를 진행할 수
							있어요.
						</Callout>
					</SectionItem>
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.ActionBar preset="primary-cta">
				<SinglePrimaryAction>
					<Button disabled fullWidth size="xlarge" variant="primary">
						다음으로
					</Button>
				</SinglePrimaryAction>
			</AppScreen.ActionBar>
		</AppScreen>
	);
}
