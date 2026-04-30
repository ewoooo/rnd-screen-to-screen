# 발견(TU) 화면 정적 견본 v2.1 (3 화면)

`app2/`의 v2.1 톤보드(토스 breathing + 애플뮤직 임팩트 헤딩 + 네이버쇼핑 dense list)
구현을 standalone HTML로 재현. React/Next.js/WDS 의존성 없음, 더블클릭으로 바로 열림.

이전 `handoff-tu-discover/`(v1)는 home-kit 어휘로 재현한 구버전. 본 v2.1이 신규.

## 파일

- `_tu-tone.css` — 단일 공용 CSS (spacing 토큰 + tu-* 본문 어휘 + chrome 클래스)
- `tu-dsp-main-mo-02-pg-001-2.html` — 발견_case2_로그인
- `tu-dsp-main-mo-02-pg-002.html` — 접근권한 안내
- `tu-my-agr-mo-02-bs-001.html` — 혜택·이벤트 약관동의 BS

## 화면 구성 — feature 매핑

### 발견_case2_로그인 (`tu-dsp-main-mo-02-pg-001-2.html`)

- `tu-app-top` — T 로고 + DiscoveryActions (검색·장바구니·메뉴). **SPEC-MAIN-10** 바코드 OFF 시안
- `tu-body--main`:
  - `tu-hero` — **SPEC-MAIN-11** 개인화 인사 (display 32px stacked headline)
  - `tu-section` + `tu-carousel` — **SPEC-MAIN-12** 실시간 인기 (애플뮤직 톤, 220px 가로 카드, lilac/peach/blue 미디어)
  - `tu-promo` — **SPEC-MAIN-13** 빅배너 (accent-soft, 좌 텍스트 + 우 그라데이션 미디어)
  - `tu-section` + `tu-list` — **SPEC-MAIN-14** 인기 OTT (네이버쇼핑 dense rank list)
  - `tu-notice` — **SPEC-MAIN-15** 일반 배너
- `tu-gnb` — MY/검색/쇼핑 (MY active, T-brand color)

### 접근권한 안내 (`tu-dsp-main-mo-02-pg-002.html`)

- `tu-app-top--close` — 미니멀 close-only 헤더 (× 버튼 only, blur·status 제거)
- `tu-body--detail`:
  - `tu-hero` — display headline + sub
  - `tu-group-label` + `tu-group-card` × 2 — **SPEC-MAIN-16** 필수/선택 권한 그룹
  - `tu-perm` — accent-soft 아이콘 박스 + chip(필수/선택)
  - `tu-notice` — 보조 안내
- `tu-sticky` + `tu-cta` — **SPEC-MAIN-17** 56px 풀너비 brand CTA

### 혜택·이벤트 약관동의 BS (`tu-my-agr-mo-02-bs-001.html`)

- `tu-parent-silhouette` — 부모 화면(발견_case2_로그인) blur(2px) + opacity 0.35 silhouette
- `tu-backdrop` — dimmed 0.55
- `tu-sheet` — 상단 handle + sheet (radius 24px top)
  - **SPEC-AGR-01** 동의 항목 리스트 — `tu-check-row` × 2 (default ON, 토스 원형 체크)
  - **SPEC-AGR-02** `tu-cta` (동의하고 시작하기)
  - `tu-text-btn--underline` — 30일간 보지 않기

## 보는 법

1. 폴더 통째로 두기 (`_tu-tone.css`와 HTML 3개 같은 디렉토리)
2. 임의 `tu-*.html` 더블클릭

## v2.1 디자인 토큰

`_tu-tone.css :root` 참조:

- 캔버스: 360 × 740, radius 32px
- 톤 베이스: `--tu-bg #f2f4f6` / `--tu-bg-alt #fff`
- 브랜드: `--tu-accent #3617ce` (T-brand) / `--tu-accent-soft #eceaff` / `--tu-accent-strong #2310aa`
- 텍스트: `--tu-text #191f28` / `--tu-text-sub #6b7684`
- 라인: `--tu-line #e5e8eb` / `--tu-line-soft #f0f1f3`
- 추가 spacing: `--tu-sp-40 40` / `--tu-sp-48 48` / `--tu-sp-56 56`

## strain 신호 (v2.1 기준 — 회의용)

| 항목 | 분류 | 설명 |
|---|---|---|
| `tu-app-top--close` | 부분 깨짐 | 시스템 `GlobalNavigationHeader`에 close-only variant 부재. 임시 modifier로 우회. variant="close-only" 신설 의제 |
| `tu-sticky` slot | 부분 깨짐 | `ScreenChrome.stickyAction`이 raw position:absolute 컨테이너 요구. `StickyActionBar` pattern으로 흡수 가능 |
| `tu-check` | 명백 깨짐 | atom/checkbox(circular) 컴포넌트 없음. raw input + 자체 CSS 사용 |
| `tu-text-btn--underline` | 명백 깨짐 | ghost text-button variant 부재 |
| BottomSheet | 명백 깨짐 | React 구현 부재. backdrop + sheet markup을 화면이 직접 조립 |
| 부모 silhouette | 부분 깨짐 | BS 컨텍스트 명시용 blurred parent 표현이 system 어휘에 없음 |
| `TuCarousel` 가로 스크롤 카드 | 부분 깨짐 | `home-kit`엔 carousel 패턴 없음. `patterns/Carousel` 승격 후보 |
| `tu-promo` accent-soft | 부분 깨짐 | 기존 `Banner variant=top|offering`만 — accent-soft 톤은 신규 variant 필요 |

## 출처

- spec JSON: `data/screens/spec/tu-functions/<SCREEN_ID>.json`
- 라우트: `app2/src/app/<screen-id-lower>/{page.tsx, _mock.ts}`
- 톤 CSS 원본: `app2/src/app/handoff-tu-tone.css`
- React kit: `app2/src/components/tu-kit/index.tsx`
