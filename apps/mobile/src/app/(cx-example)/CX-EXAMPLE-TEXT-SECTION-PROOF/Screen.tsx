"use client";

import {
	AppBar,
	Button,
	Checkbox,
	ListText,
	SectionItem,
	StatusBar,
	TextField,
	TitleSection,
} from "@pxds/cx-components";
import {
	AppScreen,
	FieldStack,
	PageStackContents,
	SectionDivider,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";
import type { ReactNode } from "react";

type TextSectionProps = {
	title: string;
	children: ReactNode;
};

function TextSection({ title, children }: TextSectionProps) {
	return (
		<PageStackContents title={<TitleSection title={title} />}>
			<SectionItem>{children}</SectionItem>
		</PageStackContents>
	);
}

export function Screen() {
	return (
		<AppScreen headerPreset="form-entry">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="가입자 정보 입력" showLeftItem showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<TextSection title="기기변경 휴대폰 번호">
					<TextField
						defaultValue="010-1234-5678"
						disabled
						state="disabled"
					/>
				</TextSection>

				<SectionDivider thickness="section" />

				<TextSection title="본인인증 완료">
					<ListText
						showRightItem={false}
						text="조현호 고객님의 본인인증이 완료되었습니다."
					/>
				</TextSection>

				<SectionDivider thickness="section" />

				<TextSection title="가입자 주소">
					<FieldStack>
						<TextField
							actionButton={{ label: "주소 찾기" }}
							defaultValue="01155"
							disabled
							state="disabled"
						/>
						<TextField
							defaultValue="서울 강북구 오현로 45,"
							disabled
							state="disabled"
						/>
						<TextField
							defaultValue="107동 203호(미아동, 꿈의숲해링턴플레이스)"
							state="typed"
						/>
					</FieldStack>
				</TextSection>

				<SectionDivider thickness="section" />

				<TextSection title="주 생활지역">
					<FieldStack>
						<Checkbox
							checked
							label="가입자 정보와 동일"
							onCheckedChange={() => {}}
						/>
						<TextField
							actionButton={{ label: "주소 찾기" }}
							defaultValue="01155"
							disabled
							state="disabled"
						/>
						<TextField
							defaultValue="서울 강북구 오현로 45,"
							disabled
							helperText="5G 가용지역 확인 동의를 위한 정보"
							state="disabled"
						/>
					</FieldStack>
				</TextSection>

				<SectionDivider thickness="section" />

				<TextSection title="이메일">
					<TextField defaultValue="example@plus-ex.com" state="typed" />
				</TextSection>
			</AppScreen.Content>
			<AppScreen.Bottom preset="primary-cta">
				<SinglePrimaryAction>
					<Button fullWidth size="xlarge" variant="primary">
						다음
					</Button>
				</SinglePrimaryAction>
			</AppScreen.Bottom>
		</AppScreen>
	);
}
