---
principle_id: UXP_ETR
title: 홈 진입 시 인상과 맥락 유지
domain: 진입
principles:
  - UXP_ETR_1
  - UXP_ETR_2
  - UXP_ETR_3
tags: [home-entry, personalization, resume, navigation, gnb, micro-task]
description: "고객이 Next Platform에 진입한 순간부터, 현재 상태와 직전의 이용 맥락을 화면에 반영해 나만을 위해 준비된 인상을 제공합니다."
---

# UXP_ETR — 진입의 고객 경험 원칙

---

## UXP_ETR_1 — 상태 기반 선제적 대응

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 앱 진입 시 전체 메뉴를 탐색하기보다 당장 필요한 기능이나 상태 확인부터 시도한다. |
| **AS-IS** | 진입 시 일반화된 홈 구조로 인해 고객은 자신의 상황과 무관한 정보 속에서 필요한 행동을 다시 찾아야 한다. |
| **TO-BE** | C360 및 행동/의도 데이터 기반으로 현재 상황을 즉시 해석하고, 고객별로 다른 우선순위의 마이크로 태스크를 선제적으로 노출해야 한다. 고객의 의도를 기반으로 UX를 동적으로 재구성하는 구조로 이어져야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_ETR_1 |
| `screen_type` | home_entry |
| `trigger` | `session.start == true AND customer_data.available == true` |
| `output` | `proactive-micro-task-card` → slot: `home_primary`, max_count: 1 |
| `input_data` | customer_status, pending_event, recent_action_trigger |
| `fallback` | customer_data.available == false → `proactive-micro-task-card` 미표시 → static_home_layout 렌더링 |

### 규칙 — UXP_ETR_1_RULE

| 조건 | 동작 |
|------|------|
| `component` | `proactive-micro-task-card` |
| `slot` | home_primary |
| `max_count` | 1 — 동시에 복수 카드 렌더링 금지 |
| `data_required` | customer_status, pending_action, recent_event |
| **reject** | static_home_layout 고정 타일·범용 배너를 동등 가중치로 나열 금지 |
| `condition (fallback)` | customer_data.available == false OR pending_action == null → `proactive-micro-task-card` 미표시 |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 고객 데이터 기반으로 상태를 파악하고, 실행 가능한 태스크 카드 단위로 제공한다. | 고객 상황과 무관한 콘텐츠를 개인화 없이 동등하게 나열하지 않는다. |

### 시나리오 — 상황별 적용 방식

| 시나리오 | trigger | copy | cta |
|----------|---------|------|-----|
| 요청받은 데이터 선물 | `family_data_request.pending == true` | `'{family.name}이(가) 데이터 요청을 보냈어요.'` | 지금 바로 선물하기 → action: data_gift_flow |
| 혜택 사용 | `payment.status == pending AND nearby_benefit.applicable == true` | `'지금 {nearby_benefit.partner_name} 결제 대기 중이신가요? 적립혜택 놓치지 마세요.'` | 바코드 열기 → action: benefit_barcode_open |
| 약정 만료 임박 | `contract.days_until_expiry ≤ 7` | `'약정 만료 {contract.days_until_expiry}일 전, {user.grade} {user.name}님은 지금 기기 변경하면 최대 {benefit.max_discount}원 할인받아요.'` | 기기변경 비교하기 → action: device_change_comparison |

---

## UXP_ETR_2 — 끊김 없는 여정 재개

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 구매, 개통, 혜택 활성화 등 중단된 작업을 다시 찾기 위해 여러 화면을 반복 탐색한다. |
| **AS-IS** | 이전 행동 맥락이 유지되지 않아 고객이 어디까지 진행했는지 기억에 의존해야 하며, 이탈 가능성이 높아진다. |
| **TO-BE** | 직전 행동 데이터와 태스크 단계(탐색-비교-결정-실행)를 기반으로 중단 지점을 정확히 복원하고, 진입 즉시 이어서 실행할 수 있는 단일 경로를 제공해야 한다. Intent 기반 Action 설계로 연결되어야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_ETR_2 |
| `screen_type` | home_entry |
| `trigger` | `session.start == true AND incomplete_task.exists == true` |
| `output` | `resume-banner` → slot: `home_top` (홈 진입 첫 화면 상단 고정) |
| `input_data` | incomplete_task.type, incomplete_task.last_step, saved_form_data |
| `behavior_rule` | 입력·선택 정보 유지 상태로 중단 단계에서 즉시 재개 — 초기화 금지 |
| `fallback` | incomplete_task.exists == false → `resume-banner` 미표시 |

### 규칙 — UXP_ETR_2_RULE

