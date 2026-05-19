# PageStackContents

Page body stack을 표현하는 composition wrapper입니다. 시각 컴포넌트가 아니라 `title`과 `content` 영역을 이름 있는 layout slot으로 묶습니다.

`PageStackContents`는 `Pattern` 레이어의 section wrapper다. 화면 route는 이 wrapper 안에 domain organism 또는 CX component 조합을 넣고, route-local padding/margin으로 369/361/329 기준선을 보정하지 않는다. spacing 적용은 `DESIGN_FOUNDATION.md` token과  운영 규칙을 따른다.

## Import

```tsx
import { PageStackContents } from "@pxds/cx-layout/components";
```

## Usage

```tsx
<PageStackContents title={<TitleSection title="타이틀" />}>
	{children}
</PageStackContents>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | - | Optional title slot content. |
| `children` | `ReactNode` | - | Content slot children. |
| `showTitle` | `boolean` | `Boolean(title)` | Controls title slot rendering. |
| `className` | `string` | - | Additional class name. |

Native `section` attributes are supported except native `children` and `title`.

## Internal Slots

`title` is wrapped with `<Slot name="title">`.
`children` is always wrapped with `<Slot name="content">`.

## Bridge Attributes

- `data-figma-render="layout"`
- `data-figma-component-id="page-stack-contents"`
- `data-figma-property-contents-title`
- `data-figma-layout-layer="section"`
- `data-figma-layout-slot="title|content"`
