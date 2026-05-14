# SearchBar

Search entry affordance for search and LLM entry points. This component is visual and trigger-oriented; it does not provide native input editing behavior.

## Import

```tsx
import { SearchBar } from "@pxds/cx-components";
```

## Usage

```tsx
<SearchBar placeholder="검색어를 입력해 주세요" onClick={openSearch} />
```

```tsx
<SearchBar
	type="llm"
	placeholder="AI에게 물어보기"
	action={{ icon: "close", label: "닫기", onClick: closeSearch }}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"llm" \| "search"` | `"search"` | Visual type mapped from Figma `type: LLM/search`. |
| `placeholder` | `string` | - | Placeholder text shown when no value is provided. |
| `value` | `string` | - | Optional display value. |
| `leadingIcon` | `IconType` | type-derived | Optional leading icon override. |
| `action` | `{ icon: IconType; label: string; onClick?: () => void }` | - | Optional trailing action rendered through `IconButton`. |
| `onClick` | `() => void` | - | Opens search, focuses a parent-owned input, or starts the owning flow. |
| `disabled` | `boolean` | `false` | Disables interaction. |
| `className` | `string` | - | Additional class name on root. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="search-bar"`
