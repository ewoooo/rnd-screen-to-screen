# React Render Tree to Figma Export Plan

## 목적

React로 렌더된 모바일 화면을 Figma 페이지로 옮긴다. 픽셀 캡처를 최종 산출물로 삼지 않고, 화면에 남긴 `data-figma-*` bridge attribute를 기준으로 구조화된 렌더트리를 수집한 뒤 기존 `@pxds/pxds-figma`의 Figma build code 생성 파이프라인에 연결한다.

목표는 두 가지다.

1. **구조 보존**: React 화면의 component, layout, slot 위계가 Figma 노드에도 읽히도록 한다.
2. **디자인 시스템 연결**: Figma component instance, variant, component property, variable binding을 최대한 유지한다.

## 구현 가능성 판단

가능하다. 현재 코드베이스에는 이미 필요한 기반이 있다.

- `@pxds/cx-components`와 `@pxds/cx-layout` 컴포넌트에 `data-figma-render`, `data-figma-component-id`, `data-figma-property-*` attribute가 광범위하게 존재한다.
- `@pxds/pxds-figma`에는 `ScreenFigmaExportSpec`과 `ComponentSpecDraft`를 Figma 실행 코드로 바꾸는 `createScreenFigmaBuildCode` / `createComponentFigmaBuildCode`가 있다.
- `@pxds/pxds-figma`의 renderer에는 `exportMode: "instance" | "render-tree"` 개념이 이미 들어가 있다.
- Figma bridge plugin은 생성된 JS를 Figma sandbox에서 실행하는 런처 역할을 이미 수행한다.

단, React Fiber 내부 구조를 직접 읽는 방식은 피한다. Fiber는 React 버전과 빌드 모드에 민감하고, server/client boundary와 suspense 상태까지 안정적으로 다루기 어렵다. 이 계획의 "React render tree"는 **React가 실제 DOM으로 렌더한 결과 중 bridge attribute가 남아 있는 구조화 DOM tree**를 의미한다.

## 전체 흐름

```txt
apps/mobile 또는 preview iframe 화면 렌더
→ apps/figma-export collector가 DOM root 선택
→ [data-figma-render] 노드 순회
→ FigmaBridgeRenderTree JSON 생성
→ ScreenFigmaExportSpec 또는 ComponentSpecDraft로 변환
→ createScreenFigmaBuildCode()
→ bridge plugin JSON → Figma 탭에서 Run
→ Figma page/frame/component 생성
```

## Bridge Attribute 계약

### 공통

- `data-figma-render`: 노드 처리 모드
  - `component`: Figma component instance 후보
  - `layout`: Auto Layout frame 후보
  - `slot`: named slot boundary
  - `primitive`: raw frame/text/icon/divider 후보
  - `ignore`: 구조 수집에서 제거하고 자식만 승격하거나 완전히 무시
- `data-figma-component-id`: registry와 매칭할 component id
- `data-figma-property-*`: Figma variant/property/prop로 전달할 값

### 추가 권장 attribute

MVP 이후 안정성을 위해 아래 attribute를 도입한다.

- `data-figma-node-id`: 같은 컴포넌트가 반복될 때 안정적인 노드 id
- `data-figma-slot`: 부모 slot 이름. 기존 `data-figma-property-name`이 있는 slot node와 호환한다.
- `data-figma-export-mode`: `instance` 또는 `render-tree` 강제 지정
- `data-figma-text`: 실제 DOM textContent 대신 사용할 명시적 텍스트
- `data-figma-ignore-children`: 자식 순회를 중단할 때 사용

## 수집기 설계

`apps/figma-export`는 화면 export 전용 앱 또는 preview 보조 앱으로 둔다. 첫 구현은 브라우저에서 실행되는 client collector로 충분하다.

### Collector 입력

- `rootSelector`: 기본값 `[data-figma-screen-root]`, 없으면 `body`
- `screenId`, `screenName`, `route`
- `mode`: `screen` 또는 `component`
- `captureStyles`: MVP에서는 `true`

### Collector 출력 초안

