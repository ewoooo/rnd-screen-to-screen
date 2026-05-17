# NOVA-MBR-FP-005-0 — 가입 완료 Map

## Screen Scope

- screenId: `NOVA-MBR-FP-005-0`
- source: `SB`
- pattern: `complete`
- route: `/NOVA-MBR-FP-005-0`
- policyRefs: `(none — 완료 안내, 정책 불요)`
- ognIds: `ogn-mbr-join-complete`
- selectedGovernanceRefs: `UXPT_BTN`, `UXPT_NAV`, `UXPT_RCV`, `VOT_RUL`
- scopeBoundary: 이 map은 SB(`SB-MBR-UC01_02-0513`)의 화면·OGN 정의만 Phase 2 계약으로 정리한다. `ogn-mbr-join-complete`는 항상 노출되는 가입 완료 결과 안내 영역이며, 홈/목적지 이동을 후속 액션으로 제공한다. error 케이스(세션 생성 실패)는 로그인 재시도 안내로 처리한다. 이 화면은 정책 바인딩이 불요한 완료 안내 화면이다. 디자인·레이아웃·배치 판단은 Phase 3 책임이며 여기서 다루지 않는다.

## Phase 2 Policy / Governance Mapping

### Policy Source Matrix

정책 없음. 이 화면은 SB 화면(`NOVA-MBR-FP-005-0`)과 OGN(`ogn-mbr-join-complete`)의 `관련 정책서: -` / `관련 정책 그룹: -` 정의에 따라 정책 바인딩이 불요한 완료 안내 화면이다. policy-core에 매핑할 실재 정책이 존재하지 않으므로 Policy Source Matrix는 비운다(검증기 계약상 FP-005 policyRefs 빈 배열 허용). 화면 요구는 SB 원문만 근거로 작성한다.

| policyRef | sourceText | sourceRef | user-facing requirement | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| (none) | 정책 불요 — 완료 안내 화면 (SB 관련 정책서: `-`) | - | - | - | - | not applicable |

### Screen Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `NOVA-MBR-FP-005-RESULT` | `SB-MBR-UC01_02-0513 / ogn-mbr-join-complete` | 가입 완료 결과를 긍정 메시지로 안내 | `회원 가입이 완료됐어요` | `join-complete` | `ogn-mbr-join-complete` | mapped (정책 불요, SB 근거) |
| `NOVA-MBR-FP-005-NEXT` | `SB-MBR-UC01_02-0513 / ogn-mbr-join-complete` | 홈/목적지 이동 후속 액션 제공 | `홈으로 이동` | `join-complete` | `ogn-mbr-join-complete` | mapped (정책 불요, SB 근거) |
| `NOVA-MBR-FP-005-SESSION-ERROR` | `SB-MBR-UC01_02-0513 / ogn-mbr-join-complete` | 세션 생성 실패 시 로그인 재시도 안내(NOVA-MBR-FP-005-E3) | `로그인 정보를 만들지 못했어요. 다시 로그인해 주세요` | `join-complete` | `ogn-mbr-join-complete` | mapped (정책 불요, SB 근거) |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` | 완료 화면의 후속 이동 버튼이 다음 행동을 명확히 제시하는 단일 핵심 실행 행동이다. | `NOVA-MBR-FP-005-NEXT` | Primary 1개로 행동·결과를 명시한 라벨을 쓰고, 동일 강도의 경쟁 버튼을 나열하지 않는다. | - |
| `UXPT_NAV` | 가입 완료 후 닫기/이동 위치는 사전 정의된 기준 화면(홈)으로 고정되어야 한다. | `NOVA-MBR-FP-005-NEXT` | 완료 후 이동 위치를 홈으로 고정하고, 뒤로 가기로 입력 단계로 되돌아가지 않도록 한다. | - |
| `UXPT_RCV` | 세션 생성 실패 error 케이스(NOVA-MBR-FP-005-E3)는 재시도/대체 경로를 제시하는 복구 흐름이다. | `NOVA-MBR-FP-005-SESSION-ERROR` | 실패 시 단일 `확인`이 아니라 로그인 재시도를 우선 경로(Primary)로 제시한다. | - |
| `VOT_RUL` | 완료 안내·에러 카피를 일관된 어체로 통일하고, 완료 단계의 사실 전달에 합니다체를 제한적으로 허용한다. | 모든 mapped requirement | 기본 해요체로 통일하되, 회사 책임·사실 전달이 필요한 핵심 메시지에만 합니다체를 제한적으로 허용한다(VOT_RUL(ê·ì¹ 1) Exception). | - |

## System-Break Signal

이 화면은 정책 바인딩이 불요한 완료 안내 화면이다. SB 화면(`NOVA-MBR-FP-005-0`)과 OGN(`ogn-mbr-join-complete`) 모두 `관련 정책서: -`, `관련 정책 그룹: -`로 정의되어 있어 policy-core에 매핑할 실재 정책이 존재하지 않는다(정책 불요, 갭 아님). 따라서 Policy Source Matrix는 비어 있으며, 화면 요구·카피·error 케이스(세션 생성 실패 → 로그인 재시도 안내)는 SB 원문(`SB-MBR-UC01_02-0513`)만 근거로 작성했다. 추후 정책이 신설되더라도 이 화면은 결과 안내 성격상 정책 바인딩 대상이 아님을 유지한다.

> 갭 요약: 정책 갭 없음. 정책 불요 완료 안내 화면(SB 관련 정책서 `-`). screenId·ognId(`ogn-mbr-join-complete`)·governance refs(`UXPT_BTN`, `UXPT_NAV`, `UXPT_RCV`, `VOT_RUL`)는 본문에 기록 완료.
