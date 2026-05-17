# NOVA-MBR-FP-002-0 — 개인정보 입력 Map

## Screen Scope

- screenId: `NOVA-MBR-FP-002-0`
- source: `SB`
- pattern: `form`
- route: `/NOVA-MBR-FP-002-0`
- policyRefs: `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04`, `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06`, `POL-MBR-INFO-002-08`
- ognIds: `ogn-mbr-member-input`, `ogn-mbr-entry-check`
- selectedGovernanceRefs: `UXPT_BTN`, `UXPT_ERR`, `UXPT_NAV`, `UXPT_LOD`, `VOT_RUL`
- scopeBoundary: 이 map은 SB(`SB-MBR-UC01_02-0513`)의 화면·OGN 정의와 policy-core 실재 INFO 정책만 Phase 2 계약으로 정리한다. `ogn-mbr-member-input`은 항상 노출되는 입력·검증 영역이고, `ogn-mbr-entry-check`는 기본 hidden 상태에서 기존 회원 식별 시에만 안내 영역으로 노출된다. 입력·검증 완료 시 `NOVA-MBR-FP-003-0`로 전환한다(전달 데이터: 임시저장ID, 세션ID). 디자인·레이아웃·배치 판단은 Phase 3 책임이며 여기서 다루지 않는다.

## Phase 2 Policy / Governance Mapping

### Policy Source Matrix

policy-core 실재 정책(`packages/policy-core/policies/MBR/INFO/`)만 policyRef로 사용한다. SB OGN이 참조한 `POL-MBR-INFO-001-*`, `POL-MBR-INFO-002-01`, `POL-MBR-INFO-002-11`, `POL-MBR-INFO-003-*`는 policy-core 미작성이므로 매트릭스에서 제외하고 `## System-Break Signal`에 갭으로 기록한다.

| policyRef | sourceText | sourceRef | user-facing requirement | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `POL-MBR-INFO-002-03` | 아이디는 영문과 숫자만 허용한다. | NC 회원가입·탈퇴 정책서 Full v1.0 확정본 / POL-MBR-INFO-002 | 아이디는 영문, 숫자만 입력한다. 위반 시 `아이디는 영문과 숫자만 입력해 주세요` 안내. | `member-input` | `ogn-mbr-member-input` | mapped |
| `POL-MBR-INFO-002-04` | 아이디는 6자 이상 20자 이하로 입력한다. | NC 회원가입·탈퇴 정책서 Full v1.0 확정본 / POL-MBR-INFO-002 | 아이디는 6~20자로 입력한다. 위반 시 `아이디는 6~20자로 입력해 주세요` 안내. | `member-input` | `ogn-mbr-member-input` | mapped |
| `POL-MBR-INFO-002-05` | 비밀번호는 10자 이상 20자 이하로 입력한다. | NC 회원가입·탈퇴 정책서 Full v1.0 확정본 / POL-MBR-INFO-002 | 비밀번호는 10~20자로 입력한다. 위반 시 `비밀번호는 10~20자로 입력해 주세요` 안내. | `member-input` | `ogn-mbr-member-input` | mapped |
| `POL-MBR-INFO-002-06` | 비밀번호는 영문 대문자, 영문 소문자, 숫자, 특수문자 중 3종 이상을 조합한다. | NC 회원가입·탈퇴 정책서 Full v1.0 확정본 / POL-MBR-INFO-002 | 비밀번호는 영문 대/소문자, 숫자, 특수문자 중 3종 이상을 조합한다. 위반 시 `영문 대/소문자, 숫자, 특수문자 중 3종 이상 조합해 주세요` 안내. | `member-input` | `ogn-mbr-member-input` | mapped |
| `POL-MBR-INFO-002-08` | 휴대폰번호는 숫자만 11자리로 입력한다. | NC 회원가입·탈퇴 정책서 Full v1.0 확정본 / POL-MBR-INFO-002 | 연락처는 숫자 11자리로 입력한다. 위반 시 `휴대폰번호는 숫자 11자리로 입력해 주세요` 안내. | `member-input` | `ogn-mbr-member-input` | mapped |

### Screen Requirement Matrix

