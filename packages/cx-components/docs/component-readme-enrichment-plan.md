# Component README Enrichment Plan

> 목적: Figma Page MOCK SOT와 실제 화면 제작 경험을 바탕으로 `@pxds/cx-components`의 각 component README를 생성 친화적인 사용 계약으로 보강한다.
> 이 문서는 별도의 컴포넌트 용례 SOT가 아니라, README 보강 작업을 진행하기 위한 계획 문서다.

---

## 1. 배경

현재 `DESIGN_PATTERNS.md`는 화면 패턴과 조립 구조를 다루고, `component-inventory.md`는 컴포넌트 존재 여부, Figma source, dependencies, variants, properties를 추적한다.

화면 생성 시에는 여기에 더해 "이 컴포넌트를 어떤 정책 의미와 화면 slot에서 써야 하는가"가 필요하다. 이 정보는 별도 전역 문서로 분리하기보다 각 component README에 가까이 두는 편이 좋다.

이 계획의 목표는 다음과 같다.

- Figma MOCK SOT에서 실제 반복 용례를 확인한다.
- 컴포넌트 README에 사용 목적, 허용 위치, 상태, 금지 조건을 추가한다.
- 기존 컴포넌트가 자주 함께 쓰이는 composition pattern을 추출한다.
- 정책 기반 화면 생성 시 컴포넌트 선택 판단을 안정화한다.
- 중복 문서가 늘어나지 않도록 inventory와 pattern 문서의 책임을 유지한다.

---

## 2. 문서 책임 분리

| 문서 | 책임 | 쓰지 않는 내용 |
| --- | --- | --- |
| `DESIGN_PATTERNS.md` | 화면 유형, section 구조, CTA/overlay/list/form 같은 조립 규칙 | 개별 컴포넌트의 모든 용례 |
|  | token을 실제 화면/컴포넌트 간격에 적용하는 운영 규칙 | 컴포넌트 선택 기준 |
| `component-inventory.md` | 컴포넌트 목록, 상태, source, dependency, variant/property 현황 | 상세 UX 사용 계약 |
| component README | 해당 컴포넌트의 사용 목적, props, states, allowed context, anti-pattern | 화면 패턴 전체 설명 |

README에 보강한 내용이 화면 패턴 전반에 영향을 주면 `DESIGN_PATTERNS.md`로 승격한다. 여러 컴포넌트에 반복되는 spacing 규칙이면 로 승격한다.

---

## 3. README 보강 기준

각 컴포넌트 README에는 가능한 범위에서 아래 섹션을 맞춘다.

```md
## Purpose

이 컴포넌트가 사용자에게 어떤 정보/행동을 제공하는지.

## Use When

정책 의미 또는 화면 과업 기준으로 언제 쓰는지.

## Do Not Use When

비슷하지만 다른 컴포넌트를 써야 하는 경우.

## Allowed Context

허용되는 화면 패턴, section, slot.

## States

지원 상태와 상태별 의미.

## Policy Mapping

정책서의 필수 정보, 선택지, 제한 조건, 에러, 안내 중 무엇을 담는지.

## Composition

함께 쓰는 컴포넌트/pattern과 slot 구조.

- 자주 함께 쓰이는 부모/자식 컴포넌트
- 허용되는 slot 위치
- 반복 개수 기준
- 다른 컴포넌트로 전환되는 조건

## Figma Notes

MOCK SOT에서 확인한 frame/node, 반복 사례, variant/property 주의사항.
```

모든 README에 모든 섹션을 억지로 채우지 않는다. primitive에 가까운 `Icon`, `Text`, `Divider`는 간결하게 유지하고, 정책 의미를 직접 담는 컴포넌트부터 자세히 쓴다.

---

## 4. 작업 순서

### Phase 0. 기준 확인

작업 전에 아래 문서를 확인한다.

- `DESIGN_PATTERNS.md`
- `DESIGN_FOUNDATION.md`
- 
- `SCREEN_STRUCTURE_PRINCIPLES.md`
- `packages/cx-components/docs/component-inventory.md`
- 대상 component의 현재 README, types, variants, CSS

### Phase 1. 핵심 정책 표현 컴포넌트

정책 의미를 직접 담거나 생성 판단에서 자주 헷갈리는 컴포넌트를 먼저 보강한다.

| 우선순위 | 컴포넌트 | 확인할 핵심 질문 |
| --- | --- | --- |
| P0 | `ListText` | 읽기 전용 정보와 선택지의 경계가 명확한가? |
| P0 | `ListSelected` | 단일/복수 선택, disabled reason, popup/bottomsheet 기준이 명확한가? |
| P0 | `TextField` | 입력 검증, help text, error 위치가 명확한가? |
| P0 | `Checkbox` / `CheckboxText` 계열 | 필수/선택 동의, 전체 동의, 약관 상세 연결이 명확한가? |
| P0 | `Callout` | 안내/제한/에러/field validation의 경계가 명확한가? |

