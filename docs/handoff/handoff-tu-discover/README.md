# 발견(TU) 화면 정적 견본 (3 화면)

새 「TU 기능목록」 DB(`collection://34fde754-2a48-81a3-8482-000be9d1a1df`) 기준
screen_id 단위로 추출한 strain test 결과를 standalone HTML로 재현.

같은 NextCH 프로젝트의 `handoff/` 견본과 동일한 어휘(home-kit / payment-kit / auth-kit
평탄화) 사용. React/Next.js/WDS 의존성 없음, 더블클릭으로 브라우저에서 바로 열림.

## 파일

### 공용 CSS (handoff/와 동일)
- `_shared.css` — 공용 토큰·셸·카드·타이포·placeholder
- `_payment.css` — DetailShell·Hero·Field·InfoBox·StatusCard·StickyCTA·BottomSheet
- `_membership.css` — auth-kit 평탄화 (CheckIndicator / CheckList / Group / ResultBlock)

### TU 발견 3화면

| 파일 | screen_id | 화면명 | 출처 SPEC |
|---|---|---|---|
| `tu-dsp-main-mo-02-pg-001-2.html` | `TU-DSP-MAIN-MO-02-PG-001-2` | 발견_case2_로그인 | SPEC-MAIN-10/11/12/13/14/15 |
| `tu-dsp-main-mo-02-pg-002.html` | `TU-DSP-MAIN-MO-02-PG-002` | 접근권한 안내 | SPEC-MAIN-16/17 |
| `tu-my-agr-mo-02-bs-001.html` | `TU-MY-AGR-MO-02-BS-001` | 혜택·이벤트 약관동의 (BS) | SPEC-AGR-01/02 |

## 화면 구성 — feature 매핑

### 발견_case2_로그인 (`tu-dsp-main-mo-02-pg-001-2.html`)
- shell-top: 상단 GNB (T 로고 + 바코드/쇼핑/메뉴)
  - **SPEC-MAIN-10** 바코드 아이콘 — 본 화면에선 항상 노출(strain: 조건부 노출 prop 미지원)
- shell-body:
  - **SPEC-MAIN-11** 개인화 인사 (HeroBlock — “최우성 님, 오늘은 어떤 구독을…”)
  - **SPEC-MAIN-12** 실시간 인기 베스트 (InfoBlock + ListRow×3 + pill 1·2·3위)
  - **SPEC-MAIN-13** 이벤트 빅배너 (offering)
  - **SPEC-MAIN-14** 인기 OTT (InfoBlock + ListRow×3)
  - **SPEC-MAIN-15** 일반 배너 (top, h=48)
- shell-bottom: GNB 탭 (MY/검색/쇼핑)

### 접근권한 안내 (`tu-dsp-main-mo-02-pg-002.html`)
- detail-shell + status + header (제목)
- pay-content:
  - pay-hero (헤드라인 + sub)
  - **SPEC-MAIN-16** 필수 접근 권한 그룹 (status-card + 항목 2개)
  - **SPEC-MAIN-16** 선택 접근 권한 그룹 (status-card muted + 항목 2개)
  - info-box (선택 권한 보조 안내)
- **SPEC-MAIN-17** sticky 확인 CTA

### 혜택·이벤트 약관동의 BS (`tu-my-agr-mo-02-bs-001.html`)
- backdrop dimmed canvas + bottom-sheet handle
- header (헤드라인 + sub)
- **SPEC-AGR-01** 동의 항목 리스트 (check-list, 2 항목 모두 default checked)
- **SPEC-AGR-02** sticky CTA (동의하고 시작하기)
- **SPEC-AGR-02** 30일간 보지 않기 텍스트 버튼

## 보는 법

1. 폴더 통째로 두기 (CSS 3개와 HTML 3개 같은 디렉토리에 있어야 함)
2. 임의 `tu-*.html` 더블클릭

## 디자인 시스템

- 모바일 360×740 캔버스
- 색·그림자·radius·spacing은 `_shared.css :root`에 CSS 변수로 정의
- 어휘는 `handoff/` 멤버십·결제 견본과 100% 동일 (재사용 가능성 검증)

## strain 신호 (회의용)

이 3화면을 짜면서 시스템 어휘로 흡수 안 되는 부분이 명확히 드러났음.

| 항목 | 분류 | 설명 |
|---|---|---|
| 바코드 헤더 아이콘 조건부 노출 | 부분 깨짐 | shell-top API에 prop slot 없음 |
| HomeInfoBlock children 없음 | 부분 깨짐 | body slot 단일 ReactNode만 — 호출자가 fragment 감싸야 |
| Banner 단일 텍스트 prop | 부분 깨짐 | 가격/하이라이트 강조 표현 불가 |
| StickyActionBar product 편향 | 부분 깨짐 | 단일 CTA 화면엔 부적합. `mode="single-cta"` variant 필요 |
| BottomSheet 컴포넌트 부재 | 명백 깨짐 | registry엔 정의 있고 ogn/bottomsheet 클래스 있지만 React 구현물 없음 |
| 체크박스 row 부재 | 명백 깨짐 | atom/checkbox 없음. raw input 사용 |
| Text-button (underline ghost) variant 부재 | 명백 깨짐 | 30일간 보지 않기 같은 ghost text 액션 — variant 신설 필요 |
| Shell이 home 도메인 chrome | 부분 깨짐 | 시스템 안내(권한 안내)엔 GNB 어색. detail-shell로 우회 |

## 출처

- spec JSON: `data/screens/spec/tu-functions/<SCREEN_ID>.json`
- 라우트: `app2/src/app/<screen-id-lower>/{page.tsx, _mock.ts}` (개발 서버 검증용)
- Notion DB: `https://www.notion.so/34fde7542a4880a89500e33fca7efeb3`
