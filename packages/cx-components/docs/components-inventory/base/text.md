# Text

## Overview

Purpose: identify ownership, source, implementation files, and production status.

Figma SOT: [SKT_SDUI_Test_0512 / Component base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 완료 |
| Implementation Target | cx-components |
| Figma Source | text |
| Dependencies | 없음 |
| Internal Parts | 없음 |
| Variants | variant: displayTitle/sectionTitle/listTitle/body/bodySubtle/caption/label/helper/error |
| Properties | `data-figma-property-variant`: displayTitle/sectionTitle/listTitle/body/bodySubtle/caption/label/helper/error |

### Implementation Files

- `packages/cx-components/src/components/text/Text.tsx`
- `packages/cx-components/src/components/text/Text.types.ts`
- `packages/cx-components/src/components/text/text.variants.ts`
- `packages/cx-components/src/components/text/index.ts`
- `packages/cx-components/src/components/text/text.readme.md`

## Structure

Purpose: define the target component structure and how Figma-only text samples normalize into code.

### Target Structure

```txt
Text
└─ rendered element (default: span)
   └─ children
```

`Text` is a typography primitive. It does not own layout, spacing, color semantics, icon regions, or state-specific behavior. Parent components decide the semantic element and local color through context or class names; `Text` applies only the typography class for its `variant`.

### Component Consumption

| Consumed component | Used for | Current implementation |
| --- | --- | --- |
| 없음 | - | `Text.tsx` renders the selected HTML element directly with `createElement`. |

### Figma Source Difference

The designated Figma base node is a component section. In that section, `text` appears as a typography sample frame rather than a standalone component set with Figma variants. The inspected sample frame contains two raw text nodes using Figma text styles such as `16 semi` and `13 med`.

Code normalizes that source into one public primitive with named variants. The code variant names are the contract for implementation and bridge metadata.

Compressed Figma source:

```txt
base
└─ text sample frame
   ├─ raw text node: 16 semi
   └─ raw text node: 13 med
```

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `text` sample frame | No direct wrapper in `Text` | no |
| raw Figma text node | `Text` rendered element | yes |
| Figma text style, for example `16 semi` | `variant` mapped to CX token class, for example `listTitle` -> `text-16-semi` | yes, through code variant |

## Props

Purpose: define the public API and the `data-figma-property-*` bridge contract.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `TextElement` | `"span"` | Polymorphic rendered element. Supported values are `span`, `p`, `label`, `div`, `strong`, `em`, `small`, and `h1`-`h6`. |
| `variant` | `TextVariant` | `"body"` | Typography token variant. |
| `className` | `string` | - | Additional class name merged after the typography variant class. Use this for component-local color or layout hooks, not for ad hoc typography. |
| `children` | `ReactNode` | - | Text content. |
| native element props | selected element props | - | Native props for the element selected by `as` are forwarded. |

### Variants

| Variant | Token class | Intended role |
| --- | --- | --- |
| `displayTitle` | `text-24-med` | Large page or flow title. |
| `sectionTitle` | `text-20-med` | Section-level title. |
| `listTitle` | `text-16-semi` | List row title or compact strong title. |
| `body` | `text-16-reg` | Default body copy. |
| `bodySubtle` | `text-14-reg` | Secondary body copy. |
| `caption` | `text-12-med` | Small emphasized caption. |
| `label` | `text-14-semi` | Form/control label. |
| `helper` | `text-12-reg` | Helper or supporting text. |
| `error` | `text-12-reg` | Error copy. Color is owned by the consuming component, not by `Text`. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| resolved `variant` prop | `data-figma-property-variant` | `displayTitle` / `sectionTitle` / `listTitle` / `body` / `bodySubtle` / `caption` / `label` / `helper` / `error` |

`data-figma-property-variant` defaults to the resolved code variant. It can be passed explicitly for bridge output, but the override should stay aligned with the rendered typography variant unless a capture/export workflow requires a temporary mapping.

### Bridge Attributes

The root rendered element includes:

- `data-figma-render="component"` by default
- `data-figma-component-id="text"` when `data-figma-render` is `component`
- `data-figma-property-variant`
- `data-variant`

`data-figma-render` and `data-figma-component-id` come from shared Figma bridge props. If `data-figma-render` is changed away from `component`, the component id is not auto-filled unless the caller provides it.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { Text } from "@pxds/cx-components";
```

### Examples

```tsx
<Text>본문</Text>
<Text as="h1" variant="displayTitle">타이틀</Text>
<Text as="p" variant="bodySubtle">보조 설명</Text>
<Text as="label" variant="label" htmlFor="phone">휴대폰 번호</Text>
<Text as="p" variant="error" className="cx-text-field__helper">오류 메시지</Text>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep `Text` as a typography primitive.
- Keep the public variant list limited to `displayTitle`, `sectionTitle`, `listTitle`, `body`, `bodySubtle`, `caption`, `label`, `helper`, and `error`.
- Map variants through `textVariants` to generated CX token classes from `@pxds/cx-tokens`.
- Use the polymorphic `as` prop for semantic HTML instead of creating heading, label, caption, or paragraph wrapper components.
- Preserve root `data-figma-render`, `data-figma-component-id="text"`, `data-figma-property-variant`, and `data-variant`.
- Let consuming components own color and layout states through their own classes.

### Don't

- Add Text-specific spacing, margins, layout wrappers, or color state rules.
- Add one-off font sizes or token classes outside the code variant contract.
- Treat Figma sample wrapper frames named `text` as public component vocabulary.
- Create separate public components for `Label`, `HelperText`, `Caption`, or heading styles while they are expressible as `Text` variants.
- Use `className` to replace the typography token class with arbitrary typography.

### Normalization Notes

- Figma currently provides typography samples in the base section, not a dedicated `Text` component set with variant axes.
- Code is the implementation contract for Text variants.
- `displayTitle`, `sectionTitle`, `listTitle`, `body`, `bodySubtle`, `caption`, `label`, `helper`, and `error` are the only current public variants.
- `helper` and `error` intentionally share `text-12-reg`; semantic difference is expressed by consuming component state and color.
- `as` changes the rendered HTML element only. It does not change the typography variant.
- `data-figma-property-variant` is bridge metadata and should follow the resolved `variant`.

### Validation

`@pxds/cx-components` currently has no package-local `lint` or `build` scripts. Validate through consuming app checks when Text behavior changes.

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify the rendered element includes:

- `class="cx-text ..."`
- `data-figma-render="component"`
- `data-figma-component-id="text"`
- `data-figma-property-variant`
- `data-variant`

Verify default behavior:

- omitted `as` renders `span`
- omitted `variant` resolves to `body`
- `data-figma-property-variant` defaults to the resolved `variant`
