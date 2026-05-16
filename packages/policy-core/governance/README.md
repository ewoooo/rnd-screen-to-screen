# UX Governance Corpus

`governance/`는 도메인 업무 정책(`policies/`)과 분리된 UX 생성 규칙 corpus다.

## Namespace

- `UXP/*`: 고객 경험 원칙. 자동 입력, 실행 단계 축소, 리스크 선제 안내 같은 journey-level 규칙을 소유한다.
- `UXPT/*`: UI pattern/state control 규칙. 버튼, 네비게이션, 로딩, 에러, 복구 같은 structure/state-level 규칙을 소유한다.
- `VOT/*`: UX Writing / voice 규칙. 어체, 호칭, 버튼 라벨, 문체, 긍정/부정 표현 같은 copy-level 규칙을 소유한다.

## Ownership

- `policies/`: 가입, 인증, 결제, 세션처럼 상품/업무 의미를 결정하는 domain policy SOT.
- `governance/`: 화면 생성물이 따라야 하는 UX, UI state, writing policy SOT.

`governance/` 문서는 screen, route, React component, layout runtime을 직접 알지 않는다. 화면 생성 절차는 Phase 2에서 적용 가능한 governance refs를 선별하고, Phase 3에서 diagram/layout/copy 구조에 반영한다.

## Generation Timing

1. Phase 2 `Map`: domain policy를 화면 요구로 매핑한 직후, 관련 `UXP`, `UXPT`, `VOT` refs를 함께 선별한다.
2. Phase 3 `Diagram`: 선별된 governance refs를 기준으로 CTA hierarchy, state handling, error/empty/loading treatment, navigation, writing tone을 diagram에서 검증한다.
3. Phase 4 `Build`: 구현은 Phase 3 diagram에 반영된 governance 결정만 코드화한다. Build 단계에서 새로운 governance 해석을 추가하지 않는다.

## Process Records

### Phase 2 `Screen.map.md`

- `governanceRefs`: 적용 후보로 선정한 `UXP`/`UXPT`/`VOT` id.
- `selectionReason`: 해당 화면 요구와 연결한 이유.
- `affectedRequirement`: 어떤 정책 요구, CTA, 상태, 에러, copy에 영향을 주는지.
- `copy/state/CTA impact`: 사용자가 보는 문구, 상태 처리, 버튼 위계에 주는 영향.
- `notApplicableReason`: 검토했지만 적용하지 않는 governance ref가 있을 때의 제외 사유.

### Phase 3 `Screen.diagram.md`

- `appliedGovernanceRefs`: 실제 diagram 판단에 반영한 governance id.
- `sectionId`: 적용 대상 section.
- `layoutOrStateDecision`: 상태, 에러, 로딩, 복구, navigation, CTA 배치 판단.
- `copyDecision`: 버튼/본문/안내/오류 문구 판단.
- `CTA hierarchy/label decision`: primary/secondary/tertiary 위계와 라벨 판단.
- `distortionRisk mitigated by governance`: governance 적용으로 줄인 레이아웃/의미 왜곡 위험.

### Phase 4 Build Record

- `implementedGovernanceRefs`: 코드화한 governance id.
- `diagramSection`: 근거가 된 `Screen.diagram.md` section id.
- `component/organism owner`: 구현 책임 component 또는 organism.
- `deviationReason`: 구현이 diagram과 달라진 경우의 사유. 새 governance 해석은 Phase 4에서 추가하지 않는다.
