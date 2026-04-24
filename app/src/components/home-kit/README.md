# home-kit

T 앱 **홈 화면군**(A_혜택 / A_관리 / A_단말기 교체 / A_요금부과 시니어 / A_비로그인) 재조립에 쓰이는 화면 단위 블록 래퍼. Figma 원본에서 **반복 출현하는 조합**을 WDS 토큰(`--spacing-*`, `--semantic-*`)과 도메인 상수로 감싸 화면 페이지가 "Shell 안에 블록을 순서대로 나열"만으로 끝나게 만든다.

## pilot-kit 과의 차이

| 축 | pilot-kit | home-kit |
|---|---|---|
| 단위 | Figma 컴포넌트(atom/molecule) 1:1 | 5화면에서 반복 출현한 조합 |
| 대응 관계 | Figma 노드 ↔ Pilot 파일 고정 | 여러 Figma 블록이 한 래퍼로 수렴 |
| 산출물 | `data/design/` + `data/binding/` + `tsx` 3-tuple | tsx 단일 |
| 목적 | 디자인-시스템 매핑 검증 | 화면 조립 속도 + 중복 제거 |
| 소비자 | `/pilot-kit/*` 카탈로그 라우트 | `/home-*/v*-kit/*` 화면 라우트 |

두 키트는 **경쟁이 아니라 역할 분담**이다. 현재 home-kit 은 raw div + WDS CSS var 로만 구성.

## 컴포넌트 카탈로그

| 파일 | 역할 | 주 재사용처 |
|---|---|---|
| `Shell.tsx` | 프레임 + Statusbar + Header(T로고 + 아이콘 3개) + ScrollArea + GNB | 5/5 화면 |
| `TopBanner.tsx` | 48h 작은 상단 홍보 배너 (문구 + 작은 이미지) | 4 화면 (비로그인 제외) |
| `HeroCard.tsx` | Card/L3 — 라벨 + 2줄 헤드라인 + AI 한 줄 + 우하단 CTA | 혜택·관리·단말기 3 회 |
| `StatCard.tsx` | Card/L2 stat — 라벨 + 큰 값 + 회색 배지 + 우측 그래픽(선택) | 10 회 |
| `BarcodeCard.tsx` | T멤버십 바코드 카드 | 4 화면 |
| `OfferingBanner.tsx` | 94h 반투명 카드 (문구 + 이미지) | 4 회 |
| `DualMenuCard.tsx` | Card/L1 — 아이콘+라벨 두 개를 세로 divider 로 분할 | 4 회 (관리/단말기/시니어/비로그인) |
| `ListRow.tsx` | 썸네일 + 타이틀/서브 + 우측 pill 또는 trailing | 혜택(영화/쿠폰), 비로그인(구독상품) |
| `MyEditButton.tsx` | 하단 "MY 편집" ghost 버튼 | 5/5 화면 |
| `Card.tsx` | 공통 카드 베이스 (반투명 흰색, radius 24, padding 32) | 모든 카드 래퍼가 상속 |
| `Placeholder.tsx` | 이미지/아이콘 자리의 동일 사이즈 dashed 박스 | 모든 곳 |
| `text.tsx` | 8 개 텍스트 슬롯 (`SectionLabel`, `Heading20`, `AiText`, `ListTitle`, `ListSub`, `MonoCaption`, `StatBadge`, `PillChip`) | 모든 곳 |
| `tokens.ts` | T_BRAND 보라, 페이지/카드 배경, 배지 bg 등 WDS 토큰 외 상수 | 모든 곳 |
| `index.ts` | barrel | import 단일화 |

## 텍스트 슬롯 매핑

Figma 원본 픽셀 기준으로 고정. WDS `Typography` variant 스케일과 정확히 일치하지 않으므로 raw `<span>` 으로 직접 정의(AGENTS.md 의 "Figma→WDS 매핑" 과 별도 정책 — **home-kit 은 Figma 픽셀을 ground truth** 로 삼는다).

| 슬롯 | size / weight / color | 주 사용처 |
|---|---|---|
| `SectionLabel` | 13 / 700 / `--semantic-label-neutral` | 카드 상단 라벨 |
| `Heading20` | 20 / 700 / `--semantic-label-normal` (pre-line) | 큰 값·타이틀 |
| `AiText` | 13 / 700 / `T_BRAND` | AI 제안 인라인 |
| `ListTitle` | 14 / 600 / `--semantic-label-normal` (ellipsis) | 행 제목 / 메뉴 라벨 |
| `ListSub` | 13 / 700 / `--semantic-label-alternative` | 행 부제 |
| `MonoCaption` | 11 / 700 / `alternative` or `T_BRAND (brand)` | 숫자·타이머 |
| `StatBadge` | 11 / 700 / `alternative` + `#f4f5fa` bg | stat 회색 pill |
| `PillChip` | 12 / 600 / `alternative` + `--semantic-fill-normal` bg | 행 우측 pill |

## 사용 규약

### 기본 패턴

