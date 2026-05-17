# NOVA-MBR-FP-009-0 — 약관 재동의·휴면 해제 Map

## Screen Scope

- screenId: `NOVA-MBR-FP-009-0`
- source: `SB`
- pattern: `form`
- route: `/NOVA-MBR-FP-009-0`
- policyRefs: `POL-MBR-TERM-001-06`
- ognIds: `ogn-mbr-term-list`, `ogn-mbr-term-agree`
- selectedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_NAV`, `UXPT_LOD`, `VOT_RUL`
- scopeBoundary: 이 map은 휴면 해제 흐름에서 재동의가 필요한 약관·고지를 확인하고 동의하는 화면의 정책·governance 계약만 정리한다. 디자인/레이아웃/컴포넌트 어휘 판단은 Phase 3 책임이므로 다루지 않는다. 화면 경로는 `로그인 > 휴면 여부 확인 > 본인인증 > 약관 동의`이며, 재동의 맥락(휴면 해제)을 화면 요구·copy에 반영한다. 화면 전환은 필수 약관 재동의 완료 시 `NOVA-MBR-FP-010-0`(동의이력ID·세션ID 전달)로 한정한다. 이 화면은 미성년자 법정대리인 흐름을 포함하지 않으므로 guardian OGN은 scope 밖이다.

## Phase 2 Policy / Governance Mapping

### Policy Source Matrix

| policyRef | sourceText | user-facing requirement | mapped section | OGN | visible status |
| --- | --- | --- | --- | --- | --- |
| `POL-MBR-TERM-001-06` | 필수 약관에 미동의한 경우 다음 단계 진행을 차단한다. | 필수 약관 동의 후 다음 단계로 진행 가능 | `term-agree`, `actions` | `ogn-mbr-term-agree` | `checkbox-term-required`·`action-area-next` visible. 필수 약관 재동의 미완료 시 `section-message-required-error`(negative)와 다음 단계 진행 차단 상태로 노출 |

### Screen Requirement Matrix

| requirement | sourceRef | screen role | user copy (해요체) | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `FP009-REAGREE-CONTEXT` | `SB-MBR-UC01_02-0513 / ogn-mbr-term-list` | 휴면 해제를 위해 재동의가 필요한 약관·고지임을 알린다 | `휴면 해제를 위해 약관에 다시 동의해 주세요` | `term-list` | `ogn-mbr-term-list` | mapped (SB 근거) |
| `FP009-TERM-LIST` | `SB-MBR-UC01_02-0513 / ogn-mbr-term-list` | 업무별 재동의 필수·선택 약관 목록을 서버에서 조회해 표시한다 | `다시 동의가 필요한 약관을 확인해 주세요` | `term-list` | `ogn-mbr-term-list` | mapped (SB 근거) |
| `FP009-TERM-LIST-LOADING` | `SB-MBR-UC01_02-0513 / ogn-mbr-term-list` | 약관 목록 조회 중 대기 상태를 알린다 | `약관을 불러오고 있어요` | `term-list` | `ogn-mbr-term-list` | mapped (SB 근거) |
| `FP009-TERM-LIST-ERROR` | `SB-MBR-UC01_02-0513 / ogn-mbr-term-list` | 약관 조회 실패 시 재시도를 안내한다 | `약관을 불러오지 못했어요. 다시 시도해 주세요` | `term-list` | `ogn-mbr-term-list` | mapped (SB 근거) |
| `FP009-TERM-DETAIL` | `SB-MBR-UC01_02-0513 / ogn-mbr-term-list` | 개별 약관 전문을 펼쳐 확인할 수 있게 한다 | `약관 전문을 확인해 주세요` | `term-list` | `ogn-mbr-term-list` | mapped (SB 근거) |
| `FP009-TERM-AGREE-ALL` | `SB-MBR-UC01_02-0513 / ogn-mbr-term-agree` | 전체 동의로 재동의 대상 약관을 한 번에 동의 처리한다 | `약관에 모두 다시 동의해요` | `term-agree` | `ogn-mbr-term-agree` | mapped (SB 근거) |
| `FP009-TERM-AGREE-EACH` | `SB-MBR-UC01_02-0513 / ogn-mbr-term-agree` | 필수·선택 약관을 개별 재동의 처리하고 저장한다 | `필수 약관에 다시 동의해요` / `선택 약관에 다시 동의해요` | `term-agree` | `ogn-mbr-term-agree` | mapped (SB 근거) |
| `FP009-TERM-REQUIRED-BLOCK` | `POL-MBR-TERM-001-06` | 필수 약관 재동의 미완료 시 다음 단계 진행을 차단하고 미동의 항목을 알린다 | `필수 약관에 동의해 주세요` | `term-agree`, `actions` | `ogn-mbr-term-agree` | mapped |
| `FP009-NEXT-ACTION` | `POL-MBR-TERM-001-06` | 필수 약관 재동의 완료 시 다음 화면으로 진행한다 | `다음으로 가기` | `actions` | `ogn-mbr-term-agree` | mapped |

모든 mapped 요구는 최소 1개 OGN ID를 가진다. SB 근거 요구의 sourceRef는 `SB-MBR-UC01_02-0513 / <ogn-id>`로 표기했다.

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` | 화면 하단 다음 버튼이 약관 재동의 과업의 단일 primary 행동이며, 필수 약관 미동의 상태에서 진행 차단 상태를 함께 전달한다. UXPT_BTN(ê·ì¹ 2)(동사형 라벨·버튼당 행동 1개) 적용 대상이다. | `FP009-NEXT-ACTION`, `FP009-TERM-REQUIRED-BLOCK` | 다음 버튼은 단일 primary 행동으로 유지하고 모호한 `확인`/`동의` 라벨을 쓰지 않는다. | - |
| `UXPT_ERR` | 정책상 필수 약관 미동의 차단 에러 copy가 존재하고, 약관 조회 실패와 동의 저장 실패가 SB 케이스 분기에 명시되어 있다. UXPT_ERR(ê·ì¹ 1)(인라인 에러)·UXPT_ERR(ê·ì¹ 3)(시스템 에러) 적용 대상이다. | `FP009-TERM-LIST-ERROR`, `FP009-TERM-REQUIRED-BLOCK` | 에러 copy는 정책·SB에 묶여 있고, 해당 실패 상태에서만 인라인으로 노출하며 원인과 해결 방법을 함께 안내한다. | - |
| `UXPT_NAV` | 화면 경로가 `로그인 > 휴면 여부 확인 > 본인인증 > 약관 동의`인 다단계 흐름의 한 단계로, 다음 화면(`NOVA-MBR-FP-010-0`) 전환과 헤더 뒤로 가기 맥락을 가진다. UXPT_NAV(ê·ì¹ 2)(뒤로 가기) 적용 대상이다. | `FP009-REAGREE-CONTEXT`, `FP009-NEXT-ACTION` | 휴면 해제 흐름의 이전 맥락(본인인증)과 위치를 보존하고, 헤더 네비게이션 책임을 본문 행동으로 대체하지 않는다. | - |
| `UXPT_LOD` | SB 케이스 분기에 약관 목록 조회 loading(skeleton) 상태가 명시되어 있다. UXPT_LOD(ê·ì¹ 2)(스켈레톤 UI) 적용 대상이다. | `FP009-TERM-LIST-LOADING` | 대기 상태에서 현재 처리 상황과 결과 기대를 명확히 전달하고, 고객이 기다림을 해석하지 않도록 한다. | - |
| `VOT_RUL` | 정책 도출 copy와 SB 근거 재동의 안내 copy가 모두 일관된 사용자 문체(해요체)로 정리되어야 하며, 휴면 해제 맥락을 자연스럽게 전달해야 한다. VOT_RUL(ê·ì¹ 1)(문체 기준)·VOT_RUL(ê·ì¹ 3)(긍정/부정형) 적용 대상이다. | all mapped requirements | copy는 간결·행동 중심·해요체로 유지하고, 재동의 맥락 안내 문장을 사용자가 행동 가능한 형태로 정리한다. | - |

