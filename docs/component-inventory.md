# Component Inventory

## 1. Overview

This document is the working inventory for the CX component system. It tracks not only which components exist, but also who owns them, what they depend on, how they map to Figma, and what layout or bridge contract they rely on.

Package ownership:

- `@pxds/cx-tokens`: token and generated CSS source of truth.
- `@pxds/cx-icons`: CX icon originals, registry, and icon wrapper.
- `@pxds/cx-components`: CX visual primitives and compounds.
- `@pxds/pxds-layout`: layout primitives, screen layout runtime, and layout compounds.
- `@pxds/pxds-components`: existing WDS/PXDS molecules, global patterns, and legacy compatibility layer.
- `apps/mobile`: page routes and organism assembly. App-specific patterns live here until promoted.

Rule of thumb: if a component needs CX visual styling or Figma component identity, it belongs in `cx-components`; if it describes placement, slots, or screen structure, it belongs in `pxds-layout`; if it is specific to one route family, keep it in app patterns or organisms.

## 2. Component Inventory Table

| Component | Status | Implementation Target | Figma Source | Dependencies | Variants | Properties | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ProgressAppBar | 없음 | apps/mobile | mbr-progress-app-bar | 없음 | 없음 | 없음 | MBR-specific temporary pattern. Excluded from bridge standardization for now. |
| Accordion | 제작 예정 | cx-components | accordion | Icon, Text | State: Close/Open | `data-figma-property-txt`: slot; `data-figma-property-left-text`: boolean | Not implemented in CX package yet. Needs property mapping before API design. |
| AppBar | 제작 완료 | cx-components | app-bar | Icon, Text, IconButton | RightItem: On/Off; Title: On/Off; LeftItem: On/Off; Logo: Off/On | 없음 | Header compound with title and right-item slots. |
| Badge | 제작 완료 | cx-components | badge | 없음 | Type: Gray/Blue/Black | `data-figma-property-text`: text | Compact label primitive. Uses type bridge property. |
| Button | 제작 완료 | cx-components | button | ActionButton.LeftItem | Size: Small/Medium/Large/XLarge; Type: Primary/Secondary/Disabled | `data-figma-property-left-item`: boolean | Visual button primitive. Uses variant and size bridge properties. |
| CheckBox | 제작 완료 | cx-components | checkbox | Text | Checked: Off/On; Text: Off/On; Disabled: Off/On | 없음 | Code component is `Checkbox`; Figma vocabulary keeps `CheckBox` spelling when discussing source designs. |
| Divider | 제작 완료 | cx-components | divider | 없음 | Type: Contents/Section | 없음 | Visual separator. Uses variant and orientation bridge properties. |
| IconButton | 제작 완료 | cx-components | icon-button | Icon | 없음 | 없음 | Clickable icon primitive. Uses size, variant, disabled bridge properties. |
| Popup | 제작 예정 | cx-components | popup | Button, PopupActionButton, Text, IconButton | 없음 | `data-figma-property-contents`: slot; `data-figma-property-show-contents`: boolean; `data-figma-property-show-sub-text`: boolean | Not implemented. Needs overlay/layout boundary decision before API design. |
| RadioButton | 제작 완료 | cx-components | radio-button | Text | Checked: On/Off; Text: Off/On; Disabled: Off/On | 없음 | Form primitive. Uses checked, text, disabled bridge properties. |
| SearchBar | 제작 예정 | cx-components | search-bar | Icon, Text, IconButton | type: LLM/search | 없음 | Not implemented in CX package yet. Should stay visual-only until interaction contract is defined. |
| StatusBar | 제작 완료 | cx-components | status-bar | _StatusBar-time | State: Default | 없음 | Static mobile status-bar visual component. |
| Text | 제작 완료 | cx-components | text | 없음 | 없음 | 없음 | Typography primitive. Uses `data-figma-property-variant`. |
| TextField | 제작 완료 | cx-components | text-field | Caret, Label, TextFieldDefault, TextFieldDisabled, TextFieldFocused, TextFieldTyped, TextFieldTyping, Text | States: Default/Disabled/Focused/Typed/Typing; Error: on/off; Label: on; HelpText: on | `data-figma-property-show-label`: boolean; `data-figma-property-help-text`: boolean | Contains input wrapper and optional action button. Uses state/error/label/help-text/button properties. |
| TitleMain | 제작 예정 | cx-components | title-main | Image, Indicator, Text, TitleSection | Type: Complete/Search | `data-figma-property-show-title-sub-text`: boolean; `data-figma-property-show-title-sub-text-image`: boolean; `data-figma-property-indicator`: boolean | Mentioned as a Figma structure candidate. Keep separate only if Figma source has a standalone reusable component. |
| TitleSection | 제작 완료 | cx-components | title-section | Icon, TitleSection.LeftItem, TitleSection.RightItem, Badge | 없음 | `data-figma-property-sub-title`: boolean; `data-figma-property-left-item`: boolean; `data-figma-property-right-item`: boolean | Section heading component. Left/right item presets are private renderers, not public components. |
| TooltipBubble | 제작 완료 | cx-components | tooltip-bubble | 없음 | 없음 | 없음 | Visual-only tooltip bubble. No trigger/open/close behavior. |
| Icon | 제작 완료 | cx-components / cx-icons | icon | 없음 | Size: 24/20/16/32/40/12; Type: Close/ArrowLeft/Menu/Shop/Barcode/Home/AiSearch/Info/FamilyData/DataShare/Payment/Calender/RatePlan/All/ArrowUp/ArrowDown/ArrowRight/Plus/Terminal/MobilePlan/Benefit/Subscribe/youtube/netflix/TU/TW/money/percent/data/Logo/point/Voice/search/history/call/Point/Device/Content/Bill/Data/Family/Dropdown/Download/Bubble/Heart | 없음 | `cx-components` re-exports the CX icon wrapper. Icon originals live in `@pxds/cx-icons`. |
| AccordionList | 제작 예정 | cx-components candidate | accordion-list | Accordion, Divider, Icon | 없음 | 없음 | Figma component from `Component / base`; composed list of Accordion rows and dividers. |
| ActionButton | 제작 예정 | cx-components candidate | action-button | Button, ActionButton.LeftItem, Tooltip, Icon, Text | Type: Default/Ai/Gift; Button: 1/2 | `data-figma-property-show-text`: boolean; `data-figma-property-show-tooltip`: boolean | Figma component set from `Component / base`; Default/Ai/Gift action row/button treatment. |
| BadgeIcon | 제작 예정 | cx-components candidate | badge-icon | Icon, Badge | Subtext: Off/On | 없음 | Figma component set from `Component / base`; supports subtext on/off. |
| BannerHorizontal | 제작 예정 | cx-components candidate | banner-horizontal | Indicator, Text, Icon, Button | 없음 | `data-figma-property-indicator`: boolean | Figma component from `Component / base`; listed as `Banner` category in the source section. |
| BottomNavigation | 제작 예정 | cx-components candidate | bottom-navigation | Icon, Text | State: My/Search/Shopping | 없음 | Figma component set from `Component / base`; may stay app-shell/navigation rather than generic CX primitive. |
| ButtonListOrder | 제작 예정 | cx-components candidate | button-list-order | Icon | 없음 | 없음 | Figma component from `Component / base`; used by FilterSorting and right-item variants. |
| ButtonTextUnderline | 제작 예정 | cx-components candidate | button-text-underline | 없음 | 없음 | 없음 | Figma component from `Component / base`; underlined text button treatment. |
| ButtonXsmallSolid | 제작 예정 | cx-components candidate | button-xsmall-solid | Icon, Button | State: Active/Disabled | 없음 | Figma component set from `Component / base`. Decide whether this is a Button size/variant or a separate compact action primitive. |
| Callout | 제작 예정 | cx-components candidate | callout | Text, Icon | Property 1: Default | `data-figma-property-title`: boolean | Figma component set from `Component / base`; simple informational callout. |
| ChipItem | 제작 예정 | cx-components candidate | chip-item | Text | Selected: Off/On | 없음 | Figma component set from `Component / base`; selected on/off item. |
| Chips | 제작 예정 | cx-components candidate | chips | ChipItem | 없음 | 없음 | Figma component from `Component / base`; composed chip row/list. |
| FilterSorting | 제작 예정 | cx-components candidate | filter-sorting | ButtonListOrder, Divider, Icon | 없음 | `data-figma-property-divider`: boolean | Figma component from `Component / base`; sorting/filter control composition. |
| Footer | 제작 예정 | cx-components candidate | footer | Text, Button | Type: 01/02 | 없음 | Figma component set from `Component / base`; Type 01/02 variants. |
| Handle | 제작 예정 | cx-components candidate | handle | 없음 | state: Default/off | `data-figma-property-show-handle`: boolean | Figma component set from `Component / base`; likely bottom-sheet/list drag handle primitive. |
| Indicator | 제작 예정 | cx-components candidate | indicator | 없음 | 없음 | 없음 | Figma component from `Component / base`; used by BannerHorizontal and TitleMain. |
| ListSelected | 제작 예정 | cx-components candidate | list-selected | ButtonXsmallSolid, CheckBox, Icon, ListSelectedRightItem, RadioButton, Text | type: Radio/Checkbox | `data-figma-property-show-list-selected-right-item`: boolean; `data-figma-property-show-sub-text`: boolean | Figma component set from `Component / base`; selection-list row with radio/checkbox variants. |
| ListText | 제작 예정 | cx-components candidate | list-text | Icon, ListText.RightItem, Text, Divider | Table: off/on | `data-figma-property-right-item`: boolean | Figma component set from `Component / base`; table on/off variants. |
| SectionItem_이친구를복붙하세요 | 제작 예정 | cx-components candidate | section-item | TitleSection, Text, Badge | Type: Card 0/Default 20 | `data-figma-property-contents`: slot | Figma component set from `Component / base`; name suggests authoring helper/copy source, so confirm public vocabulary name before implementation. |
| Tab | 제작 예정 | cx-components candidate | tab | TabItem | 없음 | 없음 | Figma component from `Component / base`; composed from TabItem instances. |
| TabItem | 제작 예정 | cx-components candidate | tab-item | Text | State: Default/Selected | 없음 | Figma component set from `Component / base`; selected/default item. |
| TextButton | 제작 예정 | cx-components candidate | text-button | Text | Property 1: Default/Variant2 | 없음 | Figma component set from `Component / base`; confirm relationship to Button before adding public API. |
| TextFieldDefault | 제작 예정 | cx-components candidate | text-field-default | Button, TextField | Button: off/on | 없음 | Figma component set from `Component / base`; state-specific TextField set with button on/off. Prefer folding into TextField API if possible. |
| TextFieldDisabled | 제작 예정 | cx-components candidate | text-field-disabled | Button, TextField | Button: off/on | 없음 | Figma component set from `Component / base`; state-specific TextField set with button on/off. Prefer folding into TextField API if possible. |
| TextFieldFocused | 제작 예정 | cx-components candidate | text-field-focused | Button, TextField | Button: off/on | 없음 | Figma component set from `Component / base`; state-specific TextField set with button on/off. Prefer folding into TextField API if possible. |
| TextFieldTyped | 제작 예정 | cx-components candidate | text-field-typed | Button, TextField | Button: off/on | 없음 | Figma component set from `Component / base`; state-specific TextField set with button on/off. Prefer folding into TextField API if possible. |
| TextFieldTyping | 제작 예정 | cx-components candidate | text-field-typing | Button, Caret, TextField | Button: off/on | 없음 | Figma component set from `Component / base`; state-specific TextField set with button on/off. Prefer folding into TextField API if possible. |
| TitleBottomSheet | 제작 예정 | cx-components candidate | title-bottom-sheet | Icon | 없음 | `data-figma-property-show-title-text`: boolean; `data-figma-property-show-title-button`: boolean; `data-figma-property-show-sub-text`: boolean; `data-figma-property-show-sub-text-2`: boolean; `data-figma-property-show-title`: boolean | Figma component from `Component / base`; title/header content for Bottomsheet. |
| TitleContents | 제작 예정 | cx-components candidate | title-contents | Icon, TitleContents.RightItem | 없음 | `data-figma-property-show-button`: boolean | Figma component from `Component / base`; uses scoped `TitleContents.RightItem`. |
| Tooltip | 제작 예정 | cx-components candidate | tooltip | TooltipBubble | Direction: Left/Center/Right | 없음 | Figma component set from `Component / base`; direction variants should map to TooltipBubble unless behavior expands. |
| UnderlineTab | 제작 예정 | cx-components candidate | underline-tab | Text | State: 01/02 | 없음 | Figma component set from `Component / base`; tab indicator/tab state component. |
| ActionButton.LeftItem | 제작 예정 | cx-components private | action-button-left-item | Icon | Type: Ai+Gift/Ai | 없음 | Usage-scoped name for the Figma `LeftItem` set used inside `ActionButton`; also appears reused in Bottomsheet/Button examples. |
| ListSelectedRightItem | 제작 예정 | cx-components private | list-selected-right-item | ButtonXsmallSolid, Icon, TitleSection.RightItem, IconButton, Text | Type: ButtonXsmallSolid/Icon/TextButton | 없음 | Figma component set from `Component / base`; right-side affordance for ListSelected. |
| ListText.RightItem | 제작 예정 | cx-components private | list-text-right-item | Icon, Text, IconButton, Badge | Type: Text/BadgeLevel/TextButton/Icon | 없음 | Usage-scoped name for the Figma `RightItem` set used by `ListText`. |
| PopupActionButton | 제작 예정 | cx-components private | popup-action-button | Button | Options: 2Buttons/1Button | 없음 | Figma component set from `Component / base`; likely internal action area for Popup. |
| TitleContents.RightItem | 제작 예정 | cx-components private | title-contents-right-item | Button, Icon, IconButton | Type: Icon/Button/Type3 | 없음 | Usage-scoped name for the Figma `RightItem` set used by `TitleContents`. |
| TitleSection.LeftItem | 제작 예정 | cx-components private | title-section-left-item | Badge, Icon, Text | Type: Text/Icon/Badge | 없음 | Figma source has `LeftItem` as a standalone set; usage traces to TitleSection/PageStack title contexts. Keep private unless cross-component API needs it. |
| TitleSection.RightItem | 제작 예정 | cx-components private | title-section-right-item | ButtonListOrder, Icon, IconButton, Button, Text | Type: Icon/TextButton/TextItemButton/ButtonListOrder | 없음 | Figma source has `RightItem` as a standalone set; usage traces to TitleSection/PageStack title contexts. Keep private unless cross-component API needs it. |
| ProgressTopBar | 제작 완료 | pxds-components | progress-top-bar | 없음 | 없음 | 없음 | Shared global pattern in `pxds-components`; not a CX base component yet. |
| BottomSheet | 없음 | pxds-layout | bottom-sheet | 없음 | 없음 | 없음 | Existing layout runtime. Uses WDS directly at layout boundary to avoid circular dependency. |
| Bottomsheet | 제작 예정 | pxds-layout | bottomsheet | ActionButton, Button, Handle, Icon, ActionButton.LeftItem, TitleBottomSheet, Tooltip, BottomSheet | ActionButton: on/off | `data-figma-property-con`: slot; `data-figma-property-show-title-bottom-sheet`: boolean | Figma component set spelling is `Bottomsheet`; map to code `BottomSheet` unless the visual content wrapper needs a separate compound. |
| PageStackContents | 제작 완료 | pxds-layout | page-stack-contents | Icon, TitleSection.LeftItem, TitleSection.RightItem, SectionItem_이친구를복붙하세요, TitleSection/Default, Slot | 없음 | `data-figma-property-title-type`: instance swap; `data-figma-property-contents-slot`: slot; `data-figma-property-contents-title`: boolean; `data-figma-property-title-swap`: instance swap | Layout compound for page contents and optional title slot. |
| PageStackList | 제작 예정 | pxds-layout | page-stack-list | Icon, TitleSection.LeftItem, TitleSection.RightItem, SectionItem_이친구를복붙하세요, TitleSection/Default, Slot, VStack | 없음 | `data-figma-property-contents-slot`: slot; `data-figma-property-contents-title`: boolean | Not implemented as a named layout component yet. Track if list page structure repeats. |

