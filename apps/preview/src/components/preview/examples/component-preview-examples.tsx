import type { ReactNode } from "react";
import {
	dividerPreviewExample,
	placeholderPreviewExample,
} from "@pxds/pxds-components/atoms/feedback";
import {
	TextBlock,
	textBlockPreviewMocks,
} from "@pxds/pxds-components/atoms/typography";
import { wdsCorePreviewExamples } from "@pxds/pxds-components/core";
import {
	FlowHero,
	FlowNotice,
	FlowSummaryCard,
	ProgressTopBar,
} from "@pxds/pxds-components/domains";
import {
	ConsentList,
	formFieldPreviewExample,
	InfoList,
	InfoSection,
	NoticeBlock,
	PrimaryCTABar,
	SectionCard,
	SelectableList,
	TextFieldList,
} from "@pxds/pxds-components/molecules";

export type ComponentPreviewExample = {
	componentId: string;
	description: string;
	render: () => ReactNode;
};

function PreviewStack({ children }: { children: ReactNode }) {
	return <div className="flex w-[390px] max-w-full flex-col gap-4">{children}</div>;
}

const sampleInfoItems = [
	{
		id: "plan",
		title: "5GX 프라임",
		sub: "데이터 무제한",
		trailingLabel: "이용중",
		mediaLabel: "plan",
	},
	{
		id: "coupon",
		title: "멤버십 쿠폰",
		sub: "이번 달 2장 남음",
		trailingLabel: "보기",
		trailingKind: "action" as const,
		mediaLabel: "coupon",
	},
];

const sampleSelectableItems = [
	{ id: "basic", title: "기본 요금제", sub: "월 64,000원", trailingLabel: "추천" },
	{ id: "save", title: "절약 요금제", sub: "월 39,000원", trailingLabel: "할인" },
];

export const componentPreviewExamples = [
	...wdsCorePreviewExamples,
	{
		componentId: "text-block",
		description: "Typography primitive with PXDS text role mapping.",
		render: () => (
			<div className="grid gap-2">
				{textBlockPreviewMocks.map((props) => (
					<TextBlock key={`${props.variant}-${props.text}`} {...props} />
				))}
			</div>
		),
	},
	dividerPreviewExample,
	placeholderPreviewExample,
	formFieldPreviewExample,
	{
		componentId: "consent-list",
		description: "Agreement list with required validation state.",
		render: () => (
			<PreviewStack>
				<ConsentList
					allLabel="전체 동의"
					allCaption="선택 약관까지 한 번에 동의"
					items={[
						{ id: "service", title: "서비스 이용약관", caption: "v1.0", required: true },
						{ id: "event", title: "혜택 정보 수신", caption: "동의하지 않아도 가입 가능", required: false },
					]}
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "info-list",
		description: "Media, title, sub text, and trailing affordance rows.",
		render: () => (
			<PreviewStack>
				<InfoList items={sampleInfoItems} />
			</PreviewStack>
		),
	},
	{
		componentId: "info-section",
		description: "Section card wrapper around info rows.",
		render: () => (
			<PreviewStack>
				<InfoSection label="이용 정보" title="요금제" trailingText="2개" items={sampleInfoItems} />
			</PreviewStack>
		),
	},
	{
		componentId: "notice-block",
		description: "Policy or status notice block.",
		render: () => (
			<PreviewStack>
				<NoticeBlock badge="안내" text="유예 기간 후에는 회원 정보가 영구 삭제됩니다." action="자세히 보기" />
			</PreviewStack>
		),
	},
	{
		componentId: "section-card",
		description: "Generic section card with header slots.",
		render: () => (
			<PreviewStack>
				<SectionCard label="섹션" title="청구 정보" trailingText="최근">
					<TextBlock variant="body" text="이번 달 청구 예정 금액은 64,000원입니다." />
				</SectionCard>
			</PreviewStack>
		),
	},
	{
		componentId: "selectable-list",
		description: "Single-selection list pattern.",
		render: () => (
			<PreviewStack>
				<SelectableList name="preview-selectable" items={sampleSelectableItems} value="basic" />
			</PreviewStack>
		),
	},
	{
		componentId: "primary-cta-bar",
		description: "Primary docked CTA bar.",
		render: () => (
			<PreviewStack>
				<PrimaryCTABar primaryLabel="동의하고 계속하기" secondaryLabel="이전" />
			</PreviewStack>
		),
	},
	{
		componentId: "text-field-list",
		description: "Stacked form fields.",
		render: () => (
			<PreviewStack>
				<TextFieldList
					fields={[
						{ id: "name", label: "이름", placeholder: "홍길동", required: true },
						{ id: "phone", label: "휴대폰 번호", placeholder: "01012345678", inputMode: "numeric" },
					]}
					values={{ name: "", phone: "" }}
					onChange={() => undefined}
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "progress-top-bar",
		description: "Flow top bar with progress.",
		render: () => (
			<PreviewStack>
				<ProgressTopBar title="회원가입" leading="close" progress={{ label: "1/4", percent: 25 }} />
			</PreviewStack>
		),
	},
	{
		componentId: "flow-hero",
		description: "Flow page hero copy.",
		render: () => (
			<PreviewStack>
				<FlowHero titleLines={["약관에 동의하고", "가입을 시작하세요"]} description="필수 약관에 동의하면 다음 단계로 진행할 수 있어요." />
			</PreviewStack>
		),
	},
	{
		componentId: "flow-notice",
		description: "Flow notice section.",
		render: () => (
			<PreviewStack>
				<FlowNotice badge="안내" text="30일 이내 같은 정보로 로그인하면 탈퇴를 철회할 수 있어요." action="자세히" />
			</PreviewStack>
		),
	},
	{
		componentId: "flow-summary-card",
		description: "Flow summary information card.",
		render: () => (
			<PreviewStack>
				<FlowSummaryCard label="탈퇴 정보" title="처리 결과" items={sampleInfoItems} />
			</PreviewStack>
		),
	},
] as const satisfies readonly ComponentPreviewExample[];

export function getComponentPreviewExample(componentId: string) {
	return componentPreviewExamples.find(
		(example) => example.componentId === componentId,
	);
}
