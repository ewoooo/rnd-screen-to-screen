import type { ReactNode } from "react";
import { wdsCorePreviewExamples } from "@pxds/pxds-components/core";
import {
	dividerPreviewExample,
	placeholderPreviewExample,
} from "@pxds/pxds-components/atoms/feedback";
import {
	CheckList,
	ChipGroup,
	ConsentList,
	DescriptionList,
	filterTabsPreviewExample,
	formFieldPreviewExample,
	InfoList,
	InfoSection,
	mediaBlockPreviewExample,
	NoticeBlock,
	PrimaryCTABar,
	PromoBlock,
	queryBarPreviewExample,
	SectionCard,
	selectFieldPreviewExample,
	SelectableList,
	StickyActionBar,
	SummaryCard,
	TextFieldList,
} from "@pxds/pxds-components/molecules";
import {
	AiAnnotation,
	AuthMethodSelector,
	Banner,
	FinalConsentRow,
	FlowContinueBar,
	FlowHero,
	FlowNotice,
	FlowPersonalInfoForm,
	FlowReasonForm,
	FlowResultActions,
	FlowSummaryCard,
	GlobalNavigationBar,
	GlobalNavigationHeader,
	GlobalSearch,
	HomeHeroBlock,
	LeaveImpactChecklist,
	ListRow,
	LoginForm,
	MyEditButton,
	ProductBenefitList,
	ProductOptionSelector,
	ProductPromoBanner,
	ProductPurchaseBar,
	ProductSummaryCard,
	ProgressTopBar,
	ReusedInfoList,
	SearchPromoBlock,
	SearchResultList,
	SearchResultTabs,
	SearchSuggestionChips,
	TermsAgreementGroup,
} from "@pxds/pxds-components/domains";
import {
	TextBlock,
	textBlockPreviewMocks,
} from "@pxds/pxds-components/atoms/typography";

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
	mediaBlockPreviewExample,
	queryBarPreviewExample,
	filterTabsPreviewExample,
	formFieldPreviewExample,
	selectFieldPreviewExample,
	{
		componentId: "check-list",
		description: "Required checklist with detail actions.",
		render: () => (
			<PreviewStack>
				<CheckList
					items={[
						{ id: "one", title: "탈퇴 영향 확인", caption: "혜택과 쿠폰이 사라집니다.", required: true, actionLabel: "보기" },
						{ id: "two", title: "안내사항 확인", caption: "동일 정보 재가입이 제한될 수 있어요.", required: true },
					]}
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "chip-group",
		description: "Keyword chip flow.",
		render: () => <ChipGroup items={["전체", "인기", "멤버십", "요금"]} />,
	},
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
		componentId: "description-list",
		description: "Label/value rows for retained account information.",
		render: () => (
			<PreviewStack>
				<DescriptionList
					label="재사용 정보"
					items={[
						{ id: "phone", label: "휴대폰 번호", value: "010-1234-5678", actionLabel: "변경" },
						{ id: "email", label: "이메일", value: "user@example.com" },
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
		componentId: "promo-block",
		description: "Promotion block with badge, copy, action, and media.",
		render: () => (
			<PreviewStack>
				<PromoBlock badge="혜택" text="Galaxy S26 추가지원금 찬스" action="확인하기" mediaLabel="phone" />
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
		componentId: "summary-card",
		description: "Summary card with media and content body.",
		render: () => (
			<PreviewStack>
				<SummaryCard label="상품" title="Galaxy S26" mediaAlt="phone" mediaBadge="new">
					<TextBlock variant="body" text="월 23,800원부터 시작" color="semantic.label.alternative" />
				</SummaryCard>
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
		componentId: "sticky-action-bar",
		description: "Sticky purchase/action bar.",
		render: () => (
			<PreviewStack>
				<StickyActionBar eyebrow="AI 추천" title="월 23,800원" secondaryAction="담기" primaryAction="구매하기" />
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
		componentId: "global-navigation-header",
		description: "Global app navigation header.",
		render: () => <PreviewStack><GlobalNavigationHeader /></PreviewStack>,
	},
	{
		componentId: "global-navigation-bar",
		description: "Global bottom navigation.",
		render: () => <PreviewStack><GlobalNavigationBar /></PreviewStack>,
	},
	{
		componentId: "global-search",
		description: "Global search chrome.",
		render: () => (
			<PreviewStack>
				<GlobalSearch
					query="아이폰"
					tabs={[{ id: "all", label: "전체" }, { id: "phone", label: "휴대폰" }]}
					activeTab="all"
				>
					<SearchResultList
						label="검색 결과"
						title="아이폰"
						countText="12개"
						items={[{ id: "iphone", title: "iPhone 20 Air", sub: "가볍게 만나는 iPhone", pill: "보기" }]}
					/>
				</GlobalSearch>
			</PreviewStack>
		),
	},
	{
		componentId: "progress-top-bar",
		description: "Flow top bar with progress.",
		render: () => <PreviewStack><ProgressTopBar title="회원가입" leading="close" progress={{ label: "1/4", percent: 25 }} /></PreviewStack>,
	},
	{
		componentId: "flow-hero",
		description: "Flow page hero copy.",
		render: () => <PreviewStack><FlowHero titleLines={["약관에 동의하고", "가입을 시작하세요"]} description="필수 약관에 동의하면 다음 단계로 진행할 수 있어요." /></PreviewStack>,
	},
	{
		componentId: "flow-notice",
		description: "Flow notice section.",
		render: () => <PreviewStack><FlowNotice badge="안내" text="30일 이내 같은 정보로 로그인하면 탈퇴를 철회할 수 있어요." action="자세히" /></PreviewStack>,
	},
	{
		componentId: "flow-summary-card",
		description: "Flow summary information card.",
		render: () => <PreviewStack><FlowSummaryCard label="탈퇴 정보" title="처리 결과" items={sampleInfoItems} /></PreviewStack>,
	},
	{
		componentId: "flow-continue-bar",
		description: "Single continue action bar.",
		render: () => <PreviewStack><FlowContinueBar eyebrow="필수 약관 3개 동의가 남았어요" primaryAction="동의하고 계속하기" /></PreviewStack>,
	},
	{
		componentId: "flow-result-actions",
		description: "Result page action bar.",
		render: () => <PreviewStack><FlowResultActions primaryLabel="홈으로 가기" secondaryLabel="안내 보기" /></PreviewStack>,
	},
	{
		componentId: "flow-personal-info-form",
		description: "Personal information form flow section.",
		render: () => (
			<PreviewStack>
				<FlowPersonalInfoForm
					fields={[{ id: "name", label: "이름", kind: "text", placeholder: "이름 입력" }]}
					values={{ name: "" }}
					errors={{}}
					onChange={() => undefined}
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "flow-reason-form",
		description: "Reason selection flow section.",
		render: () => (
			<PreviewStack>
				<FlowReasonForm
					items={[{ id: "price", title: "요금이 부담돼요", sub: "더 저렴한 상품을 찾고 있어요" }]}
					value="price"
					freeTextLabel="상세 사유"
					freeTextPlaceholder="이유를 입력해주세요"
					freeTextMaxLength={100}
					freeText=""
					onValueChange={() => undefined}
					onFreeTextChange={() => undefined}
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "terms-agreement-group",
		description: "Terms agreement organism.",
		render: () => (
			<PreviewStack>
				<TermsAgreementGroup
					title="약관 동의"
					allLabel="전체 동의"
					allCaption="선택 약관까지 한 번에 동의"
					items={[{ id: "service", title: "서비스 이용약관", caption: "v1.0", required: true }]}
				/>
			</PreviewStack>
		),
	},
	{
		componentId: "home-banner",
		description: "Home banner variants.",
		render: () => <PreviewStack><Banner variant="offering" text="Galaxy S26 추가지원금 찬스" imageSize={{ w: 72, h: 72 }} imageLabel="phone" /></PreviewStack>,
	},
	{
		componentId: "home-block",
		description: "Home card block preset.",
		render: () => <PreviewStack><HomeHeroBlock label="요금안내서" title="3월 요금 64,000원" ai={{ text: "콘텐츠 이용료가 지난달보다 늘었어요" }} cta={{ text: "상세내역 보기" }} /></PreviewStack>,
	},
	{
		componentId: "home-list-row",
		description: "Home list row.",
		render: () => <PreviewStack><ListRow thumb={{ w: 48, h: 48, label: "card" }} title="T멤버십" sub="5곳에서 사용가능" pill="사용" /></PreviewStack>,
	},
	{
		componentId: "ai-annotation",
		description: "AI annotation row.",
		render: () => <AiAnnotation icon={<span aria-hidden>ai</span>} text="지난달보다 사용량이 늘었어요" />,
	},
	{
		componentId: "my-edit-button",
		description: "MY edit footer button.",
		render: () => <MyEditButton />,
	},
	{
		componentId: "product-summary-card",
		description: "Product summary card organism.",
		render: () => <PreviewStack><ProductSummaryCard label="휴대폰" brand="Samsung" name="Galaxy S26" price="23,800원" originalPrice="80,000원" discount="20%" rating="4.8" reviewCount="리뷰 128" imageLabel="phone" /></PreviewStack>,
	},
	{
		componentId: "product-option-selector",
		description: "Product option selector.",
		render: () => <PreviewStack><ProductOptionSelector label="옵션" title="색상 선택" items={[{ id: "black", title: "블랙", sub: "바로 배송", pill: "추천" }]} selectedId="black" /></PreviewStack>,
	},
	{
		componentId: "product-promo-banner",
		description: "Product promotion banner.",
		render: () => <PreviewStack><ProductPromoBanner badge="쿠폰" text="추가지원금 찬스" action="받기" /></PreviewStack>,
	},
	{
		componentId: "product-benefit-list",
		description: "Product benefit info list.",
		render: () => <PreviewStack><ProductBenefitList label="혜택" title="구매 혜택" items={[{ id: "support", title: "추가지원금", sub: "온라인 전용", pill: "적용" }]} /></PreviewStack>,
	},
	{
		componentId: "product-purchase-bar",
		description: "Product purchase bar.",
		render: () => <PreviewStack><ProductPurchaseBar title="월 23,800원" aiText="AI 추천 요금" ctaText="구매하기" /></PreviewStack>,
	},
	{
		componentId: "search-result-tabs",
		description: "Search result tabs.",
		render: () => <SearchResultTabs activeId="all" tabs={[{ id: "all", label: "전체" }, { id: "phone", label: "휴대폰" }]} />,
	},
	{
		componentId: "search-result-list",
		description: "Search result list.",
		render: () => <PreviewStack><SearchResultList label="검색 결과" title="아이폰" countText="12개" items={[{ id: "iphone", title: "iPhone 20 Air", sub: "가볍게 만나는 iPhone", pill: "보기" }]} /></PreviewStack>,
	},
	{
		componentId: "search-promo-block",
		description: "Search promo block.",
		render: () => <PreviewStack><SearchPromoBlock badge="추천" text="지금 인기 있는 상품이에요" action="살펴보기" /></PreviewStack>,
	},
	{
		componentId: "search-suggestion-chips",
		description: "Search suggestion chips.",
		render: () => <PreviewStack><SearchSuggestionChips label="추천 검색어" items={["아이폰", "갤럭시", "요금제"]} /></PreviewStack>,
	},
	{
		componentId: "auth-method-selector",
		description: "NC simple auth method selector.",
		render: () => <PreviewStack><AuthMethodSelector methodLabel="인증 방식" methods={sampleSelectableItems} codeLabel="인증번호" selectedMethod="basic" /></PreviewStack>,
	},
	{
		componentId: "login-form",
		description: "NC simple login form.",
		render: () => <PreviewStack><LoginForm fields={[{ id: "id", label: "아이디", type: "text" }, { id: "password", label: "비밀번호", type: "password" }]} values={{ id: "", password: "" }} onChange={() => undefined} /></PreviewStack>,
	},
	{
		componentId: "leave-impact-checklist",
		description: "Leave impact checklist.",
		render: () => <PreviewStack><LeaveImpactChecklist items={[{ id: "benefit", title: "혜택 삭제", sub: "보유 혜택이 사라져요", required: true, hasDetail: true }]} /></PreviewStack>,
	},
	{
		componentId: "final-consent-row",
		description: "Final consent row.",
		render: () => <PreviewStack><FinalConsentRow label="안내사항을 확인했습니다." defaultChecked /></PreviewStack>,
	},
	{
		componentId: "reused-info-list",
		description: "Reused information list.",
		render: () => <PreviewStack><ReusedInfoList label="재사용 정보" items={[{ id: "phone", title: "휴대폰 번호", trailingLabel: "010-1234-5678", action: "변경" }]} /></PreviewStack>,
	},
] as const satisfies readonly ComponentPreviewExample[];

export function getComponentPreviewExample(componentId: string) {
	return componentPreviewExamples.find(
		(example) => example.componentId === componentId,
	);
}
