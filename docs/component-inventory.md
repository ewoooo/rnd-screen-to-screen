# Component Inventory

## 1. Overview

This document is the working inventory for the CX component system. It tracks not only which components exist, but also who owns them, what they depend on, how they map to Figma, and what layout or bridge contract they rely on.

The current layers are:

- `foundation`: tokens, text styles, icons, and low-level visual constants.
- `primitive`: CX visual components with a direct Figma component identity.
- `compound`: CX components composed from primitives and internal slots.
- `layout`: layout runtime, layout primitives, and composition wrappers.
- `pattern`: app or flow-specific reusable patterns. These can graduate later.
- `organism`: screen-owned DOM assembly. Organisms are not the component vocabulary source of truth.

Dependency direction:

```txt
tokens -> foundation -> primitive -> compound -> layout/pattern -> organism/page
```

Package ownership:

- `@pxds/cx-tokens`: token and generated CSS source of truth.
- `@pxds/cx-icons`: CX icon originals, registry, and icon wrapper.
- `@pxds/cx-components`: CX visual primitives and compounds.
- `@pxds/pxds-layout`: layout primitives, screen layout runtime, and layout compounds.
- `@pxds/pxds-components`: existing WDS/PXDS molecules, global patterns, and legacy compatibility layer.
- `apps/mobile`: page routes and organism assembly. App-specific patterns live here until promoted.

Rule of thumb: if a component needs CX visual styling or Figma component identity, it belongs in `cx-components`; if it describes placement, slots, or screen structure, it belongs in `pxds-layout`; if it is specific to one route family, keep it in app patterns or organisms.

## 2. Component Inventory Table

| Layer | Component | Package | Depends On | Status | Figma Component ID | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| foundation | Icon | cx-components / cx-icons | cx-icons registry | done | icon | `cx-components` re-exports the CX icon wrapper. Icon originals live in `@pxds/cx-icons`. |
| primitive | Text | cx-components | cx-tokens text styles | done | text | Typography primitive. Uses `data-figma-property-variant`. |
| primitive | Button | cx-components | cx-tokens | done | button | Visual button primitive. Uses variant and size bridge properties. |
| primitive | Badge | cx-components | cx-tokens | done | badge | Compact label primitive. Uses type bridge property. |
| primitive | IconButton | cx-components | Icon | done | icon-button | Clickable icon primitive. Uses size, variant, disabled bridge properties. |
| primitive | RadioButton | cx-components | Text | done | radio-button | Form primitive. Uses checked, text, disabled bridge properties. |
| primitive | CheckBox | cx-components | Text | done | checkbox | Code component is `Checkbox`; Figma vocabulary keeps `CheckBox` spelling when discussing source designs. |
| primitive | Divider | cx-components | cx-tokens | done | divider | Visual separator. Uses variant and orientation bridge properties. |
| primitive | StatusBar | cx-components | cx-tokens | done | status-bar | Static mobile status-bar visual component. |
| primitive | TooltipBubble | cx-components | cx-tokens | done | tooltip-bubble | Visual-only tooltip bubble. No trigger/open/close behavior. |
| primitive | SearchBar | cx-components | Text, Icon, IconButton | todo | search-bar | Not implemented in CX package yet. Should stay visual-only until interaction contract is defined. |
| primitive | Accordion | cx-components | Text, Icon | todo | accordion | Not implemented in CX package yet. Needs property mapping before API design. |
| compound | TextField | cx-components | Text | done | text-field | Contains input wrapper and optional action button. Uses state/error/label/help-text/button properties. |
| compound | TitleSection | cx-components | Badge | done | title-section | Section heading component. Left/right item presets are private renderers, not public components. |
| compound | TitleMain | cx-components | Text, TitleSection | todo | title-main | Mentioned as a Figma structure candidate. Keep separate only if Figma source has a standalone reusable component. |
| compound | AppBar | cx-components | Text, Icon, IconButton | done | app-bar | Header compound with title and right-item slots. |
| compound | Popup | cx-components | Text, Button, IconButton | todo | popup | Not implemented. Needs overlay/layout boundary decision before API design. |
| layout | Slot | pxds-layout | VStack | layout-only | - | Layout primitive. Uses `data-figma-render="slot"` and `data-figma-property-name`. |
| layout | PageStackContents | pxds-layout | Slot | done | page-stack-contents | Layout compound for page contents and optional title slot. |
| layout | PageStackList | pxds-layout | Slot, VStack | todo | page-stack-list | Not implemented as a named layout component yet. Track if list page structure repeats. |
| layout | BottomSheet | pxds-layout | WDS primitive | layout-only | bottom-sheet | Existing layout runtime. Uses WDS directly at layout boundary to avoid circular dependency. |
| layout | VStack | pxds-layout | cx-tokens spacing | layout-only | - | Layout primitive. No CX component identity. |
| layout | HStack | pxds-layout | cx-tokens spacing | layout-only | - | Layout primitive. No CX component identity. |
| pattern | ProgressTopBar | pxds-components | layout primitives | done | progress-top-bar | Shared global pattern in `pxds-components`; not a CX base component yet. |
| pattern | ProgressAppBar | apps/mobile | AppBar-like structure | organism-only | mbr-progress-app-bar | MBR-specific temporary pattern. Excluded from bridge standardization for now. |
| organism | MBR organisms | apps/mobile | cx-components, pxds-layout, pxds-components | organism-only | - | Screen-owned DOM assembly. Do not treat as reusable component vocabulary. |

