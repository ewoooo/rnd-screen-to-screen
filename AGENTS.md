# rnd-screen-to-screen

## 프로젝트 목표 — 디자인 시스템 strain test

**한정된 컴포넌트 어휘와 토큰만으로 다양한 화면 스펙(홈·검색·제품·결제 등)을 일관되게 표현할 수 있는지 검증한다.** 화면을 "예쁘게 만드는 것"이 1차 목표가 아니라, 화면이 늘어나도 시스템이 무너지지 않는지를 측정하는 것이 목표다.

회의에서 검증해야 하는 두 질문:
1. **간격 토큰 정규화 / 일관성** — spacing이 화면마다 임의로 늘었다 줄었다 하지 않는가?
2. **컴포넌트 규칙·패턴 일관성** — 다양한 페이지 스펙에서도 같은 컴포넌트 어휘로 표현되는가?

**규칙**: 반드시 제공된 토큰과 컴포넌트만 사용한다. 어휘에 없는 inline·자체 토큰·자체 fontSize가 강요되면 시스템 깨짐 신호.

## 문서 구조

```
.
├── app/        DEPRECATED (2026-04-27). 새 코드 추가 금지 (참고용 보존)
├── app2/       Active. 새 화면·컴포넌트는 여기서 작성
├── data/       도메인 데이터 (screen-features 등 SSOT)
├── registry/   WDS SSOT — 컴포넌트 / 아이콘 / 토큰 / 매핑
├── AGENTS.md   ← 이 파일 (운영 규약 + 시스템 메타)
├── DESIGN.md   디자인 스펙 (수치, 토큰, 어휘 variant SSOT)
└── CLAUDE.md   AGENTS.md symlink (Claude 도구 호환)
```

`AGENTS.md`(이 문서)와 `DESIGN.md` 둘만이 SSOT다. 세부 README/LAYOUT 같은 추가 .md는 두지 않는다 — 시스템 분산을 막는다.

## 시스템 어휘 (app2 현재 단계)

### 화면 셸
- `MobileScreen` (`system/`) — 디바이스 frame (375 × 80vh, rounded)
- `Shell` (`home-kit/`) — `GlobalNavigationHeader` + `ContentOutlet` + `GlobalNavigationBar`. **홈 도메인 chrome — 다른 도메인은 별도 Shell이 필요할 가능성**
- `ContentOutlet` (`system/`) — 스크롤 영역, padding/gap 호출자가 결정

### 본문 흐름
- `CardList` (`home-kit/wrapper/`) — 자식으로 `Card | Banner` 만 허용 (TypeScript ReactElement type 강제). raw HTML이나 다른 컴포넌트는 컴파일 거절
- 카드 외 footer 부품(`MyEditButton`)은 `CardList` 밖에 둠

### 카드 — 정확히 3 등급
- `Card level={1}` — DualMenu 패턴
- `Card level={2}` — StatCard / BarcodeCard / List 패턴
- `Card level={3}` — Hero 패턴

discriminated union으로 잘못된 사용을 컴파일 타임에 거절. 수치는 [`DESIGN.md`](./DESIGN.md) 참조.

### 배너 — 정확히 2 variant
- `Banner variant="top"` — 상단 얇은 홍보 (h=48)
- `Banner variant="offering"` — 카드형 반투명 배너 (h=94)

### 텍스트 — 정확히 6 variant
`Typography variant`: `section-label` · `heading-20` · `ai-text` · `list-title` · `list-sub` · `mono-caption`

### 비-카드 부품
- `StatBadge` / `PillChip` (장식 wrap, home-kit/text.tsx)
- `ListRow` (썸네일 + 타이틀/서브 + pill)
- `MyEditButton` (footer ghost 버튼)
- `Placeholder` (dashed 박스, 미정 이미지·아이콘 자리)
- `Icon` (`system/`) — `color` prop으로 mask 모드 단색화. 멀티컬러 보존은 `color` 미지정

### 토큰
- **WDS 토큰** — `var(--semantic-*)` / `var(--atomic-*)` / `var(--spacing-*)` / `var(--opacity-*)` 직접 소비. SSOT는 [`registry/wds-token-registry.json`](./registry/wds-token-registry.json)
- **자체 토큰** — `home-kit/tokens.ts`의 8개. T 앱 브랜드 톤만. 명세는 `DESIGN.md`

## 측정 신호 (strain test)

새 화면을 시스템에 넣었을 때:

