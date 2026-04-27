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

### Typography variant (6)

수치 SSOT는 `app2/src/components/typography/styles.ts`. Figma 픽셀 그대로 고정 — WDS Typography variant와 일치하지 않아도 명세 우선.

| variant | size / weight | letterSpacing | lineHeight | color | 기본 태그 | 특수 |
|---|---|---|---|---|---|---|
| `section-label` | 13 / 700 | -0.39px | 1.4 | `--semantic-label-neutral` | `<span>` | — |
| `heading-20` | 20 / 700 | -1px | 1.3 | `--semantic-label-normal` | `<p>` | `whiteSpace: pre-line` |
| `ai-text` | 13 / 700 | -0.39px | 1.4 | `T_BRAND` | `<span>` | — |
| `list-title` | 14 / 600 | -0.7px | 1.4 | `--semantic-label-normal` | `<span>` | nowrap + ellipsis |
| `list-sub` | 13 / 700 | -0.52px | 1.3 | `--semantic-label-alternative` | `<span>` | — |
| `mono-caption` | 11 / 700 | -0.44px | 1.4 | `--semantic-label-alternative` (`color` prop으로 override 가능, 예: `T_BRAND`) | `<span>` | — |

API: `<Typography variant color? as? style?>{children}</Typography>`

### Card level (3)

수치 SSOT는 `app2/src/components/home-kit/card/Card.tsx`.

| level | 높이 | layout | 슬롯 |
|---|---|---|---|
| `1` | 64h 고정 | row, padding 0 | `left: { icon, label }` + center divider + `right: { icon, label }`. 각 slot은 `<Typography list-title>` |
| `2` | `aside` 있으면 112h, 없으면 가변 | `aside` 있으면 row, 없으면 column | `label: string`, `title?`, `badge?`, `body?`, `aside?` |
| `3` | 232~299h | column, alignItems: flex-end | `label: string`, `title: string`, `ai?: { icon?, text }`, `cta: { text, onClick? }` |

L2 분기 동작:
- `aside` 있음 → row layout. 좌측 column에 label + (title + badge) inline, 우측에 aside
- `aside` 없음 → column layout. `<CardHeader label title />` + `body`

L3 CTA 버튼: `T_BRAND` bg + `T_BRAND_SHADOW` + h=36 + `borderRadius=12` + 12/600/-0.48 텍스트.

API: discriminated union. `level` prop이 1/2/3 중 어느 것인지에 따라 props 구성이 컴파일 타임에 강제됨.

### Banner variant (2)

수치 SSOT는 `app2/src/components/home-kit/banner/Banner.tsx`.

| variant | h | 텍스트 | 컨테이너 |
|---|---|---|---|
| `top` | 48 | 12 / 700 / -0.48px / `--semantic-label-alternative` | 투명, padding `0 var(--spacing-16)` |
| `offering` | 94 | 14 / 600 / -0.56px / 1.2 / `--semantic-label-normal` (whiteSpace: nowrap) | `OFFERING_BG` + `OFFERING_BORDER` + radius 24 + padding `0 var(--spacing-32)` + `overflow: hidden` |

API: `<Banner variant text imageSize={{w, h}} imageLabel?>`. 우측에 `Placeholder`로 이미지 슬롯.

### 비-카드 부품

#### `StatBadge`
11/700/-0.44/1.3, `BADGE_BG` bg, radius 6, padding `var(--spacing-4) var(--spacing-6)`, `--semantic-label-alternative`, nowrap.

#### `PillChip`
12/600/-0.6/1.3, radius 999, padding `var(--spacing-6) var(--spacing-12)`. 두 tone:
- `neutral` (default): `--semantic-fill-normal` bg + `--semantic-label-alternative`
- `violet`: `BADGE_BG` bg + `T_BRAND`

#### `ListRow`
- 좌: `Placeholder` 썸네일 (w/h/label prop)
- 본문: `<Typography list-title>{title}</Typography>` + `<Typography list-sub>{sub}</Typography>` (column, gap 2)
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

## 색 — 자체 토큰 (8개)

WDS 토큰에 대응되지 않는 T 앱 브랜드 톤. SSOT는 `app2/src/components/home-kit/tokens.ts`.

| 상수 | 값 | 용도 |
|---|---|---|
| `T_BRAND` | `#3617ce` | T멤버십 보라. CTA, AI 텍스트, GNB active |
| `T_BRAND_SHADOW` | `0 8px 16px rgba(27, 11, 102, 0.16)` | CTA 버튼 그림자 |
| `PAGE_BG` | `#ebeef6` | 홈 페이지 배경 (연보라) |
| `PAGE_BG_SEMI` | `rgba(235, 238, 246, 0.95)` | StatusBar / GNH / GNB 반투명 배경 |
| `GNB_BORDER` | `#ecf1ff` | GNB 상단 구분선 |
| `CARD_BG` | `rgba(255, 255, 255, 0.9)` | 카드 |
| `CARD_BORDER` | `rgba(255, 255, 255, 1)` | 카드 테두리 |
| `CARD_RADIUS` | `24` | 카드 radius |
| `OFFERING_BG` | `rgba(253, 253, 254, 0.5)` | offering banner |
| `OFFERING_BORDER` | `rgba(255, 255, 255, 0.5)` | offering banner |
| `BADGE_BG` | `#f4f5fa` | StatBadge / PillChip violet |

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
3. 위 시스템 어휘에서 매핑 (Card level / Banner variant / Typography variant)
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
