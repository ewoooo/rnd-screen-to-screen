# AccordionList

## Overview

Purpose: define the implementation-ready contract for the planned CX accordion list compound.

Figma SOT: [SKT_SDUI_Test_0512 / Component node](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=10082-43334&t=wZRehc2DOVV8corW-1)

Also checked the broader base section: [SKT_SDUI_Test_0512 / base section](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

### Inventory

| Field | Value |
| --- | --- |
| Status | 제작 예정 |
| Implementation Target | cx-components candidate |
| Figma Source | accordion-list |
| Dependencies | Accordion, Divider, Icon |
| Variants | 없음 |
| Properties | 없음 |

### Implementation Files

Not implemented yet. Expected in `@pxds/cx-components`:

- `packages/cx-components/src/components/accordion-list/AccordionList.tsx`
- `packages/cx-components/src/components/accordion-list/AccordionList.types.ts`
- `packages/cx-components/src/components/accordion-list/accordion-list.variants.ts`
- `packages/cx-components/src/components/accordion-list/accordion-list.css`
- `packages/cx-components/src/components/accordion-list/accordion-list.readme.md`
- `packages/cx-components/src/components/accordion-list/index.ts`

### Styling Contract

- Component CSS must not define component-local `--cx-*` custom properties.
- Consume theme-neutral aliases from `@pxds/cx-tokens/style.css` directly: prefer `--semantic-*` and `--component-*` tokens.
- Keep row spacing, divider placement, and width behavior owned by `AccordionList`; routes must not add raw margin or padding to make list rows align.

## Structure

Purpose: define how the Figma list composition normalizes into a reusable compound.

### Target Structure

```txt
AccordionList
├─ Accordion(item 1)
├─ Divider(type="contents")
├─ Accordion(item 2)
├─ Divider(type="contents")
└─ ...
```

`AccordionList` is a public compound that composes multiple `Accordion` rows with content dividers between rows. It should not reimplement the accordion header, icon, or body slot.

### Component Consumption

| Consumed component | Used for | Contract |
| --- | --- | --- |
| `Accordion` | Each list row | Pass title, optional left text, open state, and body slot content through the public `Accordion` API. |
| `Divider` | Row separators | Use `Type=Contents` / `type="contents"` separators at the list width. |
| `Icon` | Accordion affordance through `Accordion` | Do not consume directly unless the `Accordion` API requires an icon override. The Figma dependency is inherited from nested Accordion rows. |

### Figma Source Difference

Figma exposes `AccordionList` as one component, not a component set:

```txt
AccordionList
├─ Accordion / State=Open
├─ Divider / Type=Contents
├─ Accordion / State=Close
├─ Divider / Type=Contents
├─ Accordion / State=Close
├─ Divider / Type=Contents
└─ ... repeated through 9 Accordion rows and 9 Dividers
```

Figma measurements checked on node `10082:43334`:

| Source | Value |
| --- | --- |
| Root size | `329 x 612` |
| Root layout | vertical auto layout |
| Root gap | `20` |
| Root padding | `0` |
| Accordion rows | 9 total; first open, remaining rows close |
| Divider rows | 9 total; all `Divider / Type=Contents`, `329 x 1` |
| Open row | `329 x 95`, nested `Accordion / State=Open` |
| Closed rows | `329 x 21`, nested `Accordion / State=Close` |

The final source child is also a divider. Code may support both trailing-divider and no-trailing-divider modes, but the Figma default source includes the trailing `Divider / Type=Contents`.

### Node Mapping

| Figma node | Code structure | Public vocabulary? |
| --- | --- | --- |
| `AccordionList` component | `AccordionList` | yes |
| `Accordion / State=Open` | `Accordion open` | `Accordion` yes |
| `Accordion / State=Close` | `Accordion open={false}` | `Accordion` yes |
| `Divider / Type=Contents` | `Divider type="contents"` | `Divider` yes |
| Nested `Icon / ArrowUp` | handled by open `Accordion` | `Icon` yes |
| Nested `Icon / ArrowDown` | handled by closed `Accordion` | `Icon` yes |

## Props

Purpose: define the public API and Figma bridge expectations.

### Props

```ts
type AccordionListItem = {
  id: string;
  title: ReactNode;
  leftText?: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
};
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `AccordionListItem[]` | - | Ordered accordion rows. |
| `openIds` | `string[]` | - | Controlled set of open row ids. |
| `defaultOpenIds` | `string[]` | `[]` | Initial uncontrolled open row ids. |
| `allowMultiple` | `boolean` | `true` | Allows more than one row to be open when uncontrolled. |
| `onOpenIdsChange` | `(openIds: string[]) => void` | - | Called when row disclosure state changes. |
| `showTrailingDivider` | `boolean` | `true` | Preserves the Figma source default with a divider after the final row. |
| `className` | `string` | - | Additional class name on the root. |

### Figma Mapping Props

| Code source | Figma bridge attribute | Value |
| --- | --- | --- |
| component root | `data-figma-render` | `component` |
| component root | `data-figma-component-id` | `accordion-list` |
| row wrapper, if emitted | `data-figma-render` | `slot` or `primitive` according to renderer convention |
| nested row | delegated to `Accordion` | `data-figma-component-id="accordion"` |
| nested separator | delegated to `Divider` | `data-figma-component-id="divider"` and contents type metadata |

Figma lists no component-level properties for `AccordionList`. Row state belongs to each nested `Accordion` instance and should be exported through `Accordion` bridge metadata, not duplicated as an `AccordionList` variant axis.

### State Rules

- `AccordionList` has no independent Figma variants or states.
- Open/close state is per item and maps to nested `Accordion` `State=Open/Close`.
- The Figma example starts with the first row open and all remaining rows closed.
- `allowMultiple=false` should close other rows when a new row opens; this is code behavior, not a Figma variant.
- `showTrailingDivider=true` matches the checked Figma source.

## Usage

Purpose: show expected consumer usage.

### Import

```tsx
import { AccordionList } from "@pxds/cx-components";
```

### Examples

```tsx
<AccordionList
  defaultOpenIds={["payment-method"]}
  items={[
    {
      id: "payment-method",
      title: "[T우주] 결제수단을 변경할 수 있나요?",
      content: "T 멤버십 제휴사 중 결제 가능 제휴사에서 결제바코드를 이용해 결제할 경우, 결제바코드 하나로 고객님의 회원등급에 맞는 T멤버십 혜택이 결제와 동시에 자동으로 적용됩니다.",
    },
    {
      id: "membership",
      title: "[T우주] 결제수단을 변경할 수 있나요?",
      content: "본문",
    },
  ]}
/>
```

For a single-open FAQ pattern:

```tsx
<AccordionList
  allowMultiple={false}
  openIds={[openId]}
  onOpenIdsChange={([nextId]) => setOpenId(nextId)}
  items={faqItems}
/>
```

## Implementation Guide

Purpose: constrain implementation decisions and validation.

### Do

- Keep one public `AccordionList` component that composes `Accordion` and `Divider`.
- Preserve root `data-figma-render="component"` and `data-figma-component-id="accordion-list"`.
- Delegate row header/body rendering and open/close bridge metadata to `Accordion`.
- Use `Divider type="contents"` for every separator.
- Keep the default trailing divider behavior aligned with the Figma source unless product usage explicitly disables it through `showTrailingDivider`.
- Use stable item ids for controlled and uncontrolled state.
- Keep list spacing tokenized and owned by the component stylesheet.

### Don't

- Do not create separate public components for open and closed accordion list rows.
- Do not duplicate `Accordion` internals, arrow icons, text styling, or content slot behavior inside `AccordionList`.
- Do not expose Figma-only row names as public props.
- Do not add screen-level margin, padding, or fixed height overrides to match the 329px source frame.
- Do not treat the nested arrow vectors as new SVG assets.

### Normalization Notes

- Inventory lists `AccordionList` as `제작 예정`; this document is the implementation contract, not a code change.
- The Figma root is a fixed-width example at 329px. Implementation should be width-flexible while preserving the internal vertical rhythm.
- The checked source uses 9 repeated rows with identical sample title text. Implementation must accept arbitrary item arrays.
- The Figma source includes a final divider after the last accordion row. Keep this as the default for parity, but make it an explicit list-level behavior rather than a route-local extra divider.
- Figma component property access reports existing component-set errors for nested sources, so the list-level contract is based on direct node structure, main component names, and the inventory row.

### SVG Assets

SVG asset: not required.

`AccordionList` uses existing `Accordion`, `Divider`, and `Icon` vocabulary. The visible arrow affordances resolve through the nested `Accordion` rows as existing `Icon / Size=16, Type=ArrowUp` and `Icon / Size=16, Type=ArrowDown`; no new SVG asset is implied by this component.

### Validation

Documentation-only changes do not require app build checks.

When implementation changes are made, validate through the consuming app:

- `npm run lint -w @screen/mobile`
- `npm run build -w @screen/mobile`

Verify:

- The root includes `data-figma-render="component"` and `data-figma-component-id="accordion-list"`.
- Each row delegates open/close bridge metadata to `Accordion`.
- Separators render through `Divider type="contents"`.
- Toggling rows does not introduce route-local spacing corrections or unregistered icon assets.
