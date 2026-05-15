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
} from "@pxds/pxds-layout/components";
import { useState } from "react";

const REASONS: ReadonlyArray<{ id: string; label: string }> = [
	{ id: "price", label: "가격이 부담돼요" },
	{ id: "rare-use", label: "이용 빈도가 낮아요" },
	{ id: "alt-service", label: "다른 서비스로 옮겨요" },
	{ id: "ux", label: "사용이 불편해요" },
	{ id: "error", label: "오류·결제 문제가 있었어요" },
	{ id: "etc", label: "기타 (직접 입력)" },
];

export function Screen() {
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const [freeText, setFreeText] = useState("");

	const toggle = (id: string, c: boolean) =>
		setSelected((s) => {
			const n = new Set(s);
			if (c) n.add(id);
			else n.delete(id);
			return n;
		});

	return (
		<AppScreen headerPreset="form-entry">
			<AppScreen.SystemHeader>
				<StatusBar />
			</AppScreen.SystemHeader>
			<AppScreen.Header>
				<AppBar title="탈퇴 사유" showLeftItem showTitle />
			</AppScreen.Header>
			<AppScreen.Content>
				<PageStackContents
					title={
						<TitleMain
							titleSubText="회원 탈퇴 2/6"
							title={"탈퇴하시는 이유가\n무엇인가요?"}
							subTitle="더 나은 서비스를 위해 알려주세요. (1개 이상 선택)"
						/>
					}
				/>

				<SectionDivider thickness="section" />

				<PageStackContents title={<TitleSection title="탈퇴 사유" />}>
					<SectionItem>
						<FieldStack>
							{REASONS.map((reason) => (
								<ListSelected
									key={reason.id}
									data-figma-property-type="checkbox"
									label={reason.label}
									checked={selected.has(reason.id)}
									showListSelectedRightItem={false}
									showSubText={false}
									onChange={(c) => toggle(reason.id, c)}
								/>
							))}
						</FieldStack>
					</SectionItem>
				</PageStackContents>

				<SectionDivider thickness="section" />

				<PageStackContents title={<TitleSection title="자유 의견 (선택)" />}>
					<SectionItem>
						<TextField
							label="자유 의견 (선택)"
							placeholder="더 자세한 의견이 있다면 알려주세요. (최대 500자)"
							helperText={`${freeText.length}/500자`}
							maxLength={500}
							value={freeText}
							onChange={(e) => setFreeText(e.target.value)}
							state={freeText.length > 0 ? "typed" : "default"}
						/>
					</SectionItem>
				</PageStackContents>
			</AppScreen.Content>
			<AppScreen.ActionBar preset="primary-cta">
				<SinglePrimaryAction>
					<Button
						disabled={selected.size === 0}
						fullWidth
						size="xlarge"
						variant="primary"
					>
						다음
					</Button>
				</SinglePrimaryAction>
			</AppScreen.ActionBar>
		</AppScreen>
	);
}
