import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../text";
import type { RadioButtonProps } from "./RadioButton.types";
import { radioButtonVariants } from "./radio-button.variants";

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
	function RadioButton(
		{
			checked = false,
			className,
			disabled = false,
			label,
			name,
			onCheckedChange,
			value,
			"data-node-kind": dataNodeKind = "component",
			"data-component-id": dataComponentId = "radio-button",
			"data-figma-component": dataFigmaComponent = "RadioButton",
			"data-figma-checked": dataFigmaChecked,
			"data-figma-text": dataFigmaText,
			"data-figma-disabled": dataFigmaDisabled,
		},
		ref,
	) {
		const inputId = useId();
		const hasText = Boolean(label);
		const checkedVariant = checked ? "On" : "Off";
		const textVariant = hasText ? "On" : "Off";
		const disabledVariant = disabled ? "On" : "Off";

		return (
			<label
				data-node-kind={dataNodeKind}
				data-component-id={dataComponentId}
				data-figma-component={dataFigmaComponent}
				data-figma-checked={dataFigmaChecked ?? checkedVariant}
				data-figma-text={dataFigmaText ?? textVariant}
				data-figma-disabled={dataFigmaDisabled ?? disabledVariant}
				data-checked={checkedVariant}
				data-text={textVariant}
				data-disabled={disabledVariant}
				className={cn(
					radioButtonVariants({
						checked,
						disabled,
						text: hasText,
					}),
					className,
				)}
				htmlFor={inputId}
			>
				<input
					ref={ref}
					id={inputId}
					type="radio"
					className="cx-radio-button__input"
					checked={checked}
					disabled={disabled}
					name={name}
					value={value}
					onChange={(event) => onCheckedChange?.(event.currentTarget.checked)}
				/>
				<span className="cx-radio-button__control" aria-hidden="true" />
				{label ? (
					<Text className="cx-radio-button__label" variant="label">
						{label}
					</Text>
				) : null}
			</label>
		);
	},
);