| requirement | sourceRef | screen role | user copy | mapped section | OGN | status |
| --- | --- | --- | --- | --- | --- | --- |
| `NOVA-MBR-FP-002-INPUT-ID` | `POL-MBR-INFO-002-03`, `POL-MBR-INFO-002-04` | 아이디 입력과 문자 종류·길이 형식 검증 | `아이디는 영문과 숫자만 6~20자로 입력해 주세요` | `member-input` | `ogn-mbr-member-input` | mapped |
| `NOVA-MBR-FP-002-INPUT-PW` | `POL-MBR-INFO-002-05`, `POL-MBR-INFO-002-06` | 비밀번호 입력과 길이·문자 조합 검증 | `비밀번호는 10~20자로, 영문 대/소문자·숫자·특수문자 중 3종 이상 조합해 주세요` | `member-input` | `ogn-mbr-member-input` | mapped |
| `NOVA-MBR-FP-002-INPUT-PHONE` | `POL-MBR-INFO-002-08` | 연락처 입력과 숫자 11자리 형식 검증 | `연락처는 숫자 11자리로 입력해 주세요` | `member-input` | `ogn-mbr-member-input` | mapped |
| `NOVA-MBR-FP-002-INPUT-EMAIL` | `SB-MBR-UC01_02-0513 / ogn-mbr-member-input` | 이메일 입력 필드 제공(정책 갭, SB 컴포넌트 근거) | `이메일을 입력해 주세요` | `member-input` | `ogn-mbr-member-input` | mapped (정책 갭, SB 근거) |
| `NOVA-MBR-FP-002-REQUIRED-MISSING` | `SB-MBR-UC01_02-0513 / ogn-mbr-member-input` | 필수값 누락 시 다음 단계 진행 차단(NOVA-MBR-FP-002-E1) | `필수 정보를 모두 입력해 주세요` | `member-input` | `ogn-mbr-member-input` | mapped (정책 갭, SB 근거) |
| `NOVA-MBR-FP-002-DUPLICATE` | `SB-MBR-UC01_02-0513 / ogn-mbr-member-input` | 아이디·이메일·연락처 중복 시 수정 요청(NOVA-MBR-FP-002-E3/E4/E5) | `이미 사용 중인 정보예요. 다시 입력해 주세요` | `member-input` | `ogn-mbr-member-input` | mapped (정책 갭, SB 근거) |
| `NOVA-MBR-FP-002-NEXT` | `SB-MBR-UC01_02-0513 / ogn-mbr-member-input` | 입력·검증 완료 시 다음 단계(`NOVA-MBR-FP-003-0`)로 이동 | `다음` | `member-input` | `ogn-mbr-member-input` | mapped (SB 화면 전환 근거) |
| `NOVA-MBR-FP-002-ENTRY-CHECK` | `SB-MBR-UC01_02-0513 / ogn-mbr-entry-check` | 진입 채널·로그인·기존 회원 여부 확인 중 로딩 상태(skeleton) 표시 | (확인 중 화면 안내, 별도 노출 카피 없음) | `entry-check` | `ogn-mbr-entry-check` | mapped (정책 갭, SB 근거) |
| `NOVA-MBR-FP-002-ENTRY-EXISTING` | `SB-MBR-UC01_02-0513 / ogn-mbr-entry-check` | 기존 정상 회원 식별 시 로그인·내정보 안내(기본 hidden→노출) | `이미 가입된 계정이에요. 로그인하거나 내 정보를 확인해 주세요` | `entry-check` | `ogn-mbr-entry-check` | mapped (정책 갭, SB 근거) |
| `NOVA-MBR-FP-002-ENTRY-DORMANT` | `SB-MBR-UC01_02-0513 / ogn-mbr-entry-check` | 휴면 회원 식별 시 휴면 해제 안내 | `휴면 상태인 계정이에요. 휴면을 해제하고 이용해 주세요` | `entry-check` | `ogn-mbr-entry-check` | mapped (정책 갭, SB 근거) |
| `NOVA-MBR-FP-002-ENTRY-WITHDRAWN` | `SB-MBR-UC01_02-0513 / ogn-mbr-entry-check` | 탈퇴 회원 식별 시 재가입 제한 안내 | `이전에 탈퇴한 계정이에요. 재가입 조건을 확인해 주세요` | `entry-check` | `ogn-mbr-entry-check` | mapped (정책 갭, SB 근거) |

## Governance Review

| ref | selectionReason | affectedRequirement | impact | notApplicableReason |
| --- | --- | --- | --- | --- |
| `UXPT_BTN` | 하단 `다음` 버튼이 입력·검증 완료 후 단일 핵심 실행 행동이며, 입력 미완료 상태에서는 진행 차단이 행동으로 전달되어야 한다. | `NOVA-MBR-FP-002-NEXT`, `NOVA-MBR-FP-002-REQUIRED-MISSING` | 화면당 Primary 1개를 유지하고 행동 중심 라벨을 쓴다. 경쟁 행동이나 모호한 라벨을 추가하지 않는다. | - |
| `UXPT_ERR` | 형식 검증 실패·필수값 누락·중복은 입력 필드 인접 영역에서 원인과 수정 방법을 함께 안내해야 하는 인라인 에러다. | `NOVA-MBR-FP-002-INPUT-ID`, `NOVA-MBR-FP-002-INPUT-PW`, `NOVA-MBR-FP-002-INPUT-PHONE`, `NOVA-MBR-FP-002-REQUIRED-MISSING`, `NOVA-MBR-FP-002-DUPLICATE` | 정책 위반 에러 카피는 해당 필드 인접에 노출하고, 상단 통합 알림 단독으로 처리하지 않는다. 에러는 매칭되는 실패 상태에서만 노출한다. | - |
| `UXPT_NAV` | 다단계 가입 흐름의 한 단계이며 상단 헤더 뒤로 가기로 직전 단계로만 복귀하고 입력값이 보존되어야 한다. | `NOVA-MBR-FP-002-NEXT` | `AppBar` 네비게이션 소유를 유지하고 in-content close/previous로 대체하지 않는다. 뒤로 가기 시 직전 입력 보존을 가정한다. | - |
| `UXPT_LOD` | `ogn-mbr-entry-check`는 진입 조건 확인 API 호출 중 skeleton 로딩 상태를 가진다. | `NOVA-MBR-FP-002-ENTRY-CHECK` | 진입 확인 영역은 실제 안내 레이아웃과 동일한 스켈레톤으로 표현하고 레이아웃 점프를 피한다. | - |
| `VOT_RUL` | 정책 파생 에러·안내 카피와 입력 라벨은 일관된 해요체로 통일되어야 한다. | 모든 mapped requirement | 카피는 해요체로 간결·행동 중심으로 통일한다. 미인증 상태이므로 이름 호칭을 사용하지 않는다(VOT_RUL(ê·ì¹ 4)). | - |

