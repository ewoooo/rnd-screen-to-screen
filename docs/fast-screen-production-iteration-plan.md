# Fast Screen Production Iteration Plan

> 상태: proposal / pilot candidate. 이 문서는 현재 화면 제작 절차를 대체하는 SOT가 아니라, 빠른 화면 제작 후 반복 디자인 개선 방식으로 전환할지 검토하기 위한 개선 계획이다. 활성 절차는 여전히 `SCREEN_GENERATION_FLOW.md`, `AGENTS.md`, `SCREEN_STRUCTURE_PRINCIPLES.md`, `DESIGN_PATTERNS.md`, `DESIGN_FOUNDATION.md`가 소유한다. 다이어그램 표준 산출물은 `Screen.diagram.html`이며, deprecated `Screen.diagram.md`는 legacy/fallback reference로만 읽는다.

## 한 줄 결론

추천 방향은 **정책은 앞에서 잠그고, 디자인은 실제 렌더를 보며 반복 개선한 뒤, 마지막에 문서 계약을 다시 잠그는 hybrid 제작 방식**이다.

이 문서가 제안하는 변화는 gate 제거가 아니다. 구현 전에 모든 디자인 판단을 완성하려는 부담을 줄이고, 실제 화면을 통해서만 판단 가능한 spacing, density, component fit, hierarchy 문제를 공식 iteration 단계로 끌어올리는 것이다.

## 문제 인식

현재 방식은 각 단계에서 검사와 규칙 검증 gate를 통과하며 산출물 품질을 확보한다.

```txt
Extract
→ Map
→ Reference / Diagram / Component Candidate gate
→ Build Plan gate
→ Implementation
→ Verification
```

이 방식은 정책 충실도와 문서 정합성을 지키는 데 강하지만, 화면을 실제로 보기 전까지 판단 비용이 크다. 특히 Phase 3 Diagram 단계에서 구조, 패턴, component 후보, layoutContract를 모두 높은 완성도로 고정하려고 하면서 제작 속도가 느려지고, 실제 렌더에서만 보이는 spacing, density, component fit 문제를 너무 늦게 발견한다.

개선 가설은 다음과 같다.

```txt
정책과 핵심 구조만 먼저 고정
→ 빠르게 Screen.tsx 렌더 가능한 화면 제작
→ 실제 화면을 보며 디자인 패턴과 레퍼런스를 여러 차례 대조
→ spacing / hierarchy / component fit / section boundary를 반복 개선
→ 마지막에 문서와 검증을 동기화
```

## 판단

가설 방향은 유효하다. 디자인 품질은 문서상 추론보다 실제 화면 기반 반복 개선에서 더 빨리 올라갈 가능성이 크다.

다만 모든 gate를 뒤로 미루면 이 저장소의 핵심 목표인 정책 충실도가 흔들릴 수 있다. 따라서 전환 방향은 “gate 제거”가 아니라 “앞단 gate를 정책/구조 최소 계약으로 압축하고, 후단 디자인 iteration을 공식화”하는 것이다.

## 적용 범위

처음부터 모든 화면에 적용하지 않는다. 파일럿은 아래 조건을 만족하는 화면에만 적용한다.

- policy coverage가 `green`인 화면
- form/detail/complete/list 중 official pattern family가 분명한 화면
- 가까운 wire/reference가 존재하는 화면
- 신규 component나 신규 slot 없이 기존 `@pxds/cx-components` / `@pxds/cx-layout` 조합으로 시작 가능한 화면
- 공용 package 변경 없이 route, organism, config, route registry 수준에서 닫히는 화면

아래 경우에는 fast iteration mode를 적용하지 않는다.

- policy coverage가 `red`인 요구가 포함된 화면
- `yellow` 요구를 사용자 승인 없이 실제 구현 근거로 삼아야 하는 화면
- 신규 component/variant/slot이 없으면 layoutContract를 만족할 수 없는 화면
- reference 우선순위를 벗어나 legacy 화면을 기준으로 삼아야 하는 화면
- 공용 package 변경이 먼저 필요한 화면

## 유지해야 할 앞단 엄격성

아래 항목은 빠른 제작 모드에서도 앞에서 반드시 확인한다.

- Policy coverage: SB가 참조하는 정책이 `policy-core`에 존재하는지 확인한다.
- Policy Map: 화면에 나와야 할 필수 정보, 선택지, 제약, 에러, CTA 의미를 확정한다.
- OGN boundary minimum: 정책 의미를 어떤 OGN이 소유하는지 최소 경계를 잡는다.
- Reference direction: official pattern family와 가장 가까운 wire/reference를 정한다.
- Raw patch ban: route-level margin/padding, raw spacing, raw color, custom font-size로 빠른 구현을 때우지 않는다.

