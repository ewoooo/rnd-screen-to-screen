---
모듈 ID: MBR
컴포넌트 ID: ogn-MBR-action-area-terms
컴포넌트 명: 약관 동의 CTA
컴포넌트 설명: 약관 동의 완료 후 다음 단계로 이동하는 하단 고정 CTA 버튼 영역
관련 정책서: PG-MBR-TERM-001
연관 설계서: NOVA-MBR-PG-001-0
배포일: 2026-05-08
배포자: (auto)
현재 버전: 1.0.0
---

## 오가니즘 정보

| 오가니즘 ID | 오가니즘 명 | 오가니즘 설명 | 영역 레이아웃 | 노출 조건 | 노출 케이스 |
|---|---|---|---|---|---|
| ogn-MBR-action-area-terms | 약관 동의 CTA | 약관 동의 완료 후 다음 단계로 이동하는 하단 고정 CTA 버튼 영역 | vertical | 항상 | [영역명] 약관 동의 CTA — 다음 단계 이동<br>[액션:tap 다음 버튼] navigate NOVA-MBR-PG-002-0<br>[조건:필수 약관 미동의] 다음 버튼 disabled 처리<br>[고지:필수\|POL-MBR-TERM-001-06] 필수 약관 미동의 시 진행 불가 |

## 상태 시나리오

| 상태 | 트리거 | 컴포넌트 변화 | 액션 |
|---|---|---|---|
| default | 화면 진입 정상 | 다음 버튼 disabled 상태 | - |
| blocked | 필수 약관 미동의 | 다음 버튼 disabled 유지 | setState errorHighlight |

## 컴포넌트 상세

| no. | 컴포넌트 ID | 컴포넌트 명 | Montage 컴포넌트 | variant | 이벤트 | 액션 | 액션 파라미터 | 비고 |
|---|---|---|---|---|---|---|---|---|
| 1 | action-area-next | 다음 버튼 영역 | action-area | strong | onClick | navigate | NOVA-MBR-PG-002-0 | [정책:POL-MBR-TERM-001-06] 필수 약관 미동의 시 disabled |
