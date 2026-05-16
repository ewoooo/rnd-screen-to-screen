---
principle_id: UXP_RSV
title: 즉시 대응 및 맥락 유지
domain: 문제해결/CS
principles:
  - UXP_RSV_1
  - UXP_RSV_2
  - UXP_RSV_3
tags: [cs-resolution, proactive-alert, omnichannel, intent, continued-consultation, data-warning]
description: "고객이 문제를 인지한 순간부터, 별도의 설명 없이도 상황이 파악된 상태에서 해결이 시작되도록 채널 간 맥락을 연결하고, 최소 단계로 문제를 해소합니다."
---

# UXP_RSV — 문제해결/CS의 고객 경험 원칙

---

## UXP_RSV_1 — 선제적 문제 감지

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 문제가 발생한 이후에야 원인과 해결 방법을 찾기 위해 문의나 탐색을 시작한다. |
| **AS-IS** | 이상 징후가 사전에 포착되지 않아 고객이 문제를 인지한 뒤에야 대응이 시작되며, 이 과정에서 불필요한 추가 행동이 발생한다. |
| **TO-BE** | 고객의 이용 패턴과 상태 데이터를 기반으로 문제를 선제적으로 감지하고, 고객이 인지하기 전에 상황과 해결 경로를 먼저 제시해야 한다. 문제 인지 이전 단계에서 해결 흐름을 시작하는 구조가 필요하다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_RSV_1 |
| `screen_type` | cs_resolution |
| `trigger` | `user.anomaly_signal IS NOT NULL` |
| `output` | `proactive-alert-card` → slot: `home_or_cs_entry`, condition: `anomaly_signal IS NOT NULL`, state: `proactive_visible` |
| `input_data` | usage_anomaly_data (real_time_api), billing_anomaly_data (real_time_api), benefit_utilization_data (profile) |
| `fallback` | anomaly_data unavailable → render standard cs_entry without proactive alert |

### 규칙 — UXP_RSV_1_RULE

| 조건 | 동작 |
|------|------|
| `if data_warning` | `data-warning-card` 렌더링 + remaining_data + gift_data_cta (exhaustion < 24h) |
| `if billing_anomaly` | `billing-anomaly-alert` 렌더링 + anomaly_reason + resolution_cta |
| `if unused_benefit` | `unused-benefit-alert` 렌더링 + benefit_count + usage_guide_cta |
| `proactive` | resolution_path를 user_inquiry 이전에 먼저 노출 |
| **reject** | wait for user CS contact before surfacing issue 금지 |
| `render` | `proactive-alert-card` at home_entry or cs_entry |
| `include` | anomaly_reason + resolution_cta (즉시 해결 경로) |
| `copy` | `'지금 사용 패턴이라면, 어머니의 데이터는 내일 모두 소진될 가능성이 있어요.'` |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 고객 데이터를 분석하여 이상 징후를 감지하고, 해결 방안까지 선제적으로 제공한다. | 고객이 직접 문제를 발견하고 해결책을 탐색할 때까지 기다리지 않는다. |
| resolution_path를 user_inquiry 이전에 노출 | anomaly detected → no proactive surface 금지 |
| anomaly_reason + resolution_cta 포함 | resolution_path provided only after user_inquiry 금지 |

### 시나리오 — 상황별 적용 방식

| 시나리오 | trigger | component | copy |
|----------|---------|-----------|------|
| 데이터 부족 | `data_exhaustion_predicted_within_hours < 24` | `data-warning-card` + remaining_data + gift_data_cta | `'지금 사용 패턴이라면, 어머니의 데이터는 내일 모두 소진될 가능성이 있어요.'` |
| 청구 요금 과다 | `billing_anomaly_detected == true` | `billing-anomaly-alert` + anomaly_reason + resolution_cta | `'{user.name} 고객님, 이번 달 요금이 많이 나왔어요.'` |
| 혜택 미활용 | `unused_benefit_count > 0` | `unused-benefit-alert` + benefit_count + usage_guide_cta | `'사용하지 않는 혜택 {unused_count}개가 있어요.'` |

---

## UXP_RSV_2 — 단절 없는 상담 맥락 연결

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 문제 해결 과정에서 앱, 챗봇, 상담원, 오프라인 등 다양한 채널을 이동할 때마다 동일한 상황과 이력을 반복 설명하며 상담을 이어간다. |
| **AS-IS** | 채널 간 데이터와 진행 상태가 연결되지 않아, 고객이 채널을 이동할 때마다 동일한 문제를 다시 설명하고 처음부터 해결 과정을 반복해야 한다. |
| **TO-BE** | 모든 채널에서 고객의 상태와 상담 맥락이 하나의 흐름으로 연결되어, 접점이 바뀌어도 동일한 문제 해결 과정이 끊김 없이 이어지도록 해야 한다. 옴니채널 경험으로 고도화한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_RSV_2 |
| `screen_type` | cs_resolution |
| `trigger` | `consultation.channel_switch == true` |
| `output` | `continued-consultation-view` → slot: `cs_primary`, state: `context_preserved` |
| `input_data` | consultation_history (session), task_progress_stage (session), channel_target: app \| agent \| offline_store |
| `fallback` | consultation_history unavailable → render fresh cs_entry with apology for context loss |

### 규칙 — UXP_RSV_2_RULE

