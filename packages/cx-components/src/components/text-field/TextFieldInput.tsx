import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { Button } from "../button";
import type { TextFieldActionButton } from "./TextField.types";

type NativeInputProps = Pick<
	ComponentPropsWithoutRef<"input">,
	| "value"
	| "defaultValue"
	| "placeholder"
	| "disabled"
	| "readOnly"
	| "name"
	| "id"
	| "type"
	| "inputMode"
	| "maxLength"
	| "onChange"
	| "onFocus"
	| "onBlur"
>;

type TextFieldInputProps = NativeInputProps & {
	actionButton?: TextFieldActionButton;
	"aria-describedby"?: string;
	"aria-invalid"?: boolean;
};

export const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
	function TextFieldInput(
		{
			actionButton,
			disabled = false,
			type = "text",
			"aria-describedby": ariaDescribedBy,
			"aria-invalid": ariaInvalid,
			...inputProps
		},
		ref,
	) {
		return (
			<div className="text-field-input">
				<div className="text-field-input__field">
					<input
						{...inputProps}
						ref={ref}
						type={type}
						disabled={disabled}
						aria-describedby={ariaDescribedBy}
						aria-invalid={ariaInvalid}
						className="text-field-input__native"
					/>
				</div>
				{actionButton ? (
					<Button
						type="button"
						variant="secondary"
						size="large"
						disabled={disabled || actionButton.disabled}
						className="text-field-input__action"
						onClick={actionButton.onClick}
					>
						{actionButton.label}
					</Button>
				) : null}
			</div>
		);
	},
);
