# FieldStack

Field form content stack composition. It wraps children in the named `content` layout slot used by the Figma bridge.

Use `FieldStack` inside a section/content slot for related input controls. It is a pattern composition, not a visual replacement for `TextField`. Field spacing follows `SPACING_PATTERNS.md`; route code should not add ad hoc margins between fields.

```tsx
import { FieldStack } from "@pxds/pxds-layout/components";

<FieldStack>{children}</FieldStack>;
```
