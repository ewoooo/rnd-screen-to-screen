"use client";

import { Fragment } from "react";

import { VStack } from "@pxds/pxds-layout/primitives";
import { FormField } from "../form-field";
import { TextField } from "../form-controls";

export type TextFieldListField = {
	id: string;
	label: string;
	placeholder?: string;
	type?: "text" | "password";
	required?: boolean;
	helperText?: string;
	errorText?: string;
	inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
	maxLength?: number;
};

type Props = {
	fields: readonly TextFieldListField[];
	values: Record<string, string | undefined>;
	errors?: Record<string, string | undefined>;
	onChange: (id: string, value: string) => void;
};

export function TextFieldList({
	fields,
	values,
	errors = {},
	onChange,
}: Props) {
	return (
		<VStack gap="block">
			{fields.map((field) => {
				const errorText = field.errorText ?? errors[field.id];

				return (
					<Fragment key={field.id}>
						<FormField
							label={field.label}
							required={field.required}
							helperText={field.helperText}
							errorText={errorText}
						>
							<TextField
								type={field.type ?? "text"}
								value={values[field.id] ?? ""}
								placeholder={field.placeholder}
								invalid={Boolean(errorText)}
								inputMode={field.inputMode}
								maxLength={field.maxLength}
								onChange={(event) =>
									onChange(field.id, (event.target as HTMLInputElement).value)
								}
							/>
						</FormField>
					</Fragment>
				);
			})}
		</VStack>
	);
}
