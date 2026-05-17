# HTML Screen Diagram Standard

> 상태: active standard. 이 문서는 `Screen.diagram.html` 표준 스펙이다. 파일럿 기준 구현은 `apps/mobile/src/app/(cx-example)/CX-EXAMPLE-COMPLETE-PLAN-CHANGE/Screen.diagram.html`이다. 전환 기간에는 기존 `Screen.diagram.md`를 migration source/reference로 함께 보존한다. 신규/수정 화면의 표준 산출물은 `Screen.diagram.html`이지만, 기존 md를 삭제하거나 단순 요약 카드로 축약하지 않는다.

## 목표

`Screen.diagram.html`은 사람이 보는 **시각 다이어그램**과 기계가 읽는 **계약 데이터**를 한 파일에 함께 담는다.

HTML 전환의 목적은 MD 문서를 그대로 HTML에 덤프하는 것이 아니다. 기본 화면은 디자인 검수에 필요한 정보를 빠르게 보여주고, 상세 계약은 숨겨진 JSON으로 보존해 자동 검사와 diff 기준으로 사용한다.

```txt
Screen.diagram.html
├─ Visual Screen
├─ Review Summary
├─ Reference Summary
├─ Section Inspector
├─ Distortion Gates
└─ Hidden Machine Contract JSON
   ├─ lifecycle
   ├─ renderEvidence
   ├─ iterationPasses
   └─ contractSync
```

## 파일 위치

각 화면 폴더에 둔다.

```txt
apps/mobile/src/app/(group)/SCREEN-ID/
├── Screen.map.md
├── Screen.diagram.html
├── Screen.tsx
└── Screen.config.ts
```

전환 기간에는 같은 폴더에 기존 `Screen.diagram.md`가 migration source/reference로 함께 있을 수 있다. 최종 표준은 `Screen.diagram.html`이며, 새 다이어그램을 MD로 만들지 않는다. 기존 md가 있는 화면은 md의 Screen Wire, section contract, 표시 copy를 HTML 시각 영역과 hidden contract로 빠짐없이 이관한다.

## 기본 원칙

- HTML은 실제 구현이 아니라 **검수 가능한 구조 다이어그램**이다.
- Visual Screen은 단순 섹션 카드 목록이 아니라 실제 모바일 화면 rail을 닮아야 한다. 레이어 구조, 표시 텍스트, 카드/필드/list row, 좌우 label-value 관계, bottom action이 눈으로 검수 가능해야 한다.
- 기본 화면에는 전체 JSON을 노출하지 않는다.
- 기계 계약은 `<script type="application/json" id="diagram-contract">`에 내장한다.
- 시각 DOM과 JSON 계약은 같은 section id, OGN id, pattern role을 공유한다.
- 후보 component 이름은 승인 기준이 아니라 `layoutContract` 충족 여부를 판단하기 위한 후보 목록이다.
- `data-*` 속성은 자동 검사와 DOM 기반 검수용 계약으로 본다.
- route-level raw margin/padding, raw spacing, raw color, custom font-size 보정은 HTML 표준에서도 금지 신호로 기록한다.
- `Migrated from legacy markdown`, section id만 나열한 placeholder, component 이름만 적은 박스는 표준 위반이다. md에서 넘어온 정보가 많아도 보이는 영역에는 최종 화면의 실제 텍스트와 구조로 재구성한다.
- 다이어그램은 `lifecycle: "thin"`으로 시작할 수 있지만 구현과 검수 후에는 `lifecycle: "synced"`로 갱신되어야 한다.
- 렌더 검수 증거는 screenshot이 아니라 geometry evidence가 필수다. screenshot 또는 capture artifact는 가능한 경우에만 보조 증거로 둔다.

## 보이는 영역 표준

### 1. Visual Screen

왼쪽 또는 첫 번째 주요 영역에 모바일 화면 rail을 보여준다.

필수:

