---
모듈 ID: MBR
컴포넌트 ID: ogn-MBR-list-cell-auth-method
컴포넌트 명: 본인인증 수단 선택 및 인증
컴포넌트 설명: 휴대폰/PASS/공동인증서 중 인증수단을 선택하고 인증번호를 입력·검증하는 영역
관련 정책서: PG-MBR-AUTH-001, PG-MBR-AUTH-002, PG-MBR-AUTH-003, PG-MBR-AUTH-004, PG-MBR-AUTH-005, PG-MBR-AUTH-006
연관 설계서: NOVA-MBR-PG-003-0
배포일: 2026-05-08
배포자: (auto)
현재 버전: 1.0.0
---

## 오가니즘 정보

| 오가니즘 ID | 오가니즘 명 | 오가니즘 설명 | 영역 레이아웃 | 노출 조건 | 노출 케이스 |
|---|---|---|---|---|---|
| ogn-MBR-list-cell-auth-method | 본인인증 수단 선택 및 인증 | 휴대폰/PASS/공동인증서 중 인증수단을 선택하고 인증번호를 입력·검증하는 영역 | vertical | 항상 | [영역명] 본인인증 수단 선택 및 인증 — 휴대폰/PASS/공동인증서 선택 및 인증<br>[액션:tap 인증수단 라디오] setState selectedAuthMethod<br>[액션:tap 인증번호 요청 버튼] apiCall<br>[액션:tap 재요청 버튼] apiCall<br>[액션:tap 인증번호 입력 필드] setState authCode<br>[자동:timer 3분] 만료 시 재요청 필요<br>[상태:loading] skeleton 표시<br>[상태:error] 인증번호 불일치 / 인증 시간 초과 / 잔여 시도 횟수 안내<br>[상태:blocked] 최대 실패 초과 — 인증 제한 10분<br>[고지:필수\|POL-MBR-AUTH-002-01] 허용 인증수단 (휴대폰, PASS, 공동인증서)<br>[고지:사용성\|POL-MBR-AUTH-003-03] 인증번호 유효시간 3분<br>[고지:사용성\|POL-MBR-AUTH-004-01] 재요청 쿨다운 60초<br>[고지:사용성\|POL-MBR-AUTH-004-02] 재요청 최대 5회<br>[고지:사용성\|POL-MBR-AUTH-005-01] 인증 실패 최대 5회<br>[고지:사용성\|POL-MBR-AUTH-005-03] 인증 제한 10분 |

## 상태 시나리오

| 상태 | 트리거 | 컴포넌트 변화 | 액션 |
|---|---|---|---|
| default | 화면 진입 정상 | 인증수단 선택 목록 표시, 인증번호 입력 영역 비활성 | - |
| loading | API 호출 중 | skeleton 표시 | - |
| error | 인증번호 불일치 / 시간 초과 | section-message-auth-error 노출, 잔여 횟수 표시 | setState authErrorVisible |
| blocked | 최대 실패 초과 (5회) | 인증 제한 안내, 버튼 disabled, 10분 타이머 시작 | setState authLocked |

## 컴포넌트 상세

| no. | 컴포넌트 ID | 컴포넌트 명 | Montage 컴포넌트 | variant | 이벤트 | 액션 | 액션 파라미터 | 비고 |
|---|---|---|---|---|---|---|---|---|
| 1 | list-cell-auth-method | 인증수단 선택 목록 | list-cell | - | onClick | setState | selectedAuthMethod | [정책:POL-MBR-AUTH-002-01] 허용 인증수단 options: 휴대폰\|PASS\|공동인증서 |
| 2 | text-field-auth-code | 인증번호 입력 | text-field | - | onChange | setState | authCode | 인증번호 6자리 입력 |
| 3 | text-timer | 인증 유효시간 타이머 | text | - | - | - | - | [정책:POL-MBR-AUTH-003-03] timerDuration: 180 |
| 4 | button-auth-request | 인증번호 요청 버튼 | button | solid | onClick | apiCall | - | 최초 요청 버튼 |
| 5 | button-auth-resend | 재요청 버튼 | button | outlined | onClick | apiCall | - | [정책:POL-MBR-AUTH-004-01] 쿨다운 60초 / [정책:POL-MBR-AUTH-004-02] maxRetry: 5 |
| 6 | section-message-auth-error | 인증 오류 안내 | section-message | negative | - | setState | authErrorVisible | [정책:POL-MBR-AUTH-005-01] max: 5 / [정책:POL-MBR-AUTH-005-03] lockDuration: 600 |
| 7 | action-area-auth-complete | 인증 완료 버튼 영역 | action-area | strong | onClick | navigate | NOVA-MBR-PG-005-0 | 인증 미완료 시 disabled |
