import type { ComponentProps } from "react";

import type {
	Checkbox,
	Option,
	OptionContent,
	OptionGroup,
	Select,
	SelectContent,
	Switch,
	TextArea,
	TextAreaContent,
	TextField,
	TextFieldButton,
	TextFieldContent,
} from "./FormControls";

export type CheckboxProps = ComponentProps<typeof Checkbox>;
export type OptionProps = ComponentProps<typeof Option>;
export type OptionContentProps = ComponentProps<typeof OptionContent>;
export type OptionGroupProps = ComponentProps<typeof OptionGroup>;
export type SelectProps = ComponentProps<typeof Select>;
export type SelectContentProps = ComponentProps<typeof SelectContent>;
export type SwitchProps = ComponentProps<typeof Switch>;
export type TextAreaProps = ComponentProps<typeof TextArea>;
export type TextAreaContentProps = ComponentProps<typeof TextAreaContent>;
export type TextFieldProps = ComponentProps<typeof TextField>;
export type TextFieldButtonProps = ComponentProps<typeof TextFieldButton>;
export type TextFieldContentProps = ComponentProps<typeof TextFieldContent>;
