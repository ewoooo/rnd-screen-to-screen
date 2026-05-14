# PopupActionButton

Popup 내부에서만 쓰는 action area입니다. Figma의 `Options=2Buttons` /
`Options=1Button` 축을 코드의 `options` prop으로 정규화하고, 실제 액션은
기존 `Button` 컴포넌트만 소비합니다.

## Import

```tsx
import { PopupActionButton } from "./popup-action-button";
```

## Usage

```tsx
<PopupActionButton
	secondaryAction={{ label: "취소" }}
	primaryAction={{ label: "확인" }}
/>

<PopupActionButton
	options="1Button"
	secondaryAction={{ label: "확인" }}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `"2Buttons" \| "1Button"` | `"2Buttons"` | Figma action layout option. |
| `primaryAction` | `{ label: string; onClick?: () => void; disabled?: boolean }` | - | Primary action. Required for `options="2Buttons"`. |
| `secondaryAction` | `{ label: string; onClick?: () => void; disabled?: boolean }` | - | Secondary action, or the single action for `options="1Button"`. |
| `className` | `string` | - | Additional class name for Popup-local composition. |

Native `div` attributes are supported except `children`, because the action
layout owns its nested `Button` contract.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="popup-action-button"`
- `data-figma-property-options="2Buttons" | "1Button"`

## Layout Contract

- `options="2Buttons"` renders secondary then primary.
- `options="1Button"` renders one full-width secondary action.
- All nested actions use `Button size="large"`.
- Spacing uses `--spacing-12` top padding, `--spacing-24` inline padding, and
  `--spacing-8` gap for the two-button layout.
