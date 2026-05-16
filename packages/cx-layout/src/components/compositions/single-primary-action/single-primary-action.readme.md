# SinglePrimaryAction

Bottom action composition for a single primary action. It wraps children in the named `action` layout slot used by the Figma bridge.

Use this pattern from `AppScreen.Bottom` or another named action-area slot. Do not place raw `Button` groups in scroll content to mimic a primary CTA. Button visuals come from `@pxds/cx-components`; this pattern owns placement and bridge intent.

```tsx
import { SinglePrimaryAction } from "@pxds/cx-layout/components";

<SinglePrimaryAction>{action}</SinglePrimaryAction>;
```
