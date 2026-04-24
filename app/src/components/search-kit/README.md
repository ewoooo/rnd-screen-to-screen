# search-kit

T 앱 **검색 플로우**(A_검색 11 스텝) 재조립용 블록 래퍼. `home-kit`의 토큰·`Shell`·`Card`·`Placeholder`를 재사용하면서, 검색 화면 고유의 요소(검색바, 키보드, 카테고리 탭, 자동완성 행, 채팅 말풍선 등)를 제공한다.

## home-kit 과의 관계

```
search-kit ──→ home-kit  (의존 허용)
home-kit  ──×→ search-kit (역방향 금지)
```

- 공용 베이스(`Card`, `Placeholder`, `tokens`, 일부 text 슬롯)는 `home-kit` 에서 그대로 import.
- step 01(진입 홈)은 `home-kit` 의 `Shell` 을 그대로 사용 — `gnbTabs` prop 으로 "검색" 탭을 active 로 변경 (α 경로).
- step 02~11 은 GNB 없는 `DetailShell` 을 신규 정의 — 홈과 구조가 다름.

## 컴포넌트 카탈로그

| 파일 | 역할 | 사용 스텝 |
|---|---|---|
| `DetailShell.tsx` | back + optional title + optional trailing + scroll area + bottom fixed slot | 02~11 |
| `SearchField.tsx` | 하단 고정 검색바 + AI/search/send 원형 버튼. `withBackChip`, `clearable`, `value`, `placeholder` prop | 01, 02, 03, 04, 07, 08, 09, 10, 11 |
| `SearchPill.tsx` | 결과 화면 하단 센터의 소형 검색어 chip (포커스 아웃 상태) | 05, 06 |
| `RecentChip.tsx` | × 버튼 달린 최근 검색어 chip | 02, 03, 08, 09 |
| `SuggestionChip.tsx` | 가로 스크롤용 AI 프롬프트 제안 chip | 01, 06 |
| `SuggestionRow.tsx` | 자동완성 행 (`kind: "ai" | "search"` 로 아이콘 분리) | 04, 07 |
| `CategoryTabs.tsx` | 전체/단말기/기획전/부가서비스 pill tabs | 05, 06 |
| `CategoryHeader.tsx` | "기획전 2 >" — 섹션 헤더 + 카운트 + chevron | 05, 06 |
| `ProductCardWide.tsx` | 기획전 가로 카드 (제목 + 서브 + 우측 이미지) | 05 |
| `ProductCardPrice.tsx` | 단말기 2×2 grid 카드 (이미지 + 원가 strike + 월가격 + tags) | 05 |
| `InfoCard.tsx` | 제목 + 긴 설명 | 06, 11 |
| `AiSuggestions.tsx` | ✨ "이어서 검색해보세요" 라벨 + chip 리스트 | 06 |
| `ChatBubble.tsx` | user(회색 우측) / ai(좌측 플레인) 말풍선 | 10, 11 |
| `KeyboardPlaceholder.tsx` | iOS 키보드 자리 (300h 회색) | 02, 03, 04, 07, 08, 09, 10 |
| `tokens.ts` | 검색 고유 상수 (`KEYBOARD_BG` 등) | 내부 |
| `index.ts` | barrel | import 단일화 |

## 사용 규약

### 기본 패턴

```tsx
import { DetailShell, SearchField, KeyboardPlaceholder, RecentChip } from "@/components/search-kit";

export default function SearchXX() {
  return (
    <DetailShell
      title="아이폰 20"           // optional
      trailing={<History/>}       // optional 우측 아이콘
      bottom={<>                  // 하단 고정 슬롯
        <SearchField value="…" withBackChip clearable />
        <KeyboardPlaceholder />
      </>}
    >
      {/* 스크롤 콘텐츠 */}
      <span>최근 검색어</span>
      {queries.map(q => <RecentChip key={q} label={q} />)}
    </DetailShell>
  );
}
```

### DetailShell 의 bottom slot

- `bottom` prop 에 JSX 를 넘기면 **화면 바닥에 고정**. 스크롤 영역 padding-bottom 이 자동으로 160px 확보.
- `SearchField` + `KeyboardPlaceholder` 조합이 가장 흔함 (키보드 올라온 상태).
- `SearchField` 단독도 가능 (11: 채팅 결과, 11 포함).
- `SearchPill` 을 bottom 에 넣으면 결과 화면 모드.

