# ProgressTopBar

## Overview

Purpose: document the shared mobile flow top chrome that combines title navigation with optional progress.

Figma SOT: [SKT_SDUI_Test_0512 / Component base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Checked nodes:

- `base` section: `14401:29020`
- `AppBar` group: `9343:20263`
- `AppBar / RightItem=Off, Title=On, LeftItem=On, Logo=Off`: `9343:21520`
- `Indicator`: `9861:48384`

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | removed legacy reference |
| Figma Source | progress-top-bar pattern; composed from AppBar/progress references, not a standalone CX base node |
| Dependencies | Historical WDS `TopNavigation`; WDS `TopNavigationButton`; WDS `ProgressIndicator`; legacy icon adapter; `@pxds/cx-layout/primitives`; `TextBlock` |
| Variants | `leading`: back/close; `progress.showLabel`: false/true |
| Properties | registry/renderReact props only: `title`, `leading`, `progress.label`, `progress.percent`, `progress.showLabel` |

### Implementation Files

- Historical source was removed with the legacy pxds-components adapter.
- Rebuild as CX vocabulary or app organism before using it in new screens.

`ProgressTopBar` was a legacy shared/global pattern. It is not a CX base component and should not be documented or consumed as a `@pxds/cx-components` primitive until rebuilt.

## Structure

Purpose: define the code structure and how it relates to the Figma source.

### Target Structure

```txt
ProgressTopBar
├─ TopNavigation
│  ├─ TopNavigationButton
│  │  └─ IconArrowLeft | IconClose
│  └─ title
└─ progress?
   ├─ TextBlock(label)? when progress.showLabel=true
   └─ ProgressIndicator
```

### Component Consumption

| Consumed component | Source | Used for |
| --- | --- | --- |
| `TopNavigation` | removed legacy WDS re-export | Top navigation shell and title. |
| `TopNavigationButton` | removed legacy WDS re-export | Leading icon button. |
| `ProgressIndicator` | removed legacy WDS re-export | Progress bar visualization. |
| `IconArrowLeft`, `IconClose` | removed legacy icon adapter | Back/close leading affordance. |
| `Box`, `VStack` | `@pxds/cx-layout/primitives` | Labeled progress spacing wrapper. |
| `TextBlock` | removed legacy typography adapter | Optional progress label. |

### Figma Source Difference

The checked Figma base section exposes `AppBar` variants and an `Indicator` base component. It does not expose a standalone `ProgressTopBar` CX base component at the referenced section level.

Current code intentionally normalizes this need as a PXDS shared/global pattern:

- Figma `AppBar` maps conceptually to WDS `TopNavigation` plus `TopNavigationButton`.
- Figma icon choices map to PXDS icon wrappers (`IconArrowLeft`, `IconClose`).
- Flow progress is rendered with WDS `ProgressIndicator`, not the Figma dot-style `Indicator` component.
- Optional visible progress label is added by the PXDS pattern with `TextBlock`.

### Node Mapping

| Figma / concept | Code structure | Public vocabulary? |
| --- | --- | --- |
| `AppBar` | `TopNavigation` composition | no, consumed through WDS core re-export |
| AppBar left icon button | `TopNavigationButton` with `IconArrowLeft` or `IconClose` | no, internal slot of this pattern |
| AppBar title | `TopNavigation` children | no, string prop |
| `Indicator` | not used directly | no |
| Flow progress bar | `ProgressIndicator` | yes, WDS core re-export |
| Progress label | `TextBlock` | yes, existing typography atom |

## Props

Purpose: define the public API and the current Figma/registry bridge behavior.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | required | Text rendered in `TopNavigation`. |
| `leading` | `"back" \| "close"` | `"back"` | Chooses `IconArrowLeft` with `aria-label="뒤로"` or `IconClose` with `aria-label="닫기"`. |
| `progress` | `{ label: string; percent: number; showLabel?: boolean }` | - | Optional progress model. When omitted, no progress area is rendered. |
| `progress.label` | `string` | required inside `progress` | Used as `ProgressIndicator` aria-label and optional visible label text. |
| `progress.percent` | `number` | required inside `progress` | Passed to WDS `ProgressIndicator.percent`. |
| `progress.showLabel` | `boolean` | `false` in direct component usage | Controls whether `TextBlock` label is visible above the progress indicator. |

### Registry / RenderReact Props

`progressTopBarRenderReact` reads component spec props through `renderString`, `renderRecord`, and `renderBoolean`.

| Spec prop | Render behavior |
| --- | --- |
| `title` | Missing or non-string values become an empty string. |
| `leading` | Only `"close"` renders close; all other values fall back to `"back"`. |
| `progress` | Missing or non-record values omit the progress area. |
| `progress.label` | Missing or non-string values become an empty string. |
| `progress.percent` | Non-number values become `0`. |
| `progress.showLabel` | Defaults to `true` in `renderReact`, while direct React component usage defaults to `false`. |

### Bridge Attributes

The current `ProgressTopBar` React DOM does not write direct bridge attributes such as `data-figma-*`, `data-component-id`, or `data-node-kind`.

Bridge behavior is registry/renderReact centered:

- Historical `registry.ts` registered `id: "progress-top-bar"`, `name: "ProgressTopBar"`, `owner: "@pxds/pxds-components"`, `group: "global"`, and `renderReact: progressTopBarRenderReact`.
- Figma/export assembly can infer pattern props from the component spec, but the component itself does not emit direct DOM bridge markers.
- Do not copy the legacy app-owned `ProgressAppBar` bridge attributes onto this component unless the registry contract is intentionally changed.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
// Historical import only. The legacy adapter package has been removed.
// import { ProgressTopBar } from "@pxds/pxds-components/shared/global";
```

### Examples

```tsx
<ProgressTopBar
  title="회원 가입"
  leading="close"
  progress={{ label: "회원 가입 2/5", percent: 40, showLabel: true }}
/>

<ProgressTopBar
  title="회원 탈퇴"
  progress={{ label: "회원 탈퇴 6/6", percent: 100 }}
/>
```

Use this pattern for mobile flow screens that need a global top navigation bar plus progress. For MBR app-owned implementations that still use `ProgressAppBar`, keep that documentation separate because it has different DOM bridge attributes and styling ownership.

## Implementation Guide

Purpose: constrain future edits and validation.

### Do

- Do not add new imports from the removed legacy adapter package.
- Treat it as a PXDS shared/global pattern, not as a CX base component.
- Keep top navigation behavior delegated to WDS `TopNavigation` and `TopNavigationButton`.
- Keep progress visualization delegated to WDS `ProgressIndicator`.
- Use `@pxds/cx-icons` or rebuilt CX component slots for leading icons.
- Use `Box` and `VStack` layout primitives for labeled progress spacing.
- Use `TextBlock` for the optional visible progress label.
- Keep screen routes free of margin/padding patches around this top bar.
- Update the registry entry if the public component vocabulary or composed dependencies change.

### Don't

- Do not add a new CX base `ProgressTopBar` from this pattern without a separate design-system decision.
- Do not inline custom progress bar DOM when WDS `ProgressIndicator` covers the need.
- Do not add route-local spacing overrides to align the progress label or indicator.
- Do not add `data-figma-*` attributes directly to the DOM unless the bridge contract is deliberately moved out of registry/renderReact.
- Do not use the Figma dot-style `Indicator` as the flow progress bar for this component.

### Validation

For component-only doc changes, no build is required. If implementation changes later touch this component, validate through the consuming mobile app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Manual checks for implementation changes:

- Back leading renders `IconArrowLeft` and `aria-label="뒤로"`.
- Close leading renders `IconClose` and `aria-label="닫기"`.
- `progress` omitted renders only `TopNavigation`.
- `progress.showLabel=true` renders `TextBlock` above `ProgressIndicator` inside `Box`/`VStack`.
- Direct DOM still has no accidental `data-figma-*` bridge attributes unless the registry contract changes.
