# TitleContents

Content-section title row with an optional right-side affordance.

```tsx
import { TitleContents } from "@pxds/cx-components";

<TitleContents title="타이틀" />;

<TitleContents title="상세 정보" showButton={false} />;

<TitleContents
	title="혜택 안내"
	rightItem={{ type: "icon", label: "혜택 안내 접기" }}
/>;

<TitleContents title="필터" rightItem={{ type: "button", label: "버튼" }} />;
```

Bridge attributes emitted on the root:

- `data-figma-render="component"`
- `data-figma-component-id="title-contents"`
- `data-figma-property-show-button`
