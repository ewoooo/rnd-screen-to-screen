# 멤버십 화면 v2 정적 견본 (정책서 fresh re-read · 22 화면)

같은 NC 멤버십 정책서를 두 번째로 처음부터 다시 읽고 fresh 분할한 결과물.
v1(17화면)과 어휘는 동일하지만 본인인증을 라이프사이클별로 분리해 +5 화면.

## 파일

### 공용 CSS
- `_shared.css` — 공용 토큰·셸·카드·타이포·placeholder
- `_payment.css` — DetailShell·StepBar·Hero·Field·InfoBox·DetailGrid·StickyCTA·ResultIcon
- `_membership.css` — auth-kit 평탄화 (TermsRow / CheckIndicator / CheckList / MethodToggle / StatusRowList / ActionChip / CharCountTextarea)

### v2 22 화면

**가입 (5)** — v1과 동일
- `membership-v2-01-terms-consent-join.html` — 약관 동의 (PR-MBR-CS-001-01)
- `membership-v2-02-personal-info-input-join.html` — 개인정보 입력 (PR-MBR-CS-001-02)
- `membership-v2-03-identity-auth-join.html` — 본인인증 (가입) (PR-MBR-CS-001-03)
- `membership-v2-04-member-validation-join.html` — 회원 검증 (PR-MBR-CS-001-04)
- `membership-v2-05-registration-finalize-join.html` — 가입 완료 (PR-MBR-CS-001-05)

**휴면 (6)** — v1 대비 +2 (본인인증·약관 재동의 분리)
- `membership-v2-06-login-dormancy-check.html` — 로그인 (PR-MBR-CS-002-01)
- `membership-v2-07-dormancy-status-check.html` — 휴면 여부 확인 (PR-MBR-CS-002-02)
- `membership-v2-08-identity-auth-dormancy.html` — **본인인증 (휴면 해제)** (PR-MBR-CS-002-03) · v2 신규
- `membership-v2-09-terms-reconsent-dormancy.html` — **약관 재동의 (휴면)** (PR-MBR-CS-002-04) · v2 신규
- `membership-v2-10-dormancy-release-process.html` — 휴면 해제 처리 중 (PR-MBR-CS-002-05)
- `membership-v2-11-dormancy-release-result.html` — 휴면 해제 완료 (PR-MBR-CS-002-06)

**탈퇴 (6)** — v1 대비 +1 (본인인증 분리)
- `membership-v2-12-identity-auth-withdrawal.html` — **본인인증 (탈퇴)** (PR-MBR-CS-003-01) · v2 신규
- `membership-v2-13-withdrawal-reason-input.html` — 탈퇴 사유 입력 (PR-MBR-CS-003-02)
- `membership-v2-14-withdrawal-impact-notification.html` — 탈퇴 전 안내 (PR-MBR-CS-003-03)
- `membership-v2-15-withdrawal-final-consent.html` — 탈퇴 최종 동의 (PR-MBR-CS-003-04)
- `membership-v2-16-withdrawal-finalize.html` — 탈퇴 처리 중 (PR-MBR-CS-003-05)
- `membership-v2-17-withdrawal-result-confirm.html` — 탈퇴 완료 (PR-MBR-CS-003-06)

**재가입 (5)** — v1 대비 +2 (본인인증·정보 입력 분리)
- `membership-v2-18-identity-auth-rejoin.html` — **본인인증 (재가입)** (PR-MBR-CS-004-01) · v2 신규
- `membership-v2-19-prior-history-review.html` — 기존 회원 이력 확인 (PR-MBR-CS-004-02)
- `membership-v2-20-rejoin-eligibility-check.html` — 재가입 가능 여부 (PR-MBR-CS-004-03)
- `membership-v2-21-personal-info-input-rejoin.html` — **정보 입력 (재가입)** (PR-MBR-CS-004-04) · v2 신규
- `membership-v2-22-rejoin-finalize.html` — 재가입 완료 (PR-MBR-CS-004-05)

## v1과의 차이

| 클러스터 | v1 | v2 | 추가 |
|---|---|---|---|
| 가입 | 5 | 5 | — |
| 휴면 | 4 | 6 | 본인인증 + 약관 재동의 |
| 탈퇴 | 5 | 6 | 본인인증 |
| 재가입 | 3 | 5 | 본인인증 + 정보 입력 |
| **합계** | **17** | **22** | **+5** |

+5 차이는 *전적으로 본인인증의 라이프사이클별 분리 여부*에서 발생.
정책서 PR-MBR-CS-002-03 / 003-01 / 004-01 항목이 별도 process 단위로 명시된 점을 v2가 충실히 반영.

자세한 비교는 저장소 `data/comparison-v1-v2.md` 참고.

## 보는 법

1. zip 풀고 폴더 통째로 두기
2. 임의 `membership-v2-XX-*.html` 더블클릭

## 디자인 시스템

- 모바일 360×740 캔버스
- 색·그림자·radius·spacing은 `_shared.css :root`에 CSS 변수로 정의
- 어휘: home-kit/payment-kit/auth-kit 평탄화 — v1과 100% 동일
- 라디오/체크 상태는 mock의 selected 값을 정적으로 표현

## 인터랙션 (vanilla)

- 버튼/필드는 모두 정적 — 시각 검토용 스냅샷
- `membership-v2-10` (휴면 해제 중) / `membership-v2-16` (탈퇴 처리 중) 의 ⟳ 아이콘만 CSS animation 회전