- 화면 ID
- `data-screen-id`
- `data-route`
- `data-pattern`
- `data-wire-reference`
- `SystemHeader`, `Header`, `Content`, `Bottom` rail
- 각 의미 section의 `data-section-id`
- 각 의미 section의 `data-ogn-id`
- 각 의미 section의 `data-pattern-role`
- 각 의미 section의 `data-boundary`
- 각 의미 section의 `data-layout-contract`
- 실제 표시 텍스트: title, subtitle, label, value, helper/error copy, list item title/caption, CTA label
- 실제 레이어 표현: card surface, divider, field stack, radio/checkbox row, inline action, bottom sheet/popup rail, fixed bottom action
- 좌우 구조가 있는 영역은 label/value를 같은 row 안에서 좌/우 컬럼으로 보여준다. key-value 요약을 단순 문장이나 bullet로 바꾸지 않는다.

금지:

- section id와 "Migrated from legacy markdown"만 보이는 placeholder card
- `Screen.map.md` 또는 JSON 계약만 맞고 Visual Screen은 비어 있는 상태
- component 후보명만 나열하고 실제 화면 copy/row/layer가 보이지 않는 상태
- bottom CTA를 content card처럼 표시하거나 fixed bottom rail을 생략하는 상태

예:

```html
<section
  class="phone"
  data-screen-id="CX-EXAMPLE-COMPLETE-PLAN-CHANGE"
  data-route="/CX-EXAMPLE-COMPLETE-PLAN-CHANGE"
  data-pattern="complete"
  data-wire-reference="apps/mobile/src/app/(cx-example)/CX-EXAMPLE-COMPLETE-ACTIVATION/Screen.diagram.html"
>
  <div data-rail="SystemHeader">...</div>
  <header data-rail="Header">...</header>
  <div data-rail="Content">
    <section
      data-section-id="completionSummary"
      data-ogn-id="structural-only"
      data-pattern-role="key-value-summary"
      data-boundary="card"
      data-layout-contract="card-owned surface, header, padding, radius, stable label-value rows"
    >
      ...
    </section>
  </div>
  <footer data-rail="Bottom" data-preset="primary-cta">...</footer>
</section>
```

### 2. Review Summary

사람이 첫 화면에서 현재 다이어그램 상태를 판단할 수 있어야 한다.

필수 항목:

- 패턴
- 레퍼런스
- 스페이싱
- 정책/OGN
- 왜곡 게이트

상태 값:

```txt
통과 | 확인 필요 | 실패 | 해당 없음
```

각 상태에는 한 문장 근거를 붙인다.

### 3. Reference Summary

선택한 기준 reference를 짧게 보여준다.

필수:

- 기준 reference
- pattern family
- matched parts 요약
- intentional differences 요약

후보 reference 전체와 reject 이유는 보이는 영역에 전부 펼치지 않고, machine contract JSON에 둔다. 필요하면 `<details>`로 접힌 보조 영역에만 노출한다.

### 4. Section Inspector

section별로 사람이 검수해야 할 핵심 계약을 보여준다.

각 section은 최소한 아래 정보를 가진다.

- section id
- slot
- 역할
- boundary
- 선택 후보
- 후보 평가 펼침 영역

후보 평가 펼침 영역에는 section의 모든 후보를 보여준다.

후보 표시 필드:

- 후보명
- `fit`: `strong | medium | weak | reject`
- 선택 여부
- 선정 또는 미선정 이유
- risk

예:

```txt
completionSummary
- slot: Content
- 역할: 변경 결과 key-value 요약
- boundary: cardBoundary
- 선택 후보: RQRContentsDetail

후보 평가 보기
- strong · 선택: RQRContentsDetail
- medium · 미선택: SectionItem(type="card") + ListText(table)
- reject: domain key-value summary organism
- reject: plain ListText(table) without card surface
```

### 5. Distortion Gates