### Phase 2. CTA와 전환 컴포넌트

사용자 행동과 화면 전환을 결정하는 컴포넌트를 보강한다.

| 우선순위 | 컴포넌트 | 확인할 핵심 질문 |
| --- | --- | --- |
| P0 | `ActionButton` | bottom action-area, disabled/loading/danger 조건이 명확한가? |
| P0 | `PopupActionButton` | 1버튼/2버튼, destructive action, 버튼 순서가 명확한가? |
| P1 | `Button` | 독립 배치 금지와 slot 내부 사용 기준이 명확한가? |
| P1 | `BottomNavigation` | main/browse chrome과 ActionButton 이분법이 명확한가? |

### Phase 3. 화면 조립과 overlay 컴포넌트

`cx-components`와 `cx-layout` 경계가 섞이기 쉬운 컴포넌트를 정리한다.

| 우선순위 | 컴포넌트 | 확인할 핵심 질문 |
| --- | --- | --- |
| P0 | `Bottomsheet` | visual component와 layout runtime 책임이 구분되는가? |
| P0 | `Popup` | blocking modal, scroll 금지, bottomsheet 전환 기준이 명확한가? |
| P1 | `PageStackContents` | section wrapper인지, content component인지 경계가 명확한가? |
| P1 | `SectionItem` | Figma slot item과 repo 구현 책임이 명확한가? |
| P1 | `AccordionList` | FAQ/약관/상세정보와 필수 정보 노출 기준이 명확한가? |

### Phase 4. 탐색/목록/상품 표현 컴포넌트

리스트와 탐색 화면에서 반복되는 조합을 보강한다.

| 우선순위 | 컴포넌트 | 확인할 핵심 질문 |
| --- | --- | --- |
| P1 | `SearchBar` | 검색형 main/list에서의 위치와 empty/search state가 명확한가? |
| P1 | `Chips` / `ChipItem` | category/date/filter chip의 차이가 명확한가? |
| P1 | `FilterSorting` | 정렬/필터 action과 bottomsheet 연결 기준이 명확한가? |
| P2 | `BannerHorizontal` | 프로모션/정책 안내/광고성 content의 경계가 명확한가? |
| P2 | 상품 카드/캐러셀 계열 | list/detail/main에서의 사용 위치와 CTA 포함 기준이 명확한가? |

### Phase 5. 반복 조합 패턴 정리

개별 컴포넌트보다 "어떤 묶음으로 써야 하는가"가 중요한 조합을 별도로 추출한다.

| 우선순위 | Composition | 확인할 핵심 질문 |
| --- | --- | --- |
| P0 | `Bottomsheet + TitleBottomSheet + ListSelected + ActionButton` | 선택형 bottom sheet의 content/action 기준이 명확한가? |
| P0 | `Popup + SubText + PopupActionButton` | 차단형 확인/취소와 bottomsheet 전환 기준이 명확한가? |
| P0 | `PageStackContents + SectionItem + ListText` | 읽기 전용 정책 정보 section 구조가 명확한가? |
| P0 | `PageStackContents + FieldStack + TextField` | 입력 group과 field validation 위치가 명확한가? |
| P1 | `Checkbox` 전체 동의 + `Divider` + `Checkbox` 개별 항목 | 필수/선택 약관과 상세 연결 기준이 명확한가? |
| P1 | `TitleSection + Card/List item + internal CTA` | 카드 내부 보조 action과 화면 primary CTA의 경계가 명확한가? |
| P1 | `Chips + FilterSorting + ProductListGroup` | list filter/sort와 bottomsheet 연결 기준이 명확한가? |
| P1 | `AccordionList + Divider` | FAQ/약관/상세정보의 펼침 기본값과 필수 정보 노출 기준이 명확한가? |

---

## 5. SOT 관찰 방식

Figma Page MOCK SOT를 받으면 컴포넌트별로 바로 문서화하지 않고, 먼저 화면 단위로 관찰한다.

1. 화면명과 node/frame id를 기록한다.
2. `DESIGN_PATTERNS.md`의 화면 패턴으로 분류한다.
3. section/slot 구조를 기록한다.
4. 반복되는 컴포넌트와 variant/property를 기록한다.
5. 정책 의미를 담는 정보, 선택지, 제한 조건, 에러, CTA를 표시한다.
6. 반복되는 composition pattern을 기록한다.
7. README에 들어갈 내용과 pattern 문서로 올려야 할 내용을 분리한다.

README에 기록할 때는 "Figma에서 이렇게 보였다"에 머물지 않고 "생성기가 언제 이 컴포넌트를 선택해야 하는가"까지 적는다.

