---
모듈 ID: MBR
컴포넌트 ID: ogn-MBR-checkbox-terms
컴포넌트 명: 약관 동의
컴포넌트 설명: 필수·선택 약관 목록을 표시하고 전체 동의 및 개별 동의를 처리하는 영역
관련 정책서: PG-MBR-TERM-001, PG-MBR-TERM-003, PG-MBR-TERM-002
연관 설계서: NOVA-MBR-PG-001-0
배포일: 2026-05-08
배포자: (auto)
현재 버전: 1.0.0
---

## 오가니즘 정보

| 오가니즘 ID | 오가니즘 명 | 오가니즘 설명 | 영역 레이아웃 | 노출 조건 | 노출 케이스 |
|---|---|---|---|---|---|
| ogn-MBR-checkbox-terms | 약관 동의 | 필수·선택 약관 목록을 표시하고 전체 동의 및 개별 동의를 처리하는 영역 | vertical | 항상 | [영역명] 약관 동의 — 필수·선택 약관 목록 및 전체 동의<br>[액션:tap 전체동의 체크박스] setState allTermsChecked<br>[액션:tap 개별약관 체크박스] setState termChecked<br>[액션:tap 약관 상세보기] setState accordionExpanded<br>[상태:loading] skeleton 표시<br>[상태:error] 약관 버전 불일치 / 동의 저장 실패 안내<br>[고지:필수\|POL-MBR-TERM-001-01] 필수 약관 목록<br>[고지:사용성\|POL-MBR-TERM-001-02] 선택 약관 목록<br>[고지:필수\|POL-MBR-TERM-001-06] 필수 약관 미동의 시 진행 불가<br>[고지:사용성\|POL-MBR-TERM-001-08] 전체 동의 범위 |

## 상태 시나리오

| 상태 | 트리거 | 컴포넌트 변화 | 액션 |
|---|---|---|---|
| default | 화면 진입 정상 | 약관 목록 표시, 전체동의 체크박스 미선택 | - |
| loading | API 호출 중 | skeleton 표시 | - |
| error | 약관 버전 불일치 / 저장 실패 | section-message-terms-error 노출 | setState termsErrorVisible |
| blocked | 필수 약관 미동의 상태 | 다음 버튼 disabled, 오류 안내 유지 | setState errorHighlight |

## 컴포넌트 상세

| no. | 컴포넌트 ID | 컴포넌트 명 | Montage 컴포넌트 | variant | 이벤트 | 액션 | 액션 파라미터 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