즉, 빠르게 만들더라도 “무엇을 보여줄지”와 “정책 의미의 소유자”는 먼저 잡고 간다.

앞단에서 잠그는 것은 `what`과 `owner`다.

- `what`: 정책상 화면에 반드시 보여야 하는 정보, 선택지, 제약, 에러, CTA, 상태
- `owner`: 해당 의미를 소유하는 OGN, structural-only section, AppScreen rail

앞단에서 느슨하게 두는 것은 `fit`이다.

- section 내부 컴포넌트 조합
- row/divider/card 밀도
- copy wrapping과 hierarchy
- reference와의 세부 rhythm 차이
- componentCandidates의 최종 `strong | medium | weak | reject` 판정

## 가볍게 바꿀 앞단 산출물

### Diagram

기존 목표:

```txt
구현 전 완성 계약
```

개선 목표:

```txt
구현 전 얇은 방향 계약 + 구현 후 최종 동기화 문서
```

초기 Diagram은 아래 최소 계약을 가진다.

- `wireReference`와 선택 이유
- `patternFamily`
- AppScreen rail 순서
- 주요 section 순서와 section id
- OGN id 또는 `structural-only` 사유
- section별 최소 layoutContract
- 초기 componentCandidates와 reject가 확실한 후보
- known layout risks

초기 Diagram에서는 모든 section의 세부 fit 판단을 완벽하게 끝내려 하지 않는다. 대신 Fast Build 이후 실제 렌더를 보며 Diagram을 갱신한다.

초기 `Screen.diagram.html`은 hidden `#diagram-contract`에 `lifecycle: "thin"`을 기록한다. Contract Sync 이후 최종 산출물은 `lifecycle: "synced"`로 갱신하고 `renderEvidence`, `iterationPasses`, `contractSync`를 채운다.

### Component Candidate Decision

기존 목표:

```txt
구현 전 후보를 capability 기준으로 충분히 평가
```

개선 목표:

```txt
위험한 후보만 먼저 제거하고, 실제 렌더에서 fit을 재판정
```

초기에는 다음만 차단한다.

- deprecated import가 필요한 후보
- route-level CSS 보정이 필요한 후보
- pattern 구조를 명백히 깨는 후보
- required slot/state/wrapping을 지원하지 않는 후보

나머지는 구현 후 Design Iteration에서 `strong | medium | weak | reject`를 갱신한다.

초기 후보 평가는 “선택을 빨리 하기 위한 평가”가 아니라 “나중에 왜 바뀌었는지 추적하기 위한 baseline”이다. Fast Build에서 다른 후보로 바꾸면 Contract Sync에서 기존 후보와 새 후보의 fit 판정을 모두 남긴다.

## 제안 워크플로우

```txt
0. Intake
1. Policy Coverage / Thin Map
2. Thin Reference + Thin Diagram
3. Fast Build
4. Render Evidence Capture
5. Design Iteration Pass 1: Pattern Match
6. Design Iteration Pass 2: Reference Match
7. Design Iteration Pass 3: Spacing / Density / Hierarchy
8. Contract Sync
9. Verification
10. Report
```

### 0. Intake

입력, target route, 기존 구현, dirty worktree 범위를 확인한다.

결과:

- target screen
- SB source
- existing route 여부
- write scope 후보

### 1. Policy Coverage / Thin Map

정책 존재성과 필수 화면 요구만 먼저 고정한다.

결과:

- policy coverage: green / yellow / red
- required policy refs
- required OGN IDs
- required CTA / state / error
- blocked requirement

`red`는 구현하지 않는다. `yellow`는 사용자 승인 없이는 실제 화면 요구로 확정하지 않는다.

### 2. Thin Reference + Thin Diagram

초기 화면 방향을 빠르게 고정한다.

결과:

- official pattern
- nearest wire/reference
- intentional differences
- section order
- OGN boundary
- known layout risks
- initial component candidates

이 단계의 Diagram은 “최종 계약”이 아니라 “Fast Build를 시작할 수 있는 방향 계약”이다.

### 3. Fast Build

빠르게 렌더 가능한 `Screen.tsx` 화면을 만든다.

원칙:

