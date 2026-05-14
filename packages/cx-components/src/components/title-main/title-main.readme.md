# TitleMain

High-level title composition for completion and search/topic title screens.
`TitleMain` keeps media as a caller-provided slot while composing the shared
`Text`, `TitleSection`, and `Indicator` vocabulary.

## Import

```tsx
import { TitleMain } from "@pxds/cx-components/components/title-main";
```

## Usage

```tsx
<TitleMain
	type="complete"
	media={<img src={deviceImageUrl} alt="" />}
	titleSubText="갤럭시 S29 · SM-S942NV"
	title={
		<>
			축하드려요 은지님,
			<br />
			개통이 완료되었어요
		</>
	}
	subTitle="지금부터 새로운 휴대폰 사용이 가능해요."
/>

<TitleMain
	type="search"
	title={
		<>
			두립 찬스 T우주
			<br />
			꿀팁 보고 쿠폰픽
		</>
	}
	indicator
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"complete" \| "search"` | `"complete"` | Maps to Figma `Type`. |
| `title` | `ReactNode` | required | Main title content passed into `TitleSection`. |
| `subTitle` | `ReactNode` | - | Optional `TitleSection` subtitle. |
| `titleSubText` | `ReactNode` | - | Optional top supporting text. |
| `media` | `ReactNode` | - | Optional leading media slot. |
| `indicator` | `boolean \| IndicatorProps` | `false` | Renders the shared `Indicator`; object form configures it. |
| `className` | `string` | - | Additional root class for composition. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="title-main"`
- `data-figma-property-type="complete" | "search"`
- `data-figma-property-show-title-sub-text="true" | "false"`
- `data-figma-property-show-title-sub-text-image="true" | "false"`
- `data-figma-property-indicator="true" | "false"`