Status는 Figma/component 제작 상태만 네 단계로 기록한다: `검수 완료`, `제작 완료`, `제작 예정`, `없음`.

## 3. Dependency Graph

This graph follows the normalized `Dependencies` column above. The arrow means the left component contains, composes, or otherwise depends on the right component.

```txt
Accordion -> Icon, Text
AppBar -> Icon, Text, IconButton
Button -> ActionButton.LeftItem
CheckBox -> Text
IconButton -> Icon
Popup -> Button, PopupActionButton, Text, IconButton
RadioButton -> Text
SearchBar -> Icon, Text, IconButton
StatusBar -> _StatusBar-time
TextField -> Caret, Label, TextFieldDefault, TextFieldDisabled, TextFieldFocused, TextFieldTyped, TextFieldTyping, Text
TitleMain -> Image, Indicator, Text, TitleSection
TitleSection -> Icon, TitleSection.LeftItem, TitleSection.RightItem, Badge
AccordionList -> Accordion, Divider, Icon
ActionButton -> Button, ActionButton.LeftItem, Tooltip, Icon, Text
BadgeIcon -> Icon, Badge
BannerHorizontal -> Indicator, Text, Icon, Button
BottomNavigation -> Icon, Text
ButtonListOrder -> Icon
ButtonXsmallSolid -> Icon, Button
Callout -> Text, Icon
ChipItem -> Text
Chips -> ChipItem
FilterSorting -> ButtonListOrder, Divider, Icon
Footer -> Text, Button
ListSelected -> ButtonXsmallSolid, CheckBox, Icon, ListSelectedRightItem, RadioButton, Text
ListText -> Icon, ListText.RightItem, Text, Divider
SectionItem_이친구를복붙하세요 -> TitleSection, Text, Badge
Tab -> TabItem
TabItem -> Text
TextButton -> Text
TextFieldDefault -> Button, TextField
TextFieldDisabled -> Button, TextField
TextFieldFocused -> Button, TextField
TextFieldTyped -> Button, TextField
TextFieldTyping -> Button, Caret, TextField
TitleBottomSheet -> Icon
TitleContents -> Icon, TitleContents.RightItem
Tooltip -> TooltipBubble
UnderlineTab -> Text
ActionButton.LeftItem -> Icon
ListSelectedRightItem -> ButtonXsmallSolid, Icon, TitleSection.RightItem, IconButton, Text
ListText.RightItem -> Icon, Text, IconButton, Badge
PopupActionButton -> Button
TitleContents.RightItem -> Button, Icon, IconButton
TitleSection.LeftItem -> Badge, Icon, Text
TitleSection.RightItem -> ButtonListOrder, Icon, IconButton, Button, Text
Bottomsheet -> ActionButton, Button, Handle, Icon, ActionButton.LeftItem, TitleBottomSheet, Tooltip, BottomSheet
PageStackContents -> Icon, TitleSection.LeftItem, TitleSection.RightItem, SectionItem_이친구를복붙하세요, TitleSection/Default, Slot
PageStackList -> Icon, TitleSection.LeftItem, TitleSection.RightItem, SectionItem_이친구를복붙하세요, TitleSection/Default, Slot, VStack
```

Components with no component dependency:

```txt
ProgressAppBar
Badge
Divider
Text
TooltipBubble
Icon
ButtonTextUnderline
Handle
Indicator
ProgressTopBar
BottomSheet
```

External or lower-level dependencies detected in Figma but not currently listed as primary inventory components:

```txt
_StatusBar-time
Caret
Label
Image
TitleSection/Default
Slot
VStack
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

- `검수 완료`: implementation and Figma/component mapping have been reviewed and accepted.
- `제작 완료`: implementation or component source exists, but final review/parity may still be pending.
- `제작 예정`: known component candidate that still needs implementation, mapping, or API decisions.
- `없음`: not a component production target, such as layout-only helpers or organism-owned assembly.

Update policy:

- Update this document in the same PR that adds, promotes, deprecates, or renames a component.
- Keep notes short and operational. Prefer links to component readmes for detailed API usage.
- When a component graduates from app pattern or organism to package component, move its row instead of adding a duplicate.
- If Figma properties are uncertain, mark status as `analyzing` or `designing-api` rather than guessing.
