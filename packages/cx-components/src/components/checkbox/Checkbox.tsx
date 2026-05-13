import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../text";
import type { CheckboxProps } from "./Checkbox.types";
import { checkboxVariants } from "./checkbox.variants";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	function Checkbox(
		{
			checked = false,
			className,
			disabled = false,
			label,
			name,
			onCheckedChange,
			value,
			"data-node-kind": dataNodeKind = "component",
			"data-component-id": dataComponentId = "checkbox",
			"data-figma-component": dataFigmaComponent = "CheckBox",
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
					checkboxVariants({
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
					type="checkbox"
					className="cx-checkbox__input"
					checked={checked}
					disabled={disabled}
					name={name}
					value={value}
					onChange={(event) => onCheckedChange?.(event.currentTarget.checked)}
				/>
				<span className="cx-checkbox__control" aria-hidden="true" />
				{label ? (
					<Text className="cx-checkbox__label" variant="label">
						{label}
					</Text>
				) : null}
			</label>
		);
	},
);
