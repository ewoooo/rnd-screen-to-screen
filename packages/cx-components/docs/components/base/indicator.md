# Indicator

## Overview

Purpose: define the implementation-ready contract for the dot-style page/slide indicator.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=9861-48384&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components candidate |
| Figma Source | indicator |
| Dependencies | 없음 |
| Variants | 없음 |
| Properties | 없음 |

### Implementation Files

Implemented in `@pxds/cx-components`:

- `packages/cx-components/src/components/indicator/Indicator.tsx`
- `packages/cx-components/src/components/indicator/Indicator.types.ts`
- `packages/cx-components/src/components/indicator/indicator.variants.ts`
- `packages/cx-components/src/components/indicator/indicator.css`
- `packages/cx-components/src/components/indicator/indicator.readme.md`
- `packages/cx-components/src/components/indicator/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.

## Structure

Purpose: normalize the Figma dot nodes into a small public component without adding new visual vocabulary.

### Target Structure

```txt
Indicator
└─ dot * count
```

Figma checked node:

```txt
Indicator (component, 68 x 4)
├─ dot (ellipse, 4 x 4, active)
├─ dot (ellipse, 4 x 4, inactive)
├─ dot (ellipse, 4 x 4, inactive)
├─ dot (ellipse, 4 x 4, inactive)
├─ dot (ellipse, 4 x 4, inactive)
└─ dot (ellipse, 4 x 4, inactive)
```

### Layout Contract

| Field | Figma value | Token / implementation note |
| --- | --- | --- |
| Root layout | horizontal auto-layout | inline-flex / flex row |
| Dot size | `4px` x `4px` | fixed visual primitive |
| Dot gap | `8px` | `--spacing/8` equivalent |
| Root padding | left/right `2px`, top/bottom `0` | `--spacing/2` equivalent |
| Active color | `#3617CE` | prefer brand/component indicator token |
| Inactive color | `#D2D9EB` | prefer existing neutral/border token before adding a component token |

### Dependencies

Actual consumed components:

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| None | Indicator is a primitive dot group. | Implemented as internal CSS circles in `Indicator.tsx`. |

Expected consuming components:

| Consumer | Usage |
| --- | --- |
| `BannerHorizontal` | Optional pagination indicator controlled by `data-figma-property-indicator`. |
| `TitleMain` | Optional indicator controlled by `data-figma-property-indicator`. |

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `Indicator` | `Indicator` root | yes |
| `dot` ellipses | repeated internal dot elements | no |

### Normalization Notes

- Figma exports each dot as an `ELLIPSE`; code should render CSS circles, not image assets.
- The Figma SOT has six dots with the first dot active. Code should make `count` and `activeIndex` configurable while defaulting to the Figma state.
- Figma has no component variants or `data-figma-property-*` values for this component.
- The component is not a progress bar and should not be confused with WDS `ProgressIndicator`.

## Props

Purpose: define the public API for a candidate implementation.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number` | `6` | Number of dots to render. Clamp to at least `1`. |
| `activeIndex` | `number` | `0` | Zero-based active dot index. Clamp to the rendered dot range. |
| `ariaLabel` | `string` | `"페이지 위치"` | Accessible label for the indicator group. |
| `className` | `string` | - | Additional class name on root. |

### Figma Mapping Props

There are no Figma variant properties for `Indicator`.

Recommended bridge attributes:

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| root render identity | `data-figma-render` | `component` |
| component id | `data-figma-component-id` | `indicator` |

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Indicator } from "@pxds/cx-components";
```

### Examples

```tsx
<Indicator />
<Indicator count={3} activeIndex={1} ariaLabel="배너 위치" />
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep styling wired to `--semantic-*` / `--component-*` aliases and do not reintroduce component-local `--cx-*` CSS variables.
- Keep one public `Indicator` component.
- Render dots as internal CSS circles.
- Preserve Figma sizing: `4px` dots, `8px` gap, and `2px` horizontal root padding.
- Use existing CX tokens for active and inactive colors; add a missing component token only if no suitable neutral token exists.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="indicator"`.
- Use `role="img"` or an equivalent accessible grouping with `aria-label`.

### Don't

- Create a public `Dot` component from the repeated Figma ellipses.
- Use remote Figma image assets for the dots.
- Add variants that are not represented by the current Figma SOT.
- Replace flow progress UI with this component; progress bars should continue using `ProgressIndicator`.
- Add route/screen-local spacing overrides to align the indicator.

### Validation

Validate through consuming app checks when implementation changes are made.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the root DOM node includes:

- `data-figma-render="component"`
- `data-figma-component-id="indicator"`

Verify rendered geometry:

- default output has six `4px` circular dots.
- active dot resolves to `#3617CE`.
- inactive dots resolve to `#D2D9EB` or the approved token equivalent.
- dot gap is `8px` and root horizontal padding is `2px`.
