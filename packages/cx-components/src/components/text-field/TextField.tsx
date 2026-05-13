import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../text";
import type { TextFieldProps } from "./TextField.types";
import { TextFieldInput } from "./TextFieldInput";
import { textFieldVariants } from "./text-field.variants";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	function TextField(
		{
			actionButton,
			className,
			disabled = false,
			error = false,
			helperText,
			id,
			label,
			state = "default",
			type = "text",
			"data-figma-render": dataFigmaRender = "component",
			"data-figma-component-id": dataFigmaComponentId = "text-field",
			"data-figma-property-state": dataFigmaState,
			"data-figma-property-error": dataFigmaError,
			"data-figma-property-label": dataFigmaLabel,
			"data-figma-property-help-text": dataFigmaHelpText,
			"data-figma-property-button": dataFigmaButton,
			...inputProps
		},
		ref,
	) {
		const generatedId = useId();
		const inputId = id ?? (label || helperText ? generatedId : undefined);
		const helperId = helperText && inputId ? `${inputId}-helper` : undefined;
		const resolvedState = disabled ? "disabled" : state;
		const hasActionButton = Boolean(actionButton);

		return (
			<div
				data-figma-render={dataFigmaRender}
				data-figma-component-id={dataFigmaComponentId}
				data-figma-property-state={dataFigmaState ?? resolvedState}
				data-figma-property-error={dataFigmaError ?? (error ? "true" : "false")}
				data-figma-property-label={dataFigmaLabel ?? (label ? "true" : "false")}
				data-figma-property-help-text={
					dataFigmaHelpText ?? (helperText ? "true" : "false")
				}
				data-figma-property-button={
					dataFigmaButton ?? (hasActionButton ? "true" : "false")
				}
				data-state={resolvedState}
				data-error={error ? "true" : "false"}
				className={cn(
					textFieldVariants({
						state: resolvedState,
						error,
						button: hasActionButton ? "on" : "off",
					}),
					className,
				)}
			>
				{label ? (
					<Text
						as="label"
						variant="label"
						htmlFor={inputId}
						className="cx-text-field__label"
					>
						{label}
					</Text>
				) : null}
				<TextFieldInput
					{...inputProps}
					ref={ref}
					id={inputId}
					type={type}
					disabled={disabled}
					aria-describedby={helperId}
					aria-invalid={error ? true : undefined}
					actionButton={actionButton}
				/>
				{helperText ? (
					<Text
						as="p"
						id={helperId}
						variant={error ? "error" : "helper"}
						className="cx-text-field__helper"
					>
						{helperText}
					</Text>
				) : null}
			</div>
		);
	},
);
