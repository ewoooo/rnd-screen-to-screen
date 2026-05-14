# TitleBottomSheet

Bottom-sheet header content component. It renders the optional title row,
close affordance, and supporting text row only; sheet runtime, overlay, drag,
and dismissal lifecycle stay with the consuming bottom-sheet component.

```tsx
import { TitleBottomSheet } from "@pxds/cx-components";

<TitleBottomSheet title="타이틀" onClose={closeSheet} />;

<TitleBottomSheet
	title="요금제 선택"
	subText="총"
	subText2="3개"
	onClose={closeSheet}
/>;

<TitleBottomSheet title="알림" showTitleButton={false} />;
```

Bridge attributes emitted on the root:

- `data-figma-render="component"`
- `data-figma-component-id="title-bottom-sheet"`
- `data-figma-property-show-title-text`
- `data-figma-property-show-title-button`
- `data-figma-property-show-sub-text`
- `data-figma-property-show-sub-text-2`
- `data-figma-property-show-title`
