---
principle_id: UXP_DCD
title: 최적안 제안
domain: 결정
principles:
  - UXP_DCD_1
  - UXP_DCD_2
tags: [decision, optimal-plan-card, comparison-view, recommendation, delta, segment]
description: "고객 데이터 분석에 기반한 최적안을 제안해, 복잡한 비교 과정이 최소화된 즉각적인 의사결정 환경을 설계합니다."
---

# UXP_DCD — 결정의 고객 경험 원칙

---

## UXP_DCD_1 — 데이터 기반 최적안 도출

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 요금제, 혜택, 단말 상태 등을 각각 확인하며 스스로 최적안을 찾기 위해 여러 화면을 반복 탐색한다. 개인의 사용량이나 상황을 기준으로 판단하지 못하고 단편적인 정보에 의존하는 경향이 있다. |
| **AS-IS** | 고객 데이터가 존재함에도 불구하고 이를 종합적으로 해석하지 않아 개인화된 제안이 이루어지지 않는다. 고객은 자신에게 적합한 선택을 스스로 계산해야 하는 부담을 가지게 된다. |
| **TO-BE** | 고객의 사용 패턴, 상황, 성향을 입체적으로 해석하여 의도를 도출하고, 최적의 단일안을 선제적으로 제시해야 한다. 절감액·체감 혜택 등 실질 가치 근거를 함께 제공하여 즉시 판단 가능한 상태를 만들어야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_DCD_1 |
| `screen_type` | decision_compare |
| `trigger` | `user.usage_pattern IS NOT NULL` |
| `output` | `optimal-plan-card` → slot: `decision_primary`, state: `single_recommendation` |
| `input_data` | usage_pattern (profile), contract_status (profile), device_status (profile, optional), family_group_usage (profile, optional) |
| `fallback` | usage_pattern unavailable → render plan_selection_list with usage_input_prompt |

### 규칙 — UXP_DCD_1_RULE_1

| 조건 | 동작 |
|------|------|
| `if usage + contract` | single `optimal-plan-card` (not equal list) with rationale 렌더링 |
| `if no_penalty` | no_penalty_label을 `optimal-plan-card`에 append |
| `if device + bundle` | single pre-configured bundle recommendation 렌더링 |
| **reject** | multiple equal options rendered as list for user selection 금지 |
| `render` | `optimal-plan-card` (single) — usage_pattern + contract_status 기반 |
| `include` | saving_amount label + no_penalty_label (조건 충족 시) |
| `copy` | `'어머니는 매달 20일쯤 데이터가 소진되는 패턴이라, {plan_name} 요금제를 추천드려요.'` |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 고객의 사용 패턴, 상황, 성향을 반영하여 결과를 우선 제시하고 고객 판단을 유도한다. | 복수 옵션을 동등하게 나열하거나 고객이 직접 선택하도록 유도하지 않는다. |
| saving_amount / benefit_change 명시 | saving_amount / benefit_change 생략 금지 |
| all_options_list 동등 나열 대신 단일 최적안 제시 | all_options_list 동등 나열 고객 직접 선택 유도 금지 |

### 규칙 — UXP_DCD_1_RULE_2

| 조건 | 동작 |
|------|------|
| `rule_id` | UXP_DCD_1_RULE_2 |
| `always_include` | saving_amount + benefit_delta 정량 근거 필수 |
| `quantify` | saving_amount OR benefit_delta 정량 근거 포함 |
| `convert` | abstract_benefit → real_life_equivalent (예: `'커피 1잔'`, `'영화 티켓 2매'`) |
| `no_penalty` | `'바로 변경해도 위약금이 발생하지 않아요.'` / `'추가 비용이 없는 이유를 알려드릴게요.'` |
| **reject** | 근거 생략 후 결과만 제시 / 고객 직접 계산 유도 금지 |
| `if value_judgment` | benefit_value.type == abstract → convert → daily_life_equivalent |
| `saving_label` | `'매달 {saving_amount}원 절약'` |

### 시나리오 — 상황별 적용 방식

| 시나리오 | trigger | render | copy |
|----------|---------|--------|------|
| 요금제 추천 (데이터 소진 패턴) | `usage_pattern.data_exhaustion_day < 25` | `optimal-plan-card` (single) + no_penalty_label + saving_label | `'어머니는 매달 20일쯤 데이터가 소진되는 패턴이라, 요금제 변경 시 선물 없이도 충분히 사용할 수 있어요.'` |
| 기기 + 결합 선택 | `cart.has_device == true AND cart.has_plan == true` | single pre-configured bundle recommendation | `'{user.name}님의 패턴에 맞게 최적 옵션을 설정해뒀어요. 딱 맞는 옵션들로 제가 한 번에 세팅해 드릴게요.'` |
| 가치 체감 표현 | `benefit_value.type == abstract` | — | convert → `'커피 아메리카노(HOT) 2잔 무료'` 등 daily_life_equivalent |

---