```ts
type FigmaBridgeRenderTree = {
  $schema: "pxds-figma-bridge-render-tree-v1";
  source: {
    url: string;
    route?: string;
    capturedAt: string;
    viewport: { width: number; height: number };
  };
  screen: {
    id: string;
    name: string;
    route: string;
  };
  root: FigmaBridgeNode;
};

type FigmaBridgeNode = {
  id: string;
  render: "component" | "layout" | "slot" | "primitive";
  componentId?: string;
  slot?: string;
  properties?: Record<string, string | boolean | number | null>;
  text?: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  localBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  style?: {
    display?: string;
    flexDirection?: string;
    gap?: string;
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
  };
  children?: FigmaBridgeNode[];
};
```

## DOM 순회 규칙

1. root부터 `TreeWalker` 또는 재귀 순회로 element를 탐색한다.
2. `data-figma-render="ignore"` 노드는 Figma node로 만들지 않는다.
3. `component`, `layout`, `slot`, `primitive` 노드는 output node로 만든다.
4. output node의 자식은 가장 가까운 output ancestor 아래에 붙인다.
5. text node는 별도 element가 없으면 가장 가까운 `primitive` 또는 `slot` node의 `text`로 흡수한다.
6. `display: none`, `visibility: hidden`, `aria-hidden="true"`는 기본 제외한다. 단, `data-figma-include-hidden="true"`가 있으면 포함한다.
7. bounds는 `getBoundingClientRect()`로 읽고, localBounds는 부모 output node 기준으로 환산한다.
8. computed style은 Figma 변환에 필요한 최소 필드만 읽는다.

## Figma 변환 전략

### Instance 우선

`componentId`가 registry에 있고 export mode가 `instance`이면 Figma component instance로 생성한다.

- `data-figma-property-*`는 component property 또는 variant 추론에 사용한다.
- slot children은 component property로 직접 들어갈 수 없으면 sibling frame 또는 render-tree fallback으로 둔다.
- registry에 없는 component는 missing marker를 남긴다.

### Render Tree Fallback

registry에 없거나 `data-figma-export-mode="render-tree"`인 노드는 raw Figma frame/text로 생성한다.

- `display:flex`는 Auto Layout으로 변환한다.
- absolute 좌표가 필요한 노드는 `layoutMode = "NONE"` frame으로 둔다.
- background, text color, border radius는 raw 값으로 넣고, 매칭 가능한 token은 후속 wash 단계에서 variable binding한다.

### Slot 처리

slot node는 Figma에 별도 frame으로 남길지, 부모 component props로 접을지 모드에 따라 다르게 처리한다.

- MVP: slot을 frame boundary로 남긴다.
- 이후: registry가 slot contract를 제공하면 named child/component property로 접는다.

## 기존 패키지 연결

새 모듈은 `@pxds/pxds-figma`에 두고, `apps/figma-export`는 UI와 실행 흐름만 소유한다.

```txt
apps/figma-export
  → @pxds/pxds-figma/dom-export
  → @pxds/pxds-figma/screen-export
  → packages/pxds-figma-bridge-plugin
```

예상 추가 파일:

```txt
packages/pxds-figma/src/dom-export/
├── collect-dom-render-tree.ts
├── bridge-attributes.ts
├── to-screen-figma-export-spec.ts
├── types.ts
└── validation.ts
```

`apps/figma-export` 예상 파일:

```txt
apps/figma-export/
├── REACT_RENDER_TREE_TO_FIGMA_PLAN.md
├── package.json
├── src/app/page.tsx
├── src/components/ExportPanel.tsx
└── src/lib/export-current-screen.ts
```

## MVP 범위

1. DOM collector 구현
2. `FigmaBridgeRenderTree` JSON preview 제공
3. `FigmaBridgeRenderTree`를 `ScreenFigmaExportSpec`으로 변환
4. `createScreenFigmaBuildCode`로 generated JS 생성
5. 클립보드 복사
6. bridge plugin에서 붙여넣고 Figma 생성 확인

MVP에서 제외한다.

