# BannerHorizontal

Horizontal banner compound for mobile screen composition. It owns the banner
surface, title/description text stack, caller-supplied media slot, and optional
shared `Indicator`.

## Import

```tsx
import { BannerHorizontal } from "@pxds/cx-components";
```

## Usage

```tsx
<BannerHorizontal
	title="T우주 x 신한카드 결제 혜택"
	description="우주패스 all, mini 무료 구독"
	image={<img src={cardImageSrc} alt="" />}
/>

<BannerHorizontal
	title="이번 달 구독 혜택"
	description="혜택 자세히 보기"
	image={benefitImageSrc}
	indicator={false}
	href="/benefits/subscription"
	ariaLabel="이번 달 구독 혜택 자세히 보기"
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | - | Primary banner text. |
| `description` | `ReactNode` | - | Secondary banner text. |
| `image` | `ReactNode` | - | Right-side media content. String values are treated as image `src`. |
| `indicator` | `boolean` | `true` | Shows the nested shared `Indicator`. |
| `indicatorCount` | `number` | `6` | Dot count passed to `Indicator`. |
| `activeIndex` | `number` | `0` | Active dot index passed to `Indicator`. |
| `href` | `string` | - | Optional link target when the whole banner is navigational. |
| `onClick` | `MouseEventHandler<HTMLElement>` | - | Optional press handler when the whole banner is interactive. |
| `ariaLabel` | `string` | - | Accessible label for interactive banners when visible text is insufficient. |
| `className` | `string` | - | Additional class name for composition. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="banner-horizontal"`
- `data-figma-property-indicator="true|false"`
