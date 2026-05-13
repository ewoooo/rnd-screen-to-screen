# TitleSection

Page-level title block입니다. `PageStackContents` 같은 composition wrapper의 `title` slot에 넣어 사용합니다.

## Import

```tsx
import { TitleSection } from "@pxds/cx-components";
```

## Usage

```tsx
<TitleSection title="타이틀" />
<TitleSection title="타이틀" subText="설명" />
<TitleSection title="타이틀" titleSubText="상단 보조 텍스트" />
<TitleSection title="타이틀" titleSubImage={<Icon />} titleSubText="상단 보조 텍스트" />
<TitleSection title="타이틀" leftItem={<Icon />} rightItem={<Button />} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | required | Main title content. |
| `titleSubText` | `string` | - | Optional text inside `TitleText > TitleSubText`. |
| `titleSubImage` | `ReactNode` | - | Optional image/icon inside `TitleText > TitleSubText`. |
| `subText` | `string` | - | Optional bottom text inside `TitleMain > SubText`. |
| `leftItem` | `ReactNode` | - | Optional leading slot. |
| `rightItem` | `ReactNode` | - | Optional trailing slot. |
| `showLeftItem` | `boolean` | `Boolean(leftItem)` | Controls left slot visibility. |
| `showRightItem` | `boolean` | `Boolean(rightItem)` | Controls right slot visibility. |
| `className` | `string` | - | Additional class name. |

Native `section` attributes are supported except native `title`.

## Figma Mapping

| Figma property | React prop |
| --- | --- |
| `LeftItem=On/Off` | `showLeftItem` |
| `RightItem=On/Off` | `showRightItem` |
| `TitleSubText=On/Off` | `Boolean(titleSubText || titleSubImage)` |
| `TitleSubImage=On/Off` | `Boolean(titleSubImage)` |
| `SubText=On/Off` | `Boolean(subText)` |

## Bridge Attributes

- `data-node-kind="component"`
- `data-component-id="title-section"`
- `data-figma-component="TitleSection/Default"`
- `data-figma-left-item`
- `data-figma-right-item`
- `data-figma-title-sub-text`
- `data-figma-title-sub-image`
- `data-figma-sub-text`