### SearchField prop 조합

| 조합 | 사용 스텝 | 의미 |
|---|---|---|
| 기본 | 01, 02, 09 | placeholder "검색 또는 질문하기" |
| `value="…"` | 04, 07 | 입력 중 |
| `value` + `clearable` | 03, 08 | 입력된 상태 + × 버튼 |
| `withBackChip` | 03, 08, 09, 10 | 좌측 back 원형 chip 추가 (복귀) |
| `action="search"` | 03, 04, 07, 08 | 우측 버튼을 돋보기 로 변경 |
| `action="send"` | 10 | 우측 버튼을 ↑ (전송) 로 변경 |

### 화면 고유 블록

kit 에 없는 1회용 블록은 페이지 안에 인라인 JSX. 예 (step 11): 보상금 breakdown 카드는 `Card` + 인라인 구조로 작성 (현재 1회 사용).

## 승격 기준

home-kit 과 동일. **2 스텝 이상 중복 + 추가 화면에서 재발견 확률 있음** 일 때 승격.

현재 **승격 보류** 인라인:
- **Pager dots** (step 01 단일) — 1 회, 검색 외 다른 플로우에서 재발견 대기
- **Compensation breakdown card** (step 11 단일) — 1 회, 일반화가 어려움 (라벨+큰수+row 3+footer link)
- **"최근 검색어" 섹션 래퍼** (step 02, 03, 08, 09 → **4 회 중복**) — 다음 정리 후보

## 현재 사용 통계 (2026-04-24, n=11 스텝)

| 스텝 | 라우트 | 줄 수 | 사용 컴포넌트 |
|---|---|---|---|
| 01 | `/search-01/v1-kit` | 69 | Shell, SearchField, SuggestionChip |
| 02 | `/search-02/v1-kit` | 48 | DetailShell, RecentChip, SearchField, KeyboardPlaceholder |
| 03 | `/search-03/v1-kit` | 48 | 02 + SearchField(back+clearable+search) |
| 04 | `/search-04/v1-kit` | 31 | DetailShell, SuggestionRow, SearchField, KeyboardPlaceholder |
| 05 | `/search-05/v1-kit` | 59 | DetailShell, CategoryTabs, CategoryHeader, ProductCardWide, ProductCardPrice, SearchPill |
| 06 | `/search-06/v1-kit` | 52 | DetailShell, CategoryTabs, InfoCard, AiSuggestions, SearchPill |
| 07 | `/search-07/v1-kit` | 27 | 04 동일 (fixture 만 다름) |
| 08 | `/search-08/v1-kit` | 53 | 02 + SearchField(back+clearable+value) |
| 09 | `/search-09/v1-kit` | 48 | 02 + SearchField(back) |
| 10 | `/search-10/v1-kit` | 25 | DetailShell, ChatBubble, SearchField(send), KeyboardPlaceholder |
| 11 | `/search-11/v1-kit` | 139 | DetailShell, ChatBubble × 3, Card 인라인(보상금), SearchField |
| **합계** | | **597** | |

**컴포넌트 사용 빈도** (redundant 제외, 사용 스텝 수):
- `DetailShell`: 10/11
- `SearchField`: 9/11
- `KeyboardPlaceholder`: 7/11
- `RecentChip`: 4/11 (총 20회 render)
- `SuggestionRow`: 2/11 (총 8회)
- `CategoryTabs`, `CategoryHeader`, `InfoCard`: 2/11 각각
- `ChatBubble`: 2/11 (step 10, 11)

## 레이어 내부 import 규칙

```
search-kit/
  ↑ (소비)
search-* 페이지

search-kit/
  ↓ (허용)
home-kit                 ← tokens, Card, Placeholder, Shell 재사용
```

- **페이지 → search-kit**: OK
- **search-kit → home-kit**: OK (단방향 의존)
- **home-kit → search-kit**: 금지
- **search-kit → pilot-kit**: 현재 없음, 필요시 허용

## 관련 문서

- `app/src/components/home-kit/README.md` — 홈 화면 키트, search-kit 의 의존 대상
- `app/AGENTS.md` — WDS prop 규약, **토큰 수치는 레지스트리 직접 조회** (문서에 베이크 금지)
- `registry/wds-token-registry.json` — semantic 토큰 SSOT
- `CLAUDE.md` (repo root) — "반드시 제공된 토큰과 컴포넌트 사용" 원칙