관찰 중인 내용은 `component-enrichment-plan/` 하위의 컴포넌트별 staging note에 먼저 기록한다. 이 폴더는 최종 SOT가 아니며, 확정된 내용만 component README, `DESIGN_PATTERNS.md`, `cx-layout` 문서, 또는 `component-inventory.md`로 반영한다.

---

## 6. Composition pattern 처리

Figma MOCK SOT에서 기존 컴포넌트가 반복적으로 같은 구조로 조합되는 경우, 새 component를 만들기보다 composition pattern으로 먼저 기록한다.

```txt
screen observation
-> repeated component chain
-> parent/slot contract
-> policy meaning
-> README 보강 or DESIGN_PATTERNS 승격 or layout pattern 후보
```

### 6-1. Composition 기록 기준

아래 조건 중 2개 이상을 만족하면 composition pattern으로 기록한다.

- 서로 다른 화면 또는 같은 화면의 여러 section에서 같은 부모/자식 구조가 반복된다.
- 특정 정책 의미와 연결된다. 예: 선택지, 확정 정보, 동의, 에러, CTA.
- slot 위치가 생성 품질에 중요하다. 예: Popup action slot, BottomSheet con slot, AppScreen bottom slot.
- 잘못 조합하면 의미가 달라진다. 예: `ListText`와 `ListSelected` 혼용.
- 반복 개수 또는 content 길이에 따라 Popup/BottomSheet/Form section 전환 기준이 필요하다.

### 6-2. 기록 위치

| 내용 | 기록 위치 |
| --- | --- |
| 특정 component가 어떤 부모/slot 안에서 쓰이는지 | 해당 component README의 `Composition` |
| 여러 component가 만드는 화면 수준 조립 규칙 | `DESIGN_PATTERNS.md` |
| rail, slot, action-area, overlay shell 같은 layout contract | `@pxds/cx-layout` 문서 |
| spacing gap, divider, content width 같은 운영 규칙 |  |
| 특정 도메인 정책을 담는 조합 | `apps/mobile/src/organisms/<domain>/` README 또는 diagram |

### 6-3. Composition 기록 형식

README에 남길 때는 짧은 구조와 판단 기준을 함께 쓴다.

````md
## Composition

### BottomSheet selection

Structure:
```txt
Bottomsheet
  TitleBottomSheet
  con: ListSelected x N
  action: ActionButton optional
```

Use when:
- 옵션, 필터, 기간처럼 현재 화면 맥락 안에서 선택해야 하는 항목.

Switch when:
- 5개 이하의 차단형 선택이면 Popup을 검토한다.
- 긴 입력 과업이면 Form Entry 화면으로 분리한다.

Observed:
- Figma page/frame/node: TODO
````

### 6-4. Composition 결정표

SOT 분석 중에는 아래 표를 작업 산출물로 만든다.

| Composition | Components | Used in | Policy meaning | Decision | Follow-up |
| --- | --- | --- | --- | --- | --- |
| BottomSheet selection | `Bottomsheet`, `TitleBottomSheet`, `ListSelected`, `ActionButton` | TODO | 선택지/필터 | README 보강 | TODO |

Decision 값은 아래 중 하나로 적는다.

- `README`: 관련 component README에 조합 용례를 보강한다.
- `DESIGN_PATTERN`: 화면 패턴 규칙으로 승격한다.
- `LAYOUT_PATTERN`: `cx-layout` pattern 또는 slot contract로 분리한다.
- `ORGANISM`: 특정 domain organism 내부 조합으로 둔다.
- `RQR_CANDIDATE`: 반복 조합이 독립 visual component로 승격될 가능성이 높다.

### 6-5. 새 컴포넌트로 만들지 않는 조합

아래 조합은 반복되어도 곧바로 새 component로 만들지 않는다.

- 기존 component의 slot contract만으로 충분히 표현된다.
- 화면 패턴의 section 구조를 설명하는 것이 핵심이다.
- 특정 domain policy에만 묶여 있다.
- wrapper를 추가하지 않아도 README와 diagram으로 생성기가 올바르게 조합할 수 있다.

---

## 7. 없는 컴포넌트 처리

Figma Page MOCK SOT에서 현재 repo에 없는 컴포넌트를 발견해도 바로 `cx-components`에 추가하지 않는다. 먼저 아래 순서로 분류한다.

```txt
missing in repo
-> existing vocabulary 조합으로 표현 가능한가?
-> layout/pattern 책임인가?
-> domain organism 책임인가?
-> CX visual component 후보인가?
-> RQR candidate로 임시 수용할 것인가?
```

### 7-1. 분류 기준

