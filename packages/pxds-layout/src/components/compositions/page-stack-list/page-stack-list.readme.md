# PageStackList

Page list stack composition. It keeps optional `title` and required `content` areas in named layout slots for screen assembly and Figma bridge output.

Use this only when the screen pattern is genuinely list-oriented. Form/detail section composition should prefer `PageStackContents` plus `FieldStack` or a named content organism. Spacing and rail decisions follow `DESIGN_FOUNDATION.md` and `SPACING_PATTERNS.md`.

```tsx
import { PageStackList } from "@pxds/pxds-layout/components";

<PageStackList title={title}>{items}</PageStackList>;
```
