# LAYOUT — home-kit 레퍼런스 템플릿

신규 화면을 빌드할 때 우선 참조할 골격. 퀄리티가 검증된 home-kit (`app/src/components/home-kit/`)의 레이어 공식을 그대로 따르면 톤이 흔들리지 않는다.

검증 사례:
- `app/src/app/discover/v8-homekit/` — discover(비로그인) 10 SPEC
- `app/src/app/product-detail/v1-homekit/` — PRDD 16 SPEC

## 1. 셸/프레임 — `Shell.tsx` 공식

```
position: relative + PAGE_BG + overflow: hidden
├─ 상단 absolute: PAGE_BG_SEMI + backdropFilter blur(7px)
├─ 본문: flex:1 + overflowY:auto + padding "106px var(--spacing-12) 120px"
└─ 하단 absolute: PAGE_BG_SEMI + blur(4px) + borderTop: GNB_BORDER
```

- GNB가 없는 화면(상세 등)은 Shell 직접 못 쓰고 인라인 셸로 같은 공식 복제
- 본문 padding `106px / 120px`은 위·아래 셸 높이 보전용 — 그대로 따라갈 것

## 2. 카드 컴포지션 — `Card.tsx` + `HeroCard.tsx` 공식

- 모든 섹션은 `Card`로 감싼다: `CARD_BG`(반투명) + `CARD_BORDER` + `CARD_RADIUS 24` + `padding 32`
- 정보 밀도 필요시 padding `20`/`24`로 줄여도 톤 유지됨
- HeroCard 3단 구조 = **라벨 → 헤드라인(2줄) → CTA**. 쿠폰/프로모션/할인 카드에 그대로 재사용
- CTA 버튼 공식: `T_BRAND` + `T_BRAND_SHADOW` + `borderRadius 12` + `fontWeight 600` 12~13px

## 3. 타이포 슬롯 — `text.tsx`

| 슬롯 | 용도 |
|---|---|
| `SectionLabel` (13/700/neutral) | 카드 상단 라벨 |
| `Heading20` (20/700, pre-line) | 카드 헤드라인 (2줄 개행 유지) |
| `ListTitle` (14/600) / `ListSub` (13/700/alternative) | 행 제목·부제 |
| `MonoCaption` (11/700, brand 옵션) | 인덱서·접기/펼치기 라벨 |
| `StatBadge` / `PillChip` | 회색 배지 / 둥근 칩 |
| `AiText` (13/700/T_BRAND) | AI 안내 인라인 |

수치 절대 베이크 금지 — text.tsx의 실제 값이 SSOT.

## 4. 행 패턴 — `ListRow.tsx`

- 썸네일(32~40 정사각, `Placeholder`) + 타이틀/서브 + 우측 `PillChip` 또는 `trailing`
- 아코디언 내부 콘텐츠도 ListRow 그대로 (배송 정보, 문의)

## 5. 가로 스트립 — home-benefit/v3-kit 패턴

카드 가장자리까지 셀이 흐르게:
```css
marginLeft/Right: calc(var(--spacing-24) * -1);
paddingLeft/Right: var(--spacing-24);
overflowX: auto;
scrollbarWidth: none;
```
첫 셀은 카드 padding 안쪽 정렬, 우측은 화면 밖까지 흘러나감.

## 6. 토큰

`@/components/home-kit`(또는 `home-kit/tokens`)에서 직접 import. 색·그림자 하드코딩 0건 유지.

- `T_BRAND`, `T_BRAND_SHADOW` — 강조 액션
- `PAGE_BG`, `PAGE_BG_SEMI` — 셸 배경
- `CARD_BG`, `CARD_BORDER` — 카드
- `GNB_BORDER` — 셸 분리선
- `BADGE_BG`, `OFFERING_BG`, `OFFERING_BORDER` — 보조 표면

## 7. Placeholder 규약

미정 이미지·아이콘은 모두 `Placeholder`(투명 체커보드). 회색 박스 금지.

## 빌드 절차

1. 화면 SPEC 읽기 → 섹션 단위로 분해
2. SPEC 마다 home-kit 부품 매칭:
   - 라벨+헤드라인+CTA → `HeroCard` 패턴 또는 카드 직조
   - 행 리스트 → `ListRow`
   - 배너 스트립 → `OfferingBanner`
   - 가로 상품 carousel → 카드 안 가로 스트립 패턴
3. home-kit에 없는 부품(아코디언·탭·스티키 풋터 등)은 위 토큰·타이포 슬롯·셸 공식으로 신규 작성
4. WDS/Pilot 의존성 0으로 유지 — 톤 일관성
