# pxds-layout Figma attribute plan

## 목적

`@pxds/pxds-layout` 컴포넌트는 Figma 컴포넌트 변환과 자동 생성이 읽을 수 있는 화면 구조 문법이다. 이 문서는 `pxds-layout` DOM에 남길 Figma bridge attribute의 최소 계약을 정의한다.

이번 범위는 attribute contract에만 집중한다. registry, export pipeline, Figma node 생성 로직, 시각 CSS, 컴포넌트 API 변경은 이 문서의 구현 범위가 아니다.

## 원칙

- Figma bridge 전용 attribute는 `cx-components`와 동일하게 `data-figma-*` 네임스페이스를 사용한다.
- `data-pxds-*` attribute를 새로 늘리지 않는다. 기존 `data-pxds-pattern` 계열도 bridge 목적이면 `data-figma-*`로 치환한다.
- `cx-components`는 시각 컴포넌트와 variant/property를 설명한다.
- `pxds-layout`은 화면 구조, 레이어, slot, auto layout 의도를 설명한다.
- CSS에서 추론 가능한 값도 Figma 변환에 필요한 핵심 정보라면 attribute로 명시한다.
- bridge 구조는 `Component -> Pattern -> Organism -> Screen` 계층을 보존한다. 기초 component가 route-level raw 좌표로 평탄화되면 안 된다.
- spacing attribute는 token 또는 semantic rail 이름을 우선 기록한다. Figma 실측값은 `SPACING_PATTERNS.md`와 대조할 evidence이며, 임의 token 생성 근거가 아니다.

## 공통 attribute

모든 layout bridge 대상 노드는 아래 attribute를 기준으로 한다.

| Attribute | 값 | 목적 |
| --- | --- | --- |
| `data-figma-render` | `layout`, `slot`, `primitive`, `ignore` | Figma 변환기의 처리 방식 |
| `data-figma-component-id` | string | 대응되는 layout syntax/component id |
| `data-figma-layout-kind` | `chrome`, `content`, `composition`, `overlay`, `pattern`, `primitive` | layout vocabulary 분류 |
| `data-figma-layout-layer` | string | 화면/레이어 의미 |
| `data-figma-layout-slot` | string | slot 이름 |
| `data-figma-property-*` | string | Figma variant/property 값 |

`data-figma-component-id`는 Figma의 시각 컴포넌트 ID와 1:1로만 해석하지 않는다. `pxds-layout`에서는 `app-screen`, `field-stack`, `page-stack-contents`처럼 자동 생성기가 이해하는 구조 문법 ID로 사용한다.

## Auto Layout attribute

Figma Auto Layout 재현에 필요한 값은 CSS 추론에 맡기지 않고 `data-figma-layout-*`로 명시한다.

| Attribute | 값 | 목적 |
| --- | --- | --- |
| `data-figma-layout-auto` | `true`, `false` | Figma Auto Layout 적용 여부 |
| `data-figma-layout-direction` | `vertical`, `horizontal`, `grid` | Auto Layout flow |
| `data-figma-layout-align` | `start`, `center`, `end`, `stretch` | cross axis 정렬 |
| `data-figma-layout-justify` | `start`, `center`, `end`, `space-between` | primary axis 정렬 |
| `data-figma-layout-gap` | token name | item spacing token |
| `data-figma-layout-padding` | token shorthand | padding token contract |
| `data-figma-layout-rail` | `full`, `section`, `content`, `inner`, `bottom-sheet-title`, `bottom-sheet-content` | 393/369/361/329/overlay rail 의도 |
| `data-figma-layout-sizing` | `fill`, `hug`, `fixed` | Figma resize 의도 |

예시:

```tsx
<section
  data-figma-render="layout"
  data-figma-component-id="field-stack"
  data-figma-layout-kind="composition"
  data-figma-layout-layer="field-stack"
  data-figma-layout-auto="true"
  data-figma-layout-direction="vertical"
  data-figma-layout-align="stretch"
  data-figma-layout-gap="spacing-8"
/>
```

## 레이어 값

초기 구현에서 사용하는 `data-figma-layout-layer` 값은 아래로 제한한다.

```txt
screen
system-header
app-header
content
bottom
section
section-rail
content-rail
inner-rail
field-stack
action-area
overlay
divider
slot
primitive
```

새 레이어명이 필요하면 임의 문자열을 route에서 만들지 않고 `pxds-layout` 타입에 먼저 추가한다.

## 컴포넌트별 기본값

