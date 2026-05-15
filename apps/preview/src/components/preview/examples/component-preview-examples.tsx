"use client";

import type { ReactNode } from "react";
import {
	ActionButton,
	AppBar,
	Button,
	Callout,
	Checkbox,
	Chips,
	Divider,
	ListText,
	SearchBar,
	SectionItem,
	StatusBar,
	Text,
	TextField,
	TitleMain,
	TitleSection,
} from "@pxds/cx-components";

export type ComponentPreviewExample = {
	componentId: string;
	description: string;
	render: () => ReactNode;
};

function PreviewStack({ children }: { children: ReactNode }) {
	return <div className="flex w-[390px] max-w-full flex-col gap-4">{children}</div>;
}

export const componentPreviewExamples = [
	{
		componentId: "status-bar",
		description: "Mobile status bar frame component.",
		render: () => (
			<PreviewStack>
				<StatusBar />
			</PreviewStack>
		),
	},
	{
		componentId: "app-bar",
		description: "Top app bar with optional navigation and title regions.",
		render: () => (
			<PreviewStack>
				<AppBar title="가입자 정보 입력" showLeftItem showTitle />
			</PreviewStack>
		),
	},
	{
		componentId: "title-main",
		description: "Primary title block for top-level screen messaging.",
		render: () => (
			<PreviewStack>
				<TitleMain
					type="search"
					title="무엇을 찾고 계신가요?"
					subTitle="필요한 서비스를 빠르게 검색해 보세요."
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "title-section",
		description: "Section title with optional subtitle and right item.",
		render: () => (
			<PreviewStack>
				<TitleSection
					title="배송지 정보"
					subTitle="받는 분과 배송 요청사항을 입력해 주세요."
					rightItem={{ type: "textButton", text: "수정" }}
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "text",
		description: "CX typography primitive using component text styles.",
		render: () => (
			<div className="grid gap-2">
				<Text variant="sectionTitle">타이틀 텍스트</Text>
				<Text variant="body">본문 텍스트는 화면의 주요 설명에 사용합니다.</Text>
				<Text variant="helper">보조 설명 텍스트</Text>
			</div>
		),
	},
	{
		componentId: "text-field",
		description: "Input field with state, helper text, and optional action button.",
		render: () => (
			<PreviewStack>
				<TextField placeholder="이름 입력" />
				<TextField
					placeholder="우편번호"
					actionButton={{ label: "주소 찾기" }}
				/>
				<TextField
					placeholder="휴대폰 번호"
					error
					helperText="휴대폰 번호를 확인해 주세요."
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "button",
		description: "CX button variants and full-width action state.",
		render: () => (
			<PreviewStack>
				<Button fullWidth>다음</Button>
				<Button variant="secondary" fullWidth>
					주소 찾기
				</Button>
			</PreviewStack>
		),
	},
	{
		componentId: "action-button",
		description: "Docked action button with optional supporting text.",
		render: () => (
			<PreviewStack>
				<ActionButton
					type="ai"
					text="사진이나 연락처, 앱도 새 휴대폰으로 한 번에 옮겨볼까요?"
					actions={[
						{
							label: "홈으로 이동",
							secondaryLabel: "데이터 옮기기",
							variant: "primary",
						},
					]}
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "checkbox",
		description: "Checkbox control with label and checked state.",
		render: () => (
			<PreviewStack>
				<Checkbox label="가입자 정보와 동일" checked />
				<Checkbox label="공동현관 출입 정보를 입력할게요" />
			</PreviewStack>
		),
	},
	{
		componentId: "chips",
		description: "Horizontal chip selection group.",
		render: () => (
			<PreviewStack>
				<Chips
					defaultValue="all"
					items={[
						{ value: "all", label: "전체" },
						{ value: "mobile", label: "모바일" },
						{ value: "internet", label: "인터넷" },
					]}
					ariaLabel="카테고리"
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "list-text",
		description: "Text list row with optional right affordance.",
		render: () => (
			<PreviewStack>
				<ListText
					text="선택한 요금제는 다음 달부터 적용됩니다."
					rightItem={{ type: "icon", icon: "arrow-right", ariaLabel: "자세히 보기" }}
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "section-item",
		description: "Section content wrapper for form and list contents.",
		render: () => (
			<PreviewStack>
				<SectionItem>
					<TextField placeholder="상세 주소" />
				</SectionItem>
			</PreviewStack>
		),
	},
	{
		componentId: "callout",
		description: "Inline notice/callout block for guidance and policy copy.",
		render: () => (
			<PreviewStack>
				<Callout title="본인인증 완료">
					조현호 고객님의 본인인증이 완료되었습니다.
				</Callout>
			</PreviewStack>
		),
	},
	{
		componentId: "search-bar",
		description: "Search input affordance for main/search screens.",
		render: () => (
			<PreviewStack>
				<SearchBar placeholder="검색어를 입력해 주세요" />
			</PreviewStack>
		),
	},
	{
		componentId: "divider",
		description: "Content or section divider.",
		render: () => (
			<PreviewStack>
				<Divider type="section" />
				<Divider type="contents" />
			</PreviewStack>
		),
	},
] as const satisfies readonly ComponentPreviewExample[];

export function getComponentPreviewExample(componentId: string) {
	return componentPreviewExamples.find(
		(example) => example.componentId === componentId,
	);
}
