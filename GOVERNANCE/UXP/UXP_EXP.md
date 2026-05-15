---
principle_id: UXP_EXP
title: 맥락 기반 유동적 전시와 통합 혜택 체감
domain: 탐색
principles:
  - UXP_EXP_1
  - UXP_EXP_2
tags: [explore, content-list, benefit-dashboard, personalization, context, segment]
description: "고객의 성향과 이용 맥락에 맞춰 전시 순서와 혜택 구조를 유기적으로 조립해, 고객은 최적의 혜택을 자연스럽게 발견하고 제공자의 프로모션은 맞춤형 가치로 전달되도록 돕습니다."
---

# UXP_EXP — 탐색의 고객 경험 원칙

---

## UXP_EXP_1 — 맥락 기반 유동적 전시

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 동일한 리스트 구조에서 다양한 콘텐츠를 탐색하며 자신에게 필요한 상품과 혜택을 직접 선별한다. 현재 상황과 무관한 정보 속에서 반복적인 스크롤과 탐색을 수행한다. |
| **AS-IS** | 시간, 위치, 이용 상태, 직전 행동 등 실시간 맥락이 반영되지 않아 모든 고객에게 동일한 콘텐츠 구조가 제공된다. 탐색 피로가 증가한다. |
| **TO-BE** | 고객의 현재 상황과 행동 데이터를 기반으로 콘텐츠 노출 순서를 동적으로 재구성해야 한다. 고객 맥락에 맞는 카피를 함께 제공해 오퍼링이 자연스럽게 인지되도록 설계해야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_EXP_1 |
| `screen_type` | explore_list |
| `trigger` | `user.context_type IS NOT NULL` |
| `output` | `content-list` → slot: `explore_primary`, state: `personalized_ordered` |
| `input_data` | usage_context, behavior_history, realtime_location, time_of_day |
| `fallback` | usage_context AND behavior_history 모두 unavailable → default_popular_content_list (platform_ranking 순) |

### 규칙 — UXP_EXP_1_RULE_1

| 조건 | 동작 |
|------|------|
| `component` | `content-list` |
| `trigger` | `user.context_type IS NOT NULL` |
| `output` | slot: explore_primary, state: personalized_ordered (context_type 기준 우선순위) |
| `order_logic` | context_type → first_block 결정 |
| `device_priority` | 인기 단말기 리스트 → 첫 ContentBlock |
| `sub_priority` | 구독 상품 리스트 → 첫 ContentBlock |
| `bundle_priority` | 결합 상품 리스트 → 첫 ContentBlock |
| **reject** | static_content_order — 모든 사용자 동일 순서 / context_type 무시 금지 |
| `fallback` | context_type unavailable → default_popular_content_list |

### 규칙 — UXP_EXP_1_RULE_2

| 조건 | 동작 |
|------|------|
| `component` | `content-list` (contextual copy layer) |
| `trigger` | `time_of_day OR realtime_location OR user.segment IS NOT NULL` |
| `time_copy` | 시간 기반 개인화 문구 |
| `location_copy` | 위치 기반 개인화 문구 |
| `segment_copy` | segment별 카피 차별화 |
| **reject** | uniform_copy — 모든 고객 세그먼트에 동일 배너 카피 / context 무시 금지 |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 고객의 상황 맥락을 반영해 필요도·선호도 기준으로 콘텐츠를 우선 노출한다. | 모든 고객에게 동일한 콘텐츠 순서를 고정 제공하지 않는다. |
| 시간, 위치, 관심사 등 고객 상황 데이터 기반 개인화 카피를 생성해 노출한다. | 맥락과 무관한 메시지와 콘텐츠를 반복 노출하지 않는다. |

### 시나리오 — 상황별 적용 방식

| 시나리오 | trigger | first_block | copy |
|----------|---------|-------------|------|
| 단말기 우선 | `user.context_type == device_priority` | device_list (인기 단말기) | `'이번주 가장 많이 팔린 단말기예요.'` |
| 구독 상품 우선 | `user.context_type == subscription_priority` | subscription_list (구독 상품) | `'T에서만 누릴 수 있는 구독혜택을 확인해보세요.'` |
| 결합 상품 우선 | `user.context_type == bundle_priority` | bundle_list (결합 상품) | `'결합하면 매달 나가는 통신비를 줄여요.'` |
| 관심사 기반 (최근 조회 단말) | `user.recently_viewed_device IS NOT NULL` | similar_device_recommendation_card | `'{recently_viewed_device} 확인하셨네요. 비슷한 모델과 더 저렴한 요금제를 추천드려요.'` |

| 시간/위치 기반 카피 | trigger | copy | cta |
|-------------------|---------|------|-----|
| 시간 기반 (저녁 외식) | `time_of_day == evening AND user.dining_benefit_available == true` | `'야식 먹을 시간, {offer.merchant} {offer.discount_desc} 드실 수 있어요.'` | — |
| 위치 기반 (근처 쿠폰) | `nearby_coupon_count > 0` | `'근처 주울 수 있는 쿠폰이 {nearby_coupon_count}개 있어요.'` | 혜택 주우러 가기 → nearby_coupon_flow |

