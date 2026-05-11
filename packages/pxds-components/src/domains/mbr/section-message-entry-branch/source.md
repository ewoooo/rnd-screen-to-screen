---
모듈 ID: MBR
컴포넌트 ID: ogn-MBR-section-message-entry-branch
컴포넌트 명: 가입 진입 분기 안내
컴포넌트 설명: 이미 가입된 회원 / 휴면 회원 / 재가입 제한 대상 진입 시 분기 안내 메시지와 액션 버튼을 제공하는 영역
관련 정책서: PG-MBR-INFO-003
연관 설계서: NOVA-MBR-PG-002-0
배포일: 2026-05-08
배포자: (auto)
현재 버전: 1.0.0
---

## 오가니즘 정보

| 오가니즘 ID | 오가니즘 명 | 오가니즘 설명 | 영역 레이아웃 | 노출 조건 | 노출 케이스 |
|---|---|---|---|---|---|
| ogn-MBR-section-message-entry-branch | 가입 진입 분기 안내 | 이미 가입된 회원 / 휴면 회원 / 재가입 제한 대상 진입 시 분기 안내 메시지와 액션 버튼을 제공하는 영역 | vertical | 진입 제한 사유 존재 시 | [영역명] 가입 진입 분기 안내 — 이미 가입 / 휴면 / 재가입 제한 대상 안내<br>[조건:이미 가입된 회원] 로그인 또는 내정보 안내<br>[조건:휴면 회원] 휴면 해제 안내<br>[조건:재가입 제한 대상] 제한 안내<br>[상태:error] 진입 제한 조건 해당 시 안내 메시지 노출 |

## 상태 시나리오

| 상태 | 트리거 | 컴포넌트 변화 | 액션 |
|---|---|---|---|
| default | 진입 제한 사유 존재 시 | section-message-entry-guide 및 button-entry-action 표시 | - |
| error | 진입 제한 조건 해당 | section-message cautionary 안내 메시지 표시 | setState entryGuideVisible |

## 컴포넌트 상세

| no. | 컴포넌트 ID | 컴포넌트 명 | Montage 컴포넌트 | variant | 이벤트 | 액션 | 액션 파라미터 | 비고 |
|---|---|---|---|---|---|---|---|---|
| 1 | section-message-entry-guide | 진입 분기 안내 메시지 | section-message | cautionary | - | - | - | [정책:PG-MBR-INFO-003] 가입 진입 조건 기준 적용 |
| 2 | button-entry-action | 분기 안내 액션 버튼 | button | outlined | onClick | navigate | 조건부 | 이미 가입: 로그인 화면 이동 / 휴면: 휴면해제 화면 이동 — [정책:POL-MBR-ROUTE-001-02\|POL-MBR-ROUTE-001-03] |