## System-Break Signal

이 화면은 SB OGN이 다음 정책서 ID를 참조하지만, 해당 정책은 `packages/policy-core/policies/MBR/INFO/`에 미작성 상태다. 정책 미작성분은 SB 원문(`SB-MBR-UC01_02-0513`)만 근거로 화면 요구를 작성했으며, 정책 바인딩이 아닌 SB 바인딩임을 명시한다. 정책 작성 시 아래 ID를 매트릭스 policyRef로 승격해야 한다.

| 미작성 정책 ID | SB 참조 위치 | SB 근거 (대체 작성 근거) | 영향 받은 requirement |
| --- | --- | --- | --- |
| `POL-MBR-INFO-001-01` | `ogn-mbr-member-input` 관련 정책서 / 컴포넌트 비고 | 회원 가입 필수 입력 항목(이메일·연락처). SB 컴포넌트 `text-field-email`, `text-field-phone` 비고 근거. | `NOVA-MBR-FP-002-INPUT-EMAIL`, `NOVA-MBR-FP-002-REQUIRED-MISSING` |
| `POL-MBR-INFO-001-02` | `ogn-mbr-member-input` 관련 정책서 | 필수 입력 항목 보조 규칙. SB 화면 그룹 PG-MBR-INFO-001 근거. | `NOVA-MBR-FP-002-REQUIRED-MISSING` |
| `POL-MBR-INFO-002-01` | `ogn-mbr-member-input` 관련 정책서 | 개인정보 입력 항목 정의(상위 항목). SB OGN 관련 정책서 헤더 근거. | `NOVA-MBR-FP-002-INPUT-ID`, `NOVA-MBR-FP-002-INPUT-PW` |
| `POL-MBR-INFO-002-11` | `ogn-mbr-member-input` 관련 정책서 | 입력 항목 중복 검증 규칙. SB 노출 케이스 `중복 아이디·이메일·연락처: 수정 요청` 근거. | `NOVA-MBR-FP-002-DUPLICATE` |
| `POL-MBR-INFO-003-01` | `ogn-mbr-entry-check` 관련 정책서 | 가입 진입 조건 확인 규칙. SB OGN `ogn-mbr-entry-check` 관련 정책서 헤더 근거. | `NOVA-MBR-FP-002-ENTRY-CHECK` |
| `POL-MBR-INFO-003-07` | `ogn-mbr-entry-check` 컴포넌트 `section-message-entry-existing` 비고 | 기존 정상 회원 식별 시 처리. SB 노출 케이스 `이미 가입된 회원: 로그인 또는 내정보 안내` 근거. | `NOVA-MBR-FP-002-ENTRY-EXISTING` |
| `POL-MBR-INFO-003-08` | `ogn-mbr-entry-check` 컴포넌트 `section-message-entry-dormant` 비고 | 기존 휴면 회원 식별 시 처리. SB 노출 케이스 `휴면 회원: 휴면 해제 안내` 근거. | `NOVA-MBR-FP-002-ENTRY-DORMANT` |
| `POL-MBR-INFO-003-09` | `ogn-mbr-entry-check` 컴포넌트 `section-message-entry-withdrawn` 비고 | 기존 탈퇴 회원 식별 시 처리. SB 노출 케이스 `재가입 제한 대상: 제한 안내` 근거. | `NOVA-MBR-FP-002-ENTRY-WITHDRAWN` |

> 갭 요약: 매트릭스 policyRef는 policy-core 실재 정책 5개(`POL-MBR-INFO-002-03/04/05/06/08`)만 사용했다. 위 8개 ID는 SB 바인딩으로만 화면 요구를 충족했으며 policy-core 작성 시 정식 policyRef로 전환 대상이다.
