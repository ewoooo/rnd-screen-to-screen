export type BenchmarkSide = "design" | "planning";
export type BenchmarkScore = 1 | 2 | 3 | 4 | 5;

export type BenchmarkCriterion = {
	id: string;
	side: BenchmarkSide;
	label: string;
	question: string;
	apiRefs: readonly string[];
	evidence?: readonly string[];
	scoringHint: string;
	scoreRubric?: Partial<Record<BenchmarkScore, string>>;
	failureSignals?: readonly string[];
	scoreCaps?: readonly {
		when: string;
		max: BenchmarkScore;
		reason: string;
	}[];
};

export const benchmarkGlobalGuards = [
	{
		id: "guard.rawEscapeHatch",
		when: "screen code contains page-local raw UI, inline layout values, raw fontSize, or self-made tokens not listed in design_system_contract.allowed_escape_hatches",
		max: 2,
		reason: "escape hatch가 spec에 기록되지 않으면 strain test의 핵심 관측값이 사라진다.",
	},
	{
		id: "guard.specImplementationMismatch",
		when: "spec areas/system_mapping claim a pattern that the route does not actually use",
		max: 2,
		reason: "벤치마크는 구현 가능한 시스템 어휘를 측정하므로 spec과 구현의 계약이 같아야 한다.",
	},
	{
		id: "guard.screenOwnsChrome",
		when: "route implements top/bottom chrome with page-local absolute/fixed/raw button instead of templates or global organisms",
		max: 2,
		reason: "chrome 계약이 화면별로 흩어지면 flow-only AppScreen과 sticky 충돌 평가가 무의미해진다.",
	},
	{
		id: "guard.unexplainedNewVocabulary",
		when: "new component, variant, slot, spacing, color, or typography appears without design_system_contract.new_vocabulary_required or token alias evidence",
		max: 3,
		reason: "새 어휘가 필요하다는 사실 자체는 통과 가능하지만, 근거 없이 생기면 시스템 붕괴 신호다.",
	},
] as const;