| 신호 | 해석 |
|---|---|
| 신규 컴포넌트 0 추가, 기존 어휘로 표현됨 | **시스템 generality 100% — 통과** |
| 신규 컴포넌트 추가되더라도 기존 어휘에 새 variant로 흡수 (예: `Banner variant="search"`, `Card level={N}` 그대로) | **확장 가능성 통과** |
| 기존 컴포넌트 API에 새 슬롯 강제 추가 필요 (예: `Card L2`에 `aside` 외 새 슬롯) | **부분 깨짐 — 시스템 재설계 신호** |
| 화면이 inline raw `<section>` / 자체 token / 자체 fontSize 강요 | **명백히 깨짐 — 어휘 부족** |

홈 5화면(현재 단계) 깨진 곳:
- `home-guest`의 Big Hero (Card 어떤 레벨에도 안 맞음 — `<section>` + raw `<button>`)
- `MyEditButton` (Card도 Banner도 아닌 footer 부품 — CardList 밖에 둠)

## 운영 규약 (app2)

### 폴더 구조
- 5 화면 평탄: `app2/src/app/<screen>/page.tsx` + `_mock.ts`. 버전 폴더(`v?-?`) 시스템 폐기
- 인덱스 (`/`)는 hard-coded 5 라우트 (registry generator 의존 끊음)
- 새 도메인 추가 시 `app2/src/app/<screen>/` 평탄 구조 유지

### 타입 강제
- `Card` / `Banner` — discriminated union. 잘못된 prop 조합 거절
- `CardList` — `ReactElement<ComponentProps<typeof Card>, typeof Card>` 등으로 자식 element type 거절

### WDS 사용 정책
- 컴포넌트 직접 import: 부팅 인프라(`ThemeProvider`, `AppRouterCacheProvider`) 외 0건. 와이어프레임 도메인이라 raw + 토큰 조합이 명세 충실성에 더 부합
- 토큰: `var(--semantic-*)` 등 광범위 사용. SSOT는 `registry/wds-token-registry.json`
- `@wanteddev/*` 패키지 import 위치: `app2/` 내부만. `data/`·`registry/`는 런타임 의존성 없는 JSON만

### Mock / 데이터 배치
- 프로젝트 수준 spec(JSON SSOT): `data/screens/<id>.json`
- 페이지 로컬 mock/seed (TS): 각 화면 폴더의 `_mock.ts`
- mock은 화면 재현용 임시 입력. API 연결 시 교체

## 컴포넌트 계층화 방향

이 섹션은 `app2`의 컴포넌트 아키텍처 의도를 설명한다. 다른 세션은 새 화면을 만들거나 컴포넌트를 옮길 때 이 규칙을 먼저 따른다.

핵심 의도:
- `home-kit`을 계속 비대하게 키우지 않는다.
- WDS primitive를 화면에 직접 흩뿌리지 않는다.
- WDS primitive와 도메인 kit 사이에 도메인 독립적인 `patterns/` layer를 둔다.
- 새 도메인에서 반복되는 구조는 `patterns/`로 승격한다.
- 도메인 kit은 “도메인 언어를 붙이는 얇은 wrapper”로 유지한다.

우리가 만들려는 것은 “variant만 계속 늘어나는 kit”이 아니다. 목표는 **조합 가능한 의미 축을 가진 시스템**이다.

나쁜 확장 예:

```txt
Card level=4
Card level=5
Banner variant=product
Banner variant=coupon
ListRow with selected
ListRow with price
```

좋은 확장 예:

```txt
Surface tone="default|muted" density="compact|comfortable"
InfoList trailing="badge|action|value"
SelectableList selectionMode="single|multi"
PromoBlock tone="default|accent"
StickyActionBar primaryAction + secondaryAction
```

```
WDS primitive
  ↓
patterns
  ↓
domain kit
  ↓
screen
```

### 레이어별 책임

#### `system/`

앱과 디바이스 프레임의 가장 낮은 인프라다. 도메인 의미를 갖지 않는다.

예:
- `MobileScreen`
- `ContentOutlet`
- `StatusBar`
- `Icon`
- `Placeholder`

판단 기준:
- 홈/상품/검색/결제 어디에서 써도 이름이 어색하지 않으면 `system/` 후보
- 화면 조립 패턴이 아니라 프레임·렌더링·아이콘 같은 기반이면 `system/`

#### `patterns/`

도메인 독립적인 조합 패턴이다. WDS primitive를 감싸서 반복 가능한 화면 구조를 만든다.

현재 패턴:
- `Surface` — 카드보다 일반적인 컨테이너. `tone`, `density`, `gap` 같은 축을 가진다.
- `MediaBlock` — 이미지 / placeholder / skeleton이 들어갈 media 슬롯.
- `InfoList` — leading media + title/sub + trailing badge/action/value 구조.
- `PromoBlock` — 배너 / 쿠폰 / 프로모션 구조.
- `StickyActionBar` — 구매하기 / 신청하기 / 저장하기 / 다음 단계 같은 하단 CTA 구조.
- `ScreenChrome` — status/nav/content/bottom 영역의 레이아웃 계약.

