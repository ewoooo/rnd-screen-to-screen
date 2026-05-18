---
principle_id: UXP_ACT
title: 간결한 실행
domain: 실행/구매
principles:
  - UXP_ACT_1
  - UXP_ACT_2
tags: [checkout, purchase, onboarding, risk, auto-fill]
description: "보유한 고객 데이터로 입력과 선택, 계산 과정을 자동화해 개통과 구매에 이르는 모든 물리적·심리적 단계를 최소화할 수 있는 수단을 제공합니다."
---

# UXP_ACT — 실행/구매의 고객 경험 원칙

---

## UXP_ACT_1 — 입력/선택 간소화

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 가입·변경·구매 과정에서 동일한 정보를 반복 입력하고 각 단계별로 옵션을 직접 선택한다. 입력 오류와 재확인 과정이 반복되며 진행이 지연되거나 중단된다. |
| **AS-IS** | 이미 보유한 고객 데이터가 존재함에도 불구하고 이를 활용하지 않아 입력과 선택 과정이 유지되고 있다. 이로 인해 물리적 피로와 이탈 가능성이 증가한다. |
| **TO-BE** | 고객 데이터를 자동 호출하여 입력과 선택 단계를 축소하고, 고객은 정보 확인만으로 진행할 수 있는 구조로 전환해야 한다. 입력은 선택이 아닌 시스템이 선제 수행해야 하는 영역이 되어야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_ACT_1 |
| `screen_type` | checkout_step |
| `trigger` | `checkout.stage IS NOT NULL` |
| `output` | `auto-filled-checkout-form` → slot: `checkout_primary`, state: `pre_filled` |
| `input_data` | user_profile_data, recent_delivery_address, default_payment_method, available_coupons, available_points, nearest_store (real_time_api) |
| `fallback` | user_profile_data unavailable → render empty checkout form with input prompts |

### 규칙 — UXP_ACT_1_RULE

| 조건 | 동작 |
|------|------|
| `personal_info` | user_profile에서 자동 채움 → `field_state = confirmed_editable` |
| `address` | recent_delivery_address 자동 선택 → `'우리집'` 레이블 + edit option |
| `payment` | default_payment_method 자동 선택 + edit option |
| `coupon / points` | maximum_discount_combination 자동 적용 → `'자동으로 최대 할인이 적용됐어요'` |
| `store_pickup` | real_time_api로 nearest_store 자동 선택 |
| **reject** | 저장된 데이터 재입력 요구 금지 / 쿠폰 수동 선택 목록 노출 금지 (auto-apply only) |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 기본 정보를 자동으로 채워오거나 최적안을 자동 선택해 고객의 확인만으로 넘어갈 수 있게 한다. | 이미 가진 정보를 다시 입력하게 하거나 입력 과정을 반복시키지 않는다. |
| `pre_fill`: user_profile_data → all checkout fields (confirmed_editable) | blank form + stored user_profile 재입력 요구 금지 |
| `copy`: `'아래 정보로 주문을 진행할게요.'` / `'자동으로 최대 할인이 적용됐어요.'` | coupon list for manual selection 금지 → auto-apply only |

### 시나리오 — 상황별 적용 방식

| 항목 | source | state / label | copy |
|------|--------|---------------|------|
| 가입 정보 | user_profile_data | confirmed_editable | 아래 정보로 주문을 진행할게요. |
| 배송지 | recent_delivery_address | `'우리집'` + edit option | 아래 주소로 배송해 드릴게요. |
| 결제수단 | default_payment_method | 자동 선택 + edit option | — |
| 쿠폰/포인트 | maximum_discount_combination (자동) | auto-apply | 자동으로 최대 할인이 적용됐어요. |
| 방문 매장 | nearest_store (real_time_api) | 자동 선택 | 현 위치와 가장 가까운 매장을 설정해 드렸어요. |

---

