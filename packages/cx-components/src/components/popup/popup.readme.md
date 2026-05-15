# Popup

Dialog surface for a title, optional sub text, optional content slot, and
popup-scoped actions.

`Popup` does not implement overlay dimming, portals, focus trap, scroll lock, or
modal open state. Those concerns belong to the runtime wrapper that mounts it.

## Import

```tsx
import { Popup } from "@pxds/cx-components";
```

## Usage

```tsx
<Popup
	title="타이틀"
	subText="텍스트"
	secondaryAction={{ label: "취소" }}
	primaryAction={{ label: "확인" }}
/>
```

```tsx
<Popup
	title="타이틀"
	showSubText={false}
	actionOptions="1Button"
	secondaryAction={{ label: "확인" }}
>
	<Text>콘텐츠</Text>
</Popup>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | required | Popup title rendered through `Text`. |
| `subText` | `ReactNode` | - | Supporting text below the title. |
| `showSubText` | `boolean` | `Boolean(subText)` | Controls whether the sub text region renders. |
| `children` | `ReactNode` | - | Optional contents slot. |
| `showContents` | `boolean` | `Boolean(children)` | Controls whether the contents slot renders. |
| `actionOptions` | `"2Buttons" \| "1Button"` | `"2Buttons"` | Action layout forwarded to `PopupActionButton`. |
| `primaryAction` | `PopupAction` | - | Primary action, required for `2Buttons`. |
| `secondaryAction` | `PopupAction` | required | Secondary action, or the single action for `1Button`. |
| `className` | `string` | - | Additional root class name. |

Native `div` attributes are supported except `children` and native `title`,
which are owned by the component API.

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="popup"`
- `data-figma-property-contents`
- `data-figma-property-show-contents`
- `data-figma-property-show-sub-text`

`PopupActionButton` owns `data-figma-property-options`.
