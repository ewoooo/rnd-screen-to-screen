# 멤버십 화면 v3 정적 견본 (신규 페이지 스펙 → 신규 마크업)

NC 멤버십 정책서(PR-MBR-CS-001~004)를 다시 처음부터 읽어 22 화면의 spec JSON을 새로 작성하고, 그 spec만으로 standalone HTML 22장을 신규로 조립한 결과물.

**v1·v2 마크업은 참조하지 않음.** v1·v2의 HTML body와 일치 0%, CSS 베이스(`_shared.css` / `_payment.css`)는 byte-identical 복사 — 시스템 어휘를 그대로 두고 새 화면이 같은 어휘로 표현되는지를 측정하는 strain test 형식이다.

## 디렉토리 구조

```
_shared.css        v1/v2와 byte-identical (시스템 베이스 손대지 않음)
_payment.css       v1/v2와 byte-identical (DetailShell·StepBar·Hero·Field·InfoBox·DetailGrid·StickyCTA·ResultIcon)
_membership.css    v2 + v3 strain 확장 3종 (아래)
membership-v3-01 ~ 22-*.html
README.md
```

## v3 strain 확장 (멤버십 도메인에만 추가)

정책서를 다시 읽으면서 22 화면 모두 기존 어휘로 표현되는지 검사한 뒤, 의미 축이 정말 다른 곳 3개에서만 modifier·슬롯을 추가했다. **신규 컴포넌트 0건.**

| # | 어휘 확장 | 사용 화면 | 근거 |
|---|---|---|---|
| 1 | `result-icon--blocked` (red tone) | 04 회원검증·20 재가입 가능여부 | 분기 결과의 "차단·제한" 톤이 success/warning과 의미 축 다름 |
| 2 | `terms-row__delta` (sub line 슬롯) | 09 약관 재동의 | 변경된 약관에서 "무엇이 바뀌었나"를 row 안에서 표현 |
| 3 | `sticky-cta__btn--danger` (red CTA) | 15 탈퇴 최종 동의 | 비가역 처리 톤이 가입/로그인 CTA 톤과 정반대 |

## v3 22 화면 (PR-MBR-CS-001~004 SSOT 매핑)

각 화면 spec은 `data/screens/spec/membership-v3-XX-*.json`에서 entry/exit/predecessor/successor/related_functions/branches/exceptions를 그대로 정책서에서 1:1 추출.

**가입 (5)** — US-MBR-CS-001
- `01-terms-consent-join.html` — 약관 동의 (PR-MBR-CS-001-01)
- `02-personal-info-input-join.html` — 개인정보 입력 (PR-MBR-CS-001-02)
- `03-identity-auth-join.html` — 본인인증 (PR-MBR-CS-001-03)
- `04-member-validation-join.html` — 회원 검증 (PR-MBR-CS-001-04)
- `05-registration-finalize-join.html` — 가입 처리 (PR-MBR-CS-001-05)

**휴면 해제 (6)** — US-MBR-CS-002
- `06-login-dormancy-check.html` — 로그인 (PR-MBR-CS-002-01)
- `07-dormancy-status-check.html` — 휴면 여부 확인 (PR-MBR-CS-002-02)
- `08-identity-auth-dormancy.html` — 본인인증 (PR-MBR-CS-002-03)
- `09-terms-reconsent-dormancy.html` — 약관 재동의 (PR-MBR-CS-002-04)
- `10-dormancy-release-process.html` — 휴면 해제 처리 (PR-MBR-CS-002-05)
- `11-dormancy-release-result.html` — 휴면 해제 완료 (PR-MBR-CS-002-06)

**탈퇴 (6)** — US-MBR-CS-003
- `12-identity-auth-withdrawal.html` — 본인인증 (PR-MBR-CS-003-01)
- `13-withdrawal-reason-input.html` — 탈퇴 사유 입력 (PR-MBR-CS-003-02)
- `14-withdrawal-impact-notification.html` — 탈퇴 전 안내 (PR-MBR-CS-003-03)
- `15-withdrawal-final-consent.html` — 탈퇴 최종 동의 (PR-MBR-CS-003-04)
- `16-withdrawal-finalize.html` — 탈퇴 처리 (PR-MBR-CS-003-05)
- `17-withdrawal-result-confirm.html` — 탈퇴 결과 (PR-MBR-CS-003-06)

**재가입 (5)** — US-MBR-CS-004
- `18-identity-auth-rejoin.html` — 본인인증 (PR-MBR-CS-004-01)
- `19-prior-history-review.html` — 기존 회원 이력 확인 (PR-MBR-CS-004-02)
- `20-rejoin-eligibility-check.html` — 재가입 가능 여부 (PR-MBR-CS-004-03)
- `21-personal-info-input-rejoin.html` — 개인정보 입력 (PR-MBR-CS-004-04)
- `22-rejoin-finalize.html` — 재가입 처리 (PR-MBR-CS-004-05)

## strain test 결과 요약

- **신규 컴포넌트**: 0
- **modifier / 슬롯 추가**: 3 (위 표)
- **자체 토큰 강요**: 0 (모두 WDS `--semantic-*` / `--spacing-*` 또는 기존 `--t-brand` 재사용)
- **inline raw section / 자체 fontSize**: 0
- **본인인증 어휘 4회 재사용** (가입/휴면해제/탈퇴/재가입) — 시스템 generality 강한 통과 신호
- **결과 화면 어휘 4회 재사용** (가입완료/휴면완료/탈퇴완료/재가입완료) — 동일 ResultBlock + StatusCard + ActionChip 패턴

## v1 / v2 / v3 비교

| | v1 | v2 | v3 |
|---|---|---|---|
| 화면 수 | 17 | 22 | 22 |
| spec JSON | 없음 | `data/screens/v2/` (간략) | `data/screens/spec/membership-v3-*` (정책서 entry/exit/branches/exceptions 1:1 추출) |
| 마크업 출처 | 새로 작성 | v1 17화면 복사 + 5장 추가 | spec JSON에서만 신규 조립 (v1·v2 미참조) |
| `_shared.css` | base | v1과 동일 | v1·v2와 byte-identical |
| `_payment.css` | base | v1과 동일 | v1·v2와 byte-identical |
| `_membership.css` | base | v1과 동일 | v2 + 3 strain 확장 |
