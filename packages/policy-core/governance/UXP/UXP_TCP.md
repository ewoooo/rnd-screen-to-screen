---
principle_id: UXP_TCP
title: 태스크 요약과 사후 가이드
domain: 완료
principles:
  - UXP_TCP_1
  - UXP_TCP_2
  - UXP_TCP_3
tags: [task-complete, task-completion-summary, usage-visualization, benefit-delta-card, follow-up-action-list]
description: "단계별 처리 내역을 직관적인 결과로 통합하고 핵심 지표 중심의 시각화와 후속 가이드를 제공해, 불필요한 고민 없는 과업 완료 경험을 지원합니다."
---

# UXP_TCP — 완료의 고객 경험 원칙

---

## UXP_TCP_1 — 종합적인 처리 결과 안내

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 여러 단계를 거쳐 과업을 완료한 뒤에도 각각의 처리 결과를 개별적으로 확인하며 흐름을 재구성하려 한다. |
| **AS-IS** | 단계별 결과가 분절되어 제공되기 때문에 전체 변화 맥락을 스스로 조합해야 하며, 완료 이후에도 이해를 위한 추가 탐색이 발생한다. |
| **TO-BE** | 시스템이 모든 처리 내역을 하나의 결과 흐름으로 재구성하여 제공함으로써, 고객이 추가 해석 없이 완료 상태를 직관적으로 인지하도록 만들어야 한다. 단계 단위가 아닌 '결과 단위'로 경험을 통합해야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_TCP_1 |
| `screen_type` | task_complete |
| `trigger` | `task.completion_status == 'completed'` |
| `output` | `task-completion-summary` → slot: `completion_primary`, state: `result_unified` |
| `input_data` | completed_task_type (session_state), task_result_summary (real_time_api) |
| `fallback` | task_result_summary unavailable → generic_completion_message with task_type label |

### 규칙 — UXP_TCP_1_RULE

| 조건 | 동작 |
|------|------|
| `component` | `task-completion-summary` (단일 통합 뷰) |
| `trigger` | `task.completion_status == 'completed'` |
| `output` | slot: completion_primary, state: result_unified (단일 통합 요약 — 단계별 나열 금지) |
| `render_rule` | IF multi_step → consolidate all step results into single unified summary |
| `data_required` | task_type, task_result_summary, completed_task_meta |
| **reject** | per_step_completion_messages — 단계별 완료 메시지 순차 나열 금지 |
| `fallback` | task_result_summary unavailable → generic_completion_message with task_type label |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 태스크 유형에 따라 핵심 결과 항목을 단일 요약 카드로 제공한다. | 단계별 완료 메시지를 순서대로 나열하지 않는다. |

### 시나리오 — 상황별 적용 방식

| 시나리오 | trigger | component | summary 항목 | copy |
|----------|---------|-----------|------------|------|
| 요금제 변경 | `task_type == 'plan_change' AND task.completion_status == 'completed'` | `task-completion-summary` → state: plan_change_complete | new_plan_name, new_monthly_fee, data_allowance, included_benefits | `'{new_plan_name}으로 요금제가 변경됐어요.'` |
| 데이터 선물 | `task_type == 'data_gift' AND task.completion_status == 'completed'` | `task-completion-summary` → state: data_gift_complete | recipient_name, gifted_data_amount, remaining_gift_count_this_month | `'{data_amount}GB 데이터 선물을 완료했어요.'` |
| 포인트 요금 납부 예약 | `task_type == 'data_gift' AND task.completion_status == 'completed'` | — | 납부 변경 대상, 납부 약정 인트, 변경 예정 요금제, 자동납부 완료 예정일 | — |

---

## UXP_TCP_2 — 핵심 정보 구조화

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 완료 이후 변화된 혜택이나 비용을 이해하기 위해 텍스트와 수치를 직접 비교하며 판단한다. |
| **AS-IS** | 정보가 나열된 형태로 제공되면서 고객이 핵심 지표를 선별하고 해석하는 부담이 발생하고, 의사결정 피로로 이어진다. |
| **TO-BE** | 고객의 판단이 아닌 시스템의 해석 결과를 전달하는 구조로, 실제로 체감할 수 있는 가치(비용 변화, 혜택 증감 등)와 핵심 정보만 구조적으로 시각화해야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_TCP_2 |
| `screen_type` | task_complete |
| `trigger` | `task.completion_status == 'completed'` |
| `output` | `usage-visualization` → slot: `completion_data_section` / `benefit-delta-card` → slot: `completion_benefit_section` |
| `input_data` | usage_data, benefit_delta, comparison_data (all real_time_api, optional) |
| `fallback` | visualization_data unavailable → render text_based completion summary without chart |

### 규칙 — UXP_TCP_2_RULE