## UXP_ACT_2 — 선제적 리스크 처리

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 위약금·조건 변경·불이익 등의 리스크를 사후에 인지하거나 직접 확인하려 한다. 불확실성이 존재할 경우 실행을 보류한다. |
| **AS-IS** | 리스크 정보가 분산되어 있거나 사전에 안내되지 않아 고객이 심리적 불안을 느끼고 의사결정을 미루게 된다. |
| **TO-BE** | 시스템이 리스크를 사전에 감지하고 명확한 영향 범위를 선제적으로 안내해야 한다. 고객이 불안 없이 즉시 실행할 수 있는 상태를 만들어야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_ACT_2 |
| `screen_type` | checkout_step |
| `trigger` | `action.risk_detected IS NOT NULL` |
| `output` | `risk-alert-card` → slot: `checkout_pre_action`, condition: `risk_detected == true` |
| | `process-progress-indicator` → slot: `checkout_status`, condition: `multi_step_process == true` |
| `input_data` | action_type (session), penalty_calculation, refund_calculation, benefit_impact, process_stage_list (real_time_api) |
| `fallback` | risk_calculation unavailable → render confirmation without breakdown; append `calculating...` label |

### 규칙 — UXP_ACT_2_RULE_1

| 조건 | 동작 |
|------|------|
| `plan_change` | billing_impact_breakdown 확인 화면 표시 (월 중 변경 시) |
| `terminate` | refund_breakdown inline before final confirmation |
| `linked_benefits` | linked_benefit_termination_notice 표시 |
| `no_penalty` | `'위약금 없음'` 레이블 prominently 표시 |
| **reject** | 실행 완료 후 리스크 노출 금지 / refund·penalty 정보 생략 후 확인 유도 금지 |

#### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 액션 전에 발생 가능한 리스크와 영향을 미리 식별해 명확히 안내한다. | 리스크를 숨기거나 실행 이후에 인지되도록 방치하지 않는다. |
| `render`: risk-alert-card before confirmation step | risk revealed only post-action 금지 |
| `include`: refund_amount + linked_benefit_names + no_penalty_label | refund/penalty 정보 생략 후 확인 유도 금지 |
| `copy`: `'즉시해지를 선택하면 오늘 구독이 바로 종료돼요. 환불 예상 금액을 먼저 확인해 주세요.'` | — |

### 규칙 — UXP_ACT_2_RULE_2

| 필드 | 값 |
|------|----|
| `rule_id` | UXP_ACT_2_RULE_2 |
| `trigger` | `multi_step_process == true` |
| `render` | `process-progress-indicator` (completed / current / pending stages) |
| `stage_labels` | 해지 신청 접수 → 이용 내역 확인 → 해지 처리 |
| `on_complete` | `'즉시해지가 완료됐어요. 환불 금액은 결제수단 계좌로 입금 예정이에요.'` |
| **reject** | process stages hidden 금지 / 스피너 단독 표시 금지 / 단계 레이블 없는 로딩 상태 금지 |

#### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 진행 단계와 현재 상태를 가시화해 고객이 현재 위치와 남은 단계를 명확히 이해할 수 있도록 한다. | 절차를 숨기거나 현재 상태를 파악하기 어렵게 구성하지 않는다. |

#### stage 표시 상태

| 상태 | 표시 방식 |
|------|----------|
| 완료 (done) | 체크 아이콘 |
| 현재 (current) | 로딩 스피너 |
| 대기 (pending) | 회색 원 |

### 시나리오 — 상황별 적용 방식

#### 요금제 변경

| 필드 | 값 |
|------|----|
| `trigger` | `action.type == plan_change AND billing_cycle_mid == true` |
| `render` | billing_impact_breakdown + timing_choice (즉시 / 다음달) |
| `copy` | `'월 중 변경 시 요금과 데이터가 일할 계산돼요. / 다음 달 1일부터 적용하는 것을 추천드려요.'` |

#### 구독 즉시 해지

| 필드 | 값 |
|------|----|
| `trigger` | `action.type == subscription_terminate` |
| `render` | refund_breakdown + linked_benefit_termination_notice inline |
| `show` | `total_subscription_price − usage_deduction − coupon_deduction = final_refund` |
| `copy` | `'즉시해지를 선택하면 오늘 구독이 바로 종료돼요. 환불 예상 금액을 먼저 확인해 주세요.'` |
| `copy` | `'최종 환불 금액은 {refund_amount}원이고, {benefit_name} 혜택은 함께 종료돼요.'` |

#### 해지 진행 단계

| stage | state | next |
|-------|-------|------|
| 해지 신청 접수 | current (로딩) | 이용 내역 확인 |
| 이용 내역 확인 | pending (회색) | 해지 처리 |
| 해지 처리 | pending (회색) | all_done |