## UXP_DCD_2 — 근거 기반 비교 단축

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 다양한 요금제와 옵션을 나열된 상태에서 비교하며, 각 항목을 직접 계산하거나 기억해가며 판단한다. 비교 과정에서 반복 탐색과 재확인을 수행한다. |
| **AS-IS** | 옵션 중심 나열 구조로 인해 고객이 스스로 비교 기준을 만들어야 하며, 현재 상태 대비 변화(비용, 혜택, 영향)를 직관적으로 파악하기 어렵다. 결정 지연과 이탈로 이어진다. |
| **TO-BE** | 현재 계약 상태를 기준으로 변화되는 핵심 요소만을 자동으로 대조하여 보여주고, 비교의 범위를 시스템이 축소해야 한다. 고객은 '무엇이 어떻게 달라지는지'만 확인하고 즉시 결정할 수 있는 구조로 전환되어야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_DCD_2 |
| `screen_type` | decision_compare |
| `trigger` | `comparison.items > 1` |
| `output` | `comparison-view` → slot: `decision_compare_area`, state: `delta_focused` |
| `input_data` | current_contract (profile), candidate_options (real_time_api), user_segment (profile) |
| `fallback` | current_contract unavailable → render full product_specification_list without delta |

### 규칙 — UXP_DCD_2_RULE_1

| 조건 | 동작 |
|------|------|
| `if comparison` | delta_view 렌더링 (change_amount + change_direction) — raw 값 나열 금지 |
| `data_delta` | `'데이터 +{N}GB'` delta label |
| `cost_delta` | `'매달 {N}원 절약'` delta label |
| **reject** | raw individual values without delta 나열 금지 |
| `render` | `comparison-view` delta_focused (변화 방향 + 변화량 강조) |
| `label` | `'매달 {saving_amount}원 절약 + 데이터 {data_delta}GB 늘어요'` |
| `summary` | `'달라지는 점만 정리해봤어요.'` — 핵심 변화 요약 |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 현재 대비 변화값을 중심으로 결과를 즉시 이해 가능하게 한다. | 개별 항목만을 나열해 고객이 직접 해석하도록 유도하지 않는다. |
| delta 중심 구조로 핵심 변화만 표시 | raw individual values 나열 / delta 없이 고객 직접 해석 금지 |
| system selected rationale 포함 | system selected rationale 생략 고객 직접 계산 유도 금지 |

### 규칙 — UXP_DCD_2_RULE_2

| 조건 | 동작 |
|------|------|
| `filter` | decision_critical_fields only — 비변경 항목 숨김 |
| `summary_copy` | `'달라지는 점만 정리해봤어요.'` / `'달라지는 그룹혜택만 정리해봤어요.'` |
| `show_only` | changed_fields — 변경되는 핵심 요소만 표시 |
| `hide` | unchanged_fields — 동일 항목 생략 |
| **reject** | 전체 스펙 나열 / 불필요 세부 조건 노출 / 고객 직접 탐색 유도 금지 |

### 규칙 — UXP_DCD_2_RULE_3

| 조건 | 동작 |
|------|------|
| `if value_type` | lead with concrete benefit upgrade — 실제로 더 잘 쓰게 될 혜택부터 |
| `if analysis_type` | lead with data_driven saving rationale — 왜 변경이 필요한지 |
| `if relationship_type` | lead with group/family benefit changes |
| `if senior` | simplified language + larger change summary |
| `segment_route` | user.segment_id → segment specific comparison layout 적용 |
| **reject** | identical comparison layout for all segments 금지 |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 고객 성향에 따라 비교 방식을 달리 구성한다. | 모든 고객에게 동일한 비교 구조를 일괄 적용하지 않는다. |

### 시나리오 — 상황별 적용 방식

| 시나리오 | trigger | render | copy |
|----------|---------|--------|------|
| 요금제 변경 핵심 정보 | `plan_change_eligible == true AND conditions_complex == true` | delta_summary_card — 변경 핵심 항목만 (요금, 데이터, 부가서비스) | `'달라지는 점만 정리해봤어요.'` + `'매달 {saving}원 절약'` |
| 결합 그룹혜택 변화 | `family_bundle_change == true` | group_benefit_delta_card — 변경 그룹혜택 항목만 선별 | `'달라지는 그룹혜택만 정리해봤어요.'` |

| 세그먼트별 비교 방식 | segment | lead | copy |
|--------------------|---------|------|------|
| 가치 체감형 | value_type | concrete benefit upgrade | `'{user.name}님이 실제로 더 잘 쓰게 될 혜택부터 보여드릴게요.'` |
| 분석형 | analysis_type | data_driven saving rationale | `'왜 요금제 변경이 필요한지 알려드릴게요.'` |
| 관계 중심형 | relationship_type | group/family benefit changes | `'달라지는 그룹혜택만 정리해봤어요.'` |
| 시니어 | senior | simplified single change summary (large text) | `'데이터가 {N}GB 늘어 영상통화나 인터넷도 더 여유롭게 이용하실 수 있어요.'` |
