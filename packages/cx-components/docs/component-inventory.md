# Component Inventory

## 1. Overview

This document is the working inventory for the CX component system. It tracks not only which components exist, but also who owns them, what they depend on, how they map to Figma, and what layout or bridge contract they rely on.

Figma SOT: [SKT_SDUI_Test_0512 / Component base](https://www.figma.com/design/n8pS1Vq9RdYEQ8fygQByhj/SKT_SDUI_Test_0512?node-id=14401-29020&t=wZRehc2DOVV8corW-1)

Package ownership:

- `@pxds/cx-tokens`: token and generated CSS source of truth.
- `@pxds/cx-icons`: CX icon originals, registry, and icon wrapper.
- `@pxds/cx-components`: CX visual primitives and compounds.
- `@pxds/pxds-layout`: layout primitives, screen layout runtime, and layout compounds.
- `@pxds/pxds-components`: existing WDS/PXDS molecules, global patterns, and legacy compatibility layer.
- `apps/mobile`: page routes and organism assembly. App-specific patterns live here until promoted.

Rule of thumb: if a component needs CX visual styling or Figma component identity, it belongs in `cx-components`; if it describes placement, slots, or screen structure, it belongs in `pxds-layout`; if it is specific to one route family, keep it in app patterns or organisms.

## 2. Component Inventory Table

| Component | Status | Implementation Target | Figma Source | Dependencies | Variants | Properties | Detail |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ProgressAppBar | 없음 | apps/mobile | mbr-progress-app-bar | 없음 | 없음 | 없음 | [문서](components/base/mbr-progress-app-bar.md) |
| Accordion | 제작 예정 | cx-components | accordion | Icon, Text | State: Close/Open | `data-figma-property-txt`: slot; `data-figma-property-left-text`: boolean | [문서](components/base/accordion.md) |
| AppBar | 제작 완료 | cx-components | app-bar | Icon, Text, IconButton | RightItem: On/Off; Title: On/Off; LeftItem: On/Off; Logo: Off/On | 없음 | [문서](components/base/app-bar.md) |
| Badge | 제작 완료 | cx-components | badge | 없음 | Type: Gray/Blue/Black | `data-figma-property-text`: text | [문서](components/base/badge.md) |
| Button | 제작 완료 | cx-components | button | ActionButton.LeftItem | Size: Small/Medium/Large/XLarge; Type: Primary/Secondary/Disabled | `data-figma-property-left-item`: boolean | [문서](components/base/button.md) |
| CheckBox | 제작 완료 | cx-components | checkbox | Text | Checked: Off/On; Text: Off/On; Disabled: Off/On | 없음 | [문서](components/base/checkbox.md) |
| Divider | 제작 완료 | cx-components | divider | 없음 | Type: Contents/Section | 없음 | [문서](components/base/divider.md) |
| IconButton | 제작 완료 | cx-components | icon-button | Icon | 없음 | 없음 | [문서](components/base/icon-button.md) |
| Popup | 제작 예정 | cx-components | popup | Button, PopupActionButton, Text, IconButton | 없음 | `data-figma-property-contents`: slot; `data-figma-property-show-contents`: boolean; `data-figma-property-show-sub-text`: boolean | [문서](components/base/popup.md) |
| RadioButton | 제작 완료 | cx-components | radio-button | Text | Checked: On/Off; Text: Off/On; Disabled: Off/On | 없음 | [문서](components/base/radio-button.md) |
| SearchBar | 제작 예정 | cx-components | search-bar | Icon, Text, IconButton | type: LLM/search | 없음 | [문서](components/base/search-bar.md) |
| StatusBar | 제작 완료 | cx-components | status-bar | _StatusBar-time | State: Default | 없음 | [문서](components/base/status-bar.md) |
| Text | 제작 완료 | cx-components | text | 없음 | 없음 | 없음 | [문서](components/base/text.md) |
| TextField | 제작 완료 | cx-components | text-field | Text; Button | States: Default/Disabled/Focused/Typed/Typing; Error: on/off; Button: off/on | `data-figma-property-state`: default/focused/typing/typed/disabled; `data-figma-property-error`: true/false; `data-figma-property-label`: true/false; `data-figma-property-help-text`: true/false; `data-figma-property-button`: true/false | [문서](components/base/text-field.md) |
| TitleMain | 제작 예정 | cx-components | title-main | Image, Indicator, Text, TitleSection | Type: Complete/Search | `data-figma-property-show-title-sub-text`: boolean; `data-figma-property-show-title-sub-text-image`: boolean; `data-figma-property-indicator`: boolean | [문서](components/base/title-main.md) |
| TitleSection | 제작 완료 | cx-components | title-section | Icon, TitleSection.LeftItem, TitleSection.RightItem, Badge | 없음 | `data-figma-property-sub-title`: boolean; `data-figma-property-left-item`: boolean; `data-figma-property-right-item`: boolean | [문서](components/base/title-section.md) |
| TooltipBubble | 제작 완료 | cx-components | tooltip-bubble | 없음 | 없음 | 없음 | [문서](components/base/tooltip-bubble.md) |
| Icon | 제작 완료 | cx-components / cx-icons | icon | 없음 | Size: 24/20/16/32/40/12; Type: Close/ArrowLeft/Menu/Shop/Barcode/Home/AiSearch/Info/FamilyData/DataShare/Payment/Calender/RatePlan/All/ArrowUp/ArrowDown/ArrowRight/Plus/Terminal/MobilePlan/Benefit/Subscribe/youtube/netflix/TU/TW/money/percent/data/Logo/point/Voice/search/history/call/Point/Device/Content/Bill/Data/Family/Dropdown/Download/Bubble/Heart | 없음 | [문서](components/base/icon.md) |
| AccordionList | 제작 예정 | cx-components candidate | accordion-list | Accordion, Divider, Icon | 없음 | 없음 | [문서](components/base/accordion-list.md) |
| ActionButton | 제작 예정 | cx-components candidate | action-button | Button, ActionButton.LeftItem, Tooltip, Icon, Text | Type: Default/Ai/Gift; Button: 1/2 | `data-figma-property-show-text`: boolean; `data-figma-property-show-tooltip`: boolean | [문서](components/base/action-button.md) |
| BadgeIcon | 제작 예정 | cx-components candidate | badge-icon | Icon, Badge | Subtext: Off/On | 없음 | [문서](components/base/badge-icon.md) |
| BannerHorizontal | 제작 예정 | cx-components candidate | banner-horizontal | Indicator, Text, Icon, Button | 없음 | `data-figma-property-indicator`: boolean | [문서](components/base/banner-horizontal.md) |
| BottomNavigation | 제작 예정 | cx-components candidate | bottom-navigation | Icon, Text | State: My/Search/Shopping | 없음 | [문서](components/base/bottom-navigation.md) |
| ButtonListOrder | 제작 완료 | cx-components candidate | button-list-order | Icon | 없음 | 없음 | [문서](components/base/button-list-order.md) |
| ButtonTextUnderline | 제작 완료 | cx-components candidate | button-text-underline | 없음 | 없음 | 없음 | [문서](components/base/button-text-underline.md) |
| ButtonXsmallSolid | 제작 완료 | cx-components candidate | button-xsmall-solid | Icon, Button | State: Active/Disabled | 없음 | [문서](components/base/button-xsmall-solid.md) |
| Callout | 제작 예정 | cx-components candidate | callout | Text, Icon | Property 1: Default | `data-figma-property-title`: boolean | [문서](components/base/callout.md) |
| ChipItem | 제작 완료 | cx-components candidate | chip-item | Text | Selected: Off/On | 없음 | [문서](components/base/chip-item.md) |
| Chips | 제작 예정 | cx-components candidate | chips | ChipItem | 없음 | 없음 | [문서](components/base/chips.md) |
| FilterSorting | 제작 예정 | cx-components candidate | filter-sorting | ButtonListOrder, Divider, Icon | 없음 | `data-figma-property-divider`: boolean | [문서](components/base/filter-sorting.md) |
| Footer | 제작 예정 | cx-components candidate | footer | Text, Button | Type: 01/02 | 없음 | [문서](components/base/footer.md) |
| Handle | 제작 완료 | cx-components candidate | handle | 없음 | state: Default/off | `data-figma-property-show-handle`: boolean | [문서](components/base/handle.md) |
| Indicator | 제작 완료 | cx-components candidate | indicator | 없음 | 없음 | 없음 | [문서](components/base/indicator.md) |
| ListSelected | 제작 예정 | cx-components candidate | list-selected | ButtonXsmallSolid, CheckBox, Icon, ListSelectedRightItem, RadioButton, Text | type: Radio/Checkbox | `data-figma-property-show-list-selected-right-item`: boolean; `data-figma-property-show-sub-text`: boolean | [문서](components/base/list-selected.md) |
| ListText | 제작 예정 | cx-components candidate | list-text | Icon, ListText.RightItem, Text, Divider | Table: off/on | `data-figma-property-right-item`: boolean | [문서](components/base/list-text.md) |
| SectionItem_이친구를복붙하세요 | 제작 예정 | cx-components candidate | section-item | TitleSection, Text, Badge | Type: Card 0/Default 20 | `data-figma-property-contents`: slot | [문서](components/base/section-item.md) |
| Tab | 제작 예정 | cx-components candidate | tab | TabItem | 없음 | 없음 | [문서](components/base/tab.md) |
| TabItem | 제작 완료 | cx-components candidate | tab-item | Text | State: Default/Selected | 없음 | [문서](components/base/tab-item.md) |
| TextButton | 제작 예정 | cx-components candidate | text-button | Text | Property 1: Default/Variant2 | 없음 | [문서](components/base/text-button.md) |
| TitleBottomSheet | 제작 완료 | cx-components candidate | title-bottom-sheet | Icon | 없음 | `data-figma-property-show-title-text`: boolean; `data-figma-property-show-title-button`: boolean; `data-figma-property-show-sub-text`: boolean; `data-figma-property-show-sub-text-2`: boolean; `data-figma-property-show-title`: boolean | [문서](components/base/title-bottom-sheet.md) |
| TitleContents | 제작 예정 | cx-components candidate | title-contents | Icon, TitleContents.RightItem | 없음 | `data-figma-property-show-button`: boolean | [문서](components/base/title-contents.md) |
| Tooltip | 제작 예정 | cx-components candidate | tooltip | TooltipBubble | Direction: Left/Center/Right | 없음 | [문서](components/base/tooltip.md) |
| UnderlineTab | 제작 예정 | cx-components candidate | underline-tab | Text | State: 01/02 | 없음 | [문서](components/base/underline-tab.md) |
| ActionButton.LeftItem | 제작 완료 | cx-components private | action-button-left-item | Icon | Type: Ai+Gift/Ai | 없음 | [문서](components/base/action-button-left-item.md) |
| ListSelectedRightItem | 제작 완료 | cx-components private | list-selected-right-item | ButtonXsmallSolid, Icon, TitleSection.RightItem, IconButton, Text | Type: ButtonXsmallSolid/Icon/TextButton | 없음 | [문서](components/base/list-selected-right-item.md) |
| ListText.RightItem | 제작 완료 | cx-components private | list-text-right-item | Icon, Text, IconButton, Badge | Type: Text/BadgeLevel/TextButton/Icon | 없음 | [문서](components/base/list-text-right-item.md) |
| PopupActionButton | 제작 완료 | cx-components private | popup-action-button | Button | Options: 2Buttons/1Button | 없음 | [문서](components/base/popup-action-button.md) |
| TitleContents.RightItem | 제작 완료 | cx-components private | title-contents-right-item | Button, Icon, IconButton | Type: Icon/Button/Type3 | 없음 | [문서](components/base/title-contents-right-item.md) |
| TitleSection.LeftItem | 제작 완료 | cx-components private | title-section-left-item | Badge, Icon, Text | Type: Text/Icon/Badge | 없음 | [문서](components/base/title-section-left-item.md) |
| TitleSection.RightItem | 제작 완료 | cx-components private | title-section-right-item | ButtonListOrder, Icon, IconButton, Button, Text | Type: Icon/TextButton/TextItemButton/ButtonListOrder | 없음 | [문서](components/base/title-section-right-item.md) |
| ProgressTopBar | 제작 완료 | pxds-components | progress-top-bar | 없음 | 없음 | 없음 | [문서](components/base/progress-top-bar.md) |
| BottomSheet | 없음 | pxds-layout | bottom-sheet | 없음 | 없음 | 없음 | [문서](components/base/bottom-sheet.md) |
| Bottomsheet | 제작 예정 | pxds-layout | bottomsheet | ActionButton, Button, Handle, Icon, ActionButton.LeftItem, TitleBottomSheet, Tooltip, BottomSheet | ActionButton: on/off | `data-figma-property-con`: slot; `data-figma-property-show-title-bottom-sheet`: boolean | [문서](components/base/bottomsheet.md) |
| PageStackContents | 제작 완료 | pxds-layout | page-stack-contents | Icon, TitleSection.LeftItem, TitleSection.RightItem, SectionItem_이친구를복붙하세요, TitleSection/Default, Slot | 없음 | `data-figma-property-title-type`: instance swap; `data-figma-property-contents-slot`: slot; `data-figma-property-contents-title`: boolean; `data-figma-property-title-swap`: instance swap | [문서](components/base/page-stack-contents.md) |
| PageStackList | 제작 예정 | pxds-layout | page-stack-list | Icon, TitleSection.LeftItem, TitleSection.RightItem, SectionItem_이친구를복붙하세요, TitleSection/Default, Slot, VStack | 없음 | `data-figma-property-contents-slot`: slot; `data-figma-property-contents-title`: boolean | [문서](components/base/page-stack-list.md) |

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
TextField -> Text, Button
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
Image
TitleSection/Default
Slot
VStack
```

## 4. Suggested Implementation Order

This order is derived from the normalized dependency graph. It is a production guide for remaining `제작 예정` items, not a request to rebuild components that are already `제작 완료`.

Rules:

- Build lower-level dependencies before compounds that consume them.
- Keep usage-scoped `LeftItem` / `RightItem` parts private unless multiple public APIs need them.
- Treat `Slot`, `VStack`, `HStack`, and existing layout primitives as already available layout vocabulary.
- `ProgressAppBar` is app-owned and should not block the CX base component sequence.

### Phase 0. Existing foundation to reuse

These are already available or already tracked as existing foundations. New components should consume them instead of recreating local UI.

```txt
Text
Icon
Badge
Divider
Button
IconButton
CheckBox
RadioButton
TooltipBubble
TextField
AppBar
TitleSection
StatusBar
ProgressTopBar
BottomSheet
PageStackContents
```

### Phase 1. Independent base candidates

Start with components that have no component dependency or only depend on already available foundations.

| Order | Component | Why first |
| --- | --- | --- |
| 1 | Indicator | Used by `BannerHorizontal` and `TitleMain`. |
| 2 | Handle | Used by `Bottomsheet`. |
| 3 | ButtonTextUnderline | Independent text-button treatment. |
| 4 | ChipItem | Needed by `Chips`. Depends only on `Text`. |
| 5 | TabItem | Needed by `Tab`. Depends only on `Text`. |
| 6 | ButtonListOrder | Needed by `FilterSorting` and `TitleSection.RightItem`. Depends only on `Icon`. |
| 7 | ActionButton.LeftItem | Needed by `ActionButton`. Depends only on `Icon`. |
| 8 | PopupActionButton | Needed by `Popup`. Depends on `Button`. |
| 9 | TitleBottomSheet | Needed by `Bottomsheet`. Depends only on `Icon`. |

### Phase 2. Private scoped item sets

Build scoped item sets after their primitive dependencies exist. These should remain implementation details unless a public API needs them.

| Order | Component | Depends on |
| --- | --- | --- |
| 10 | TitleSection.LeftItem | Badge, Icon, Text |
| 11 | TitleSection.RightItem | ButtonListOrder, Icon, IconButton, Button, Text |
| 12 | TitleContents.RightItem | Button, Icon, IconButton |
| 13 | ListText.RightItem | Icon, Text, IconButton, Badge |
| 14 | ButtonXsmallSolid | Icon, Button |
| 15 | ListSelectedRightItem | ButtonXsmallSolid, Icon, TitleSection.RightItem, IconButton, Text |

### Phase 3. Simple public compounds

These can be implemented once foundations and scoped item sets are ready.

| Order | Component | Depends on |
| --- | --- | --- |
| 16 | Accordion | Icon, Text |
| 17 | SearchBar | Icon, Text, IconButton |
| 18 | Callout | Text, Icon |
| 19 | Footer | Text, Button |
| 20 | BadgeIcon | Icon, Badge |
| 21 | BottomNavigation | Icon, Text |
| 22 | TextButton | Text |
| 23 | UnderlineTab | Text |
| 24 | Tooltip | TooltipBubble |

### Phase 4. Repeated list and section compounds

These compose Phase 1-3 components and should come after the smaller pieces are stable.

| Order | Component | Depends on |
| --- | --- | --- |
| 25 | AccordionList | Accordion, Divider, Icon |
| 26 | Chips | ChipItem |
| 27 | FilterSorting | ButtonListOrder, Divider, Icon |
| 28 | Tab | TabItem |
| 29 | TitleContents | Icon, TitleContents.RightItem |
| 30 | ListText | Icon, ListText.RightItem, Text, Divider |
| 31 | ListSelected | ButtonXsmallSolid, CheckBox, Icon, ListSelectedRightItem, RadioButton, Text |
| 32 | SectionItem_이친구를복붙하세요 | TitleSection, Text, Badge |

### Phase 5. High-level compounds and layout-facing components

These sit closest to screen composition. Implement after the dependency surface is stable.

| Order | Component | Depends on |
| --- | --- | --- |
| 33 | ActionButton | Button, ActionButton.LeftItem, Tooltip, Icon, Text |
| 34 | Popup | Button, PopupActionButton, Text, IconButton |
| 35 | BannerHorizontal | Indicator, Text, Icon, Button |
| 36 | TitleMain | Image, Indicator, Text, TitleSection |
| 37 | Bottomsheet | ActionButton, Button, Handle, Icon, ActionButton.LeftItem, TitleBottomSheet, Tooltip, BottomSheet |
| 38 | PageStackList | Icon, TitleSection.LeftItem, TitleSection.RightItem, SectionItem_이친구를복붙하세요, TitleSection/Default, Slot, VStack |

Implementation notes:

- `Button` is already implemented. Although Figma exposes `ActionButton.LeftItem` near button-related structures, future work should not make `Button` wait on `ActionButton.LeftItem`.
- `Image` is currently an external/lower-level dependency. Confirm whether it is a CX component, asset slot, or plain media slot before implementing `TitleMain`.
- `SectionItem_이친구를복붙하세요` should be renamed or normalized before becoming public API.
- `Bottomsheet` should map to existing `BottomSheet` naming unless the visual content wrapper needs a separate compound.

## 5. Figma Bridge Attribute Contract

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

## 6. Layout Contract

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

## 7. Status Convention

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