## System-Break Signal

이 절은 디자인 판단을 담지 않는다. policy-core에 실재하지 않는(미작성 = 갭) 정책 ID를 기록하고, 해당 화면 요구·copy의 근거 출처를 명시한다.

- 갭 정책 ID (policy-core 미작성, `SB-MBR-UC01_02-0513` 근거로 요구 작성):
  - `POL-MBR-TERM-001-01` — 회원 가입 필수 약관. SB `ogn-mbr-term-list`의 `list-cell-term-required` 근거로 `FP009-TERM-LIST`(재동의 필수 약관 목록 표시) 요구·copy 작성.
  - `POL-MBR-TERM-001-02` — 회원 가입 선택 약관. SB `ogn-mbr-term-list`의 `list-cell-term-optional` 근거로 `FP009-TERM-LIST`(재동의 선택 약관 목록 표시) 요구·copy 작성.
  - `POL-MBR-TERM-001-07` — 선택 약관 미동의 처리. SB `ogn-mbr-term-agree`의 `checkbox-term-optional` 근거로 `FP009-TERM-AGREE-EACH`(선택 약관 개별 재동의) 요구·copy 작성.
  - `POL-MBR-TERM-001-10` — 약관 버전 적용 기준. SB `ogn-mbr-term-list` 노출 케이스(약관 버전 적용 기준)와 SB 케이스 분기 `NOVA-MBR-FP-009-E1`(약관 버전 불일치 → 최신 약관 재동의) 근거로 재동의 대상 약관 버전 조회·표시 요구 작성.
  - `POL-MBR-TERM-003-01` — SB `ogn-mbr-term-agree` 관련 정책서에 참조되나 policy-core 미작성. 전체 동의 처리 요구(`FP009-TERM-AGREE-ALL`)는 SB `ogn-mbr-term-agree`의 `checkbox-all-agree` 근거로 작성.
- 재동의·휴면 해제 맥락(`FP009-REAGREE-CONTEXT`)은 policy-core에 별도 항목이 없어, SB 화면 설명(`재동의가 필요한 약관 및 고지 내용을 확인하고 동의한다.`)과 화면 경로(`로그인 > 휴면 여부 확인 > 본인인증 > 약관 동의`) 근거로 작성한다.
- 실재 정책(`POL-MBR-TERM-001-06`)은 policy-core 원문·copy를 SOT로 삼아 정책 매트릭스 policyRef로 사용했다.
- SB 케이스 분기 `NOVA-MBR-FP-009-E1`(약관 버전 불일치), `NOVA-MBR-FP-009-E3`(동의 저장 실패) 후속 처리도 policy-core 미작성 영역으로, 해당 에러 요구는 SB 근거로만 작성한다.