| Component | render | component-id | kind | layer | auto layout |
| --- | --- | --- | --- | --- | --- |
| `AppScreenContent` root | `layout` | `app-screen` | `chrome` | `screen` | `true`, vertical |
| `AppScreen` system header slot | `layout` | - | `chrome` | `system-header` | `false` |
| `AppScreen` header slot | `layout` | - | `chrome` | `app-header` | `false` |
| `ContentOutlet` | `layout` | `content-outlet` | `chrome` | `content` | `true`, vertical |
| `PageStackContents` | `layout` | `page-stack-contents` | `content` | `section` | `true`, vertical |
| `FieldStack` | `layout` | `field-stack` | `composition` | `field-stack` | `true`, vertical |
| `PageStackList` | `layout` | `page-stack-list` | `composition` | `section` | `true`, vertical |
| `SinglePrimaryAction` | `layout` | `single-primary-action` | `composition` | `action-area` | `true`, vertical |
| `BottomSheet` root/content | `layout` | `bottom-sheet` | `overlay` | `overlay` | `true`, vertical |
| `Popup` root/content | `layout` | `popup` | `overlay` | `overlay` | `true`, vertical |
| `SectionDivider` | `layout` | `section-divider` | `pattern` | `divider` | `false` |
| `PageStack` | `layout` | `page-stack` | `pattern` | `section` | `true`, vertical |
| `Slot` | `slot` | - | `primitive` | `slot` | depends on owner |
| `Box` | `primitive` | `box` | `primitive` | `primitive` | `false` |
| `Flex` | `primitive` | `flex` | `primitive` | `primitive` | `true`, horizontal by default |
| `HStack` | `primitive` | `h-stack` | `primitive` | `primitive` | `true`, horizontal |
| `VStack` | `primitive` | `v-stack` | `primitive` | `primitive` | `true`, vertical |
| `Grid` | `primitive` | `grid` | `primitive` | `primitive` | `true`, grid |
| `Float` | `primitive` | `float` | `primitive` | `primitive` | `false` |

`Grid`의 `columns`, `rows`, `areas`, `autoFlow`를 Figma attribute로 어떻게 직렬화할지는 아직 결정하지 않는다. 현재 pass에서는 Grid가 Figma Auto Layout grid flow라는 사실만 `data-figma-layout-direction="grid"`로 전달한다.

## Slot contract

Slot 노드는 `data-figma-render="slot"`을 유지하고 layout slot 이름을 중복 기록한다.

```tsx
<div
  data-figma-render="slot"
  data-figma-property-name="content"
  data-figma-layout-kind="primitive"
  data-figma-layout-layer="slot"
  data-figma-layout-slot="content"
/>
```

대표 slot 이름:

```txt
system-header
header
content
bottom
title
body
action
backdrop
con
```

## Property contract

`data-figma-property-*`는 Figma component property 또는 layout variant로 전달될 값에만 사용한다.

초기 대상:

| Component | Property |
| --- | --- |
| `AppScreenContent` | `data-figma-property-header-preset`, `data-figma-property-action-bar-preset` |
| `PageStackContents` | `data-figma-property-contents-title` |
| `PageStackList` | `data-figma-property-contents-title`, `data-figma-property-contents-slot` |
| `FieldStack` | `data-figma-property-contents-slot` |
| `SinglePrimaryAction` | `data-figma-property-action-slot` |
| `SectionDivider` | `data-figma-property-thickness` |

## 구현 순서

1. `packages/pxds-layout/src/types/figma-bridge.ts`에 공통 attribute 타입을 추가한다.
2. 기존 `*FigmaBridgeProps`가 공통 타입을 확장하도록 바꾼다.
3. `Slot` primitive에 `data-figma-layout-*` slot 정보를 추가한다.
   - 기존 `data-layout-slot` marker는 `data-figma-layout-slot`으로 흡수한다.
4. `chrome` 컴포넌트에 screen/header/content/bottom 레이어 정보를 추가한다.
5. `contents`, `compositions` 컴포넌트에 section/field/action 레이어와 auto layout 정보를 추가한다.
6. `overlays`, `patterns` 컴포넌트에 overlay/pattern 레이어 정보를 추가한다.
7. 기존 `data-pxds-pattern`, `data-pxds-thickness`는 `data-figma-layout-*`, `data-figma-property-*`로 치환한다.
8. `biome`, mobile build, preview build로 검증한다.

## 제외 범위

- Figma export renderer 변경
- component registry 추가
- helper 함수 추가
- 시각 CSS 변경
- spacing token 재설계
- route-level 화면 구조 변경

## 완료 기준

- `pxds-layout` bridge 대상 컴포넌트가 `data-figma-layout-kind`와 `data-figma-layout-layer`를 가진다.
- Auto Layout으로 변환될 노드는 방향, 정렬, gap, padding, sizing 의도를 attribute로 가진다.
- Slot 노드는 `data-figma-layout-slot`을 가진다.
- `data-pxds-*` bridge attribute가 남지 않는다.
- `npm run build -w @screen/mobile`, `npm run build -w @screen/preview`가 통과한다.
