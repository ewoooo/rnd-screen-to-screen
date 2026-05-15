---
principle_id: UXP_SCH
title: 의도 중심 검색 설계
domain: 검색
principles:
  - UXP_SCH_1
  - UXP_SCH_2
  - UXP_SCH_3
  - UXP_SCH_4
tags: [search, intent, personalization, search-result-item, personalization-rationale, inline-action]
description: "고객의 검색 의도를 정확히 이해하고 가장 적합한 형태의 결과를 즉시 제시해, 원하는 정보에 최단 경로로 도달하도록 설계합니다."
---

# UXP_SCH — 검색의 고객 경험 원칙

---

## UXP_SCH_1 — 의도 중심 해석

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 키워드를 입력하고 여러 검색 결과를 탐색하며 원하는 정보를 직접 찾아야 한다. 의도가 명확하지 않은 경우 여러 번 검색을 반복한다. |
| **AS-IS** | 검색이 단순 문자열 매칭 중심으로 동작하여 고객의 상황이나 맥락이 반영되지 않는다. 자연어 입력이나 모호한 검색 의도는 정확히 해석되지 못한다. |
| **TO-BE** | 고객의 이용 맥락과 입력 의도를 함께 해석해 검색 유형에 맞는 탐색 방식으로 연결해야 한다. 의도가 명확하지 않은 경우에는 후속 질문이나 추천 검색어를 통해 의도를 구체화해야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_SCH_1 |
| `screen_type` | search_result |
| `trigger` | `search.input_text IS NOT NULL` |
| `output` | `search-result-page` → slot: `search_primary`, state: `intent_resolved` |
| `input_data` | search_query (manual), search_type (natural_language \| keyword), user_context (profile) |
| `fallback` | search_type unresolvable → keyword_search_result as default |

### 규칙 — UXP_SCH_1_RULE

| 조건 | 동작 |
|------|------|
| `condition` | search_type == natural_language OR search_type == keyword |
| `route_NL` | agent_conversation_flow (의도 해석 → 질문 기반 탐색) |
| `route_KW` | integrated_search_result_page (personalized_ranking + 추천 검색어) |
| `ambiguous` | search_intent IS ambiguous → followup_question OR recommend_search_terms |
| **reject** | NL query에 keyword string matching 적용 금지 |
| **reject** | ambiguous query → zero result page without alternatives 금지 |
| `fallback` | → agent_conversation_flow / clarification_question 제공 |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 검색 유형을 구분해 고객 맥락에 맞는 탐색 방향을 제안한다. | 검색 유형 구분 없이 동일한 방식으로 처리하거나 키워드 매칭 결과만 단순 나열하지 않는다. |

### 시나리오 — 상황별 적용 방식

| 유형 | trigger | route | 특이사항 |
|------|---------|-------|---------|
| 자연어 검색 | `search_type == natural_language` | agent_conversation_flow | 예: `'기기 바꾸고 싶은데 최대 할인 받으려면?'` → intent clarification questions → 맥락 기반 추천 실행 |
| 키워드 검색 | `search_type == keyword` | integrated_search_result_page | personalized_ranking (user_context 기반) + 추천 검색어 카드 + 관련 질문 제안 |
| 모호한 의도 | `search_intent IS ambiguous` | agent_conversation_flow or clarification_question | followup_question 제공 |

---

## UXP_SCH_2 — 맥락 적합 결과 제시

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 동일한 검색어에 대해 모든 결과를 확인하며 자신에게 맞는 정보를 선별한다. 결과가 없거나 부족한 경우 다시 검색하거나 이탈한다. |
| **AS-IS** | 검색 결과가 모든 고객에게 동일하게 제공되어 개인 상황에 맞지 않는 정보가 포함된다. 결과가 없을 경우 대안이 없어 탐색이 단절된다. |
| **TO-BE** | 고객의 이용 이력과 맥락에 따라 결과와 순서를 개인화해야 한다. 결과가 없거나 부족한 경우에도 대안 경로를 함께 제공해야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_SCH_2 |
| `screen_type` | search_result |
| `trigger` | `search.query IS NOT NULL` |
| `output` | `personalized-search-result` → slot: `search_results`, state: `personalized` |
| `input_data` | search_query, user_history (profile), user_context (profile) |
| `fallback` | user_history unavailable → platform_ranked_result_list |

### 규칙 — UXP_SCH_2_RULE

| 조건 | 동작 |
|------|------|
| `if result > 0` | result_list를 user_context 기반으로 재정렬 (usage_history + context) |
| `if result == 0` | alternative_path_card + suggested_search_terms 렌더링 |
| `sort` | result_position_1 = most_relevant_item (user_context 기반) |
| `zero_state` | alternative_path_card 렌더링 (suggested next steps 포함) |
| `copy` | `'이어서 검색해보세요'` + 추천 검색어 카드 |
| **reject** | platform_ranking 고정 순서 일괄 노출 금지 |
| **reject** | result_count == 0 → empty state without guidance 금지 |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 고객의 이용 이력과 상태를 반영해 결과의 우선순위와 구성을 다르게 제공한다. | 모든 고객에게 동일한 결과와 순서를 일괄적으로 노출하지 않는다. |

