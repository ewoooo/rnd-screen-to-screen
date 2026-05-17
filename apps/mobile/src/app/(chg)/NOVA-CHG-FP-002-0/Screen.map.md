# NOVA-CHG-FP-002-0 - Screen Map

## Screen Scope

- screenId: `NOVA-CHG-FP-002-0`
- sourceMode: `SB-only`
- source: `/Users/wooseong/Desktop/SB-CHG-UC01_0517`
- domain: `chg`
- task: 변경 가능한 요금제를 탐색하고 하나를 선택한다.
- policyCoverage: 정책 원문 없음. SB policy IDs are source hints only.
- governanceRefs: []
- notApplicableReason: SB-only 제작이며 policy-core/governance 원문이 제공되지 않았다.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | OGN | status |
| --- | --- | --- | --- | --- | --- |
| 필터/정렬 | `ogn-chg-plan-filter.md` | 목록 탐색 조건 제어 | 전체, 데이터 무제한, 7만원 이하, 추천순, 필터 | `ogn-chg-plan-filter` | mapped |
| 요금제 목록 | `ogn-chg-plan-list.md` | 단일 요금제 선택 | 요금제명, 월정액, 데이터, 혜택 | `ogn-chg-plan-list` | mapped |
| 다음 진행 | `screen/NOVA-CHG-FP-002-0.md` | 선택 후 확인 화면 이동 | 다음 | `ogn-chg-plan-list` | mapped |

## Constraints / Errors

| case | SB behavior | treatment |
| --- | --- | --- |
| `NOVA-CHG-FP-002-E1` | 목록 없음 | 조건 변경 또는 고객센터 안내 |
| `NOVA-CHG-FP-002-E2` | 목록 조회 실패 | 재시도 안내 |
| `NOVA-CHG-FP-002-E3` | 선택 불가 상품 | 선택 해제 및 사유 안내 |

## Governance Review

정책/governance refs 없음. 단일 선택 후 CTA 활성화, 필터 결과 없음, 조회 실패는 SB 상태로 유지한다.
