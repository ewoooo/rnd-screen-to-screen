"use client";

import { forwardRef, type KeyboardEvent, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../text";
import type { UnderlineTabProps, UnderlineTabState } from "./UnderlineTab.types";
import { underlineTabVariants } from "./underline-tab.variants";

const stateByIndex = ["01", "02"] as const;

function getIndexByState(state: UnderlineTabState) {
	return state === "02" ? 1 : 0;
}

export const UnderlineTab = forwardRef<HTMLDivElement, UnderlineTabProps>(
	function UnderlineTab(
		{
			ariaLabel,
			className,
			defaultValue,
			items,
			onKeyDown,
			onValueChange,
			state = "01",
			value,
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "underline-tab",
			"data-figma-property-state": dataFigmaState,
			...props
		},
		ref,
	) {
		const initialIndex = getIndexByState(state);
		const [uncontrolledValue, setUncontrolledValue] = useState(
			defaultValue ?? items[initialIndex].value,
		);
		const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
		const selectedValue = value ?? uncontrolledValue;
		const selectedIndex = items.findIndex((item) => item.value === selectedValue);
		const resolvedIndex = selectedIndex === -1 ? initialIndex : selectedIndex;
		const resolvedState = stateByIndex[resolvedIndex];

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

		function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
			onKeyDown?.(event);

			if (event.defaultPrevented) {
				return;
			}

			const nextIndex =
				event.key === "ArrowRight" || event.key === "End"
					? 1
					: event.key === "ArrowLeft" || event.key === "Home"
						? 0
						: undefined;

			if (nextIndex === undefined) {
				return;
			}

			event.preventDefault();
			if (selectIndex(nextIndex)) {
				buttonRefs.current[nextIndex]?.focus();
			}
		}

		return (
			<div
				ref={ref}
				role="tablist"
				aria-label={ariaLabel}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-state={dataFigmaState ?? resolvedState}
				data-state={resolvedState}
				className={cn(underlineTabVariants({ state: resolvedState }), className)}
				onKeyDown={handleKeyDown}
				{...props}
			>
				{items.map((item, index) => {
					const itemState = stateByIndex[index];
					const isSelected = index === resolvedIndex;

					return (
						<button
							key={item.value}
							ref={(node) => {
								buttonRefs.current[index] = node;
							}}
							type="button"
							role="tab"
							aria-selected={isSelected}
							disabled={item.disabled}
							data-state={isSelected ? "selected" : "default"}
							data-tab-state={itemState}
							className="underline-tab__button"
							onClick={() => selectIndex(index)}
						>
							<Text
								as="span"
								data-figma-render="primitive"
								className="underline-tab__label"
							>
								{item.label}
							</Text>
						</button>
					);
				})}
				<span className="underline-tab__indicator" aria-hidden="true" />
			</div>
		);
	},
);
