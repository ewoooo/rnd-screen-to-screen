# DESIGN

이 프로젝트는 **모바일 화면**을 만든다. 데스크톱·태블릿 대응은 하지 않는다.

## 기준

- **뷰포트 폭**: 360px (Figma 라이브러리 `04_ADP_P3-T1_Library`의 mobile artboard 기준)
- **타깃 플랫폼**: iOS / Android 모바일 웹뷰
- **WDS `platform` prop**: 항상 `"mobile"`로 지정 (예: `<Card platform="mobile">`)
- **터치 인터랙션 우선**: 호버 전제 UI 금지

## 함의

- 모든 컴포넌트·화면은 360px 폭에서 1차로 완성도를 검증한다
- 가로 스크롤은 모바일 carousel 패턴으로만 사용 (마우스 드래그 가정 안 함)
- 폰트·간격은 모바일 가독성 기준 (본문 14px, 헤딩 18~24px 범위)
- 미디어 쿼리는 사용하지 않는다 — 한 가지 폭만 지원

## 검증 방법

- 브라우저 devtools에서 360×800 viewport로 확인 (Chrome/Safari 모바일 모드)
- 별도의 데스크톱 레이아웃은 만들지 않는다

---

# 간격 & 레이아웃 원칙

## Figma가 ground truth

**수치(gap, padding, font size, line-height, border-radius)는 추측하지 않고 Figma 노드트리에서 직접 읽는다.**

- WDS `Typography` variant 스케일과 Figma 명세가 정확히 일치하지 않을 수 있다. 불일치 시 **Figma 값을 따른다**.
- home-kit·search-kit의 text 슬롯은 Figma 픽셀을 그대로 반영한 raw `<span>` 으로 정의되어 있다.
- WDS 토큰 수치(semantic color, spacing scale)는 `registry/wds-token-registry.json` 직접 조회 (app/AGENTS.md 참조).

## 노드트리 읽는 법

`mcp__plugin_figma_figma__get_metadata` 호출 → 각 frame의 `x/y/width/height` 로 **자식 간 실제 gap 계산**:

```
child[n].y + child[n].height  →  이전 자식 종료
child[n+1].y                   →  다음 자식 시작
gap = child[n+1].y - (child[n].y + child[n].height)
```

Figma 에디터 숫자만 믿지 말고 **항상 좌표 연산으로 검증**한다. auto-layout frame 도 실 좌표 기준이 정답이다.

## 실측된 간격 규칙 (T 앱 홈 5화면)

Figma 노드 `0:606 Card/List` 재확인 결과:

| 관계 | gap | 코드 반영 위치 |
|---|---|---|
| Statusbar + Header → Banner/Small | 상단 106px 패딩 | `Shell.tsx` scrollArea `padding-top: 106` |
| Banner/Small → 첫 카드 | 0px (Figma) / 4px (현재 구현) | 미세 차이 허용 중 |
| **카드 → 카드 (Card/L2·L3·offering_banner 간)** | **4px** | `Shell.tsx` scrollArea `gap: var(--spacing-4)` |
| 마지막 카드 → MY 편집 | 24px | `MyEditButton.tsx` `marginTop: var(--spacing-20)` (+ scrollArea gap 4) |
| MY 편집 → GNB | 하단 120px 패딩 | `Shell.tsx` scrollArea `padding-bottom: 120` |

**유지 규약**: 홈 화면 카드들은 **타이트(4px)** 로 붙어야 한다. MY 편집만 별도 section 느낌으로 24px 여유.

검색 플로우(DetailShell) 는 별도 규약 — `search-kit/DetailShell.tsx` 는 scrollArea gap 16으로 카드 간 여유 있음. 이는 검색 결과 화면의 의도적 breathing space.

## 카드 내부 공통치 (실측)

- **카드 너비**: 369px (screen width 393 - 좌우 12px 여백)
- **카드 padding**: 32px (Card/L3), 32px (Card/L2)
- **카드 radius**: 24px
- **카드 배경**: `rgba(255, 255, 255, 0.9)` (frosted)
- **카드 테두리**: `1px solid white`

구현: `app/src/components/home-kit/Card.tsx` + `tokens.ts` (`CARD_BG`, `CARD_BORDER`, `CARD_RADIUS`).

## 수정 이력

| 날짜 | 발견 | 수정 |
|---|---|---|
| 2026-04-24 | Shell scrollArea gap 24 → Figma 원본 4. 홈 5화면 모두 카드 간격 과잉 | gap 4 로 변경, MyEditButton marginTop 20 |

# 텍스트 슬롯 (home-kit 기준)

Figma 픽셀 기준 고정. 세부는 `app/src/components/home-kit/text.tsx`.

| 슬롯 | size / weight / color | 역할 |
|---|---|---|
| `SectionLabel` | 13 / 700 / `--semantic-label-neutral` | 카드 상단 라벨 |
| `Heading20` | 20 / 700 / `--semantic-label-normal` | 큰 값·타이틀 |
| `AiText` | 13 / 700 / `T_BRAND` | AI 제안 인라인 |
| `ListTitle` | 14 / 600 / `--semantic-label-normal` | 행 제목 |
| `ListSub` | 13 / 700 / `--semantic-label-alternative` | 행 부제 |
| `MonoCaption` | 11 / 700 / alternative or brand | 숫자·타이머 |
| `StatBadge` | 11 / 700 / `#f4f5fa` bg | stat 회색 pill |
| `PillChip` | 12 / 600 / fill-normal bg | 행 우측 pill |

# 컬러 (프로젝트 도메인 상수)

WDS 토큰 외 T 앱 고유값. `app/src/components/home-kit/tokens.ts` 가 SSOT.

| 상수 | 값 | 용도 |
|---|---|---|
| `T_BRAND` | `#3617ce` | T멤버십 브랜드 보라. CTA, AI 텍스트, GNB active |
| `T_BRAND_SHADOW` | `0 8px 16px rgba(27, 11, 102, 0.16)` | CTA 버튼 그림자 |
| `PAGE_BG` | `#ebeef6` | 홈 페이지 배경 (연보라) |
| `PAGE_BG_SEMI` | `rgba(235, 238, 246, 0.95)` | Statusbar/Header/GNB 반투명 배경 |
| `GNB_BORDER` | `#ecf1ff` | GNB 상단 구분선 |
| `CARD_BG` / `CARD_BORDER` / `CARD_RADIUS` | — / — / 24 | 카드 공통 |
| `OFFERING_BG` / `OFFERING_BORDER` | `rgba(253,253,254,0.5)` / `rgba(255,255,255,0.5)` | offering_banner 투명도 |
| `BADGE_BG` | `#f4f5fa` | Stat 배지 배경 |

WDS semantic 토큰(`--semantic-label-*`, `--semantic-line-*`, `--semantic-fill-*`)은 직접 CSS var 로 소비.

# 검증 절차

새 화면 조립 또는 기존 화면 수정 시:

1. Figma 노드 id 확인 → `mcp__plugin_figma_figma__get_metadata` 로 구조 추출
2. 자식 좌표로 **실 gap/size 계산** — Figma 에디터 숫자 의존 금지
3. kit 래퍼 (`home-kit` / `search-kit`) 우선 사용. 없는 요소는 화면 인라인
4. 브라우저 DevTools 로 **computed style 로 픽셀 재확인** (런타임 ≠ 추측)
5. 스크린샷을 Figma 원본과 대조