| 조건 | 동작 |
|------|------|
| `if channel_switch` | consultation_history + task_progress_stage를 새 채널에 복원 (no re-entry) |
| `if offline_transfer` | task_progress_stage를 nearest_store로 이관 + IMEI 입력 단계부터 레이블 표시 |
| `smart_planner` | 스마트플래너 상담 데이터 연동 + 진행 단계 동기화 |
| **reject** | reset task_progress or clear consultation_history on channel switch 금지 |
| `preserve` | consultation_history + task_progress_stage → destination channel |
| `offline` | IMEI 입력 단계부터 개통 진행 레이블 매장에 표시 |
| `sync` | 스마트플래너 데이터 연동 |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 채널 전환 시 고객의 현재 상태와 진행 단계가 다음으로 즉시 이어지도록 구성한다. | 이전 맥락을 재확인하거나 추가 입력을 요구하여 고객이 다시 시작하도록 만들지 않는다. |
| consultation_history + task_progress_stage → destination channel 보존 | task_progress_stage reset on channel switch 금지 |
| IMEI 입력 단계부터 개통 진행 레이블 매장에 표시 | user re-explain situation or re-enter data 요구 금지 |

### 시나리오 — 상황별 적용 방식

#### 앱 → 오프라인 매장

| 필드 | 값 |
|------|----|
| `trigger` | `task_difficulty_detected == true` |
| `action` | transfer task_progress to nearest_store |
| `copy` | `'가까운 매장에서 이어보실 수 있어요.'` |
| `sync copy` | `'IMEI 입력이 어려우시면 가까운 매장에서 도와드릴 수 있어요'` |
| `channel` | offline_store |
| `label` | IMEI 입력 단계부터 개통 진행 |
| `state` | task_progress_stage pre-loaded for store agent |

---

## UXP_RSV_3 — 인텐트 기반의 실시간 상담 가이드

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 상담 중 필요한 정보를 확인한 뒤 다음 행동을 스스로 판단하고 별도의 단계로 이동해 문제를 해결한다. |
| **AS-IS** | 상담 과정에서 정보 제공과 실행이 분리되어 있어 고객이 다음 행동을 결정해야 하며, 해결까지의 단계가 늘어나고 중간 이탈이 발생한다. |
| **TO-BE** | 고객의 발화 의도와 현재 상태를 실시간으로 해석하여 필요한 정보와 실행 태스크를 함께 제시하고, 후속 조치까지 연결해야 한다. 정보 제공에 그치지 않고, 즉시 실행까지 이어지는 해결 흐름을 완성해야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_RSV_3 |
| `screen_type` | cs_resolution |
| `trigger` | `consultation.user_utterance IS NOT NULL` |
| `output` | `intent-resolved-action-card` → slot: `conversation_inline`, condition: `intent_resolved == true`, state: `action_ready` |
| `input_data` | user_utterance (manual), user_current_state (real_time_api), consultation_context (session) |
| `fallback` | intent_resolution failed → render open_question_prompt asking user to clarify intent |

### 규칙 — UXP_RSV_3_RULE

| 조건 | 동작 |
|------|------|
| `if terminate` | termination_flow inline 노출 + refund_breakdown (pre_computed) |
| `if refund_avail` | refund_amount를 user가 묻기 전에 먼저 표시 |
| `if linked_benefit` | affected_benefit_names 선제적으로 나열 |
| `method_choice` | binary inline: 즉시해지 vs 예약해지 (no page redirect) |
| **reject** | redirect to separate task screen outside conversation 금지 |
| `embed` | `intent-resolved-action-card` inline within conversation thread |
| `refund` | pre_computed breakdown: 총구독가 − 이용기간차감 − 쿠폰차감 = 최종환불 |
| `copy` | `'즉시해지를 선택하면 오늘 구독이 바로 종료돼요. 환불 예상 금액을 먼저 확인해 주세요.'` |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 상담 중 고객의 요청이 대화 안에서 바로 해결되도록 구성한다. | 대화 중 별도 탐색을 유도하여 상담 흐름이 끊기거나, 고객이 직접 다음 행동을 찾도록 만들지 않는다. |
| IntentResolvedActionCard inline within conversation thread | information only without enabling action 금지 |
| pre_computed refund breakdown 포함 | redirect to separate task screen during conversation 금지 |

### 시나리오 — 상황별 적용 방식

#### 해지 의도 감지

| 필드 | 값 |
|------|----|
| `intent` | terminate_subscription |
| `render` | termination_flow inline + refund_breakdown (pre_computed) |
| `show` | 총구독가 − 이용기간차감 − 쿠폰차감 = 최종환불금액 |
| `copy` | `'해지 방식이 2가지예요. 즉시해지는 지금 바로 종료되고, 예약해지는 이용 기간이 끝나는 날 해지돼요. 어떤 방식으로 진행할까요?'` |
| `copy (refund)` | `'환불 금액은 {final_refund}원으로 이용 기간을 차감해 계산된 금액이고, {benefit} 혜택은 함께 종료돼요.'` |
| `choice` | 즉시해지 (잔여기간 환불) \| 예약해지 (결제일까지 혜택 유지) — inline, no page redirect |
| `confirm` | `'네, 지금 바로 {product_name}를 해지할게요.'` |
