# PageStackContents

Page body stack을 표현하는 composition wrapper입니다. 시각 컴포넌트가 아니라 `title`과 `content` 영역을 이름 있는 layout slot으로 묶습니다.

## Import

```tsx
import { PageStackContents } from "@pxds/pxds-layout/page-stack";
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

- `data-node-kind="composition"`
- `data-component-id="page-stack-contents"`
- `data-figma-component="PageStackContents"`
- `data-figma-contents-title`
