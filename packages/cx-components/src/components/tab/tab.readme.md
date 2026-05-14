# Tab

Horizontal tab compound that composes `TabItem` for each option and owns value selection, tab-list semantics, and keyboard interaction.

```tsx
import { Tab } from "@pxds/cx-components";

<Tab
	ariaLabel="Membership menu"
	defaultValue="home"
	items={[
		{ value: "home", label: "홈" },
		{ value: "benefit", label: "혜택" },
		{ value: "shopping", label: "쇼핑" },
	]}
/>;
```

Use `value` and `onValueChange` for controlled selection. The root emits `data-figma-render="component"` and `data-figma-component-id="tab"`, while each composed `TabItem` emits its resolved `data-figma-property-state`.
