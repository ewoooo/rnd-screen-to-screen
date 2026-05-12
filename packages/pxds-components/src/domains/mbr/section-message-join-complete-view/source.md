---
모듈 ID: MBR
컴포넌트 ID: ogn-MBR-section-message-join-complete-view
컴포넌트 명: 가입 완료 화면 제공
컴포넌트 설명: 가입 성공 후 완료 메시지, 후속 액션 목록, 홈 이동 CTA를 제공하는 오가니즘
관련 정책서: PG-MBR-ACCT-001, PG-MBR-SESS-001, PG-MBR-PROF-001
연관 설계서: NOVA-MBR-PG-005-0
배포일: 2026-05-08
배포자: (auto)
현재 버전: 1.0.0
---

## 오가니즘 정보

| 항목 | 내용 |
|---|---|
| 오가니즘 ID | ogn-MBR-section-message-join-complete-view |
| 오가니즘 명 | 가입 완료 화면 제공 |
| 오가니즘 설명 | 가입 완료 메시지, 후속 액션 목록, 홈 이동 CTA로 구성된 완료 화면 영역 |
| 영역 레이아웃 | vertical |
| 노출 조건 | 가입 성공 후 |
| 노출 케이스 | [상태:default] 가입 완료 메시지 및 후속 액션 표시<br>[상태:loading] 세션 생성 중 skeleton<br>[상태:error] 세션 생성 실패 → 로그인 재시도 안내 |

## 컴포넌트 상세

| no. | 컴포넌트 ID | 컴포넌트 명 | Montage 컴포넌트 | variant | 이벤트 | 액션 | 액션 파라미터 | 비고 |
|---|---|---|---|---|---|---|---|---|
| 1 | section-message-complete | 가입 완료 안내 메시지 | section-message | positive | - | - | - | [정책:POL-MBR-ACCT-001-09] 계정 생성 완료 상태: 정상 → statusCode: "NORMAL"<br>[정책:POL-MBR-SESS-001-03] 가입 완료 후 자동 로그인 → autoLogin: true<br>서버 제어: 가입 완료 여부 |
| 2 | list-cell-follow-up-actions | 후속 액션 목록 | list-cell | - | onClick | navigate | - | [정책:POL-MBR-PROF-001-08] 초기 권한 상태: 일반 회원 → role: "GENERAL_MEMBER"<br>서버 제어: 후속 액션 목록, 자동 로그인 여부 |
| 3 | button-go-home | 홈으로 이동 버튼 | button | solid | onClick | navigate | - | [정책:POL-MBR-SESS-001-07] 가입 완료 후 이동 경로: 가입 완료 화면<br>[정책:POL-MBR-SESS-001-04] 세션 유효시간: 24시간 → sessionExpiry: 86400 |
