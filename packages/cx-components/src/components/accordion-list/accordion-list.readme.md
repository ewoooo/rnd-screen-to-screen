# AccordionList

Compound list for rendering multiple CX accordions with content dividers between
rows.

```tsx
import { AccordionList } from "@pxds/cx-components";

<AccordionList
	defaultOpenIds={["payment-method"]}
	items={[
		{
			id: "payment-method",
			title: "[T우주] 결제수단을 변경할 수 있나요?",
			content: "결제수단 변경 안내를 표시합니다.",
		},
		{
			id: "membership",
			title: "[T우주] 멤버십 혜택을 확인할 수 있나요?",
			content: "멤버십 혜택 안내를 표시합니다.",
		},
	]}
/>;
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `AccordionListItem[]` | - | Ordered accordion rows. |
| `openIds` | `string[]` | - | Controlled open row ids. |
| `defaultOpenIds` | `string[]` | `[]` | Initial uncontrolled open row ids. |
| `allowMultiple` | `boolean` | `true` | Allows more than one row to be open when uncontrolled. |
| `onOpenIdsChange` | `(openIds: string[]) => void` | - | Called when row open state changes. |
| `showTrailingDivider` | `boolean` | `true` | Adds the final divider to match the Figma source. |

Native `div` attributes are supported except `children` and native `onChange`.

## Figma Bridge

- root: `data-figma-render="component"`
- root: `data-figma-component-id="accordion-list"`
- rows delegate bridge metadata to `Accordion`
- separators delegate bridge metadata to `Divider type="contents"`
