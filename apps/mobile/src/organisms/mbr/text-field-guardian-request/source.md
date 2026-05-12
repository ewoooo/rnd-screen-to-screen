---
모듈 ID: MBR
컴포넌트 ID: ogn-MBR-text-field-guardian-request
컴포넌트 명: 법정대리인 동의 요청
컴포넌트 설명: 만 14세 미만 고객의 법정대리인 이름·연락처를 입력받고 동의 요청을 발송하는 영역
관련 정책서: PG-MBR-TERM-002
연관 설계서: NOVA-MBR-PG-001-0
배포일: 2026-05-08
배포자: (auto)
현재 버전: 1.0.0
---

## 오가니즘 정보

| 오가니즘 ID | 오가니즘 명 | 오가니즘 설명 | 영역 레이아웃 | 노출 조건 | 노출 케이스 |
|---|---|---|---|---|---|
| ogn-MBR-text-field-guardian-request | 법정대리인 동의 요청 | 만 14세 미만 고객의 법정대리인 이름·연락처를 입력받고 동의 요청을 발송하는 영역 | vertical | 만 14세 미만 고객 | [영역명] 법정대리인 동의 요청 — 만 14세 미만 고객 대상<br>[조건:만 14세 미만] 법정대리인 동의 요청 폼 노출<br>[액션:tap 동의 요청 버튼] apiCall<br>[자동:timer 24시간] 만료 시 재요청 필요<br>[고지:필수\|POL-MBR-TERM-002-01] 법정대리인 동의 대상 (만 14세 미만) |

## 상태 시나리오

| 상태 | 트리거 | 컴포넌트 변화 | 액션 |
|---|---|---|---|
| default | 화면 진입 정상 (만 14세 미만 고객) | 법정대리인 정보 입력 폼 및 안내 메시지 표시 | - |
| error | 동의 요청 실패 / 유효시간 만료 | section-message-guardian-info 오류 안내 | apiCall |

## 컴포넌트 상세

| no. | 컴포넌트 ID | 컴포넌트 명 | Montage 컴포넌트 | variant | 이벤트 | 액션 | 액션 파라미터 | 비고 |
|---|---|---|---|---|---|---|---|---|
| 1 | section-message-guardian-info | 법정대리인 동의 안내 | section-message | info | - | - | - | [정책:POL-MBR-TERM-002-01] 법정대리인 동의 대상 안내 |
| 2 | text-field-guardian-name | 법정대리인 이름 입력 | text-field | - | onChange | setState | guardianName | 법정대리인 이름 입력 필드 |
| 3 | text-field-guardian-phone | 법정대리인 연락처 입력 | text-field | - | onChange | setState | guardianPhone | 법정대리인 연락처 입력 필드 |
| 4 | button-guardian-consent-request | 동의 요청 전송 버튼 | button | solid | onClick | apiCall | - | [정책:POL-MBR-TERM-002-05] timerDuration: 86400 |
