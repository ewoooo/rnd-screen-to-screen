# TitleSection

CX section heading 컴포넌트입니다. Figma `TitleSection/Default`의 SubTitle, LeftItem, RightItem 조합을 React prop으로 표현합니다.

## Import

```tsx
import { TitleSection } from "@pxds/cx-components";
```

## Usage

```tsx
<TitleSection title="타이틀" />
<TitleSection subTitle="타이틀" title="타이틀" leftItem={{ type: "text", text: "2" }} />
<TitleSection
	title="타이틀"
	rightItem={{ type: "icon", icon: <Icon type="arrow-up" size={16} />, label: "접기" }}
/>
<TitleSection
	title="타이틀"
	rightItem={{ type: "textButton", text: "Text", onClick: handleClick }}
/>
<TitleSection
	title="타이틀"
	rightItem={{
		type: "textItemButton",
		label: "선택한 휴대폰 번호",
		value: "3개",
		icon: <Icon type="arrow-right" size={16} />,
		onClick: handleClick,
	}}
/>
<TitleSection
	title="타이틀"
	rightItem={{
		type: "buttonListOrder",
		label: "인기순",
		icon: <Icon type="dropdown" size={16} />,
		onClick: handleClick,
	}}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | required | Main title content. |
| `subTitle` | `ReactNode` | - | Optional tertiary subtitle. |
| `leftItem` | `ReactNode \| preset` | - | Optional leading slot or private preset. |
| `rightItem` | `ReactNode \| preset` | - | Optional trailing slot or private preset. |
| `className` | `string` | - | Additional class name. |

Native `section` attributes are supported except native `title`.

## Figma Mapping

| Figma property | React prop |
| --- | --- |
| `SubTitle=On/Off` | `Boolean(subTitle)` |
| `LeftItem=On/Off` | `Boolean(leftItem)` |
| `RightItem=On/Off` | `Boolean(rightItem)` |
| `LeftItem Type=Text` | `{ type: "text", text }` |
| `LeftItem Type=Icon` | `{ type: "icon", icon, label }` |
| `LeftItem Type=Badge` | `{ type: "badge", text }` |
| `RightItem Type=Icon` | `{ type: "icon", icon, label, onClick }` |
| `RightItem Type=TextButton` | `{ type: "textButton", text, onClick }` |
| `RightItem Type=TextItemButton` | `{ type: "textItemButton", label, value, icon, onClick }` |
| `RightItem Type=ButtonListOrder` | `{ type: "buttonListOrder", label, icon, onClick }` |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="title-section"`
- `data-figma-property-sub-title`
- `data-figma-property-left-item`
- `data-figma-property-right-item`
- `data-figma-property-left-item-type`
- `data-figma-property-right-item-type`
