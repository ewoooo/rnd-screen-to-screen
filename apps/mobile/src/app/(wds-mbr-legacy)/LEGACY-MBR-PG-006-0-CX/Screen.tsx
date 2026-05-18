"use client";

import {
	AppBar,
	Button,
	ListSelected,
	SectionItem,
	StatusBar,
	TextField,
	TitleMain,
	TitleSection,
} from "@pxds/cx-components";
import {
	AppScreen,
	FieldStack,
	PageStackContents,
	SectionDivider,
	SinglePrimaryAction,
} from "@pxds/cx-layout/components";
import { useState } from "react";

const GENDER_OPTIONS = [
	{ id: "male", label: "남성" },
	{ id: "female", label: "여성" },
	{ id: "none", label: "선택 안 함" },
] as const;

export function Screen() {
	const [name, setName] = useState("");
	const [birth, setBirth] = useState("");
	const [phone, setPhone] = useState("");
	const [gender, setGender] = useState<string | null>(null);

	const disabled =
		name.trim().length === 0 ||
		birth.length !== 8 ||
		(phone.length !== 10 && phone.length !== 11) ||
		!gender;

	return (
		<AppScreen headerPreset="form-entry">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="회원 가입" showLeftItem showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<PageStackContents
					title={
						<TitleMain
							titleSubText="회원 가입 2/5"
							title={"기본 정보를\n입력해주세요"}
							subTitle="본인인증과 회원 식별에 사용해요. 입력값은 서비스 이용 외에 활용되지 않습니다."
						/>
					}
				/>

				<SectionDivider thickness="section" />

				<PageStackContents title={<TitleSection title="기본 정보" />}>
					<SectionItem>
						<FieldStack>
							<TextField
								label="이름"
								placeholder="실명을 입력해주세요"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<TextField
								label="생년월일"
								placeholder="YYYYMMDD"
								helperText="예: 19900101 (8자리 숫자)"
								value={birth}
								onChange={(e) => setBirth(e.target.value)}
								inputMode="numeric"
								maxLength={8}
							/>
							<TextField
								label="휴대전화"
								placeholder="01012345678"
								helperText="본인인증과 알림 발송에 사용해요"
								value={phone}
								onChange={(e) =>
									setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
								}
								inputMode="tel"
								maxLength={11}
							/>
						</FieldStack>
					</SectionItem>
				</PageStackContents>

				<SectionDivider thickness="section" />

				<PageStackContents title={<TitleSection title="성별" />}>
					<SectionItem>
						<FieldStack>
							{GENDER_OPTIONS.map((option) => (
								<ListSelected
									key={option.id}
									data-figma-property-type="radio"
									label={option.label}
									checked={gender === option.id}
									onChange={() => setGender(option.id)}
									showListSelectedRightItem={false}
									showSubText={false}
								/>
							))}
						</FieldStack>
					</SectionItem>
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.ActionBar preset="primary-cta">
				<SinglePrimaryAction>
					<Button
						disabled={disabled}
						fullWidth
						size="xlarge"
						variant="primary"
					>
						다음으로
					</Button>
				</SinglePrimaryAction>
			</AppScreen.ActionBar>
		</AppScreen>
	);
}