Status is intentionally conservative. `done` means code exists and has a current bridge/layout contract. It does not imply visual parity is final.

## 3. Dependency Graph

```txt
@pxds/cx-tokens
└─ text styles, spacing, radius, semantic colors

@pxds/cx-icons
└─ Icon originals + registry
   └─ Icon
      ├─ IconButton
      ├─ AppBar
      ├─ SearchBar (todo)
      └─ Accordion (todo)

Text
├─ RadioButton
├─ CheckBox
├─ TextField
├─ AppBar
├─ Popup (todo)
└─ TitleMain (todo)

Badge
└─ TitleSection

Button
└─ Popup (todo)

TooltipBubble
└─ future behavior Tooltip content

VStack / HStack / layout primitives
├─ Slot
│  └─ PageStackContents
├─ PageStackList (todo)
└─ BottomSheet

PageStackContents
└─ organism/page assembly

ProgressTopBar
└─ shared global pattern, currently outside CX base vocabulary
```

## 4. Figma Bridge Attribute Contract

The bridge contract is intentionally small. It should be readable in DOM, stable for capture, and independent from Figma display names.

| Attribute | Meaning | Example |
| --- | --- | --- |
| `data-figma-render` | How the Figma bridge should treat this DOM node. | `component`, `layout`, `slot`, `primitive`, `ignore` |
| `data-figma-component-id` | System component id, not Figma display name. | `button`, `text-field`, `title-section` |
| `data-figma-property-*` | Figma component property or variant value. | `data-figma-property-size="large"` |

Render values:

- `component`: design system component instance.
- `layout`: layout wrapper or layout compound.
- `slot`: named slot inside a component or layout.
- `primitive`: bridge-visible DOM primitive inside a component.
- `ignore`: structural wrapper that should not become meaningful Figma output.

Property value conventions:

- Variant/state values use React prop enum values where possible: `primary`, `large`, `default`, `left`.
- Boolean values are normalized as strings: `"true"` or `"false"`.
- Component ids are kebab-case system ids: `button`, `text-field`, `tooltip-bubble`.
- Figma display names such as `Button`, `Tooltip`, or `TitleSection/Default` are not stored in DOM bridge attributes.

Example:

```tsx
<Button
  data-figma-render="component"
  data-figma-component-id="button"
  data-figma-property-variant="primary"
  data-figma-property-size="large"
>
  확인
</Button>
```

Slot example:

```tsx
<div data-figma-render="slot" data-figma-property-name="right-item">
  ...
</div>
```

Current property mapping highlights:

| Component | Bridge properties |
| --- | --- |
| Button | `variant`, `size` |
| Badge | `type` |
| IconButton | `size`, `variant`, `disabled` |
| RadioButton / CheckBox | `checked`, `text`, `disabled` |
| Divider | `variant`, `orientation` |
| Text | `variant` |
| TextField | `state`, `error`, `label`, `help-text`, `button` |
| TooltipBubble | `direction` |
| TitleSection | `sub-title`, `left-item`, `right-item`, internal item type markers |
| PageStackContents | `contents-title` |
| Slot | `name` |

## 5. Layout Contract

Layout components own placement, spacing, stacking, and named slots. They should not own CX visual semantics.

```txt
Slot -> layout primitive
VStack / HStack -> layout primitives
PageStackContents -> layout compound
BottomSheet -> layout runtime
```

Rules:

- `pxds-layout` must not import `@pxds/cx-components`.
- Layout packages may use tokens and layout-safe primitives directly.
- CX components can be passed into layout slots as children, but layout should not know what those children mean.
- Slot names are explicit bridge metadata: `data-figma-render="slot"` and `data-figma-property-name="<slot-name>"`.
- `data-slot` can remain as a non-Figma runtime/debug marker, but the Figma bridge should read `data-figma-*`.
- Page-level components should prefer layout wrappers over route-local margin/padding fixes.

Why layout does not import CX components:

- It prevents circular dependency between visual vocabulary and layout runtime.
- It keeps layout reusable for app screens, previews, and future bridge generation.
- It forces screen assembly to make visual component choices explicitly at the composition boundary.

Slot-based assembly principle:

```tsx
<PageStackContents title={<TitleSection title="타이틀" />}>
  <TextField label="이름" />
</PageStackContents>
```

`PageStackContents` owns the title/content layout. `TitleSection` and `TextField` own visual semantics.

## 6. Status Convention

Use these status values in the inventory table:

- `todo`: known component candidate, not implemented.
- `analyzing`: Figma/code source is being reviewed.
- `designing-api`: component scope and React API are being designed.
- `implementing`: implementation is in progress.
- `done`: component exists and has current package, bridge, and layout contracts.
- `deprecated`: component or route should no longer be used.
- `layout-only`: layout primitive/runtime, not a CX visual component.
- `organism-only`: screen-owned assembly, not reusable vocabulary.

Update policy:

- Update this document in the same PR that adds, promotes, deprecates, or renames a component.
- Keep notes short and operational. Prefer links to component readmes for detailed API usage.
- When a component graduates from app pattern or organism to package component, move its row instead of adding a duplicate.
- If Figma properties are uncertain, mark status as `analyzing` or `designing-api` rather than guessing.
