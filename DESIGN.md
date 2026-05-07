# DESIGN — 모바일 360 + 시스템 어휘 SSOT

이 문서는 **수치·토큰·variant 명세 SSOT**다. 운영 규약·시스템 메타는 [`AGENTS.md`](./AGENTS.md).

## 모바일 제약

- **뷰포트 폭**: 360px (Figma `04_ADP_P3-T1_Library` mobile artboard 기준)
- **타깃 플랫폼**: iOS / Android 모바일 웹뷰
- **터치 인터랙션 우선**: 호버 전제 UI 금지
- 미디어 쿼리 사용하지 않음 — 한 가지 폭만 지원
- WDS 컴포넌트 직접 사용 시 `platform="mobile"`

검증: 브라우저 DevTools에서 360×800 viewport (Chrome/Safari 모바일 모드).

## Figma가 ground truth

수치(gap, padding, font size, line-height, border-radius)는 추측하지 않고 **Figma 노드트리에서 직접 읽는다**. WDS Typography variant 스케일과 명세가 정확히 일치하지 않을 수 있다 — 불일치 시 **Figma 값을 따른다**.

### 노드트리 좌표로 실 gap 계산

```
child[n].y + child[n].height  →  이전 자식 종료
child[n+1].y                   →  다음 자식 시작
gap = child[n+1].y - (child[n].y + child[n].height)
```

`mcp__plugin_figma_figma__get_metadata` 호출 → 자식 좌표 연산. Figma 에디터 숫자만 믿지 말고 **항상 좌표 연산으로 검증**.

## 간격 — 홈 5화면 실측

Figma 노드 `0:606 Card/List` 기준:

| 관계 | gap | 코드 반영 위치 |
|---|---|---|
| Statusbar+Header → 첫 부품 | 상단 106px 패딩 | `Shell` `ContentOutlet` padding-top |
| 카드 → 카드 | **4px** (var(--spacing-4)) | `CardList` gap=4 (기본) |
| 마지막 카드 → MY 편집 | 24px | `MyEditButton` margin |
| MY 편집 → GNB | 하단 120px 패딩 | `Shell` `ContentOutlet` padding-bottom |

**유지 규약**: 홈 화면 카드들은 **타이트(4px)** 로 붙어야 한다. MY 편집만 별도 section 느낌으로 24px 여유.

검색 도메인은 별도 — 결과 화면은 16px gap (의도적 breathing space). 다른 도메인 추가 시 별도 명시.

## 카드 내부 실측

- **카드 너비**: 369px (screen 393 - 좌우 12px 여백)
- **카드 padding**: 32px (모든 level)
- **카드 radius**: 24px
- **카드 배경**: `rgba(255, 255, 255, 0.9)` (frosted)
- **카드 테두리**: `1px solid rgba(255, 255, 255, 1)`

## 시스템 어휘 — variant SSOT

### TextBlock variant

텍스트 SSOT는 `apps/mobile/src/components/atoms/typography/TextBlock.tsx`다. TextBlock은 WDS `Typography` 위에 줄바꿈 정책(`lines`, `maxLines`, `overflow`)을 얹은 atom이다. 수치를 새로 만들지 않고 WDS `variant + weight` 조합으로만 표현한다.

| TextBlock variant | WDS Typography | 기존 역할 |
|---|---|---|
| `displayTitle` | `title1` / bold | 화면 히어로 대제목 |
| `hero` | `title2` / bold | 홈 게스트 Big Hero 수동 줄바꿈 |
| `headline` | `title3` / bold | 범용 큰 제목 |
| `sectionTitle` | `headline1` / bold | 섹션 제목 |
| `cardTitle` | `headline2` / bold | 카드 제목 |
| `body` | `body1` / medium | 본문 |
| `bodySubtle` | `body2` / medium | 설명 본문/보조 문단 |
| `caption` | `caption1` / medium | 보조 캡션 |
| `sectionLabel` | `caption1` / bold | 섹션/카드 상단 라벨 |
| `contentTitle` | `title3` / bold | 카드/콘텐츠 대표 타이틀 |
| `listTitle` | `label1` / bold | 리스트 행/액션 슬롯 타이틀 |
| `supportText` | `caption1` / bold | 리스트 보조문구/설명 |
| `meta` | `caption2` / bold | 바코드 숫자/타이머/짧은 메타 |
| `assistive` | `caption1` / bold | AI/도움말/강조 보조문구 |
| `price` | `headline1` / bold | sticky 총액/핵심 값 |
| `rating` | `label2` / bold | 평점/짧은 강조 메타 |
| `promoLabel` | `caption2` / bold | 얇은 프로모션 라벨 |
| `promoText` | `label1` / medium | 프로모션 본문 |