```tsx
import { Shell, HeroCard, StatCard, MyEditButton } from "@/components/home-kit";
import { someFixture } from "@/fixtures/...";

export default function HomeXxxV1Kit() {
  const f = someFixture;
  return (
    <Shell>
      <TopBanner .../>
      <HeroCard .../>
      {f.stats.map(s => <StatCard key={s.id} {...s} />)}
      <MyEditButton />
    </Shell>
  );
}
```

페이지 파일은 **"Figma 프레임을 말로 낭독한 것"** 에 가까워야 한다. 100 줄 내외가 목표치.

### fixture 규약

- 데이터는 `app/src/fixtures/home-<screen>.ts` 에 타입과 값을 함께 선언.
- fixture 는 **버전 간 공유** — `v1-kit`, `v2-wds-components`, `v3-kit` 모두 같은 fixture 를 import.
- 그래픽 placeholder 크기는 fixture 에 포함(`graphic: { w, h, label }`). 화면별로 다르므로 kit 내부에 고정 금지.

### 화면 고유 블록

kit 에 없는 1회용 블록은 페이지 안에 `<Card>` + 인라인 JSX 로 작성. 2회 이상 재사용이 발견되면 kit 승격 검토.

예 (`home-guest`): Big Hero (큰 이미지 + 20px 헤드라인 + 44h CTA) — 비로그인 1회 사용 → 인라인 유지.

## 승격 기준

inline → kit 승격 트리거:

- **2 화면 이상에서 동일 구조 반복** (현재 기준)
- prop 차이가 1–2 개로 흡수 가능 (이미지 크기, 텍스트 등)
- 반복이 누적 중이며 추가 화면에서도 나올 확률이 높음

현재 **승격 보류 중인 인라인 패턴**:

| 인라인 | 위치 | 사유 |
|---|---|---|
| Big Hero (큰 이미지 + 헤드라인 + 44h CTA) | home-guest | 1 회 사용, 검색 플로우 등에서 재발견 대기 |
| Info Card (label + Heading20 + ListSub, CTA 없음) | home-guest USIM/eSIM | 1 회 사용 |
| HeroCard without CTA (AI 2 줄) | home-guest 모바일 요금제 | `HeroCard.ctaText?` 로 확장 가능 — 다음 발견 시 흡수 |

## 현재 사용 통계 (2026-04-24, n=5 화면)

| 화면 | 라우트 | 줄 수 | 사용 래퍼 |
|---|---|---|---|
| home-benefit | `/home-benefit/v3-kit` | **117** | Shell, TopBanner, HeroCard, BarcodeCard, StatCard, OfferingBanner, Card, ListRow, MyEditButton |
| home-manage | `/home-manage/v3-kit` | **77** | Shell, TopBanner, HeroCard, StatCard×4, DualMenuCard, OfferingBanner, BarcodeCard, MyEditButton |
| home-device-change | `/home-device-change/v1-kit` | **56** | Shell, TopBanner, HeroCard, StatCard×4, DualMenuCard, OfferingBanner, BarcodeCard, MyEditButton |
| home-senior | `/home-senior/v1-kit` | **56** | 위와 동일 |
| home-guest | `/home-guest/v1-kit` | **167** | Shell, DualMenuCard, OfferingBanner, ListRow + Big Hero/Info Card 인라인 |
| **합계** | | **473** | |

**래퍼 사용 빈도**:
- `Shell` / `MyEditButton`: 5/5
- `DualMenuCard`: 4/5
- `TopBanner` / `OfferingBanner` / `BarcodeCard`: 4/5
- `HeroCard`: 3/5
- `StatCard`: 혜택 1 + 관리 4 + 단말기 4 + 시니어 4 = **13 회**
- `ListRow`: 혜택 4 + 비로그인 2 = 6 회

**버전 비교 (1 화면 기준)**:
- home-benefit: v1-wds 551 → v2-wds-components 528 → **v3-kit 117** (−79%)
- home-manage: v1-wds 528 → v2 451 → **v3-kit 77** (−85%)

## 레이어 내부 import 규칙

```
app/src/components/home-kit/
  ↑ (소비)
app/src/app/home-*/v*-kit/page.tsx

app/src/components/home-kit/
  ↑ (내부 의존)
  ├ tokens.ts               ← 어느 파일에서든 import 가능
  ├ Placeholder.tsx / text.tsx   ← 1차 유틸, kit 전체에서 사용
  ├ Card.tsx                ← 카드 래퍼의 공통 베이스
  └ Shell.tsx / HeroCard / StatCard / ... ← 블록 단위, 외부 공개
```

- **화면 페이지 → home-kit**: OK
- **home-kit → home-kit 내부**: OK (예: HeroCard 가 Card + text 호출)
- **home-kit → 다른 kit/pilot-kit**: 금지. 독립 유지. 필요하면 명시적 의존 문서화.

## 관련 문서

- `app/AGENTS.md` — WDS prop 규약, Figma→WDS 매핑 기준(variant sizing)
- `app/src/components/pilot-kit/README.md` — 자매 키트, atom/molecule 매핑 담당
- `registry/wds-token-registry.json` — semantic 토큰 SSOT
- `data/screens/` (예정) — 화면 레벨 명세 (현재 fixtures 로만 존재)
- `CLAUDE.md` (repo root) — "반드시 제공된 토큰과 컴포넌트 사용" 원칙
