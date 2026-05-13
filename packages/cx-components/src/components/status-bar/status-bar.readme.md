# StatusBar

Figma preview용 iOS status bar mock입니다. 실제 OS status bar API와 연결하지 않습니다.

## Import

```tsx
import { StatusBar } from "@pxds/cx-components";
```

## Usage

```tsx
<StatusBar />
<StatusBar time="10:24" />
<StatusBar time="10:24" rightSide={<CustomSystemIndicators />} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `time` | `string` | `"9:41"` | Left time text. |
| `rightSide` | `ReactNode` | default indicators | Custom right-side system indicators. |
| `className` | `string` | - | Additional class name. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="status-bar"`
