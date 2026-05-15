# FilterSorting

Phase 4 list count, sorting, and filter control row.

## Import

```tsx
import { FilterSorting } from "@pxds/cx-components";
```

## Usage

```tsx
<FilterSorting totalCount={256} orderLabel="인기순" />
```

```tsx
<FilterSorting
	totalCount={12}
	orderLabel="최신순"
	onOrderClick={openSortSheet}
	onFilterClick={openFilterSheet}
/>
```

```tsx
<FilterSorting totalCount={0} divider={false} />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `totalCount` | `number \| string` | `256` | Count rendered between `totalLabel` and `totalUnit`. |
| `totalLabel` | `string` | `"전체"` | Prefix for the count label. |
| `totalUnit` | `string` | `"개"` | Suffix for the count label. |
| `orderLabel` | `string` | `"인기순"` | Label passed to `ButtonListOrder`. |
| `filterLabel` | `string` | `"필터"` | Visible label for the filter action. |
| `divider` | `boolean` | `true` | Shows the optional top contents divider. |
| `onOrderClick` | `MouseEventHandler<HTMLButtonElement>` | - | Passed to `ButtonListOrder`. |
| `onFilterClick` | `MouseEventHandler<HTMLButtonElement>` | - | Opens filter controls. |
| `className` | `string` | - | Additional class name on the root. |

## Bridge Attributes

- `data-figma-render="component"`
- `data-figma-component-id="filter-sorting"`
- `data-figma-property-divider="true" | "false"`

## Composition Notes

- Sorting is composed with `ButtonListOrder`.
- The optional top rule is composed with `Divider type="contents"`.
- The sorting/filter separator is a private 1px by 12px rule.
- The checked Figma source uses a local filter vector, but the CX icon registry does not expose a `filter` icon yet. This component uses a CSS-drawn fallback affordance until `Icon type="filter" size={16}` is available.
