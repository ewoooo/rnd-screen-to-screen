# PageStackList

Layout-facing list-page stack wrapper.

```tsx
import { PageStackList } from "@pxds/cx-components";

<PageStackList title={<TitleSection title="타이틀" />}>
	<SectionItem>콘텐츠</SectionItem>
</PageStackList>;
```

`PageStackList` owns only the title/content slot wrappers and bridge metadata. Visual title and list item semantics stay in the children passed by the consumer.
