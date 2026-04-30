# 멤버십 화면 정적 견본 (옆팀 전달용)

home-kit / payment-kit / auth-kit 톤으로 빌드한 멤버십 17화면의 standalone HTML 샘플.
React/Next.js/WDS 의존성 없음, 더블클릭으로 브라우저에서 바로 열림.

## 파일

### 공용 CSS
- `_shared.css` — 공용 토큰·셸·카드·타이포·placeholder
- `_payment.css` — DetailShell·StepBar·Hero·Field·InfoBox·DetailGrid·StickyCTA·ResultIcon 등 (멤버십도 그대로 사용)
- `_membership.css` — 멤버십 전용 부품 (TermsRow / CheckIndicator / CheckList / MethodToggle / StatusRowList / ActionChip / CharCountTextarea)

### 멤버십 17화면 (NC 정책서 PR-MBR-CS-001~004 매핑)

**가입 (5)**
- `membership-01-signup-terms.html` — 약관 동의 (PR-MBR-CS-001-01)
- `membership-02-signup-info-form.html` — 회원 정보 입력 (PR-MBR-CS-001-02)
- `membership-03-verification-identity.html` — 본인인증 (PR-MBR-CS-001-03)
- `membership-04-membership-validation.html` — 회원 검증 (PR-MBR-CS-001-04)
- `membership-05-signup-processing.html` — 가입 완료 (PR-MBR-CS-001-05)

**로그인 / 휴면 (4)**
- `membership-06-login.html` — 로그인 (PR-MBR-CS-002-01)
- `membership-07-dormancy-check.html` — 휴면 여부 확인 (PR-MBR-CS-002-02)
- `membership-08-dormancy-recovery.html` — 휴면 해제 처리 중 (PR-MBR-CS-002-05)
- `membership-09-dormancy-recovery-complete.html` — 휴면 해제 완료 (PR-MBR-CS-002-06)

**탈퇴 (5)**
- `membership-10-withdrawal-reason-input.html` — 탈퇴 사유 입력 (PR-MBR-CS-003-02)
- `membership-11-withdrawal-pre-notice.html` — 탈퇴 전 안내 (PR-MBR-CS-003-03)
- `membership-12-withdrawal-final-consent.html` — 탈퇴 최종 동의 (PR-MBR-CS-003-04)
- `membership-13-withdrawal-processing.html` — 탈퇴 처리 중 (PR-MBR-CS-003-05)
- `membership-14-withdrawal-complete.html` — 탈퇴 완료 (PR-MBR-CS-003-06)

**재가입 (3)**
- `membership-15-rejoin-history-check.html` — 기존 회원 이력 확인 (PR-MBR-CS-004-02)
- `membership-16-rejoin-eligibility.html` — 재가입 가능 여부 (PR-MBR-CS-004-03)
- `membership-17-rejoin-processing.html` — 재가입 완료 (PR-MBR-CS-004-05)

## 보는 법

1. zip 풀고 폴더 통째로 두기
2. 임의 `membership-XX-*.html` 파일 더블클릭

## 디자인 시스템

- 모바일 360×740 캔버스
- 색·그림자·radius·spacing은 `_shared.css :root`에 CSS 변수로 정의
- 출처: `app/src/components/home-kit/tokens.ts` + `payment-kit/*` + `auth-kit/*` + `@wanteddev/wds` theme
- 이미지/아이콘은 투명 체커보드 placeholder (실제 자산 교체 대상). 핵심 아이콘은 inline SVG 또는 emoji
- 라디오/체크 상태는 mock의 selected 값을 정적으로 표현

## 인터랙션 (vanilla)

- 버튼/필드는 모두 정적 — 시각 검토용 스냅샷
- `membership-08` (휴면 해제 처리 중) / `membership-13` (탈퇴 처리 중) 의 ⟳ 아이콘만 CSS animation으로 회전