| 조건 | 동작 |
|------|------|
| `component` | `resume-banner` (홈 상단) + CTA 1개 |
| `entry_point` | 단일 — 복수 진입점 생성 금지 |
| `data_preserved` | task.last_step, selection.product_id, form_data |
| `resume_action` | task.last_step에서 즉시 재개 |
| **reject** | clear_session_on_exit — 이탈 시 task.step + form_data 초기화 금지 |
| `condition` | incomplete_task.exists == true (언제든 보존 필수) |
| `fallback` | 데이터 보존 불가 시 → `resume-banner` 미표시 (홈 기본 레이아웃) |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 중단 지점부터 재개할 수 있는 진입점을 제공한다. | 이탈 시 고객의 이전 입력·선택 데이터를 삭제하거나 초기화하지 않는다. |

### 시나리오 — 상황별 적용 방식

#### 이어하기 (기기 구매 중단)

| 필드 | 값 |
|------|----|
| `trigger` | `incomplete_task.exists == true AND task.type == device_purchase` |
| `component` | `resume-banner` → slot: home_top |
| `copy` | `'지금까지 입력하신 정보를 자동으로 저장했어요.'` |
| `cta_primary` | 지금 이어서 하기 → action: resume_from_step({task.last_step}) |
| `cta_secondary` | 다음에 하기 → dismiss, preserve data |
| `data_preserved` | task.last_step, selection.product_id, selection.options, form_data |

#### 후속 행동 선제 제안 (개통 미완료)

| 필드 | 값 |
|------|----|
| `trigger` | `order.status == delivered AND activation.completed == false` |
| `component` | `next-step-proposal` → slot: home_primary |
| `copy` | `'{product.name} 배송 완료됐어요.'` |
| `cta` | 1분 개통 신청 > → action: device_activation_flow |

---

## UXP_ETR_3 — 구조적 명확성

### 개요

| 항목 | 내용 |
|------|------|
| **BEHAVIOR** | 고객은 탭 이동이나 기능 전환 시 현재 위치와 맥락을 다시 해석하려고 시도한다. |
| **AS-IS** | 구조와 네비게이션이 일관되지 않으면 고객은 매 화면마다 새롭게 이해해야 하며, 인지 부담이 누적된다. |
| **TO-BE** | 자산 유형이나 기능이 달라도 동일한 원리로 이해 가능한 구조를 유지하고, 현재 위치·상태·맥락을 항상 명확하게 드러내야 한다. 고객이 상황을 해석하지 않아도 되는 Frictionless Experience로 이어져야 한다. |

### 패턴 정의

| 필드 | 값 |
|------|----|
| `pattern_id` | UXP_ETR_3 |
| `screen_type` | any_tab (GNB_홈 / GNB_혜택 / GNB_쇼핑 / GNB_나의T) |
| `trigger` | `tab_navigation OR feature_transition` |
| `output` | `gnb-layout` — 고정 위계: 타이틀 / 콘텐츠 / 퀵메뉴 |
| `layout_rule` | 모든 탭 동일 위계 유지 — 탭별 커스텀 구조 금지 |
| `state_visible` | 활성 탭 GNB 하이라이트 필수 / 이전 컨텍스트 소실 금지 |

### 규칙 — UXP_ETR_3_RULE

| 조건 | 동작 |
|------|------|
| `layout_component` | `gnb-layout` |
| `zones` | 타이틀(top) / 콘텐츠(middle) / 퀵메뉴(bottom) — 탭 무관 고정 |
| `applies_to` | all_tabs — 예외 없음 |
| `layout` | gnb-layout: 타이틀 → 콘텐츠 → 퀵메뉴 (순서 고정) |
| `consistency` | 탭 전환 시 동일 레이아웃 원리 유지 |
| `active_state` | 현재 탭 GNB 하이라이트 항상 표시 |
| **reject** | per_tab_custom_layout — 탭마다 위계·레이아웃 다르게 구성 금지 |

### Do / Don't

| Do ✅ | Don't ❌ |
|-------|---------|
| 탭에 관계없이 타이틀·콘텐츠·퀵메뉴 구조를 동일하게 유지하고, 현재 탭을 항상 명시한다. | 탭마다 각각 다른 UI 구조를 사용하지 않는다. |

### 시나리오 — 상황별 적용 방식

| 탭 | layout | title | content |
|----|--------|-------|---------|
| GNB_홈 | `gnb-layout` (타이틀 / 콘텐츠 / 퀵메뉴) | `'{user.name}님, 찾아보실 필요 없게 필요한 것들만 모아봤어요'` | `proactive-micro-task-card` (pending_action 기반) |
| GNB_혜택 | `gnb-layout` (동일 위계 유지) | `'{user.name}님, T 혜택으로 {benefit.total_saved}원 절약했어요!'` | benefit_summary_card + 혜택 사용 CTA |
| GNB_쇼핑 | `gnb-layout` (동일 위계 유지) | `'{user.name}님에게 필요할 것 같은 상품들을 준비해봤어요.'` | personalized_product_cards (user_profile 기반 추천) |

| 공통 규칙 | 값 |
|---------|-----|
| `consistency_rule` | GNBLayout 위계 (타이틀→콘텐츠→퀵메뉴) 모든 탭·기능 전환 시 동일 적용 |
| `active_tab_indicator` | 현재 활성 GNB 탭 항상 시각적으로 명시 (하이라이트) |
