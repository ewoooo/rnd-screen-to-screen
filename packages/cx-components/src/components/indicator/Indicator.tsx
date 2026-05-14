import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import type { IndicatorProps } from "./Indicator.types";
import { indicatorVariants } from "./indicator.variants";

const DEFAULT_COUNT = 6;
const DEFAULT_ACTIVE_INDEX = 0;

function clampInteger(value: number | undefined, min: number, max: number) {
	if (value === undefined || !Number.isFinite(value)) {
		return min;
	}

	return Math.min(Math.max(Math.trunc(value), min), max);
}

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
	function Indicator(
		{
			activeIndex = DEFAULT_ACTIVE_INDEX,
			ariaLabel = "페이지 위치",
			className,
			count = DEFAULT_COUNT,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "indicator",
			...props
		},
		ref,
	) {
		const resolvedCount = clampInteger(count, 1, Number.MAX_SAFE_INTEGER);
		const resolvedActiveIndex = clampInteger(
			activeIndex,
			0,
			resolvedCount - 1,
		);
		const dotIds = Array.from(
			{ length: resolvedCount },
			(_, index) => `indicator-dot-${index}`,
		);

		return (
			<div
				ref={ref}
				role="img"
				aria-label={ariaLabel}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				className={cn(indicatorVariants(), className)}
				{...props}
			>
				{dotIds.map((dotId, index) => {
					const active = index === resolvedActiveIndex;

					return (
						<span
							key={dotId}
							aria-hidden="true"
							className="indicator__dot"
							data-active={active ? "true" : "false"}
						/>
					);
				})}
			</div>
		);
	},
);