- `Screen.tsx`는 AppScreen rails와 slot 조립에 집중한다.
- OGN은 정책 의미가 있는 body composition만 소유한다.
- cx-layout과 cx-components가 가진 spacing/padding 책임을 우선 사용한다.
- raw margin/padding으로 눈대중 보정하지 않는다.
- 완성도보다 렌더 가능한 비교 대상을 빠르게 확보한다.

결과:

- `Screen.tsx`
- organisms
- `Screen.config.ts` 최소 generation metadata
- preview에서 열 수 있는 화면

Fast Build 완료 기준:

- route가 preview에서 열린다.
- `Screen.tsx`가 AppScreen rails를 가진다.
- policy-bearing OGN이 최소 DOM으로 렌더된다.
- Bottom rail / CTA가 존재해야 하는 화면은 CTA가 viewport 안에 보인다.
- raw spacing/color/font patch가 새로 추가되지 않았다.

### 4. Render Evidence Capture

iteration의 기준이 되는 실제 렌더 증거를 남긴다.

현재 mobile/preview 구조에서는 스크린샷을 안정적인 필수 증거로 삼지 않는다.

- mobile 화면은 강제로 전체 화면/고정 viewport처럼 동작해 일반 screenshot framing이 흔들릴 수 있다.
- preview iframe 내부는 capture 도구가 안정적으로 파싱하지 못할 수 있다.
- 캡처가 필요하면 preview iframe이 아니라 mobile app 자체 route를 capture mode로 열고 `AppScreenRoot` 또는 동등한 screen root selector를 잡는다.

필수 증거는 screenshot이 아니라 **layout geometry evidence**다.

- Header / Content / Bottom / CTA bounding box
- viewport size
- scroll height / client height
- Bottom rail과 Content 마지막 section의 겹침 여부
- 주요 policy-bearing section의 visible text 존재 여부
- known issue 목록

이 단계에서 디자인을 고치지 않는다. 먼저 “현재 화면이 어떤 상태인지”를 고정한다.

결과:

- baseline bounding box log
- screenshot 또는 capture artifact, 가능한 경우만
- first-render issues
- iteration target list

### 5. Design Iteration Pass 1: Pattern Match

실제 화면을 `DESIGN_PATTERNS.md`와 대조한다.

검수:

- 화면 pattern family가 맞는가?
- Header / Content / Bottom rail 역할이 맞는가?
- CTA placement가 pattern contract와 맞는가?
- section boundary가 pattern과 맞는가?
- form / detail / list / complete / bottom sheet 역할이 섞이지 않았는가?

결과:

- pattern mismatch 수정
- section boundary 수정
- CTA / bottom rail 수정
- Diagram `patternDecision` 갱신

Pass 완료 기준:

- pattern family가 유지되거나 변경 사유가 Diagram에 기록된다.
- Header / Content / Bottom rail 책임이 구현과 Diagram에서 일치한다.
- CTA 위치가 pattern contract와 충돌하지 않는다.

### 6. Design Iteration Pass 2: Reference Match

가장 가까운 화면 reference 또는 기존 `Screen.diagram.html`과 실제 화면을 대조한다. 전환 기간에만 deprecated `Screen.diagram.md`를 legacy/fallback reference로 읽을 수 있다.

검수:

- wire reference의 핵심 layout rhythm이 보존됐는가?
- intentional difference가 실제로 의도된 차이인가?
- 반복 row, divider, card, notice, summary 영역의 구조가 reference와 같은 역할을 하는가?
- reference에는 있는 divider나 field action slot을 spacing gap으로 대체하지 않았는가?

결과:

- reference mismatch 수정
- divider / card / row 구조 수정
- Diagram `wireReference.intentionalDifferences` 갱신

Pass 완료 기준:

- reference의 핵심 rhythm을 보존했는지 판단이 남는다.
- intentional difference와 accidental drift가 분리된다.
- divider, card, row, notice, summary 영역 중 reference와 충돌한 부분은 수정하거나 deviation reason을 남긴다.

### 7. Design Iteration Pass 3: Spacing / Density / Hierarchy

`Screen.tsx` 조립 완료 화면 기준으로 컴포넌트 간 spacing과 시각 위계를 검수한다.

검수:

- Header와 Content 시작 간격
- section 간 gap
- OGN 간 gap
- card 내부 padding과 외부 gap의 책임 경계
- Content와 Bottom rail 사이 clearance
- bottom CTA fixed 영역과 scroll content 겹침 여부
- row title/caption hierarchy
- 과도한 여백 또는 지나치게 붙은 영역

결과:

