"use client";

import { Fragment } from "react";

import { VStack } from "@pxds/pxds-layout/primitives";
import { FormField } from "../form-field";
import { TextField } from "../form-controls";
import {
	renderBoolean,
	renderString,
	type ComponentRenderReact,
	type RenderReactPropValue,
} from "../../render-react";

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
		<VStack gap="var(--semantic-spacing-block)">
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

export const textFieldListRenderReact: ComponentRenderReact = ({ node }) => (
	<TextFieldList
		fields={renderTextFieldListFields(node.props?.fields)}
		values={{}}
		onChange={() => undefined}
	/>
);

function renderTextFieldListFields(
	value: RenderReactPropValue | undefined,
): readonly TextFieldListField[] {
	if (!Array.isArray(value)) return [];
	return value.flatMap((field) => {
		if (!field || typeof field !== "object" || Array.isArray(field)) return [];
		const id = renderString(field.id);
		const label = renderString(field.label);
		if (!id || !label) return [];
		return [
			{
				id,
				label,
				placeholder: renderString(field.placeholder),
				type: field.type === "password" ? "password" : "text",
				required: renderBoolean(field.required, false),
				helperText: renderString(field.helperText),
				errorText: renderString(field.errorText),
				maxLength:
					typeof field.maxLength === "number" ? field.maxLength : undefined,
			},
		];
	});
}
