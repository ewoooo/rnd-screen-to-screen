# AppBar

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

AppBar node: [SKT_SDUI_Test_0512 / AppBar frame](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9343-20263&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | app-bar |
| Dependencies | Icon; Text; IconButton |
| Internal Parts | none |
| Variants | RightItem: On/Off; Title: On/Off; LeftItem: On/Off; Logo: Off/On |
| Properties | `data-figma-property-left-item`: true/false; `data-figma-property-right-item`: true/false; `data-figma-property-title`: true/false; `data-figma-property-logo`: true/false |

### Implementation Files

- `packages/cx-components/src/components/app-bar/AppBar.tsx`
- `packages/cx-components/src/components/app-bar/AppBar.types.ts`
- `packages/cx-components/src/components/app-bar/app-bar.variants.ts`
- `packages/cx-components/src/components/app-bar/app-bar.css`
- `packages/cx-components/src/components/app-bar/index.ts`

## Structure

Purpose: define the target component structure and how Figma-only nodes normalize into code.

### Target Structure

```txt
AppBar
├─ Logo slot? (showLogo)
├─ Title group? (showLeftItem or title presence)
│  ├─ IconButton(left action)? (showLeftItem)
│  │  └─ Icon / leftIcon slot
│  └─ Text(title)? (showTitle or title presence)
└─ Right item slot? (showRightItem)
   └─ IconButton[] (rightItems)
      └─ Icon / item node
```

`LeftItem`, `RightItem`, `Title`, and `Logo` are not exported public components. They are Figma variant axes normalized into `AppBar` presence props and slots:

| Figma axis | Code API | Public component? | Contract |
| --- | --- | --- | --- |
| `LeftItem` | `showLeftItem`, `leftIcon`, `leftLabel`, `onLeftClick` | no | Presence of a leading action. The action is rendered with `IconButton`; default icon is `Icon type="arrow-left"`. |
| `RightItem` | `showRightItem`, `rightItems` | no | Presence of trailing actions. Each item is wrapped with `IconButton`; default item is `Icon type="shop"`. |
| `Title` | `title`, `showTitle` | no | Presence of title text. The text consumes `Text` with AppBar title styling. |
| `Logo` | `showLogo`, `logo` | no | Presence of a logo region. The logo content is passed as a slot and is not a dedicated AppBar subcomponent. |

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| `Icon` | Default left and right icons | `AppBar.tsx` creates `arrow-left` and fallback `shop` icons. |
| `IconButton` | Left action and each right action | `AppBar.tsx` wraps action nodes with `IconButton`. |
| `Text` | Title text | `AppBar.tsx` renders `Text as="div" variant="listTitle"`. |

### Figma Source Difference

Figma presents AppBar as a frame containing six component variants:

```txt
AppBar
├─ RightItem=On,  Title=On,  LeftItem=On,  Logo=Off
├─ RightItem=Off, Title=On,  LeftItem=On,  Logo=Off
├─ RightItem=Off, Title=Off, LeftItem=On,  Logo=Off
├─ RightItem=On,  Title=Off, LeftItem=On,  Logo=Off
├─ RightItem=On,  Title=Off, LeftItem=Off, Logo=Off
└─ RightItem=Off, Title=Off, LeftItem=On,  Logo=On
```

The Figma generated structure includes local nodes named `btn`, `Icon`, `Title`, `RightItem`, and `button`. Code does not expose those as AppBar-specific public components; they normalize into `IconButton`, `Icon`, `Text`, and ReactNode slots.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `AppBar` | `AppBar` | yes |
| `Title` group | AppBar title group region | no, conditional region |
| `btn` inside left/title group | `IconButton` | yes |
| `Icon` inside left button | `Icon` or `leftIcon` slot content | yes for `Icon`; slot content may vary |
| title text node | `Text as="div"` | yes |
| `RightItem` group | AppBar right item region | no, conditional region |
| `btn` inside `RightItem` | `IconButton` per action | yes |
| logo `Icon` / `button` nodes | `logo` slot and optional `rightItems` if represented in code | no AppBar-specific public component |

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | - | Leading title text. Also enables title presence when `showTitle` is omitted. |
| `showTitle` | `boolean` | `Boolean(title)` | Controls Figma `Title` presence. |
| `showLeftItem` | `boolean` | `false` | Controls Figma `LeftItem` presence. |
| `showRightItem` | `boolean` | `false` | Controls Figma `RightItem` presence. |
| `showLogo` | `boolean` | `false` | Controls Figma `Logo` presence and switches the leading content to the logo slot. |
| `leftIcon` | `ReactNode` | `<Icon type="arrow-left" size={24} color="primary" />` | Slot content for the left action. |
| `logo` | `ReactNode` | - | Logo slot content when `showLogo=true`. |
| `rightItems` | `ReactNode[]` | `[<Icon type="shop" size={24} />]` | Slot content for right actions. Each node is wrapped in `IconButton`. |
| `leftLabel` | `string` | `"뒤로가기"` | Accessible label for the left action button. |
| `onLeftClick` | `() => void` | - | Left action click handler. |
| `className` | `string` | - | Additional class name on the root header. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| `showLeftItem` | `data-figma-property-left-item` | `true` / `false` |
| `showRightItem` | `data-figma-property-right-item` | `true` / `false` |
| `showTitle ?? Boolean(title)` | `data-figma-property-title` | `true` / `false` |
| `showLogo` | `data-figma-property-logo` | `true` / `false` |

The Figma axes use `On/Off`; the code bridge serializes them as `true/false` strings.

### Presence Rules

- `showTitle` defaults to title string presence.
- `showLogo=true` renders the logo region instead of the normal title group.
- `showLeftItem=true` renders the left action only in the normal title group path.
- `showRightItem=true` renders the right action region independently of title presence.
- `rightItems` are slot content, not public AppBar subcomponents. AppBar owns the surrounding `IconButton` wrappers and labels them by position.
- `leftIcon` and `logo` are slots. Passing custom nodes does not add new AppBar vocabulary.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { AppBar, Icon } from "@pxds/cx-components";
```

### Examples

```tsx
<AppBar title="결제하기" showLeftItem />
```

```tsx
<AppBar
  title="결제하기"
  showLeftItem
  showRightItem
  rightItems={[<Icon key="shop" type="shop" size={24} />]}
/>
```

```tsx
<AppBar
  showLogo
  logo={<Icon type="logo" size={32} />}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `AppBar` component.
- Keep `LeftItem`, `RightItem`, `Title`, and `Logo` as AppBar presence/slot concepts, not exported subcomponents.
- Use `IconButton` for actionable left and right controls.
- Use `Icon` for default action icons and documented icon examples.
- Use `Text` for the title text.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="app-bar"`.
- Preserve the `data-figma-property-*` bridge attributes listed above.

### Don't

- Create public `AppBar.LeftItem`, `AppBar.RightItem`, `AppBar.Title`, or `AppBar.Logo` components from the Figma layer names.
- Add separate public components for Figma local nodes named `btn`, `button`, or `Title`.
- Add route/screen-local margin or padding to compensate for AppBar alignment.
- Add AppBar-specific icon variants when an existing `Icon` or slot can represent the content.

### Normalization Notes

- The provided SOT URL points to the `base` section (`14401:29020`); the AppBar component group inside it is node `9343:20263`.
- Figma shows five 56px-high variants and one 52px logo variant. Current code normalizes AppBar height to 52px through `.cx-app-bar--default` and `.cx-app-bar--logo`.
- Figma generated code shows vertical padding as spacing 12 for most variants. Current CSS uses `var(--spacing-10, 10px)` vertical padding and `var(--spacing-24)` horizontal padding.
- Figma title style is `18 semi`; current CSS binds title typography to the generated `--18-semi-*` tokens through `.cx-app-bar__title`.
- Figma-only nodes named `btn`, `button`, `Title`, and `RightItem` are structural artifacts. Code maps them to existing component vocabulary and slot regions.
- The logo variant in Figma includes concrete icon/button imagery. Code treats logo as a `ReactNode` slot and does not hard-code that full Figma composition.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="app-bar"`
- `data-figma-property-left-item`
- `data-figma-property-right-item`
- `data-figma-property-title`
- `data-figma-property-logo`

Verify the title and action regions include:

- `data-figma-render="slot"` and `data-figma-property-name="title"` for the title group.
- `data-figma-render="slot"` and `data-figma-property-name="right-item"` for the right item group.