- component spacing 수정
- layout primitive 선택 수정
- organism boundary 수정
- 필요 시 component vocabulary gap 기록

Pass 완료 기준:

- viewport 기준 overlap / overflow가 없다.
- Content와 Bottom rail 사이 clearance가 확인된다.
- section 간 gap과 component 내부 padding의 책임 경계가 분리된다.
- text hierarchy가 reference/pattern과 충돌하지 않는다.

### 8. Contract Sync

최종 화면을 기준으로 문서를 동기화한다.

동기화 대상:

- `Screen.map.md`: 정책 요구와 copy 근거가 최종 화면과 일치하는지 확인
- `Screen.diagram.html`: 최종 section 구조, layoutContract, componentCandidates, Distortion Gates, lifecycle/renderEvidence/iterationPasses/contractSync 반영
- `Screen.config.ts`: policyRefs, ognIds, generation metadata 반영

중요한 점:

Fast Build 중 발견한 구조 변경은 최종적으로 Diagram에 남긴다. 구현만 맞고 문서가 낡은 상태를 허용하지 않는다.

Contract Sync 완료 기준:

- `Screen.map.md`의 policy refs와 OGN refs가 최종 구현과 충돌하지 않는다.
- `Screen.diagram.html`에 최종 section 구조, `layoutContract`, `componentCandidates`, `Distortion Gates`가 반영된다.
- `Screen.diagram.html`의 hidden `#diagram-contract.lifecycle`이 `synced`이고, `renderEvidence.geometryEvidence`, `iterationPasses`, `contractSync`가 채워진다.
- `Screen.config.ts`의 `generation.policyRefs`, `generation.ognIds`, `generation.buildSelections`가 최종 선택과 일치한다.
- iteration 중 reject된 후보와 최종 선택 후보의 이유가 남는다.

### 9. Verification

공통 검증과 실제 렌더 증거를 확인한다.

기본 명령:

```bash
npm run check:screen-generation:strict -w @policy/core
npm run lint -w @screen/mobile
npm run build -w @screen/mobile
```

UI 변경은 텍스트 존재만으로 승인하지 않는다.

필요 증거:

- Header / Content / Bottom / CTA bounding box
- viewport fit
- overlap / overflow 없음
- 주요 section visible text 존재
- `Screen.diagram.html`의 `renderEvidence.geometryEvidence`
- screenshot 또는 capture artifact, 가능한 경우만

### 10. Report

최종 보고에는 빠른 제작 이후 어떤 iteration을 거쳤는지 남긴다.

포함:

- policy coverage 결과
- 사용한 official pattern
- 사용한 reference
- Design Iteration Pass별 수정 요약
- spacing review 결과
- verification 결과
- 남은 risk / vocabulary gap

## 기존 방식과의 차이

| 항목 | 현재 방식 | 개선 가설 |
|---|---|---|
| Diagram | 구현 전 완성 계약 | 얇은 초기 계약 + 구현 후 최종 동기화 |
| Component 후보 | 구현 전 상세 평가 | 위험 후보만 차단, 렌더 후 재평가 |
| 디자인 검수 | 구현 전 문서 중심 | 구현 후 실제 화면 중심 반복 |
| 속도 | 초기 판단이 무거움 | 빠르게 렌더 대상 확보 |
| 위험 | 느리지만 안전함 | 빠르지만 contract sync 누락 위험 |
| 보완책 | phase gate | iteration pass + final contract sync |

## 운영 규칙

- 정책 coverage와 필수 요구는 빠른 제작 모드에서도 앞에서 확정한다.
- 초기 Diagram 없이 구현하지 않는다. 단, 초기 Diagram의 완성도 요구를 낮춘다.
- Fast Build는 raw CSS 실험장이 아니다.
- 디자인 개선은 최소 2회 이상 실제 화면 기준으로 수행한다. 단, 각 pass는 수정 전/후 판단 근거를 남긴다.
- 마지막에는 반드시 문서와 구현을 동기화한다.
- Verification은 약화하지 않는다.

## 산출물 기록 형식

파일럿 동안에는 별도 로그 파일을 늘리지 않는다. 승인된 판단만 기존 산출물에 반영한다.

| 판단 | 기록 위치 |
|---|---|
| policy coverage, required info, copy, CTA 근거 | `Screen.map.md` |
| initial/final wireReference, section 구조, layoutContract, componentCandidates, Distortion Gates | `Screen.diagram.html` |
| lifecycle, renderEvidence, iterationPasses, contractSync | `Screen.diagram.html` |
| buildSelections, selected component/composition, deviation reason, spacing review summary | `Screen.config.ts` |
| route 노출 | `apps/mobile/src/scripts/screen-routes/routes.ts` |
| 최종 검증 결과 | 작업 보고 |

