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
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "radio-button",
			"data-figma-property-checked": dataFigmaChecked,
			"data-figma-property-text": dataFigmaText,
			"data-figma-property-disabled": dataFigmaDisabled,
		},
		ref,
	) {
		const inputId = useId();
		const hasText = Boolean(label);
		const checkedVariant = checked ? "true" : "false";
		const textVariant = hasText ? "true" : "false";
		const disabledVariant = disabled ? "true" : "false";

		return (
			<label
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-checked={dataFigmaChecked ?? checkedVariant}
				data-figma-property-text={dataFigmaText ?? textVariant}
				data-figma-property-disabled={dataFigmaDisabled ?? disabledVariant}
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