향후 후보:
- `SelectableList` — 옵션·필터·배송 방식 선택. `InfoList`에 선택 의미가 반복되면 분리한다.

판단 기준:
- 두 개 이상의 도메인 kit에서 같은 구조가 반복되면 `patterns/` 후보
- 도메인 단어 없이 이름 붙일 수 있으면 `patterns/` 후보
- WDS primitive 여러 개를 매번 같은 방식으로 조합한다면 `patterns/` 후보

#### `*-kit/` 도메인 kit

도메인 언어를 표현하는 얇은 wrapper다. 내부에서 `patterns/`를 사용한다.

예:
- `home-kit/HomePointCard`
- `product-kit/ProductSummaryCard`
- `product-kit/ProductOptionSelector`
- `product-kit/ProductPurchaseBar`

판단 기준:
- 이름에 홈·상품·검색·결제 같은 도메인 명사가 자연스럽게 들어가면 `*-kit/`
- 데이터 prop이 도메인 모델을 닮았다면 `*-kit/`
- 내부 구현은 `patterns/`와 WDS를 조합하되, 화면에서는 도메인 이름으로 읽혀야 한다.

#### `screen`

라우트 단위 화면이다. 화면은 조립만 한다. WDS primitive 조합 세부를 화면에 쓰지 않는다.

예:

```tsx
<ProductShell>
  <ProductSummaryCard />
  <ProductOptionSelector />
  <ProductPromoBanner />
  <ProductBenefitList />
  <ProductPurchaseBar />
</ProductShell>
```

화면에서 허용되는 일:
- mock/fixture를 읽는다.
- 도메인 kit 컴포넌트를 배치한다.
- route-local 상태가 필요하면 최소한으로 둔다.

화면에서 피해야 하는 일:
- WDS `Card`, `ListCell`, `Button`, `Chip`을 직접 많이 조합한다.
- 도메인 kit에 있어야 할 slot 구조를 inline JSX로 만든다.
- spacing, color, font size를 새로 만든다.

### 디렉토리 구조

```txt
app2/src/components/
├── system/        앱/디바이스 인프라. MobileScreen, ContentOutlet, StatusBar, Icon, Placeholder
├── patterns/      도메인 독립 패턴. Surface, MediaBlock, InfoList, SelectableList, PromoBlock, StickyActionBar, ScreenChrome
├── home-kit/      홈 도메인 언어. 내부에서 patterns 사용
├── product-kit/   상품 도메인 언어. 내부에서 patterns 사용
├── global/
└── typography/
```

### 의존 방향

```txt
system
  ↑
patterns
  ↑
domain-kit(home-kit/product-kit/search-kit)
  ↑
screen
```

허용 import:
- screen → domain-kit, system
- domain-kit → patterns, system, WDS
- patterns → system, WDS
- system → WDS 가능하지만 최소화

금지 import:
- patterns → home-kit / product-kit / search-kit
- home-kit ↔ product-kit 교차 import
- screen에서 WDS primitive를 직접 대량 사용

### 승격 규칙

새 화면을 만들 때 판단 순서:

1. 기존 도메인 kit으로 표현 가능한지 본다.
2. 도메인 kit이 부족하면, 먼저 `patterns/` 조합으로 표현 가능한지 본다.
3. 같은 WDS 조합이 반복되면 `patterns/`로 승격한다.
4. 도메인 이름과 데이터 구조가 필요한 부분만 `*-kit/`에 둔다.
5. 기존 컴포넌트에 새 variant나 slot을 추가하기 전에, 더 일반적인 pattern 축이 있는지 검토한다.

### product-detail에서 얻은 결론

제품 상세 화면은 첫 product-kit strain test다.

`home-kit`만으로는 다음 영역에서 어휘 부족이 드러났다.
- 상품 요약: 큰 media, 가격, 할인, 리뷰 메타가 필요하다.
- 옵션 선택: 선택 상태와 변경 가능한 row 의미가 필요하다.
- sticky 구매 CTA: 하단 고정 action bar가 필요하다.
- 상품 chrome: 홈 shell과 다른 top/bottom navigation 계약이 필요하다.

따라서 product-kit은 WDS를 직접 화면에 흩뿌리지 않고, `patterns/` 기반의 얇은 도메인 wrapper로 둔다.

현재 `/product-detail`의 의도된 흐름:

