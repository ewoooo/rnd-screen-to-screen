# Accordion

Controlled or uncontrolled disclosure component for the CX base accordion.

```tsx
import { Accordion, Text } from "@pxds/cx-components";

<Accordion title="자주 묻는 질문" open>
	<Text>상세 안내 문구를 표시합니다.</Text>
</Accordion>;

<Accordion title="요금제 혜택" leftText="01" onOpenChange={setOpen}>
	<Text>혜택 상세 내용을 표시합니다.</Text>
</Accordion>;
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | - | Main header content. |
| `leftText` | `ReactNode` | - | Optional left-side text region. |
| `open` | `boolean` | - | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial uncontrolled open state. |
| `onOpenChange` | `(open: boolean) => void` | - | Called when the header toggles. |
| `children` | `ReactNode` | - | Body slot content. |
| `disabled` | `boolean` | `false` | Disables header interaction. |

Native `div` attributes are supported except `children`, native `title`, and
native `onChange`.

## Figma Bridge

- root: `data-figma-render="component"`
- root: `data-figma-component-id="accordion"`
- root: `data-figma-property-state="open" | "close"`
- root: `data-figma-property-left-text="true" | "false"`
- content slot: `data-figma-property-txt`
