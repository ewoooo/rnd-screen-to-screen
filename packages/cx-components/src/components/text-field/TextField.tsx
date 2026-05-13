import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";
import { Text } from "../text";
import type { TextFieldProps } from "./TextField.types";
import { TextFieldInput } from "./TextFieldInput";
import { type TextFieldState, textFieldVariants } from "./text-field.variants";

const FIGMA_STATE: Record<TextFieldState, string> = {
	default: "Default",
	focused: "Focused",
	typing: "Typing",
	typed: "Typed",
	disabled: "Disabled",
};

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
			"data-node-kind": dataNodeKind = "component",
			"data-component-id": dataComponentId = "text-field",
			"data-figma-component": dataFigmaComponent = "TextField",
			"data-figma-variant": dataFigmaVariant,
			"data-figma-state": dataFigmaState,
			"data-figma-error": dataFigmaError,
			"data-figma-label": dataFigmaLabel,
			"data-figma-help-text": dataFigmaHelpText,
			"data-figma-button": dataFigmaButton,
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
				data-node-kind={dataNodeKind}
				data-component-id={dataComponentId}
				data-figma-component={dataFigmaComponent}
				data-figma-variant={dataFigmaVariant}
				data-figma-state={dataFigmaState ?? FIGMA_STATE[resolvedState]}
				data-figma-error={dataFigmaError ?? (error ? "on" : "off")}
				data-figma-label={dataFigmaLabel ?? (label ? "on" : "off")}
				data-figma-help-text={dataFigmaHelpText ?? (helperText ? "on" : "off")}
				data-figma-button={dataFigmaButton ?? (hasActionButton ? "on" : "off")}
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