- React Fiber 직접 접근
- 완전한 CSS Grid 변환
- pseudo-element 변환
- SVG path를 Figma vector로 정밀 변환
- 이미지 asset 업로드 및 relink
- component slot을 Figma component property로 완전 접기

## 단계별 구현

### Phase 1: 계약 고정

- bridge attribute 목록과 의미를 문서화한다.
- `FigmaBridgeRenderTree` 타입을 추가한다.
- 기존 `FigmaBridgeAttributes` 타입과 충돌 없이 확장한다.
- `component`, `layout`, `slot`, `primitive`, `ignore`의 DOM 순회 규칙을 테스트로 고정한다.

### Phase 2: Collector POC

- 브라우저 client에서 root selector를 받아 DOM tree를 수집한다.
- `dataset`, bounds, text, computed style을 JSON으로 만든다.
- preview 화면에서 JSON을 눈으로 확인할 수 있게 한다.

### Phase 3: Spec 변환

- `FigmaBridgeRenderTree`를 `ScreenFigmaExportSpec`으로 변환한다.
- registry matching이 되는 node는 instance 후보로 둔다.
- registry matching이 안 되는 node는 render-tree fallback으로 둔다.
- token 직접 추론은 최소화하고, raw 값은 wash 단계가 처리하게 둔다.

### Phase 4: Build Code 생성

- `createScreenFigmaBuildCode()`에 연결한다.
- generated JS를 클립보드에 복사한다.
- bridge plugin에서 실행해 Figma page 생성 여부를 확인한다.

### Phase 5: 품질 보강

- registry 기반 slot contract를 추가한다.
- Figma variable binding 성공률을 높인다.
- missing component report를 UI에 표시한다.
- export 전 validation report를 제공한다.

## 검증 기준

- 같은 화면을 두 번 export해도 Figma 노드 이름과 id가 안정적이어야 한다.
- `data-figma-render="ignore"` wrapper가 Figma 구조를 오염시키지 않아야 한다.
- `component` 노드는 가능한 한 Figma component instance로 생성되어야 한다.
- `layout` 노드는 CSS flex 방향, gap, padding을 Auto Layout으로 보존해야 한다.
- raw fallback node는 최소한 bounds, text, background, color가 보존되어야 한다.
- registry에 없는 component는 조용히 누락되지 않고 missing marker 또는 report로 남아야 한다.

## 리스크와 대응

| 리스크 | 영향 | 대응 |
|---|---|---|
| CSS와 Figma Auto Layout 모델 차이 | 시각 차이 발생 | component instance 우선, raw fallback은 bounds 기반 |
| bridge attribute 누락 | 구조 누락 또는 missing marker 증가 | validation report와 component별 필수 attribute lint |
| slot 의미 손실 | 복합 component 재현도 저하 | slot contract를 registry에 단계적으로 추가 |
| SVG/icon 변환 어려움 | 아이콘 누락 | icon component id를 bridge attribute로 명시 |
| font/token binding 실패 | raw style 증가 | 기존 wash/variable sync 경로 재사용 |
| iframe/cross-origin 접근 제한 | preview 수집 실패 | same-origin preview 안에서 collector 실행, postMessage로 결과 전달 |

## 오픈 질문

1. `apps/figma-export`가 독립 앱이어야 하는가, 아니면 `apps/preview` 안의 export panel을 감싸는 전용 route여야 하는가?
2. Figma export 대상은 항상 모바일 screen root인가, component 단위 export도 같은 앱에서 지원할 것인가?
3. registry에 있는 component는 실제 Figma instance로 생성해야 하는가, 아니면 초반에는 render-tree fallback도 허용할 것인가?
4. 생성 결과의 성공 기준은 pixel fidelity인가, component/slot 구조 fidelity인가?
5. bridge plugin 실행 방식은 paste/run을 유지할 것인가, localhost endpoint로 자동 전송할 것인가?

## 1차 결론

첫 구현은 `data-figma-*` 기반 DOM collector와 기존 build-code 생성기를 연결하는 방식으로 진행한다. 이 방식은 React 내부 구현에 덜 의존하고, 현재 PXDS component vocabulary와 Figma spec registry를 가장 많이 재사용한다.
