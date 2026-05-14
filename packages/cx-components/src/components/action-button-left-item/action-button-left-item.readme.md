# ActionButtonLeftItem

Private leading icon cluster for `ActionButton`. It owns no label, click handler,
disabled state, tooltip, or button layout behavior.

## Import

```tsx
import { ActionButtonLeftItem } from "./ActionButtonLeftItem";
```

The folder index is available for scoped/internal consumption:

```tsx
import { ActionButtonLeftItem } from "@pxds/cx-components/components/action-button-left-item";
```

## Usage

```tsx
<ActionButtonLeftItem type="ai-gift" />
<ActionButtonLeftItem type="ai" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"ai-gift" \| "ai"` | `"ai-gift"` | Selects the Figma `Type=Ai+Gift` or `Type=Ai` variant. |
| `className` | `string` | - | Root element class name. |

Native `span` attributes are supported. `children` is not supported.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="action-button-left-item"`
- `data-figma-property-type="ai-gift" | "ai"`

## Visual Contract

- `ai-gift`: 85 x 22, AI icon, 1 x 8 divider, Gift icon
- `ai`: 43 x 22, AI icon, 1 x 8 divider
- Gap is 20px and icons are 22 x 22.
- Assets come from `@pxds/cx-icons/action-button`.
