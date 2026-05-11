---
모듈 ID: MBR
컴포넌트 ID: ogn-MBR-text-field-member-info
컴포넌트 명: 회원정보 입력 폼
컴포넌트 설명: 아이디, 비밀번호, 이메일, 연락처 등 회원 가입 필수 정보를 입력하는 폼 영역
관련 정책서: PG-MBR-INFO-001, PG-MBR-INFO-002
연관 설계서: NOVA-MBR-PG-002-0
배포일: 2026-05-08
배포자: (auto)
현재 버전: 1.0.0
---

## 오가니즘 정보

| 오가니즘 ID | 오가니즘 명 | 오가니즘 설명 | 영역 레이아웃 | 노출 조건 | 노출 케이스 |
|---|---|---|---|---|---|
| ogn-MBR-text-field-member-info | 회원정보 입력 폼 | 아이디, 비밀번호, 이메일, 연락처 등 회원 가입 필수 정보를 입력하는 폼 영역 | vertical | 항상 | [영역명] 회원정보 입력 폼 — 아이디, 비밀번호, 이메일, 연락처 입력<br>[액션:tap 아이디 필드] setState userId<br>[액션:tap 비밀번호 필드] setState password<br>[액션:tap 비밀번호 확인 필드] setState passwordConfirm<br>[액션:tap 이메일 필드] setState email<br>[액션:tap 휴대폰번호 필드] setState phone<br>[액션:tap 중복확인 버튼] apiCall<br>[상태:error] 필수값 누락 / 형식 불일치 / 중복 아이디·이메일·휴대폰 안내 |

## 상태 시나리오

| 상태 | 트리거 | 컴포넌트 변화 | 액션 |
|---|---|---|---|
| default | 화면 진입 정상 | 빈 입력 폼 표시 | - |
| error | 형식 불일치 / 중복 확인 실패 | 해당 필드 하단 section-message-input-error 노출 | setState inputErrorVisible |
| blocked | 필수값 누락 | 다음 버튼 disabled 유지 | setState errorHighlight |

## 컴포넌트 상세

| no. | 컴포넌트 ID | 컴포넌트 명 | Montage 컴포넌트 | variant | 이벤트 | 액션 | 액션 파라미터 | 비고 |
|---|---|---|---|---|---|---|---|---|
| 1 | text-field-user-id | 아이디 입력 | text-field | - | onChange | setState | userId | [정책:POL-MBR-INFO-002-03] 영숫자, [정책:POL-MBR-INFO-002-04] 길이 6~20자 |
| 2 | button-id-duplicate-check | 아이디 중복확인 버튼 | button | outlined | onClick | apiCall | - | 중복 아이디 시 오류 메시지 표시 |
| 3 | text-field-password | 비밀번호 입력 | text-field | - | onChange | setState | password | [정책:POL-MBR-INFO-002-05] 길이 10~20자 |
| 4 | text-field-password-confirm | 비밀번호 확인 입력 | text-field | - | onChange | setState | passwordConfirm | 비밀번호 불일치 시 오류 표시 |
| 5 | text-field-email | 이메일 입력 | text-field | - | onChange | setState | email | [정책:POL-MBR-INFO-002-06] 이메일 형식 검증 |
| 6 | text-field-phone | 휴대폰번호 입력 | text-field | - | onChange | setState | phone | [정책:POL-MBR-INFO-002-08] 휴대폰 형식 검증 |
| 7 | section-message-input-error | 입력 오류 안내 | section-message | negative | - | setState | inputErrorVisible | 형식 불일치 또는 중복 시 해당 필드 하단 노출 |
