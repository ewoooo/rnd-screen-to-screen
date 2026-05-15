import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { Text } from "../text";
import type {
	BottomNavigationItem,
	BottomNavigationProps,
} from "./BottomNavigation.types";
import {
	type BottomNavigationState,
	bottomNavigationVariants,
} from "./bottom-navigation.variants";

const DEFAULT_ITEMS: readonly BottomNavigationItem[] = [
	{
		icon: "home",
		iconSize: 24,
		label: "MY",
		state: "My",
	},
	{
		icon: "search",
		iconSize: 20,
		label: "검색",
		state: "Search",
	},
	{
		icon: "shop",
		iconSize: 24,
		label: "쇼핑",
		state: "Shopping",
	},
];

function resolveState(
	state: BottomNavigationState | undefined,
	items: readonly BottomNavigationItem[],
): BottomNavigationState {
	return state ?? items[0]?.state ?? "My";
}

export const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(
	function BottomNavigation(
		{
			"aria-label": ariaLabel = "Bottom navigation",
			className,
			items = DEFAULT_ITEMS,
			onStateChange,
			state,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "bottom-navigation",
			"data-figma-property-state": dataFigmaState,
			...props
		},
		ref,
	) {
		const resolvedState = resolveState(state, items);

		return (
			<nav
				ref={ref}
				aria-label={ariaLabel}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-state={dataFigmaState ?? resolvedState}
				data-state={resolvedState}
				className={cn(
					bottomNavigationVariants({ state: resolvedState }),
					className,
				)}
				{...props}
			>
				<ul className="bottom-navigation__list" data-figma-render="ignore">
					{items.map((item) => {
						const selected = item.state === resolvedState;

						return (
							<li
								className="bottom-navigation__list-item"
								data-figma-render="ignore"
								key={item.state}
							>
								<button
									aria-current={selected ? "page" : undefined}
									aria-label={item.ariaLabel ?? item.label}
									className="bottom-navigation__item"
									data-active={selected ? "" : undefined}
									data-figma-render="slot"
									data-figma-property-name={item.state}
									data-state={item.state}
									disabled={item.disabled}
									onClick={(event) => {
										item.onClick?.(event);

										if (!event.defaultPrevented && !item.disabled) {
											onStateChange?.(item.state);
										}
									}}
									type="button"
								>
									<Icon
										aria-hidden="true"
										className="bottom-navigation__icon"
										color={selected ? "brand" : "tertiary"}
										data-figma-render="primitive"
										size={item.iconSize}
										type={item.icon}
									/>
									<Text
										as="span"
										className="bottom-navigation__label"
										data-figma-render="primitive"
										variant="caption"
									>
										{item.label}
									</Text>
								</button>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	},
);