기본 화면에 핵심 gate를 짧게 노출한다.

보이는 영역은 3-6개 핵심 gate만 둔다. 전체 gate 목록은 machine contract JSON에 보존한다.

예:

- CTA를 scroll content 안으로 옮기지 않는다.
- section divider나 독립 hero card를 임의로 추가하지 않는다.
- summary card surface, padding, radius를 route-level CSS로 보정하지 않는다.
- policy ID, OGN ID, 과금 규칙, navigation behavior를 임의로 만들지 않는다.

## 숨겨진 계약 JSON 표준

HTML 파일은 반드시 아래 script를 포함한다.

```html
<script type="application/json" id="diagram-contract">
{
  "lifecycle": "thin | synced",
  "screenContract": {},
  "screenWire": {},
  "sections": [],
  "policyOgnMatrix": [],
  "distortionGates": [],
  "renderEvidence": {},
  "iterationPasses": [],
  "contractSync": {}
}
</script>
```

이 JSON은 상세 계약 정보를 모두 보존한다. 기본 UI에서 전체 JSON을 보여주지 않는다.

### lifecycle

필수:

```json
"thin | synced"
```

의미:

- `thin`: 구현 전 또는 Fast Build 직후의 얇은 방향 계약이다. `wireReference`, `pattern`, rail, 주요 section, 최소 `layoutContract`, known risk가 있어야 한다.
- `synced`: 최종 구현, render evidence, iteration pass, component candidate 판정, distortion gate가 같은 계약으로 동기화된 상태다.

신규/수정 화면의 최종 산출물은 `synced`여야 한다. `thin`은 작업 중간 상태 또는 명시적 파일럿 산출물에만 허용한다.

### screenContract

필수:

```json
{
  "screenId": "SCREEN-ID",
  "route": "/SCREEN-ID",
  "group": "group",
  "domain": "domain",
  "source": "SB | Figma | policy-core | mixed",
  "pattern": "complete | form | detail | list | bottom-sheet | popup",
  "policyRefs": [],
  "ognIds": [],
  "governanceRefs": [],
  "requiredDesignDocs": [
    "DESIGN_PATTERNS.md",
    "DESIGN_FOUNDATION.md",
    "SCREEN_STRUCTURE_PRINCIPLES.md"
  ],
  "mapSource": "Screen.map.md",
  "appScreenRails": ["SystemHeader", "Header", "Content", "Bottom"],
  "headerContract": "...",
  "bottomContract": "...",
  "wireReference": {
    "source": "...",
    "matchedParts": "...",
    "intentionalDifferences": "...",
    "limitation": "..."
  },
  "referenceSearch": [],
  "patternRecheck": {
    "source": "DESIGN_PATTERNS.md#...",
    "result": "revised | no-change",
    "reason": "..."
  }
}
```

`policyRefs`, `ognIds`, `governanceRefs`가 비어 있으면 사유를 `notApplicableReason` 또는 section별 `policy`에 기록한다.

### screenWire

HTML visual DOM의 구조 요약이다.

필수:

- rails
- sections
- 각 section의 semantic tag
- 화면에 보이는 주요 copy
- card/list/form row 정보
- CTA 정보

### sections

각 section은 기존 MD의 `Section Contracts`를 구조화한 것이다.

필수:

