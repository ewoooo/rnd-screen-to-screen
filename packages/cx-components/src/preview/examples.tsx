"use client";

import { ActionButton } from "../components/action-button";
import { AppBar } from "../components/app-bar";
import { Button } from "../components/button";
import { Callout } from "../components/callout";
import { Checkbox } from "../components/checkbox";
import { Chips } from "../components/chips";
import { Divider } from "../components/divider";
import { ListText } from "../components/list-text";
import { SearchBar } from "../components/search-bar";
import { SectionItem } from "../components/section-item";
import { StatusBar } from "../components/status-bar";
import { Text } from "../components/text";
import { TextField } from "../components/text-field";
import { TitleMain } from "../components/title-main";
import { TitleSection } from "../components/title-section";
import { RQRNotice } from "../candidate/rqr-notice";
import type { CxComponentPreviewExample } from "./types";

export const cxComponentPreviewExamples = [
	{
		componentId: "status-bar",
		description: "Mobile status bar frame component.",
		cases: [
			{
				id: "default",
				label: "Default",
				render: () => <StatusBar />,
			},
		],
	},
	{
		componentId: "app-bar",
		description: "Top app bar with optional navigation and title regions.",
		cases: [
			{
				id: "back-title",
				label: "Back + title",
				render: () => <AppBar title="가입자 정보 입력" showLeftItem showTitle />,
			},
			{
				id: "title-only",
				label: "Title only",
				render: () => <AppBar title="검색" showTitle />,
			},
		],
	},
	{
		componentId: "title-main",
		description: "Primary title block for top-level screen messaging.",
		cases: [
			{
				id: "search",
				label: "Search",
				render: () => (
					<TitleMain
						type="search"
						title="무엇을 찾고 계신가요?"
						subTitle="필요한 서비스를 빠르게 검색해 보세요."
					/>
				),
			},
		],
	},
	{
		componentId: "title-section",
		description: "Section title with optional subtitle and right item.",
		cases: [
			{
				id: "with-right",
				label: "Right item",
				render: () => (
					<TitleSection
						title="배송지 정보"
						subTitle="받는 분과 배송 요청사항을 입력해 주세요."
						rightItem={{ type: "textButton", text: "수정" }}
					/>
				),
			},
			{
				id: "title-only",
				label: "Title only",
				render: () => <TitleSection title="요금제 안내" />,
			},
		],
	},
	{
		componentId: "text",
		description: "CX typography primitive using component text styles.",
		cases: [
			{
				id: "section-title",
				label: "Section title",
				render: () => <Text variant="sectionTitle">타이틀 텍스트</Text>,
			},
			{
				id: "body",
				label: "Body",
				render: () => (
					<Text variant="body">본문 텍스트는 화면의 주요 설명에 사용합니다.</Text>
				),
			},
			{
				id: "helper",
				label: "Helper",
				render: () => <Text variant="helper">보조 설명 텍스트</Text>,
			},
		],
	},
	{
		componentId: "text-field",
		description: "Input field with state, helper text, and optional action button.",
		cases: [
			{
				id: "default",
				label: "Default",
				render: () => <TextField placeholder="이름 입력" />,
			},
			{
				id: "action",
				label: "Action",
				render: () => (
					<TextField placeholder="우편번호" actionButton={{ label: "주소 찾기" }} />
				),
			},
			{
				id: "error",
				label: "Error",
				render: () => (
					<TextField
						placeholder="휴대폰 번호"
						error
						helperText="휴대폰 번호를 확인해 주세요."
					/>
				),
			},
		],
	},
	{
		componentId: "button",
		description: "CX button variants and full-width action state.",
		cases: [
			{
				id: "primary",
				label: "Primary",
				render: () => <Button fullWidth>다음</Button>,
			},
			{
				id: "secondary",
				label: "Secondary",
				render: () => (
					<Button variant="secondary" fullWidth>
						주소 찾기
					</Button>
				),
			},
		],
	},
	{
		componentId: "action-button",
		description: "Docked action button with optional supporting text.",
		cases: [
			{
				id: "ai-dual",
				label: "AI dual action",
				render: () => (
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
				),
			},
		],
	},
	{
		componentId: "checkbox",
		description: "Checkbox control with label and checked state.",
		cases: [
			{
				id: "checked",
				label: "Checked",
				render: () => <Checkbox label="가입자 정보와 동일" checked />,
			},
			{
				id: "unchecked",
				label: "Unchecked",
				render: () => <Checkbox label="공동현관 출입 정보를 입력할게요" />,
			},
		],
	},
	{
		componentId: "chips",
		description: "Horizontal chip selection group.",
		cases: [
			{
				id: "category",
				label: "Category",
				render: () => (
					<Chips
						defaultValue="all"
						items={[
							{ value: "all", label: "전체" },
							{ value: "mobile", label: "모바일" },
							{ value: "internet", label: "인터넷" },
						]}
						ariaLabel="카테고리"
					/>
				),
			},
		],
	},
	{
		componentId: "list-text",
		description: "Text list row with optional right affordance.",
		cases: [
			{
				id: "icon-right",
				label: "Icon right",
				render: () => (
					<ListText
						text="선택한 요금제는 다음 달부터 적용됩니다."
						rightItem={{
							type: "icon",
							icon: "arrow-right",
							ariaLabel: "자세히 보기",
						}}
					/>
				),
			},
		],
	},
	{
		componentId: "section-item",
		description: "Section content wrapper for form and list contents.",
		cases: [
			{
				id: "with-field",
				label: "With field",
				render: () => (
					<SectionItem>
						<TextField placeholder="상세 주소" />
					</SectionItem>
				),
			},
		],
	},
	{
		componentId: "callout",
		description: "Inline notice/callout block for guidance and policy copy.",
		cases: [
			{
				id: "default",
				label: "Default",
				render: () => (
					<Callout title="본인인증 완료">
						조현호 고객님의 본인인증이 완료되었습니다.
					</Callout>
				),
			},
		],
	},
	{
		componentId: "search-bar",
		description: "Search input affordance for main/search screens.",
		cases: [
			{
				id: "default",
				label: "Default",
				render: () => <SearchBar placeholder="검색어를 입력해 주세요" />,
			},
		],
	},
	{
		componentId: "divider",
		description: "Content or section divider.",
		cases: [
			{
				id: "section",
				label: "Section",
				render: () => <Divider type="section" />,
			},
			{
				id: "contents",
				label: "Contents",
				render: () => <Divider type="contents" />,
			},
		],
	},
	{
		componentId: "rqr-notice",
		description: "RQR candidate notice generated from a requirement branch.",
		cases: [
			{
				id: "info",
				label: "Info",
				render: () => (
					<RQRNotice title="가입 전 확인">
						정책상 필수 안내가 있는 경우 이 영역에서 사용자가 바로 확인할 수
						있게 노출합니다.
					</RQRNotice>
				),
			},
			{
				id: "negative",
				label: "Negative",
				render: () => (
					<RQRNotice title="처리할 수 없음" tone="negative">
						입력한 정보가 정책 조건과 맞지 않습니다.
					</RQRNotice>
				),
			},
		],
	},
] as const satisfies readonly CxComponentPreviewExample[];

export const componentPreviewExamples = cxComponentPreviewExamples;
