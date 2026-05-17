# NOVA-CHG-FP-001-0 - Screen Map

## Screen Scope

- screenId: `NOVA-CHG-FP-001-0`
- sourceMode: `SB-only`
- source: `/Users/wooseong/Desktop/SB-CHG-UC01_0517`
- domain: `chg`
- task: 현재 요금제와 변경 가능 조건을 확인하고 요금제 탐색으로 진입한다.
- policyCoverage: 정책 원문 없음. SB의 `POL-CHG-PLAN-*` 값은 검증된 policy-core ID가 아니라 SB source hint로만 사용한다.
- governanceRefs: []
- notApplicableReason: SB-only 제작이며 policy-core/governance 원문이 제공되지 않았다.

## Requirement Matrix

| requirement | sourceRef | screen role | user copy | OGN | status |
| --- | --- | --- | --- | --- | --- |
| 현재 요금제 요약 | `screen/NOVA-CHG-FP-001-0.md`, `organism/ogn-chg-current-plan-summary.md` | 현재 상품 확인 | 현재 이용 상품, 현재 요금제, 월정액, 데이터, 할인 | `ogn-chg-current-plan-summary` | mapped |
| 변경 가능 조건 확인 | `organism/ogn-chg-change-eligibility.md` | 진행 가능/제한 안내 | 변경 가능, 확인해 주세요 | `ogn-chg-change-eligibility` | mapped |
| 요금제 탐색 진입 | `screen/NOVA-CHG-FP-001-0.md` | 다음 화면 이동 | 요금제 보러가기 | `ogn-chg-change-eligibility` | mapped |

## Constraints / Errors

| case | SB behavior | treatment |
| --- | --- | --- |
| `NOVA-CHG-FP-001-E1` | 변경 제한 | 제한 사유와 다음 가능일 안내, 진행 제한 |
| `NOVA-CHG-FP-001-E2` | 현재 요금제 조회 실패 | 재시도 안내 |
| `NOVA-CHG-FP-001-E3` | 미지원 회선 | 고객센터 안내 |

## Governance Review

정책/governance 원문이 없으므로 refs는 선택하지 않는다. CTA hierarchy, inline notice, fixed bottom action은 `DESIGN_PATTERNS.md`와 SB 화면 구성에 따라 적용한다.
