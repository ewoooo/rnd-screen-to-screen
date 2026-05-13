# ProgressAppBar

MBR 화면에서 임시로 사용하는 progress 포함 앱바 pattern입니다. CX master component가 아니므로 `data-node-kind="pattern"`으로 기록합니다.

## Import

```tsx
import { ProgressAppBar } from "@/patterns/mbr";
```

## Usage

```tsx
<ProgressAppBar title="회원 가입" currentStep={2} totalSteps={5} />
<ProgressAppBar title="회원 가입" progress={40} progressLabel="2/5" showProgressLabel />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | required | AppBar title. |
| `currentStep` | `number` | - | Current step. Used with `totalSteps`. |
| `totalSteps` | `number` | - | Total steps. Used with `currentStep`. |
| `progress` | `number` | - | Explicit progress percent from 0 to 100. Overrides step calculation. |
| `progressLabel` | `string` | - | Optional visible or aria progress label. |
| `showProgressLabel` | `boolean` | `false` | Shows `progressLabel` next to the bar. |
| `showLeftItem` | `boolean` | `true` | Passed to `AppBar`. |
| `showRightItem` | `boolean` | `false` | Passed to `AppBar`. |
| `leftIcon` | `ReactNode` | - | Passed to `AppBar`. |
| `rightItems` | `ReactNode[]` | - | Passed to `AppBar`. |
| `leftLabel` | `string` | - | Passed to `AppBar`. |
| `onLeftClick` | `() => void` | - | Passed to `AppBar`. |
| `className` | `string` | - | Additional class name. |

## Bridge Attributes

- `data-node-kind="pattern"`
- `data-component-id="mbr-progress-app-bar"`
- `data-figma-component="ProgressAppBar"`
- `data-figma-progress`
- `data-figma-progress-label`
