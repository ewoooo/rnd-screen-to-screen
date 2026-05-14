import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { ButtonListOrder } from "../button-list-order";
import { Divider } from "../divider";
import type { FilterSortingProps } from "./FilterSorting.types";
import { filterSortingVariants } from "./filter-sorting.variants";

export const FilterSorting = forwardRef<HTMLDivElement, FilterSortingProps>(
	function FilterSorting(
		{
			className,
			totalCount = 256,
			totalLabel = "전체",
			totalUnit = "개",
			orderLabel = "인기순",
			filterLabel = "필터",
			divider = true,
			onOrderClick,
			onFilterClick,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "filter-sorting",
			"data-figma-property-divider": dataFigmaDivider,
			...props
		},
		ref,
	) {
		const resolvedDivider = divider ? "true" : "false";
		const orderDisabled = !onOrderClick;
		const filterDisabled = !onFilterClick;

		return (
			<div
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-divider={dataFigmaDivider ?? resolvedDivider}
				data-divider={resolvedDivider}
				className={cn(filterSortingVariants(), className)}
				{...props}
			>
				{divider ? (
					<Divider className="filter-sorting__divider" type="contents" />
				) : null}
				<div className="filter-sorting__content">
					<span className="filter-sorting__count">
						<span>{totalLabel}</span>
						<span>{totalCount}</span>
						<span>{totalUnit}</span>
					</span>
					<span className="filter-sorting__actions">
						<ButtonListOrder
							className="filter-sorting__order"
							label={orderLabel}
							disabled={orderDisabled}
							onClick={onOrderClick}
						/>
						<span className="filter-sorting__separator" aria-hidden="true" />
						<button
							className="filter-sorting__filter"
							type="button"
							disabled={filterDisabled}
							data-disabled={filterDisabled ? "" : undefined}
							onClick={onFilterClick}
						>
							<span className="filter-sorting__filter-label">{filterLabel}</span>
							<span className="filter-sorting__filter-icon" aria-hidden="true">
								<span className="filter-sorting__filter-icon-line" />
								<span className="filter-sorting__filter-icon-line" />
								<span className="filter-sorting__filter-icon-line" />
							</span>
						</button>
					</span>
				</div>
			</div>
		);
	},
);
