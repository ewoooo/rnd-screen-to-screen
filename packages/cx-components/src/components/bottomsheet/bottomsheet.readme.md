# Bottomsheet

Figma `Bottomsheet` compound를 `@pxds/cx-layout`의 `BottomSheet` 런타임 위에 얇게 조립하는 cx-components wrapper입니다. Overlay, portal, focus trap, scroll lock은 layout runtime이 소유합니다.

## Import

```tsx
import { Bottomsheet } from "@pxds/cx-components/components/bottomsheet";
```

## Usage

```tsx
<Bottomsheet
	open={open}
	onOpenChange={setOpen}
	title="타이틀"
	actions={[{ label: "확인", onClick: submit }]}
>
	{contents}
</Bottomsheet>
```

```tsx
<Bottomsheet open actionButton="off" titleBottomSheet={header}>
	{contents}
</Bottomsheet>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | - | Controlled open state passed to layout `BottomSheet`. |
| `defaultOpen` | `boolean` | - | Uncontrolled initial open state passed to layout `BottomSheet`. |
| `onOpenChange` | `(open: boolean) => void` | - | Open state callback. |
| `children` / `content` | `ReactNode` | - | Figma `Con` slot. |
| `showTitleBottomSheet` | `boolean` | `true` | Renders the title slot. |
| `title` | `ReactNode` | - | Passed to `TitleBottomSheet` when `titleBottomSheet` is not supplied. |
| `titleBottomSheet` | `ReactNode` | - | Explicit title slot. |
| `actionButton` | `"on" \| "off" \| boolean` | `"on"` | Figma action-button variant. |
| `action` | `ReactNode` | - | Explicit action slot. |
| `actions` | `ActionButtonActions` | - | Convenience input for rendering `ActionButton`. |
| `handle` | `boolean` | `true` | Renders the visual `Handle`; runtime handle is disabled to avoid duplicate handles. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="bottomsheet"`
- `data-figma-property-action-button`
- `data-figma-property-show-title-bottom-sheet`
- `data-figma-property-con`
