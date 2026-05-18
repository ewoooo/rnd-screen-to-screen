"use client";

import { forwardRef, type KeyboardEvent, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { TabItem } from "../tab-item";
import type { TabItemOption, TabProps } from "./Tab.types";
import { tabVariants } from "./tab.variants";

function findItemIndexByValue(
	items: readonly TabItemOption[],
	value: string | undefined,
) {
	return value === undefined
		? -1
		: items.findIndex((item) => item.value === value);
}

function findFirstEnabledIndex(items: readonly TabItemOption[]) {
	const firstEnabledIndex = items.findIndex((item) => !item.disabled);

	return firstEnabledIndex === -1 ? 0 : firstEnabledIndex;
}

function findEnabledIndexFrom(
	items: readonly TabItemOption[],
	currentIndex: number,
	direction: 1 | -1,
) {
	if (items.length === 0) {
		return -1;
	}

	for (let offset = 1; offset <= items.length; offset += 1) {
		const nextIndex =
			(currentIndex + direction * offset + items.length) % items.length;

		if (!items[nextIndex]?.disabled) {
			return nextIndex;
		}
	}

	return -1;
}

function findBoundaryEnabledIndex(
	items: readonly TabItemOption[],
	direction: 1 | -1,
) {
	const startIndex = direction === 1 ? 0 : items.length - 1;

	for (
		let index = startIndex;
		index >= 0 && index < items.length;
		index += direction
	) {
		if (!items[index]?.disabled) {
			return index;
		}
	}

	return -1;
}

export const Tab = forwardRef<HTMLDivElement, TabProps>(function Tab(
	{
		ariaLabel,
		className,
		defaultValue,
		items,
		onKeyDown,
		onValueChange,
		value,
		"data-figma-render": dataFigmaRender = "component",
		"data-figma-component-id": dataFigmaComponentId = "tab",
		...props
	},
	ref,
) {
	const [uncontrolledValue, setUncontrolledValue] = useState(
		() => defaultValue ?? items[findFirstEnabledIndex(items)]?.value,
	);
	const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
	const selectedValue = value ?? uncontrolledValue;
	const selectedIndex = findItemIndexByValue(items, selectedValue);
	const selectedItem = selectedIndex === -1 ? undefined : items[selectedIndex];
	const resolvedIndex =
		selectedItem && !selectedItem.disabled
			? selectedIndex
			: findFirstEnabledIndex(items);

	function selectIndex(nextIndex: number) {
		const nextItem = items[nextIndex];

		if (!nextItem || nextItem.disabled) {
			return false;
		}

		if (value === undefined) {
			setUncontrolledValue(nextItem.value);
		}

		onValueChange?.(nextItem.value);
		return true;
	}

	function focusAndSelectIndex(nextIndex: number) {
		if (nextIndex === -1) {
			return;
		}

		if (selectIndex(nextIndex)) {
			tabRefs.current[nextIndex]?.focus();
		}
	}

	function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		onKeyDown?.(event);

		if (event.defaultPrevented) {
			return;
		}

		const eventTarget = event.target;
		const currentIndex =
			eventTarget instanceof HTMLElement
				? Number(eventTarget.dataset.tabIndex)
				: Number.NaN;
		const focusIndex = Number.isNaN(currentIndex) ? resolvedIndex : currentIndex;
		const nextIndex =
			event.key === "ArrowRight"
				? findEnabledIndexFrom(items, focusIndex, 1)
				: event.key === "ArrowLeft"
					? findEnabledIndexFrom(items, focusIndex, -1)
					: event.key === "Home"
						? findBoundaryEnabledIndex(items, 1)
						: event.key === "End"
							? findBoundaryEnabledIndex(items, -1)
							: undefined;

		if (nextIndex !== undefined) {
			event.preventDefault();
			focusAndSelectIndex(nextIndex);
			return;
		}

		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			focusAndSelectIndex(focusIndex);
		}
	}

	return (
		<div
			ref={ref}
			data-figma-render={dataFigmaRender}
			data-figma-component-id={dataFigmaComponentId}
			className={cn(tabVariants(), className)}
			{...props}
		>
			<div className="tab__divider" aria-hidden="true" data-figma-render="ignore" />
			<div
				className="tab__list"
				role="tablist"
				aria-label={ariaLabel}
				onKeyDown={handleKeyDown}
			>
				{items.map((item, index) => {
					const isSelected = index === resolvedIndex && !item.disabled;
					const tabState = isSelected ? "selected" : "default";

					return (
						<TabItem
							key={item.value}
							ref={(node) => {
								tabRefs.current[index] = node;
							}}
							role="tab"
							aria-selected={isSelected}
							aria-disabled={item.disabled ? true : undefined}
							data-disabled={item.disabled ? "" : undefined}
							data-tab-index={index}
							state={tabState}
							tabIndex={isSelected ? 0 : -1}
							className="tab__item"
							onClick={() => selectIndex(index)}
						>
							{item.label}
						</TabItem>
					);
				})}
			</div>
		</div>
	);
});