| 분류 | 처리 위치 | 기준 |
| --- | --- | --- |
| 기존 조합으로 표현 가능 | 기존 component README 또는 pattern 문서 보강 | 새 시각 언어 없이 `ListText`, `ListSelected`, `Callout`, `Button`, `TitleSection` 등의 조합으로 의미가 보존된다. |
| Layout/slot 책임 | `@pxds/cx-layout` | placement, rail, section, action-area, overlay shell, scroll contract가 핵심이다. |
| Domain organism | `apps/mobile/src/organisms/<domain>/` | 특정 정책 도메인, OGN, 상품/요금/결제 맥락에 강하게 묶여 있다. |
| CX component 후보 | `packages/cx-components/src/candidate/rqr-*` | 반복 가능하고, 독립적인 visual identity/state/variant가 있으며 Figma component identity가 필요하다. |
| Inventory gap | `component-inventory.md` 보정 | 실제 구현은 있는데 inventory/detail link/status가 누락되었거나 이름이 다르다. |

### 7-2. RQR candidate 조건

아래 조건을 대부분 만족할 때만 신규 RQR candidate를 만든다.

- 기존 component 조합으로 정책 의미, 상태, slot, Figma identity를 표현하기 어렵다.
- 동일하거나 유사한 MOCK 사례가 2개 이상 있거나, 정책 생성에서 반복될 가능성이 높다.
- 단순 layout wrapper가 아니라 visual component 또는 compound로서 의미가 있다.
- domain organism 내부에만 머물기에는 여러 화면/도메인에서 재사용될 수 있다.
- props, variant, state, Figma property를 명확히 이름 붙일 수 있다.

RQR candidate를 만들면 다음을 함께 남긴다.

- `src/candidate/rqr-{name}` 구현
- candidate README
- `component-inventory.md` entry
- Figma MOCK SOT 관찰 근거
- promotion 조건

### 7-3. 만들지 않는 경우

아래 경우는 새 component로 만들지 않는다.

- 화면 하나의 정책 의미에만 종속된 조합이면 domain organism으로 둔다.
- spacing이나 placement 문제만 해결하려는 wrapper라면 `cx-layout` pattern 또는 기존 slot으로 해결한다.
- 기존 컴포넌트의 README/variant 설명이 부족해서 새 것처럼 보이는 경우, README 또는 variant contract를 먼저 보강한다.
- Figma의 `Local_*` 이름이 붙어 있어도 실제로는 route/domain 조합이면 app organism 후보로 본다.
- deprecated `@pxds/pxds-components` 또는 `@pxds/pxds-icons`로만 빠르게 맞추는 방식은 신규 vocabulary 기준으로 삼지 않는다.

### 7-4. 기록 형식

없는 컴포넌트를 발견하면 작업 중 아래 형식으로 짧게 기록한다.

```md
### Missing: FigmaComponentName

Figma source:
- page/frame/node: TODO

Observed use:
- TODO

Policy meaning:
- TODO

Decision:
- reuse existing / layout pattern / domain organism / RQR candidate / inventory gap

Reason:
- TODO

Follow-up:
- TODO
```

---

## 8. README 변경 원칙

- README는 구현과 함께 읽히는 사용 계약이다. 긴 분석 보고서로 만들지 않는다.
- Figma node id와 화면명은 `Figma Notes`에 짧게 남긴다.
- 정책 매핑은 구체적인 정책 문장 전체를 복사하지 않고 정보 유형으로 적는다.
- 컴포넌트가 아닌 layout 책임은 `cx-layout` 문서나 `DESIGN_PATTERNS.md`로 보낸다.
- 같은 규칙을 여러 README에 반복해야 하면 상위 문서로 승격한다.
- README 보강 중 실제 구현과 문서가 다르면 먼저 코드와 inventory를 확인하고, 단순 문서 보강인지 구현 수정이 필요한지 분리한다.

---

## 9. 완료 기준

각 컴포넌트 README 보강은 아래를 만족하면 완료로 본다.

- 생성기가 해당 컴포넌트를 선택해야 하는 상황과 선택하면 안 되는 상황이 설명되어 있다.
- 화면 패턴 또는 slot 위치가 명확하다.
- 자주 함께 쓰이는 기존 컴포넌트 조합이 `Composition` 또는 상위 pattern 문서에 기록되어 있다.
- 상태와 정책 의미가 연결되어 있다.
- Figma MOCK SOT의 관찰 근거가 최소 1개 이상 남아 있다.
- `component-inventory.md`의 variant/property 정보와 충돌하지 않는다.
- spacing, color, typography 값은 token 문서와 충돌하지 않는다.

---

## 10. 산출물

작업 결과는 아래 형태로 남긴다.

- 업데이트된 component README
- 반복 composition 결정표
- 필요 시 `component-inventory.md`의 Detail 링크, status, variant/property 보정
- 반복 규칙으로 승격해야 할 경우 `DESIGN_PATTERNS.md` 또는  보정
- 신규 표현이 필요하면 `src/candidate/rqr-*` 후보 생성 여부 기록