API: `<TextBlock variant text? lines? color? align? maxLines? overflow? balance? />`

### HomeBlock preset (3)

수치 SSOT는 `apps/mobile/src/components/organisms/home/block/HomeBlock.tsx`. compound root + 3개 preset 형태로 노출되며, `level={1|2|3}` 같은 숫자형 API는 사용하지 않는다.

| preset | 높이 | layout | 슬롯 |
|---|---|---|---|
| `HomeActionPairBlock` | 64h 고정 | row, padding 0 | `left: { icon, label }` + center `<Divider orientation="vertical" inset="block" />` + `right: { icon, label }`. 각 slot은 `<TextBlock variant="listTitle">` |
| `HomeInfoBlock` | `aside` 있으면 112h, 없으면 가변 | `aside` 있으면 row, 없으면 column | `label: string`, `title?`, `badge?`, `body?`, `aside?` |
| `HomeHeroBlock` | 232~299h | column, alignItems: flex-end | `label: string`, `title: string`, `ai?: { icon?, text }`, `cta: { text, onClick? }` |

`HomeInfoBlock` 분기 동작:
- `aside` 있음 → row layout. 좌측 column에 label + (title + badge) inline, 우측에 aside
- `aside` 없음 → column layout. `<HomeBlockHeader label title />` + `body`

`HomeHeroBlock` CTA 버튼 (`HomeBlock.Action`): WDS `Button color="primary"` 사용. 브랜드 컬러는 WDS `semantic.primary.*` 로 수렴.

`ai` 슬롯은 `<AiAnnotation icon text multiline?>` (home-kit) 컴포넌트로 흡수 — icon+ai-text+spacing-2 cling 패턴 캡슐화.

### Banner variant (2)

수치 SSOT는 `apps/mobile/src/components/organisms/home/banner/Banner.tsx`.

| variant | h | 텍스트 | 컨테이너 |
|---|---|---|---|
| `top` | 48 | `TextBlock promoLabel` + `semantic.label.alternative` | 투명, padding `0 var(--spacing-16)` |
| `offering` | 94 | `TextBlock promoText` + `semantic.label.normal` + `maxLines=1` | `OFFERING_BG` + `OFFERING_BORDER` + radius 24 + padding `0 var(--spacing-32)` + `overflow: hidden` |

API: `<Banner variant text imageSize={{w, h}} imageLabel?>`. 우측에 `Placeholder`로 이미지 슬롯.

### 비-카드 부품

#### `StatBadge`
11/700/-0.44/1.3, `BADGE_BG` bg, radius 6, padding `var(--spacing-4) var(--spacing-6)`, `--semantic-label-alternative`, nowrap.

#### `PillChip`
12/600/-0.6/1.3, radius 999, padding `var(--spacing-6) var(--spacing-12)`. 두 tone:
- `neutral` (default): `--semantic-fill-normal` bg + `--semantic-label-alternative`
- `violet`: `BADGE_BG` bg + `semantic.primary.normal`

#### `ListRow`
- 좌: `Placeholder` 썸네일 (w/h/label prop)
- 본문: `<TextBlock variant="listTitle" />` + `<TextBlock variant="supportText" />` (column, gap 2)
- 우: `pill` 문자열 → `<PillChip>{pill}</PillChip>`, 또는 `trailing` ReactNode

#### `MyEditButton`
하단 ghost "MY 편집" 버튼. 5/5 화면 footer.

#### `Placeholder`
미정 이미지·아이콘 자리. props: `w` (number | string), `h` (number | string), `label`, `style?`. Dashed border + `--semantic-line-solid-normal` + `--semantic-background-normal-alternative` bg + 10/500 라벨. **회색 박스 금지 — 투명 dashed**.

#### `Icon`
SVG wrapper. props: `src` (StaticImageData), `width?`, `height?` (미지정 시 SVG 원본), `color?`, `alt?`.
- `color` 미지정 → `next/image` 원본 (멀티컬러 SVG, 로고)
- `color` 지정 → CSS `mask-image` + `background-color`로 단색 페인트

#### `ContentOutlet`
스크롤 슬롯. `flex: 1` + `overflowY: auto` + 세로 flex + 스크롤바 hide. padding/gap은 호출자 주입. WebKit/Firefox/IE 모두 스크롤바 숨김.

#### `ContentSection` / `ContentRail`
가로 기준선은 screen route가 margin/padding으로 직접 만들지 않는다.

