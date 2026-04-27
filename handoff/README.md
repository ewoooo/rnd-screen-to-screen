# 결제 화면 정적 견본 (옆팀 전달용)

home-kit / payment-kit 톤으로 빌드한 결제 13화면의 standalone HTML 샘플.
React/Next.js/WDS 의존성 없음, 더블클릭으로 브라우저에서 바로 열림.

## 파일

### 공용 CSS
- `_shared.css` — 공용 토큰·셸·카드·타이포·placeholder
- `_payment.css` — 결제 플로우 전용 부품 (StepBar, MethodCard, FieldInput, StickyCTA, ResultIcon, BottomSheet, AmountRow, DetailGrid, ActionRow 등)

### 결제 13화면 (Figma SCREEN 1~9 매핑)
- `payment-01-method-register.html` — 주 결제 수단 선택 (3.1.1)
- `payment-02-card-form.html` — 카드 정보 입력 (3.1.1.2)
- `payment-03-account-form.html` — 계좌 정보 입력 (3.1.1.2)
- `payment-04-supplement-add.html` — 보조 결제 수단 추가 (3.1.2)
- `payment-05-tplus-setting.html` — T+ 포인트 설정 (3.1.2.1)
- `payment-06-coupon-select.html` — 쿠폰 선택 (3.1.2.2)
- `payment-07-voucher-select.html` — 이용권 선택 (3.1.2.2)
- `payment-08-processing.html` — 결제 처리 중 (3.3.1.1)
- `payment-09-success.html` — 결제 완료 (3.3 / 3.5.2)
- `payment-10-recurring-failure.html` — 정기 결제 실패 (3.4.2.1)
- `payment-11-recurring-hold.html` — 정기 결제 보류 (3.4.2.1 D+3)
- `payment-12-instant.html` — 즉시 결제 (3.4.2.2)
- `payment-13-subscription-canceled.html` — 구독 해지 (3.4 / 3.5.1)

## 보는 법

1. 폴더 통째로 복사
2. 임의 `payment-XX-*.html` 파일 더블클릭

## 디자인 시스템

- 모바일 360×740 캔버스
- 색·그림자·radius·spacing은 모두 `_shared.css :root`에 CSS 변수로 정의
- 출처: 본 프로젝트 `app/src/components/home-kit/tokens.ts` + `app/src/components/payment-kit/*` + `@wanteddev/wds` theme
- 이미지/아이콘은 투명 체커보드 placeholder (실제 자산 교체 대상). 일부 핵심 아이콘은 inline SVG 또는 emoji
- 라디오/선택 상태는 mock 의 selected 값 1개를 정적으로 표현

## 인터랙션 (vanilla)

- 버튼/필드는 모두 정적 — 핸드오프 시각 검토용 스냅샷
- payment-08 (결제 처리 중) 의 스피너만 CSS animation 으로 회전

## 소스 매핑

각 파일은 `app/src/app/<screen>/v?-mockup/page.tsx` 의 360×800 렌더 결과를
컴포넌트 라이브러리 무관 raw HTML+CSS 로 평탄화한 결과다.
mock 데이터는 같은 폴더의 `_mock.ts` 값을 그대로 박았다.