---

## UXP_SCH_3 — 결과 내 즉시 행동 유도

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 검색 결과를 확인한 뒤 상세 페이지로 이동해 추가 탐색을 수행한 후 행동한다. 여러 단계를 거치며 이탈이 발생한다. |
| **AS-IS** | 검색 결과가 단순 정보 나열에 그쳐 행동까지 이어지지 않는다. 고객은 결과 확인 이후 별도의 경로를 통해 다시 이동해야 한다. |
| **TO-BE** | 탐색과 실행 단계를 통합해 검색 결과에서 바로 실행 가능한 액션을 제공해야 한다. 고객은 추가 탐색 없이 결과에서 바로 행동으로 이어질 수 있어야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_SCH_3 |
| `screen_type` | search_result |
| `trigger` | `search_result.item_count > 0` |
| `output` | `search-result-item` → slot: `search_results`, condition: `item.action_available == true`, state: `action_embedded` |
| `input_data` | search_result_items (real_time_api), user_context (profile) |
| `fallback` | action_available == false → render result_item without inline action |

### 규칙 — UXP_SCH_3_RULE

| 조건 | 동작 |
|------|------|
| `if action_available` | inline_action_button을 result_item 내부에 embed (no page nav) |
| `if terminate` | termination_method_selector inline 표시 (즉시 / 예약 선택) |
| `if subscribe` | subscription_cta inline + contextual copy |
| **reject** | 별도 action screen redirect 금지 |
| `embed` | inline_action_button (result_item 내부 포함) |
| `sub_copy` | `'현재 {current_product}에 매달 {current_price}원 결제 중이에요.'` |
| `offer_copy` | `'동일한 금액에 {benefit_desc}까지 포함된 구독 상품이 있어요.'` |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 각 결과 항목에서 바로 실행 가능한 행동을 함께 제공해 추가 탐색 없이 완료까지 이어지도록 한다. | 결과 확인 이후 별도의 화면 이동이나 추가 탐색을 요구하지 않는다. |

### 시나리오 — 상황별 적용 방식

| 시나리오 | trigger | component | copy |
|----------|---------|-----------|------|
| 구독 상품 해지 | `result_action == terminate_subscription` | termination_method_selector (즉시해지 \| 예약해지) inline | `'즉시해지는 지금 바로 종료되고, 예약해지는 이용 기간이 끝나는 날 해지돼요.'` |
| 구독 상품 추천 | `result_action == subscribe` | subscription_cta inline + benefit_comparison | `'현재 {current_product}에 매달 {current_price}원 결제 중이에요. 동일한 금액에 {benefit_desc}까지 포함된 구독 상품이 있어요.'` |

---

## UXP_SCH_4 — 결과 신뢰성 및 투명성 확보

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 검색 결과가 왜 노출되었는지 이해하지 못한 채 결과를 수용하거나 의심한다. 특히 개인화 결과에 대한 신뢰가 낮다. |
| **AS-IS** | 결과의 근거가 부족해 고객이 결과를 신뢰하기 어렵다. 이는 의사결정의 지연으로 이어진다. |
| **TO-BE** | 결과가 도출된 이유를 간결하게 제공해 고객이 납득 가능한 구조를 만들어야 한다. 결과에 대한 신뢰를 기반으로 행동이 이어지도록 설계해야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_SCH_4 |
| `screen_type` | search_result |
| `trigger` | `search_result.personalization_applied == true` |
| `output` | `personalization-rationale` → slot: `search_result_meta`, state: `visible` |
| `input_data` | personalization_reason (real_time_api) |
| `fallback` | personalization_reason unavailable → render result without rationale label |

### 규칙 — UXP_SCH_4_RULE

| 조건 | 동작 |
|------|------|
| `if personalized` | brief rationale_label 렌더링 (user_context 연결) |
| `if AI_recommend` | reasoning_snippet 렌더링 (usage_history \| contract_status 기반) |
| **reject** | `'recommended for you'` 단독 레이블 금지 — 구체적 맥락 명시 필수 |
| `copy_template` | `'{user.contract_years}년 장기 고객 기준 최대 {max_discount}원 특별 혜택이 있어요'` |
| `rationale` | `personalization-rationale` 컴포넌트 → result 상단 레이블 |
| `context_link` | user_context (contract_years, usage_history) → 레이블 텍스트에 반영 |
| `example` | `'SKT 추가 혜택 (장기 고객 {N}년)'` |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 결과가 제시된 이유를 고객의 맥락과 연결해 간결하게 설명한다. | 근거 없이 결과만 제시하거나 판단 이유를 숨기지 않는다. |
| personalized result에 rationale 레이블 노출 | personalized result에 근거 레이블 미노출 금지 |
| 구체적 맥락 명시 (계약 기간, 이용 이력) | opaque 추천 레이블만 표시 금지 |