- `ContentOutlet` — 기본 본문 inset 소유
- `ContentSection inset="inherit"` — 일반 섹션. Outlet inset을 그대로 사용
- `ContentSection inset="bleed"` — 선택 row highlight, edge-to-edge media, 가로 스크롤처럼 배경/표면만 full-width가 필요한 경우
- `ContentRail rail="inset"` — bleed 섹션 안에서 label/control/content를 다시 본문 기준선으로 복귀
- `ContentRail rail="measure" measure="caption|body|title"` — 설명/캡션/타이틀의 readable line length 제한
- `ContentRail rail="full"` — full-width 표면 자체가 의미일 때만 사용

기본 원칙: 배경은 필요하면 넓게 칠하되, 텍스트와 컨트롤의 시작점은 같은 rail에 맞춘다. 캡션/보조문구는 full-width를 기본으로 보지 않고 `measure` 또는 전용 copy molecule로 행폭을 제한한다.

## 색 — 자체 토큰

WDS 토큰에 대응되지 않는 앱 표면 보조 토큰. 브랜드 컬러는 별도 토큰을 두지 않고 WDS `semantic.primary.*` 를 사용한다. SSOT는 `apps/mobile/src/lib/brand-tokens.ts`.

| 상수 | 값 | 용도 |
|---|---|---|
| `semantic.primary.*` | WDS primary | CTA, AI 텍스트, GNB active |
| `semanticSurface.page.normal` | `#ffffff` | AppScreenContent 페이지 배경 |
| `semanticSurface.page.semi` | `rgba(255, 255, 255, 0.95)` | sticky/overlay 반투명 배경 |
| `GNB_BORDER` | `#ecf1ff` | GNB 상단 구분선 |
| `CARD_BG` | `var(--semantic-background-normal-normal)` | 카드 |
| `CARD_BORDER` | `var(--semantic-line-solid-alternative)` | 카드 테두리 |
| `CARD_RADIUS` | `24` | 카드 radius |
| `CARD_SHADOW` | `none` | 카드 shadow 제거 |
| `OFFERING_BG` | `rgba(253, 253, 254, 0.5)` | offering banner |
| `OFFERING_BORDER` | `rgba(255, 255, 255, 0.5)` | offering banner |
| `BADGE_BG` | `#f4f5fa` | StatBadge / PillChip violet |

## Layout primitive 어휘 — Box / Flex / HStack / VStack

`apps/mobile/src/components/atoms/layout/`. Seed Design React의 `Box`/`Flex`/`HStack`/`VStack` API를 차용하되, **gap·padding 계열 prop은 semantic spacing 토큰만 받게** 좁힘. 화면 코드에서 raw px·`var(--spacing-N)` 직접 입력을 줄여 spacing strain 신호를 선명하게 한다.

`Divider`는 `apps/mobile/src/components/atoms/feedback/Divider.tsx`에 위치 — `orientation`/`thickness`/`color`/`inset` prop. `inset`은 `SpacingToken`을 받아 양 끝 margin 적용.

### spacing 토큰 — 7 슬롯 (의미축)

| 토큰 | px | 의도 |
|---|---|---|
| `row` | 4 | 텍스트 행 / 라벨-값 사이 |
| `inline` | 8 | 인라인 요소 (icon+text, chip 사이) |
| `stack` | 12 | 블록 내 요소 세로 stack 기본 |
| `group` | 16 | 관련 묶음 사이 |
| `inset` | 20 | 카드 안쪽 padding 표준 |
| `block` | 24 | 블록과 블록 사이 |
| `section` | 32 | 큰 섹션 분할 |

수치 SSOT는 `registry/wds-token-registry.json`의 `spacing` tier. 이 표는 매핑 alias이므로 px 값이 변하면 `system/layout/tokens.ts`만 갱신.

### 컴포넌트 prop

공통 (`Box` 포함 전부):
- 간격: `p` / `px` / `py` / `pt` / `pr` / `pb` / `pl` / `gap` — 모두 `SpacingToken`
- 사이즈: `width` / `height` / `min*` / `max*`
- `display` / `position` / `overflow` / `overflowX` / `overflowY`
- `as` (다형 element), `className`, `style`

`Flex` / `HStack` / `VStack` 추가 (`display: flex` 기본):
- `direction` (Flex만 의미 있음 — HStack=row, VStack=column 고정)
- `wrap` (true → `wrap`)
- `align` (= `align-items`)
- `justify` (= `justify-content`)
- `grow` / `shrink` (true → 1)

### 사용 신호

- 새 spacing 슬롯 추가 욕구 → 빈도 측정 후 어휘 확장 vs strain 깨짐 결정
- raw `style={{ gap: '14px' }}` / `var(--spacing-14)` 등장 → 어휘 외 값. semantic 어휘에 매핑 안 되는 이유 회의 보고
- `as` 남용 (의미 없는 `<section>` 변환 등) → 화면 어휘 빈약 신호

## WDS 토큰 — 직접 var() 소비

