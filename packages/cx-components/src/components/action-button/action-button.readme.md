# ActionButton

High-level mobile action area that combines optional supporting text, optional
tooltip guidance, and one or two CTA buttons.

## Import

```tsx
import { ActionButton } from "@pxds/cx-components";
```

## Usage

```tsx
<ActionButton
	type="default"
	text="이용 금액 1개월/7,900원"
	actions={[
		{ label: "취소", variant: "secondary", onClick: handleCancel },
		{ label: "구독하기", variant: "primary", onClick: handleSubmit },
	]}
/>

<ActionButton
	type="ai"
	tooltip="56만원의 T 안심보상가 적용이 대기 중이에요!"
	actions={[
		{ label: "맞춤 옵션 바로 선택하기", variant: "primary", onClick: handleSelect },
	]}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"default" \| "ai" \| "gift"` | `"default"` | Figma `Type` mapping. AI and gift types add a default left item to the primary action. |
| `actions` | one or two `ActionButtonAction` items | - | CTA definitions rendered with `Button size="xlarge"`. Runtime rendering ignores actions after the first two. |
| `buttonCount` | `1 \| 2` | derived from actions | Figma `Button` mapping override for capture. |
| `text` | `ReactNode` | - | Supporting text rendered with `Text`. |
| `showText` | `boolean` | derived from text presence | Forces supporting text visibility. |
| `tooltip` | `ReactNode` | - | Tooltip content rendered with `Tooltip`. |
| `showTooltip` | `boolean` | derived from tooltip presence | Forces tooltip visibility. |
| `tooltipDirection` | `"left" \| "center" \| "right"` | `"center"` | Passed to `Tooltip`. |

## Action

| Field | Type | Description |
| --- | --- | --- |
| `label` | `ReactNode` | Button label. |
| `variant` | `"primary" \| "secondary" \| "disabled"` | Passed to `Button`. |
| `disabled` | `boolean` | Passed to `Button`. |
| `onClick` | `() => void` | Button click handler. |
| `leftItem` | `"ai" \| "ai-gift" \| false` | Optional leading item override. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="action-button"`
- `data-figma-property-type`
- `data-figma-property-button`
- `data-figma-property-show-text`
- `data-figma-property-show-tooltip`
