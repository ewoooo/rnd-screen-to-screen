"use client";

import {
	AppBar,
	Button,
	Callout,
	RQRListOption,
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
import { useState } from "react";

type AuthMethodId = "kakao" | "pass" | "sms" | "ipin";

type AuthMethodOption = {
	id: AuthMethodId;
	label: string;
	subText: string;
	recommended?: boolean;
};

const AUTH_METHODS: readonly AuthMethodOption[] = [
	{
		id: "kakao",
		label: "카카오톡",
		subText: "가장 빠르고 간편하게 인증할 수 있어요",
		recommended: true,
	},
	{
		id: "pass",
		label: "통신사 PASS",
		subText: "통신 3사 명의 휴대전화로 인증",
	},
	{
		id: "sms",
		label: "휴대전화 문자",
		subText: "문자로 받은 인증번호 입력",
	},
	{
		id: "ipin",
		label: "아이핀(IPIN)",
		subText: "주민번호 대체 인증 수단",
	},
] as const;

export function Screen() {
	const [selected, setSelected] = useState<AuthMethodId | null>(null);

	return (
		<AppScreen headerPreset="form-entry">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="본인인증" showLeftItem showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<PageStackContents
					title={
						<TitleMain
							titleSubText="회원 가입 3단계 (3/5)"
							title={"본인 확인을 위해\n인증 수단을 선택해주세요"}
							subTitle="한 번 인증하면 같은 단말에서 30일간 재인증이 면제돼요."
						/>
					}
				/>

				<SectionDivider thickness="section" />

				<PageStackContents title={<TitleSection title="인증 수단 선택" />}>
					<SectionItem>
						{AUTH_METHODS.map((method) => (
							<RQRListOption
								key={method.id}
								type="radio"
								name="identity-method"
								title={method.label}
								description={method.subText}
								checked={selected === method.id}
								onCheckedChange={(next) => {
									if (next) setSelected(method.id);
								}}
								badgeText={method.recommended ? "추천" : undefined}
							/>
						))}
						<Callout title="인증 정책 안내">
							인증 5회 연속 실패 시 30분간 인증이 제한돼요. 인증기관 별 추가 약관에
							동의가 필요할 수 있어요.
						</Callout>
					</SectionItem>
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.ActionBar preset="primary-cta">
				<SinglePrimaryAction>
					<Button
						disabled={selected == null}
						fullWidth
						size="xlarge"
						variant="primary"
					>
						인증하기
					</Button>
				</SinglePrimaryAction>
			</AppScreen.ActionBar>
		</AppScreen>
	);
}