수치 SSOT는 `registry/wds-token-registry.json`. 이 문서나 다른 메모에 **베이크 금지**.

광범위 사용 예:
- `var(--semantic-label-{normal, neutral, alternative})`
- `var(--semantic-fill-normal)`
- `var(--semantic-line-solid-{normal, alternative})`
- `var(--semantic-background-normal-{normal, alternative})`
- `var(--spacing-{0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32})`
- `var(--opacity-8)`

## 검증 절차

새 화면 조립 또는 기존 화면 수정 시:

1. Figma 노드 id 확인 → `mcp__plugin_figma_figma__get_metadata` 로 구조 추출
2. 자식 좌표로 **실 gap/size 계산** — Figma 에디터 숫자 의존 금지
3. 위 시스템 어휘에서 매핑 (HomeBlock preset / Banner variant / TextBlock variant)
4. **어휘에 없으면 strain 신호**:
   - 새 variant 추가 가능한가? → variant SSOT 확장
   - 기존 컴포넌트 API에 새 슬롯 강제? → 시스템 재설계 신호 (회의 보고)
   - inline raw 강요? → 어휘 부족 (회의 보고)
5. 브라우저 DevTools `computed style`로 픽셀 재확인 (런타임 ≠ 추측)
6. 스크린샷을 Figma 원본과 대조

## 수정 이력

| 날짜 | 발견 | 수정 |
|---|---|---|
| 2026-04-24 | Shell scrollArea gap 24 → Figma 원본 4. 홈 5화면 모두 카드 간격 과잉 | gap 4 적용, MyEditButton marginTop 20 |
| 2026-04-27 | wrap 4종 (`BarcodeCard`/`HeroCard`/`StatCard`/`DualMenuCard`) 제거 — 어휘 분산 | `Card level={1\|2\|3}` 단일 API discriminated union으로 통합 |
| 2026-04-27 | `TopBanner` / `OfferingBanner` 분리 — 어휘 분산 | `Banner variant="top"\|"offering"` 단일 API |
| 2026-04-27 | text.tsx 8 슬롯 중 6 순수 타이포 | `Typography variant`(6) 단일 컴포넌트로 흡수. StatBadge/PillChip만 home-kit/text.tsx에 남김 |
| 2026-04-29 | 화면에 raw `style={{ display: 'flex', gap: 'Npx' }}` 다수 (~20곳) + `var(--spacing-N)` 직접 입력 우세 — spacing 어휘 부재 | `system/layout/` 도입 (Box/Flex/HStack/VStack), spacing 7 슬롯 semantic 어휘 (`row/inline/stack/group/inset/block/section`)로 좁힘. patterns/home-kit 14 파일 마이그레이션 |
| 2026-04-30 | 홈 TextBlock 전면 적용 시 `caption/cardTitle`로 과확장되어 weight/size 회귀 가능성 발견 | `displayTitle`/`sectionLabel`/`contentTitle`/`listTitle`/`supportText`/`meta`/`assistive`/`price`/`rating`/`promo*` 기본 variant 추가. raw 배너 font/letter-spacing 제거, WDS Typography 조합으로 수렴 |
| 2026-04-29 | dead code 잔존 — `Card level` API가 HomeBlock으로 대체되었으나 `home-kit/card/`·`home-kit/wrapper/` 폴더 미정리 | 두 폴더 삭제. DESIGN.md "Card level" 섹션 → "HomeBlock preset" 으로 갱신 |
| 2026-04-29 | icon+ai-text+spacing-2 패턴 4곳 반복 + spacing-2 어휘 밖 | `home-kit/AiAnnotation` 컴포넌트로 흡수 — 화면 코드에서 spacing-2 노출 사라짐 |
| 2026-04-29 | spacing-10 어중간 (`StickyActionBar`/`ProductSummaryCard`) | stack(12)으로 통일 |
| 2026-04-29 | HomeActionPairBlock 가운데 인라인 divider div + raw 색·margin | `system/Divider` (Seed 차용) 도입 후 `<Divider orientation="vertical" inset="block" />` |
| 2026-04-29 | nova-* 36 페이지 잘못 만든 코드 + 종속 `patterns/modal` · `NovaTopBar` | 일괄 삭제. 인덱스 페이지에서 nova 그룹 제거 |
| 2026-04-29 | 디렉터리 이름 변경 — 옛 `app2/`가 active | active 앱 경로 정리. AGENTS.md/DESIGN.md 경로 갱신 |
| 2026-04-30 | preview/mobile 분리 — `app/` active 패키지를 `apps/mobile/`로 이동하고 `apps/preview/` shadcn 프리뷰 셸 추가 | 모바일 화면 내부와 브라우저 프리뷰 책임 분리. preview는 iframe으로 mobile을 소비 |