| 세그먼트별 콘텐츠 순서 | segment | content_order | copy_theme |
|----------------------|---------|---------------|------------|
| 40대 주부 | `user.segment == 40대주부` | 결합상품 → 생활혜택 → 단말기 | 가족 혜택, 생활 편의, 주변 오프라인 쿠폰 강조 |
| 20대 대학생 | `user.segment == 20대대학생` | 구독상품 → 인기요금제 → 단말기 | 데이터 무제한, OTT·AI 구독, 가성비 요금제 강조 |

---

## UXP_EXP_2 — 통합 혜택의 직관적인 체감

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 이벤트, 멤버십, 할인 혜택을 각각 개별적으로 확인하며 적용 가능한 혜택을 직접 조합한다. 혜택 활용 과정에서 누락과 중복 확인이 발생한다. |
| **AS-IS** | 혜택이 분산되어 제공되어 전체 가치가 직관적으로 전달되지 않는다. 고객은 자신이 받을 수 있는 총 혜택을 체감하기 어렵다. |
| **TO-BE** | 분산된 혜택을 통합 구조로 묶어 고객에게 제공해야 한다. 고객은 하나의 흐름 안에서 혜택을 이해하고 참여까지 이어질 수 있는 완결된 경험을 가져야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_EXP_2 |
| `screen_type` | explore_list (benefit_hub) |
| `trigger` | `user.benefit_portfolio IS NOT NULL` |
| `output` | `benefit-dashboard` → slot: `benefit_hub`, state: `integrated_view` |
| `input_data` | membership_points, available_coupons, subscription_status, usage_pattern |
| `fallback` | benefit_portfolio unavailable → generic_benefit_discovery_card |

### 규칙 — UXP_EXP_2_RULE_1

| 조건 | 동작 |
|------|------|
| `component` | `benefit-dashboard` |
| `trigger` | `user.has_multiple_benefit_types == true` |
| `output` | slot: benefit_hub — 포인트 + 쿠폰 + 구독 통합 대시보드 |
| `structure` | `benefit-dashboard` — 바코드 + 포인트 + 쿠폰 + 구독 통합 |
| `priority` | benefit_applicable_now == true → 최우선 상단 노출 |
| `max_count` | 미제한 — 보유 혜택 전체 통합 표시 |
| **reject** | scattered_benefit_tiles — 각 혜택 유형 개별 기능 분산 금지 / 포인트 탭·쿠폰 탭·구독 탭 각각 이동 구조 금지 |

### 규칙 — UXP_EXP_2_RULE_2 (우선 혜택 상단 노출)

| 조건 | 동작 |
|------|------|
| `component` | `proactive-micro-task-card` |
| `trigger` | `session.start == true AND customer_data.available == true` |
| `output` | slot: home_primary, max_count: 1 |
| `data_required` | customer_status, pending_action, recent_event |
| `sort_key` | benefit.applicability_score DESC → top slot |
| `copy` | `'{user.name}님, 혜택 {missing_benefit_count}개만 확인해서 등급 올리면 {additional_saving_amount}원 더 아낄 수 있어요.'` |
| **reject** | static_home_layout 고정 타일·범용 배너 동등 가중치 나열 금지 |

### 규칙 — UXP_EXP_2_RULE_3 (혜택 적용 후속 연결)

| 조건 | 동작 |
|------|------|
| `trigger` | `benefit_applied == true` |
| `flow` | benefit_applied → `next-step-proposal` 즉시 노출 |
| `post_apply` | `'이제 매달 {total_benefit_value}원의 가치를 더 돌려받을 수 있어요.'` |
| `next_action` | 관련 혜택 탐색 or 자동납부 설정 CTA |
| **reject** | dead_end_completion — 완료 후 후속 행동 없음 금지 |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 혜택을 하나의 화면에서 전체 가치가 보이도록 통합 제공한다. | 혜택을 개별 기능으로 분산해 고객이 직접 찾아 사용하도록 하지 않는다. |
| 혜택 확인 → 적용 → 후속 참여까지 끊김 없이 연속된 행동 흐름으로 이어준다. | 참여 완료 이후 행동이 단절되도록 구성하지 않는다. |
| 금액, 절감 효과 등 실생활에서 바로 이해할 수 있는 가치로 혜택을 변환해 제공한다. | 추상적인 혜택 설명이나 조건 중심 정보만으로 고객이 직접 해석하도록 하지 않는다. |

### 시나리오 — 상황별 적용 방식

| 시나리오 | trigger | component | copy / action |
|----------|---------|-----------|---------------|
| 맞춤 혜택 통합 | `user.has_multiple_benefit_types == true` | `benefit-dashboard`: 포인트 + 쿠폰 + 구독 통합 | `'이번 주 {user.name}님이 누릴 수 있는 혜택이에요'` |
| 바코드 포인트 혜택 연결 | `barcode_benefit_used == true` | `next-step-proposal` → 포인트 적립 내역 확인 CTA | `'이제 매달 {total_benefit_value}원의 가치를 더 돌려받을 수 있어요.'` |
| 쿠폰 발급 후속 연결 | `coupon_issued == true` | — | 쿠폰 사용하러 가기 → external_channel_link |
| 요금제 변경 가치 체감 | `plan_change_saving_available == true` | — | `transform`: saving_amount → `'매달 {monthly_saving}원 절약 / 돌려받을 가치'` |
| 신규·상향 가입 제안 | `benefit_applied == true` | `next-step-proposal` → 외부 채널·앱 승인 CTA | `'이제 {user.name}님은 매달 {total_benefit_value}원의 가치를 더 돌려받을 수 있어요.'` |
