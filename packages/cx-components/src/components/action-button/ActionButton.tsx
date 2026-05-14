import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { ActionButtonLeftItem } from "../action-button-left-item";
import { Button } from "../button";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import type {
	ActionButtonAction,
	ActionButtonActionLeftItem,
	ActionButtonProps,
} from "./ActionButton.types";
import { actionButtonVariants } from "./action-button.variants";

function getVisibleActions(actions: readonly ActionButtonAction[]) {
	return actions.slice(0, 2);
}

function getButtonCount(
	buttonCount: ActionButtonProps["buttonCount"],
	actionCount: number,
) {
	return buttonCount ?? (actionCount === 2 ? 2 : 1);
}

function getPrimaryActionIndex(actions: readonly ActionButtonAction[]) {
	const primaryIndex = actions.findIndex((action) => action.variant === "primary");

	return primaryIndex >= 0 ? primaryIndex : 0;
}

function getActionKey(action: ActionButtonAction) {
	const variant = action.variant ?? "primary";

	if (typeof action.label === "string" || typeof action.label === "number") {
		return `${variant}-${action.label}`;
	}

	return `${variant}-${action.leftItem ?? "none"}`;
}

function getDefaultLeftItem(
	type: ActionButtonProps["type"],
	actionIndex: number,
	primaryActionIndex: number,
): ActionButtonActionLeftItem | undefined {
	if (actionIndex !== primaryActionIndex) {
		return undefined;
	}

	if (type === "ai") {
		return "ai";
	}

	if (type === "gift") {
		return "ai-gift";
	}

	return undefined;
}

export const ActionButton = forwardRef<HTMLDivElement, ActionButtonProps>(
	function ActionButton(
		{
			actions,
			buttonCount,
			className,
			text,
			showText,
			showTooltip,
			tooltip,
			tooltipDirection = "center",
			type = "default",
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "action-button",
			"data-figma-property-type": dataFigmaType,
			"data-figma-property-button": dataFigmaButton,
			"data-figma-property-show-text": dataFigmaShowText,
			"data-figma-property-show-tooltip": dataFigmaShowTooltip,
			...props
		},
		ref,
	) {
		const visibleActions = getVisibleActions(actions);
		const resolvedButtonCount = getButtonCount(buttonCount, visibleActions.length);
		const resolvedShowText = showText ?? (text !== undefined && text !== null);
		const resolvedShowTooltip =
			showTooltip ?? (tooltip !== undefined && tooltip !== null);
		const primaryActionIndex = getPrimaryActionIndex(visibleActions);

		return (
			<div
				ref={ref}
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-type={dataFigmaType ?? type}
				data-figma-property-button={
					dataFigmaButton ?? String(resolvedButtonCount)
				}
				data-figma-property-show-text={
					dataFigmaShowText ?? String(resolvedShowText)
				}
				data-figma-property-show-tooltip={
					dataFigmaShowTooltip ?? String(resolvedShowTooltip)
				}
				data-type={type}
				data-button-count={resolvedButtonCount}
				data-show-text={resolvedShowText ? "" : undefined}
				data-show-tooltip={resolvedShowTooltip ? "" : undefined}
				className={cn(
					actionButtonVariants({
						type,
						buttonCount: resolvedButtonCount,
					}),
					className,
				)}
				{...props}
			>
				{resolvedShowText && text !== undefined && text !== null ? (
					<Text
						as="p"
						variant="bodySubtle"
						className="action-button__text"
						data-figma-render="slot"
						data-figma-property-name="text"
					>
						{text}
					</Text>
				) : null}
				{resolvedShowTooltip && tooltip !== undefined && tooltip !== null ? (
					<Tooltip
						className="action-button__tooltip"
						direction={tooltipDirection}
						data-figma-render="slot"
						data-figma-property-name="tooltip"
					>
						{tooltip}
					</Tooltip>
				) : null}
				<div
					className="action-button__actions"
					data-figma-render="layout"
					data-figma-property-name="actions"
				>
					{visibleActions.map((action, index) => {
						const variant = action.variant ?? "primary";
						const leftItem =
							action.leftItem ??
							getDefaultLeftItem(type, index, primaryActionIndex);

						return (
							<Button
								key={getActionKey(action)}
								variant={variant}
								size="xlarge"
								fullWidth
								disabled={action.disabled}
								onClick={action.onClick}
								className="action-button__button"
							>
								{leftItem ? <ActionButtonLeftItem type={leftItem} /> : null}
								<span className="action-button__button-label">
									{action.label}
								</span>
							</Button>
						);
					})}
				</div>
			</div>
		);
	},
);