```txt
product-detail/page.tsx
  → product-kit
    → ProductShell
      → patterns/ScreenChrome
      → WDS TopNavigation, BottomNavigation
    → ProductSummaryCard
      → patterns/Surface, MediaBlock
    → ProductOptionSelector
      → patterns/Surface, InfoList
    → ProductPromoBanner
      → patterns/PromoBlock
    → ProductBenefitList
      → patterns/Surface, InfoList
    → ProductPurchaseBar
      → patterns/StickyActionBar
```

이 구조의 목적은 “상품 페이지 전용 컴포넌트 폭증”을 막는 것이다. 새 도메인이 들어오면 먼저 `patterns/`로 버틸 수 있는지 확인하고, 도메인 kit은 의미 있는 이름과 데이터 mapping만 담당한다.

## Figma → 코드 워크플로우

1. **노드 좌표 추출**: `mcp__plugin_figma_figma__get_metadata` 호출 → 각 frame의 `x/y/width/height`
2. **실 gap/size 계산**: `child[n+1].y - (child[n].y + child[n].height)`. Figma 에디터 숫자 의존 금지
3. **시스템 어휘 매핑**: `DESIGN.md`의 Card level / Banner variant / Typography variant에서 찾는다
4. **어휘에 없으면 strain 신호**: 새 variant 추가 vs 새 컴포넌트 vs raw inline — 결정 + 회의에 보고
5. **360px viewport 시각 검증**: Chrome/Safari 모바일 모드 또는 MobileScreen 안

## Registry / Mock 메타

### `registry/` (WDS SSOT)
- `index.json` — 매니페스트, 진입점
- `wds-component-registry.json` — 84종
- `wds-icon-registry.json` — 344개 (`entries[]`에서 `kebab` 또는 `name` 검색)
- `wds-token-registry.json` — 색·간격·typography 수치 SSOT
- `wds-component-mapping-registry.json` / `wds-component-compound-layout-registry.json`

### 토큰 / 사이즈 조회 워크플로우
1. WDS variant 사이즈 → `registry/wds-token-registry.json`의 `tiers.typography` grep
2. 색상 → 같은 레지스트리의 `atomic` / `semantic`
3. 컴포넌트별 prop enum → `node_modules/@wanteddev/wds/dist/components/<name>/types.d.ts`
4. **이 문서나 다른 메모에 수치 표 베이크 금지** — stale 위험 (실 사례: title2를 20px로 잘못 외우고 작성 → 런타임 28px)

### `data/`
- `data/screens/<id>.json` — 화면 요구사항/기능 spec SSOT (제작자가 읽는 출처, 런타임 입력 아님)

## WDS prop 규약 (참고)

WDS 컴포넌트를 직접 사용할 일이 생기면 (예: 후속 production 마이그레이션):

- **`FlexBox`/`Card`/`CardContent`**: CSS 표준 prop명만 — `flexDirection`/`alignItems`/`justifyContent`. `direction`/`align`/`justify` ✗
- **`Typography.variant`**: weight 분리 — `variant="title3" weight="bold"` ✓ / `"title3-bold"` ✗. 변형 enum: display1-3, title1-3, heading1-2, headline1-2, body1-2, label1-2, caption1-2
- **`color` prop**:
  - `TopNavigationButton.color`: 자체 enum (`"assistive"` 등) — 사용 가능
  - `IconButton.color` / `Typography.color`: `ThemeColorsToken` (deep dotted, 예: `"semantic.label.normal"`) — 단순 문자열 금지. 색 커스텀 필요하면 `sx`로 CSS var 직접 주입
- **`Thumbnail.ratio`**: 콜론 표기 `"1:1"` (슬래시 ✗). `src` 필수 — 이미지 없을 땐 `Placeholder`가 단순
- **아이콘명**: import 전 `wds-icon-registry.json`에서 검증. `IconAdd` 없음 → `IconPlus`
- **`TopNavigation.variant`**: `"floating"`이 gradient + backdrop-blur 내장. 단순 헤더는 `"normal"`

## Next.js 주의

이 프로젝트는 Next.js 16 (Turbopack) 기준. 학습 데이터와 차이 가능. 의심되면 `node_modules/next/dist/docs/`의 가이드 직접 확인.

## 다음 단계 (현재 미진행)

- 검색·제품 도메인 진입 시 strain test의 진짜 라운드. 도메인-무관 부품(`card/` · `banner/` · `wrapper/` · `system/` · `typography/`)을 `home-kit`에서 끌어 쓰는 어색함이 발생하는 시점에 더 위 계층으로 **승격**
- Figma `Card/L?/Senior` 변형 적용 (현재 home-senior 일반 카드와 동일 톤)