| 조건 | 동작 |
|------|------|
| `component` | `usage-visualization` OR `benefit-delta-card` |
| `trigger` | usage_data IS NOT NULL OR benefit_delta IS NOT NULL OR comparison_data IS NOT NULL |
| `chart_type` | bar / donut — segmented by usage_category (content_OTT, social, communication) |
| `comparison` | image_based before/after device or plan comparison (structured table 허용) |
| `delta_convert` | benefit_delta → concrete_value: `'매달 {N}원 아낄 수 있어요'` |
| `data_required` | usage_data OR benefit_delta OR comparison_data (하나라도 존재 시 렌더링) |
| **reject** | explanatory_text_block — 수치 나열 또는 설명 중심 문장 사용 금지 |
| **reject** | text_number_list — 항목별 수치를 설명 문장으로 나열 금지 |
| `fallback` | visualization_data unavailable → text_based completion summary (차트 없이) |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 고객이 읽는 즉시 의미를 이해할 수 있는 표현과 형태로 변환한다. | 수치와 설명을 문장 목록으로 나열하지 않는다. |
| 이미지 기반 비교를 통해 변경 전·후의 차이를 직관적으로 인지할 수 있도록 한다. | usage_data IS NOT NULL → 반드시 시각화 형태로 제공 |

### 시나리오 — 상황별 적용 방식

| 시나리오 | trigger | component | segments / format | copy |
|----------|---------|-----------|-------------------|------|
| 데이터 사용량 / 주간 서비스 사용 시간 | `usage_data IS NOT NULL` | `usage-visualization` → chart_type: donut/bar | content_OTT, social, communication (카테고리별 분류) | `'넷플릭스 볼 때 데이터를 가장 많이 쓰시니까 이 요금제가 훨씬 합리적이에요.'` |
| 요금제 혜택 조합 / 단말기 납부액 비교 | `comparison_data IS NOT NULL` | `benefit-delta-card` OR device_comparison_image | image_based before/after OR structured comparison table | `'갤럭시 {model_name} {storage}GB와 지금 사용 중인 휴대폰의 납부액을 자세히 비교해 드릴게요.'` |

---

## UXP_TCP_3 — 사후 가이드 제공

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 과업 완료 이후 추가로 필요한 행동이나 주의사항을 확인하기 위해 다시 탐색하거나 문의한다. |
| **AS-IS** | 완료 이후의 상태 변화에 대한 안내가 부족하여 고객이 다음 행동을 스스로 판단해야 하며, 불필요한 재탐색이 발생한다. |
| **TO-BE** | 완료 시점에서 고객의 상황과 맥락을 기반으로 후속 행동을 시스템이 선제적으로 안내해야 한다. 고객의 의도를 다시 읽고 다음 태스크를 이어주는 구조로 설계해야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_TCP_3 |
| `screen_type` | task_complete |
| `trigger` | `task.completion_status == 'completed'` |
| `output` | `follow-up-action-list` → slot: `completion_followup`, state: `proactive` |
| `input_data` | completed_task_type (session_state), followup_actions (real_time_api, required) |
| `fallback` | followup_actions unavailable → render completion page without followup section |

### 규칙 — UXP_TCP_3_RULE

| 조건 | 동작 |
|------|------|
| `component` | `follow-up-action-list` — 상황별 후속 태스크 자동 연결 |
| `trigger` | `followup_actions IS NOT NULL AND task.completion_status == 'completed'` |
| `output` | slot: completion_followup, state: proactive — 완료 화면 하단 자동 노출 |
| `render_when` | followup_actions IS NOT NULL (완료 화면 하단 자동 추가) |
| `context_basis` | completed_task_type + customer_state → next_task 선택 |
| `auto_link` | resolved_state 기준으로 후속 태스크 자동 연결 제공 |
| **reject** | completion_only_view — 완료 메시지만 표시, `follow-up-action-list` 미노출 금지 |
| `fallback` | followup_actions unavailable → completion page without followup section (단, 데이터 있으면 항상 표시) |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 완료된 태스크 맥락을 기반으로 다음에 해야 할 행동을 완료 화면 하단에 자동으로 안내한다. | 완료 메시지만 보여주고 이후 행동 안내를 생략하지 않는다. |

### 시나리오 — 상황별 적용 방식

| 시나리오 | trigger | component | copy / cta |
|----------|---------|-----------|-----------|
| 개통 완료 후 후속 안내 (계정 연동 필요) | `task_type == 'device_activation' AND account_link_required == true` | `follow-up-action-list` → state: proactive, context: device_activation | `'적용이 완료됐어요. 이어서 {service_name} 계정 연동이 필요해요.'` / cta1: 연동하러 가기 / cta2: 사진·연락처·데이터를 새 휴대폰으로 한 번에 옮겨볼까요? |
| 데이터 선물 완료 후 요금제 추천 | `task_type == 'data_gift' AND recipient_usage_high == true` | — | `'이번 달에 {recipient_name}님께 데이터를 두 차례 전송하셨어요. 데이터 사용량이 많으신 경우, 상위 요금제로 변경을 고려해 보세요.'` → 어머니 사용 패턴에 맞는 요금제 추천해드릴까요? |