iteration 중간 메모는 최종 산출물로 남기지 않는다. 다만 최종 선택에 영향을 준 결정은 위 파일 중 하나에 반영한다.

## 중단 조건

다음 상황이 발견되면 fast iteration을 계속하지 않고 기존 절차의 해당 단계로 되돌아간다.

- 정책 결손 때문에 화면 요구를 확정할 수 없음
- reference 선택이 틀렸거나 official pattern family가 바뀜
- 초기 OGN boundary가 실제 구현에서 정책 의미를 보존하지 못함
- component 후보가 layoutContract를 충족하지 못해 신규 component/variant/slot이 필요함
- raw spacing/color/font patch 없이는 화면을 맞출 수 없음
- 실제 렌더에서 하단 CTA 겹침, 주요 copy overflow, rail 구조 붕괴가 반복됨

## 파일/스킬 변경이 필요할 수 있는 지점

이 계획을 채택하면 아래 문서를 조정한다.

- `SCREEN_GENERATION_FLOW.md`
  - Phase 3 Diagram의 역할을 “초기 방향 계약 + 최종 sync”로 재정의
  - Phase 4 뒤에 Design Iteration Pass를 공식 단계로 추가
- `.codex/skills/cx-screen-diagram/SKILL.md`
  - 초기 Diagram mode와 final sync mode를 분리
- `.codex/skills/cx-screen-build/SKILL.md`
  - Fast Build 후 Design Iteration handoff 추가
- `.codex/skills/cx-screen-register-verify/SKILL.md`
  - Contract Sync와 iteration evidence 확인 추가
- `docs/screen-generation-agent-model.md`
  - 메인 에이전트가 초기 gate보다 post-build design iteration을 더 강하게 소유하도록 조정
- `packages/policy-core/scripts/check-compliance-between-policy-sb-diagram-and-screen.mjs`
  - Contract Sync 이후 `generation.buildSelections`, `layoutContract`, iteration evidence를 약하게라도 확인할지 검토

## 실험 계획

처음부터 전체 절차를 바꾸지 않고 1-2개 화면에 파일럿으로 적용한다.

파일럿 기준:

- 정책 coverage가 green인 화면
- 신규 component가 거의 필요 없는 화면
- form/detail/complete 중 하나의 명확한 pattern family를 가진 화면
- reference가 존재하는 화면

측정:

- 첫 렌더까지 걸린 시간
- 최종 승인까지 걸린 총 시간
- iteration pass 횟수
- raw spacing/font/color 위반 수
- `Screen.diagram.html` final sync 누락 수
- 최종 layout geometry 기준 pattern mismatch 수
- Contract Sync에서 수정된 Diagram 항목 수
- verification 재시도 횟수

성공 기준:

- 첫 렌더까지 시간이 줄어든다.
- 최종 품질이 기존 방식보다 낮아지지 않는다.
- 최종 문서와 구현 정합성이 유지된다.
- raw CSS 보정이 늘지 않는다.
- 사용자 승인 gate가 줄어들더라도 policy coverage와 OGN boundary 오류가 늘지 않는다.

## 파일럿 운영안

파일럿은 기존 SOT를 바꾸지 않고, 아래처럼 현재 0-10 절차 안에 끼워 넣는다.

```txt
Step 0-2: 기존과 동일하게 Intake / Extract / Policy Map
Step 3-6: Thin Reference + Thin Diagram으로 축소하되 최소 계약은 작성
Step 7-8: Fast Build + Render Evidence Capture + Design Iteration Pass
Step 8.5: Contract Sync
Step 9-10: 기존 Verification / Report
```

파일럿 중에도 `Screen.diagram.html`은 필수다. 단, 초기 작성 시 완성 계약이 아니라 `lifecycle: "thin"` 계약으로 시작하고, Contract Sync에서 `lifecycle: "synced"` 최종 계약으로 갱신한다.

## 결론

추천 방향은 “빠른 제작으로 완전 전환”이 아니라, **정책은 앞에서 엄격하게, 디자인은 실제 화면을 보며 반복적으로 개선하고, 마지막에 문서 계약을 동기화하는 hybrid 방식**이다.

이 방식은 초기 절차 부담을 줄이면서도, 정책 충실도와 디자인 시스템 일관성이라는 저장소의 핵심 목표를 유지할 수 있다.