export const benchmarkCriteria = [
	{
		id: "design.visualHierarchy",
		side: "design",
		label: "시각적 위계",
		question: "핵심 정보, 보조 정보, 액션의 읽는 순서가 명확한가?",
		apiRefs: ["TextBlock", "WDS Typography", "SectionCard", "SummaryCard", "HomeBlock"],
		evidence: [
			"primary copy uses TextBlock displayTitle/hero/headline and appears before supporting copy",
			"section label/title/body/action use distinct TextBlock variants",
			"policy-critical information is visually stronger than optional/supporting information",
		],
		scoringHint: "1=위계 붕괴, 3=대체로 읽힘, 5=정책/업무 중요도가 즉시 드러남",
		scoreRubric: {
			1: "주요 카피, 리스트, 안내, CTA가 같은 강도로 보여 읽는 순서가 없다.",
			2: "headline은 있으나 카드/리스트/CTA가 서로 경쟁하거나 정책상 필수 정보가 묻힌다.",
			3: "대표 흐름은 읽히지만 필수/선택/주의/행동의 강조 차이가 약하다.",
			4: "주요 정보, 필수 입력, 보조 안내, CTA가 명확히 구분된다.",
			5: "첫 시선에서 목적과 다음 행동이 이해되고, 정책 중요도까지 시각적으로 드러난다.",
		},
		failureSignals: [
			"headline, description, group label, action이 모두 비슷한 강조로 보임",
			"정책상 필수/선택/위험 정보가 시각적으로 같은 층위에 놓임",
		],
		scoreCaps: [
			{
				when: "primary CTA state/message is visually detached from the required input state",
				max: 3,
				reason: "행동 우선순위는 보이더라도 사용자가 왜 지금 진행 가능한지 판단하기 어렵다.",
			},
		],
	},
	{
		id: "design.textBreaking",
		side: "design",
		label: "텍스트 브레이킹 품질",
		question: "핵심 카피가 의미 단위로 줄바꿈되고, 동적 텍스트는 maxLines/truncate 정책으로 안정화되었는가?",
		apiRefs: ["TextBlock", "TextBlockVariant", "lines", "text", "maxLines", "overflow=truncate"],
		evidence: [
			"hero/static copy uses TextBlock.lines for intentional Korean phrase breaks",
			"dynamic list titles and captions declare maxLines or truncate policy",
			"CTA/price/status labels use maxLines=1 when layout-critical",
		],
		scoringHint: "1=브라우저 자동 줄바꿈 의존, 3=주요 카피 일부 제어, 5=카피/동적 데이터별 줄바꿈 정책이 명확함",
		scoreRubric: {
			1: "브라우저 자동 줄바꿈과 raw 문자열에 의존한다.",
			2: "hero만 수동 줄바꿈이고 리스트/상태/CTA 텍스트는 정책이 없다.",
			3: "주요 카피와 일부 동적 텍스트에만 maxLines/truncate가 있다.",
			4: "정적/동적 텍스트 대부분이 TextBlock 정책으로 설명된다.",
			5: "카피 역할별 줄바꿈, maxLines, truncate 기준이 spec과 구현에 모두 남아 있다.",
		},
		failureSignals: [
			"정적 hero copy만 수동 줄바꿈이고 설명/리스트/footnote는 브라우저 자동 줄바꿈에 맡김",
			"긴 권한명, 긴 혜택명, 긴 가격 등 동적 데이터 maxLines 정책이 없음",
		],
		scoreCaps: [
			{
				when: "primary copy uses raw newline strings outside TextBlock lines/text policy",
				max: 3,
				reason: "줄바꿈은 보이지만 텍스트 primitive 계약으로 재현되지 않는다.",
			},
		],
	},
	{
		id: "design.informationGrouping",
		side: "design",
		label: "정보 그룹핑",
		question: "서로 관련된 정보가 같은 카드/섹션/리스트 안에 안정적으로 묶였는가?",
		apiRefs: ["SectionCard", "InfoList", "SummaryCard", "HomeBlockList"],
		evidence: [
			"each area in spec maps to a visible section/card/list boundary",
			"labels and bodies share the same ContentSection inset contract",
			"policy groups such as required/optional/error/notice are not mixed in one undifferentiated list",
		],
		scoringHint: "1=그룹 경계 불명확, 3=기본 그룹 존재, 5=스캔과 비교가 쉬움",
		scoreRubric: {
			1: "정보가 나열되어 있고 관계가 보이지 않는다.",
			2: "카드는 있으나 필수/선택/안내/액션 경계가 흐리다.",
			3: "기본 그룹은 보이나 그룹 내부의 우선순위나 상태가 약하다.",
			4: "관련 정보가 안정적으로 묶이고 스캔이 쉽다.",
			5: "정책 구조가 시각 그룹으로 정확히 번역되어 비교와 판단이 빠르다.",
		},
	},
	{
		id: "design.ctaPriority",
		side: "design",
		label: "CTA 우선순위",
		question: "주요 액션과 보조 액션의 비중, 위치, label이 명확한가?",
		apiRefs: ["PrimaryCTABar", "StickyActionBar", "Button", "HomeBlock.Action"],
		evidence: [
			"primary action lives in AppScreen.bottom or a documented CTA organism",
			"primary button uses WDS Button solid/primary and fullWidth when it is the only next step",
			"CTA enabled/disabled/loading state is derived from required inputs or policy state",
			"CTA helper text explains why the action is available or blocked",
		],
		scoringHint: "1=무엇을 눌러야 할지 모름, 3=주요 CTA 식별 가능, 5=행동 흐름이 즉시 이해됨",
		scoreRubric: {
			1: "주요 행동을 찾기 어렵거나 여러 액션이 같은 비중이다.",
			2: "CTA는 보이지만 필수 입력 상태와 연결되지 않는다.",
			3: "CTA 위치/라벨은 명확하나 disabled/loading/error 이유가 약하다.",
			4: "CTA 상태가 입력 상태와 연결되고 보조 문구가 맥락을 준다.",
			5: "사용자가 지금 할 수 있는 행동과 다음 단계가 2초 안에 이해된다.",
		},
		failureSignals: [
			"CTA label/helper text is static while required input state changes",
			"primary CTA remains enabled when required policy input is incomplete",
			"sticky CTA covers content or is implemented outside AppScreen.bottom",
		],
		scoreCaps: [
			{
				when: "primary CTA is not wired to required input completion",
				max: 2,
				reason: "정책 화면에서 CTA 가능 여부는 화면 품질의 핵심 상태다.",
			},
			{
				when: "primary CTA helper text is hard-coded success copy",
				max: 3,
				reason: "상태가 바뀌어도 성공 문구가 유지되면 사용자가 잘못된 확신을 갖는다.",
			},
		],
	},
	{
		id: "design.layoutStability",
		side: "design",
		label: "레이아웃 안정성",
		question: "텍스트 길이, 리스트 수, 상태 변화에도 레이아웃이 무너지지 않는가?",
		apiRefs: ["Box", "HStack", "VStack", "InfoList", "SelectableList"],
		evidence: [
			"list row titles/captions have maxLines policy",
			"row minHeight or grid columns keep controls aligned across mixed text lengths",
			"state messages can appear without shifting sticky chrome into content",
			"representative long-data fixture exists or is documented in x_benchmark notes",
		],
		scoringHint: "1=겹침/잘림 잦음, 3=대표 케이스 안정, 5=긴 데이터와 상태 변화까지 견딤",
		scoreRubric: {
			1: "대표 데이터에서도 겹침/잘림이 있다.",
			2: "happy path는 보이나 긴 텍스트/추가 상태 메시지에서 흔들릴 가능성이 크다.",
			3: "대표 케이스와 일부 긴 텍스트는 안정적이다.",
			4: "긴 텍스트, 많은 항목, 상태 메시지까지 레이아웃이 유지된다.",
			5: "여러 fixture/viewport에서 안정성이 확인되고 spec에 정책이 남아 있다.",
		},
	},
	{
		id: "design.horizontalInsetFit",
		side: "design",
		label: "가로 여백/프레임 적합성",
		question: "본문 카드, 리스트, 안내문이 ContentOutlet의 12px 좌우 안전 여백을 한 번만 적용받는가?",
		apiRefs: ["AppScreenContent", "ContentOutlet", "ContentSection", "SectionCard", "InfoList", "PrimaryCTABar"],
		scoringHint: "1=콘텐츠가 프레임에 붙거나 24px 이상 중첩 inset 발생, 3=주요 영역은 12px 유지하나 일부 섹션 누락, 5=12px 기본 inset과 full-bleed 예외가 컴포넌트 계약으로 설명됨",
		failureSignals: [
			"SectionCard, InfoList, notice 같은 본문 콘텐츠가 ContentSection 없이 프레임 좌우에 붙음",
			"ContentOutlet 기본 여백이 12px이 아닌 24px 등 화면별 임의 값으로 잡힘",
			"label은 inset이 있는데 연결된 카드/list는 full-bleed라 그룹 경계가 어긋남",
			"섹션 wrapper와 내부 row가 둘 다 가로 padding을 가져 콘텐츠가 과하게 안쪽으로 밀림",
			"full-bleed가 디자인 의도인지 escape hatch인지 spec에 기록되지 않음",
		],
		scoreCaps: [
			{
				when: "main content touches mobile frame edges without an explicit full-bleed component contract",
				max: 2,
				reason: "모바일 화면 기본 inset이 깨지면 spacing normalization 평가를 통과할 수 없다.",
			},
			{
				when: "section label and its body use different horizontal inset contracts",
				max: 3,
				reason: "관련 정보의 그룹 경계가 시각적으로 어긋난다.",
			},
			{
				when: "a reusable list row adds horizontal inset inside an already inset section/card contract",
				max: 3,
				reason: "가로 여백은 한 계층에서만 소유해야 하며 중첩 inset은 정보 밀도를 망가뜨린다.",
			},
			{
				when: "default screen content uses a 24px horizontal inset instead of the normalized 12px outlet inset",
				max: 3,
				reason: "screen 기본 margin 기준이 흔들리면 화면 간 spacing normalization을 비교할 수 없다.",
			},
		],
	},
	{
		id: "design.chromeInsetFit",
		side: "design",
		label: "Chrome/Inset 적합성",
		question: "top/bottom chrome이 AppScreen flow 안에서 본문과 충돌 없이 배치되는가?",
		apiRefs: ["AppScreen", "AppScreenContent", "ContentOutlet", "TOP_CHROME", "BOTTOM_CHROME"],
		scoringHint: "1=chrome이 본문과 충돌, 3=기본 flow 적용, 5=화면별 chrome 조합 계약이 명확함",
		failureSignals: [
			"route 안에서 close/header/bottom bar를 raw JSX와 inline style로 직접 구현",
			"검색 탭이나 구매 바가 top/bottom slot 조합이 아니라 page-local fixed/absolute로 구현됨",
		],
		scoreCaps: [
			{
				when: "screen owns chrome with page-local raw controls",
				max: 2,
				reason: "chrome은 template/global organism 계약으로 검증되어야 한다.",
			},
		],
	},
	{
		id: "design.stickyCollision",
		side: "design",
		label: "Sticky 영역 충돌",
		question: "sticky action, bottom navigation, bottom sheet가 본문을 가리거나 겹치지 않는가?",
		apiRefs: ["StickyActionBar", "GlobalNavigationBar", "BottomSheet", "AppScreen.bottom"],
		scoringHint: "1=본문 가림, 3=대표 화면에서만 안전, 5=스크롤 끝/상태 변화에서도 안전",
		failureSignals: [
			"하단 action이 AppScreen bottom 조합이 아니라 inline wrapper/fixed layer로 구현됨",
			"마지막 콘텐츠와 sticky CTA 사이의 스크롤 여유가 spec에 설명되지 않음",
		],
	},
	{
		id: "design.componentConsistency",
		side: "design",
		label: "컴포넌트 일관성",
		question: "동일 기능/정보 유형이 동일한 컴포넌트 어휘로 반복 표현되는가?",
		apiRefs: ["molecules", "organisms", "SectionCard", "InfoList", "ConsentList", "NoticeBlock"],
		evidence: [
			"spec area.uses includes the actual molecule/organism used by the route renderer",
			"same semantic pattern is not represented by different wrappers across domains",
			"domain organism remains a thin mapper and does not hide reusable row/list/block logic",
		],
		scoringHint: "1=화면마다 표현 다름, 3=주요 패턴은 통일하나 escape hatch 존재, 5=새 화면도 기존 어휘로 흡수되고 spec/구현 명칭이 일치",
		scoreRubric: {
			1: "화면별로 같은 기능을 다른 JSX/컴포넌트로 만든다.",
			2: "domain organism 안에 재사용 가능한 list/notice/CTA 로직이 숨어 있다.",
			3: "주요 패턴은 통일되었지만 일부 의미가 맞지 않는 molecule을 빌려 쓴다.",
			4: "기능 유형별 molecule이 있고 spec/구현 명칭이 대체로 일치한다.",
			5: "새 도메인도 기존 어휘 또는 명확한 신규 어휘로 자연스럽게 흡수된다.",
		},
		failureSignals: [
			"spec에는 PermissionList 같은 패턴을 적었지만 구현은 다른 범용 organism을 사용",
			"동일한 리스트/CTA/notice가 화면마다 다른 wrapper 이름과 prop 계약을 가짐",
			"notice/policy 안내를 promotion/coupon molecule로 표현",
		],
		scoreCaps: [
			{
				when: "spec pattern names do not match the rendered component vocabulary",
				max: 2,
				reason: "어휘 일관성은 문서 이름이 아니라 구현 계약까지 같아야 한다.",
			},
			{
				when: "policy notice is represented with PromoBlock or another commerce-specific pattern",
				max: 3,
				reason: "컴포넌트 재사용은 가능하지만 정보 의미가 어긋난다.",
			},
		],
	},
	{
		id: "design.moleculeReuse",
		side: "design",
		label: "Molecule 재사용률",
		question: "화면에서 raw WDS 조합을 반복하지 않고 molecule/organism으로 흡수했는가?",
		apiRefs: ["SectionCard", "InfoList", "SelectableList", "ConsentList", "NoticeBlock", "QueryBar"],
		evidence: [
			"route imports no WDS primitives except through renderer/template exceptions",
			"repeated row/list/notice/CTA structures live in molecules",
			"domain organisms mostly map policy data to molecule props",
		],
		scoringHint: "1=inline 조합 과다, 3=주요 영역 molecule 사용하나 route-local 조합 존재, 5=화면은 mock/state와 template/organism 조립만 담당",
		scoreRubric: {
			1: "route/page가 WDS primitive와 inline layout을 직접 조합한다.",
			2: "domain organism 안에 반복 가능한 WDS 조합이 많이 남아 있다.",
			3: "주요 영역은 molecule이지만 일부 row/notice/CTA 로직이 숨겨져 있다.",
			4: "반복 구조가 molecule로 올라가 있고 route는 spec/renderer 조립 중심이다.",
			5: "새 화면 대부분이 기존 molecule 조합만으로 생성된다.",
		},
		failureSignals: [
			"route에서 WDS Button/Card/ListCell을 감싸는 layout wrapper를 직접 구성",
			"반복될 수 있는 CTA, notice, list row 상태가 molecule이 아니라 page JSX에 남음",
		],
		scoreCaps: [
			{
				when: "route contains page-local UI components or inline WDS composition",
				max: 3,
				reason: "화면 조립 책임을 넘어선 구현이 남아 있다.",
			},
		],
	},
	{
		id: "design.wdsAdoption",
		side: "design",
		label: "WDS 반영도",
		question: "Wanted Montage 컴포넌트와 variant를 우선 사용했는가?",
		apiRefs: ["Button", "IconButton", "Typography", "Card", "Thumbnail", "RadioGroup", "FilterButton"],
		evidence: [
			"interactive controls use WDS Button/Checkbox/RadioGroup/Switch/TextField",
			"navigation uses WDS TopNavigation/BottomNavigation",
			"typography uses WDS Typography through TextBlock",
			"cards/media use WDS Card/Thumbnail where available",
		],
		scoringHint: "1=자체 UI 과다, 3=WDS leaf 사용, 5=WDS 컴포넌트 의미와 접근성 계약까지 보존됨",
		scoreRubric: {
			1: "WDS 대체 컴포넌트가 있는데 raw HTML로 구현한다.",
			2: "WDS leaf를 부분 사용하지만 상태/접근성 계약을 우회한다.",
			3: "주요 leaf는 WDS이나 compound 의미는 자체 구현이다.",
			4: "WDS leaf와 molecule 계약이 함께 사용된다.",
			5: "WDS 컴포넌트의 의미, 상태, 접근성 계약을 온전히 보존한다.",
		},
		failureSignals: [
			"WDS에 대응 컴포넌트가 있는데 raw button/input/icon을 사용",
			"WDS leaf는 쓰지만 의미 있는 compound나 state prop 대신 시각만 흉내냄",
		],
		scoreCaps: [
			{
				when: "interactive control is implemented as raw html while WDS equivalent exists",
				max: 2,
				reason: "WDS adoption은 시각뿐 아니라 interaction/accessibility 계약을 포함한다.",
			},
		],
	},
	{
		id: "design.tokenCompliance",
		side: "design",
		label: "Token 순응도",
		question: "색, 간격, radius, typography가 시스템 토큰/alias로 설명되는가?",
		apiRefs: ["TextBlockVariant", "SpacingToken", "semanticSurface", "@pxds/pxds-tokens", "wds-token-registry"],
		evidence: [
			"spacing uses SpacingToken or var(--spacing-*)",
			"colors use @pxds/pxds-tokens semantic/project tokens",
			"typography uses TextBlockVariant/WDS Typography variant+weight",
			"raw radius/shadow/gradient values are either removed or recorded as escape hatches",
		],
		scoringHint: "1=raw 값 난립, 3=대부분 토큰 사용하나 설계 예외 존재, 5=새 수치가 alias/근거를 갖고 design_system_contract에 기록됨",
		scoreRubric: {
			1: "색/간격/폰트/그림자 raw 값이 화면에 흩어져 있다.",
			2: "핵심 레이아웃 또는 CTA에 raw visual value가 있고 예외 기록이 없다.",
			3: "대부분 토큰을 쓰지만 일부 radius/shadow/gradient raw 값이 남아 있다.",
			4: "raw 값이 드물고 모두 alias/escape hatch로 추적된다.",
			5: "모든 시각 값이 WDS token, project alias, component prop으로 설명된다.",
		},
		failureSignals: [
			"fontSize, pixel padding, gradient, border radius, color가 inline raw 값으로 등장",
			"새 spacing/color가 DESIGN.md 또는 registry alias 없이 화면에서 직접 생성됨",
		],
		scoreCaps: [
			{
				when: "raw visual values are present and not declared in allowed_escape_hatches",
				max: 2,
				reason: "토큰 위반이 관측되지 않으면 strain test 결과가 왜곡된다.",
			},
		],
	},
	{
		id: "design.stateClarity",
		side: "design",
		label: "상태 표현 명확성",
		question: "selected, disabled, loading, empty, error 같은 상태가 구분되어 보이는가?",
		apiRefs: ["SelectableList", "ConsentList", "FilterTabs", "FormField", "Checkbox", "Switch"],
		evidence: [
			"selected/checked state is controlled or intentionally defaulted",
			"required-incomplete state is visible near the relevant field/list",
			"primary CTA disabled/enabled/loading state follows required input state",
			"error/retry state has visual treatment and human-readable message",
		],
		scoringHint: "1=상태 구분 불가, 3=기본 상태 표현, 5=상태와 이유가 함께 전달됨",
		scoreRubric: {
			1: "상태가 보이지 않거나 라벨 텍스트로만 암시된다.",
			2: "입력 상태는 보이나 CTA/안내 상태와 연결되지 않는다.",
			3: "기본 checked/selected/error 상태는 구분된다.",
			4: "필수 미완료, 완료, 오류, 재시도 상태가 사용자에게 설명된다.",
			5: "상태와 이유, 다음 행동이 같은 흐름 안에서 일관되게 전달된다.",
		},
		failureSignals: [
			"필수/선택/거부/나중에 요청 같은 정책 상태가 단순 라벨로만 표현됨",
			"disabled/loading/error 상태 fixture가 없어 대표 happy path만 렌더됨",
			"필수 입력 미완료 상태가 CTA에 반영되지 않음",
		],
		scoreCaps: [
			{
				when: "required input state does not drive the primary CTA state",
				max: 2,
				reason: "정책 화면의 상태 명확성은 입력과 행동의 연결로 판단한다.",
			},
		],
	},
	{
		id: "design.dataResilience",
		side: "design",
		label: "데이터 길이 대응성",
		question: "긴 이름, 긴 가격, 많은 항목, 없는 이미지에서도 깨지지 않는가?",
		apiRefs: ["InfoList", "SummaryCard", "MediaBlock", "Placeholder", "Typography noWrap"],
		scoringHint: "1=대표 데이터 외 깨짐, 3=긴 텍스트 일부 대응, 5=데이터 변형에도 안정",
	},
	{
		id: "design.mediaTreatment",
		side: "design",
		label: "미디어/썸네일 처리",
		question: "이미지, placeholder, badge가 화면 맥락에 맞고 WDS Thumbnail 계열로 표현되는가?",
		apiRefs: ["MediaBlock", "MediaBadge", "Placeholder", "Thumbnail", "CardThumbnail"],
		scoringHint: "1=미디어 자리 불명확, 3=placeholder 안정, 5=실제/미정 미디어 모두 자연스러움",
		failureSignals: [
			"icon prop을 받지만 렌더링하지 않거나 mediaLabel placeholder로만 대체",
			"실제 이미지/아이콘이 필요한 정책 항목을 흐린 미정 placeholder로 표현",
		],
	},
	{
		id: "design.accessibilityBaseline",
		side: "design",
		label: "접근성 기본 품질",
		question: "터치 타깃, label, semantic role, contrast가 기본 기준을 만족하는가?",
		apiRefs: ["Button", "IconButton", "ListCell", "FormField", "BottomSheet"],
		scoringHint: "1=기본 조작/인식 어려움, 3=주요 조작 가능, 5=키보드/스크린리더까지 고려",
		failureSignals: [
			"raw icon button의 hit area, focus ring, accessible name이 WDS 수준으로 보장되지 않음",
			"리스트 항목의 역할, 버튼/선택 가능 여부, 상태 라벨이 보조기술에 전달되지 않음",
		],
	},
	{
		id: "design.escapeHatchHonesty",
		side: "design",
		label: "Escape hatch 정직성",
		question: "시스템 어휘 밖 구현 의도가 design_system_contract.allowed_escape_hatches/new_vocabulary_required에 빠짐없이 기록되었는가?",
		apiRefs: ["design_system_contract", "allowed_escape_hatches", "new_vocabulary_required", "DESIGN.md", "AGENTS.md"],
		scoringHint: "1=raw 예외가 숨겨짐, 3=큰 예외만 기록, 5=예외/신규 어휘/흡수 후보가 모두 추적됨",
		failureSignals: [
			"route에 raw section/button/style/custom token이 있지만 allowed_escape_hatches에 설계 예외가 없음",
			"새 component/variant 필요성이 회의용 strain signal로 남지 않음",
		],
		scoreCaps: [
			{
				when: "raw escape hatch exists in implementation but is absent from the design contract",
				max: 1,
				reason: "숨은 예외는 시스템 generality 측정을 직접 왜곡한다.",
			},
		],
	},
	{
		id: "design.previewLegibility",
		side: "design",
		label: "Preview 판독성",
		question: "preview에서 화면 그룹, 생성일, 점수, iframe 상태를 명확히 확인할 수 있는가?",
		apiRefs: ["@screen/mobile/screens", "apps/preview", "ScreenRoute"],
		scoringHint: "1=검수 어려움, 3=화면 선택 가능, 5=품질/상태 비교가 쉬움",
	},
	{
		id: "planning.policyCoverage",
		side: "planning",
		label: "정책서 반영",
		question: "정책서의 요구사항이 화면 spec과 mock에 누락 없이 반영되었는가?",
		apiRefs: ["apps/mobile/src/app/<page-id>/spec.json", "screen_contract", "areas"],
		scoringHint: "1=핵심 요구 누락, 3=주요 정책 반영, 5=정책 근거까지 추적 가능",
		failureSignals: [
			"정책 요구는 있지만 area/mock/status/state fixture에 연결되지 않음",
			"source_ref의 요구사항 ID가 active spec의 areas와 추적되지 않음",
		],
	},
	{
		id: "planning.flowCompleteness",
		side: "planning",
		label: "플로우 완결성",
		question: "진입, 주요 액션, 종료/다음 단계까지 단절 없이 이어지는가?",
		apiRefs: ["ScreenRoute", "ProductShell", "SearchShell", "BottomSheet"],
		scoringHint: "1=화면 단편, 3=주요 흐름 존재, 5=전후 맥락이 명확함",
	},
	{
		id: "planning.edgeCases",
		side: "planning",
		label: "엣지 케이스 처리",
		question: "노데이터, 에러, 로딩, 권한 거부, 선택 불가 상태가 설계되었는가?",
		apiRefs: ["FormField", "SelectableList", "BottomSheet", "InfoList"],
		scoringHint: "1=happy path만 있음, 3=일부 예외 존재, 5=주요 예외가 모두 설계됨",
		failureSignals: [
			"권한 거부, OS 권한 재요청, 선택 권한 미동의, 네트워크 불가 등 상태 fixture가 없음",
			"확인/닫기 이후 플로우와 상태값 반영이 mock/spec에 남지 않음",
		],
	},
	{
		id: "planning.specImplementationParity",
		side: "planning",
		label: "Spec/구현 계약 일치",
		question: "active spec의 shell, slot, area pattern, system_mapping이 실제 route/component 구조와 일치하는가?",
		apiRefs: ["screen_contract", "areas", "system_mapping", "apps/mobile/src/app", "apps/mobile/src/components"],
		scoringHint: "1=spec이 구현을 과장/오표기, 3=큰 구조는 맞지만 일부 pattern 불일치, 5=spec만 보고 구현 구조를 재현 가능",
			failureSignals: [
				"spec에 적힌 molecule/organism이 실제 import/render tree에 없음",
				"top/bottom chrome pattern이 spec과 구현에서 다른 이름과 책임을 가짐",
			],
		scoreCaps: [
			{
				when: "system_mapping includes a component family not used by the route",
				max: 2,
				reason: "벤치마크 메타데이터가 실제 시스템 흡수율보다 높게 보인다.",
			},
		],
	},
	{
		id: "planning.reproductionStability",
		side: "planning",
		label: "현상 재현율",
		question: "배치마다 콘텐츠 아웃풋과 화면 구조가 일관되게 재현되는가?",
		apiRefs: ["@screen/mobile/screens", "spec/active", "mocks", "preview iframe"],
		scoringHint: "1=매번 구조가 달라짐, 3=대표 화면 재현, 5=registry/spec/mock 기준으로 재현 안정",
	},
] as const satisfies readonly BenchmarkCriterion[];

export type BenchmarkCriterionId = (typeof benchmarkCriteria)[number]["id"];

export const designBenchmarkCriteria = benchmarkCriteria.filter(
	(criterion) => criterion.side === "design",
);

export const planningBenchmarkCriteria = benchmarkCriteria.filter(
	(criterion) => criterion.side === "planning",
);