```json
{
  "sectionId": "completionSummary",
  "slot": "Content",
  "ogn": "structural-only",
  "policy": "none; component proof screen",
  "appliedGovernanceRefs": [],
  "patternEvidence": {
    "sectionBoundary": "none | SectionDivider | contentsDivider | cardBoundary",
    "fieldGrouping": "none | single | FieldStack | FieldStackWithDividers",
    "rowSeparators": "none | Divider(type=\"contents\") | Divider(type=\"section\")",
    "actionPlacement": "none | Content | Bottom(preset=\"primary-cta\") | inline field action",
    "typography": {}
  },
  "patternDecision": {
    "pattern": "...",
    "reason": "..."
  },
  "ognBoundaryDecision": {
    "decision": "reuse | extend | new | structural-only",
    "reason": "..."
  },
  "layoutStrategy": {
    "widthTier": "...",
    "padding": "...",
    "stack": "...",
    "alignment": "...",
    "typography": "...",
    "wrapping": "...",
    "overflow": "..."
  },
  "layoutContract": {
    "role": "...",
    "structure": "...",
    "alignment": "...",
    "density": "...",
    "wrapping": "...",
    "distortionRisk": "..."
  },
  "componentCandidates": []
}
```

### componentCandidates

모든 후보를 보존한다. 선택 후보만 남기면 안 된다.

필수:

```json
{
  "name": "RQRContentsDetail",
  "source": "@pxds/cx-components",
  "fit": "strong | medium | weak | reject",
  "selected": true,
  "reason": "...",
  "risk": "..."
}
```

규칙:

- `selected: true`는 section당 0개 또는 1개를 권장한다.
- rejected 후보도 반드시 보존한다.
- `reason`은 component 이름 유사도가 아니라 layoutContract 충족 여부를 설명해야 한다.
- `risk`는 `medium`, `weak`, `reject`에서 특히 중요하다.

### policyOgnMatrix

필수:

```json
{
  "requirement": "...",
  "sourceRef": "...",
  "policy": "...",
  "ogn": "...",
  "section": "...",
  "appliedGovernanceRefs": [],
  "layoutContractSummary": "..."
}
```

### distortionGates

전체 gate 문장을 배열로 보존한다.

```json
[
  "Preserve rail order...",
  "Do not move CTA into Content..."
]
```

### renderEvidence

실제 렌더 검수 증거다. geometry evidence는 필수이며, screenshot은 선택이다.

필수:

```json
{
  "capturedAt": "2026-05-18T00:00:00.000Z",
  "target": {
    "route": "/SCREEN-ID",
    "viewport": {
      "width": 390,
      "height": 844
    }
  },
  "geometryEvidence": {
    "screenRoot": {
      "selector": "[data-screen-id=\"SCREEN-ID\"]",
      "box": { "x": 0, "y": 0, "width": 390, "height": 844 }
    },
    "rails": [
      {
        "rail": "Header",
        "box": { "x": 0, "y": 24, "width": 390, "height": 56 }
      }
    ],
    "sections": [
      {
        "sectionId": "completionSummary",
        "box": { "x": 16, "y": 120, "width": 358, "height": 144 },
        "visibleTextPresent": true
      }
    ],
    "bottomOverlap": false,
    "contentOverflow": "none | scrolls-with-clearance | overflow-risk",
    "knownIssues": []
  },
  "screenshot": {
    "required": false,
    "artifact": null,
    "reason": "screenshot unavailable or optional"
  }
}
```

규칙:

- `geometryEvidence`는 최종 `synced` 계약에서 반드시 채운다.
- Header / Content / Bottom / CTA가 있는 화면은 해당 rail 또는 CTA의 bounding box를 남긴다.
- 주요 policy-bearing section은 `sections[].visibleTextPresent`로 텍스트 존재를 확인한다.
- screenshot 또는 capture artifact가 없다는 이유만으로 다이어그램 계약이 실패하지 않는다.

### iterationPasses

구현 후 디자인 반복 검수의 결과를 배열로 보존한다.

필수:

```json
[
  {
    "pass": "pattern-match | reference-match | spacing-density-hierarchy | custom",
    "status": "pass | changed | blocked",
    "checkedAgainst": ["DESIGN_PATTERNS.md", "Screen.diagram.html"],
    "changes": [],
    "evidenceRefs": ["renderEvidence.geometryEvidence"],
    "remainingRisks": []
  }
]
```

규칙:

- `synced` 계약은 최소 1개 이상의 iteration pass를 기록한다.
- 변경이 없었더라도 어떤 기준으로 확인했는지 `checkedAgainst`에 남긴다.
- 중간 메모를 모두 보존하지 않는다. 최종 계약에 영향을 준 판단만 남긴다.

### contractSync

최종 구현과 문서 계약이 같은지 기록한다.

필수:

```json
{
  "status": "synced | needs-sync",
  "syncedAt": "2026-05-18T00:00:00.000Z",
  "syncedFiles": [
    "Screen.map.md",
    "Screen.diagram.html",
    "Screen.config.ts",
    "Screen.tsx"
  ],
  "checks": {
    "mapMatchesPolicyRefs": true,
    "diagramMatchesDomSections": true,
    "configMatchesGenerationRefs": true,
    "renderEvidenceCaptured": true
  },
  "notes": []
}
```

규칙:

- 최종 보고 가능한 화면은 `contractSync.status: "synced"`여야 한다.
- `needs-sync`는 작업 중 상태로만 허용한다.
- sync 대상은 내용을 재서술하지 않고 파일과 검사 결과를 가리킨다.

## DOM과 JSON 일치 규칙

자동 검사는 최소한 아래를 확인해야 한다.

- `data-screen-id` equals `screenContract.screenId`
- `data-route` equals `screenContract.route`
- `data-pattern` equals `screenContract.pattern`
- top-level `lifecycle` is `thin` or `synced`
- DOM의 모든 `[data-section-id]`가 `sections[].sectionId`에 존재한다.
- `sections[].sectionId`가 DOM에 존재한다.
- DOM의 `data-ogn-id`가 section JSON의 `ogn`과 충돌하지 않는다.
- `data-rail="Bottom"`이 있으면 JSON의 rails와 section slot에 `Bottom`이 있어야 한다.
- `componentCandidates`는 모든 section에 1개 이상 있어야 한다.
- 각 section은 `layoutContract`와 `ognBoundaryDecision`을 가져야 한다.
- `policyOgnMatrix[].section`은 존재하는 section id여야 한다.
- `distortionGates`는 1개 이상이어야 한다.
- `lifecycle: "synced"`이면 `renderEvidence.geometryEvidence`가 존재해야 한다.
- `lifecycle: "synced"`이면 `iterationPasses`가 1개 이상이어야 한다.
- `lifecycle: "synced"`이면 `contractSync.status`가 `"synced"`여야 한다.

## 보이면 안 되는 것

기본 화면에는 아래를 길게 펼치지 않는다.

- 전체 JSON
- referenceSearch 전체 목록
- 모든 reject reason의 긴 원문
- layoutStrategy 전체 문장
- policyOgnMatrix 전체 표
- renderEvidence의 전체 raw geometry log

이 정보는 숨겨진 JSON에 보존하고, 필요한 경우 접힌 상세 영역이나 개발자 모드에서만 보여준다.

## 전환 단계

1. cx-example 화면 1개를 기준 구현으로 확정한다.
2. HTML schema와 DOM/JSON 일치 검사를 만든다.
3. `cx-screen-diagram` 스킬이 `Screen.diagram.html`을 작성하도록 수정한다.
4. `check:screen-generation`이 `Screen.diagram.html`의 `#diagram-contract`를 파싱하도록 확장한다.
5. cx-example 전체를 변환한다.
6. 신규 화면은 HTML diagram만 작성한다.
7. 기존 MD diagram은 migration 완료 후 archive 또는 삭제한다.

## 기준 구현

현재 기준 구현:

```txt
apps/mobile/src/app/(cx-example)/CX-EXAMPLE-COMPLETE-PLAN-CHANGE/Screen.diagram.html
```

이 파일은 다음을 포함한다.

- Visual Screen
- Review Summary
- Reference Summary
- Section Inspector
- Candidate Evaluation
- Distortion Gates
- Hidden Machine Contract JSON
