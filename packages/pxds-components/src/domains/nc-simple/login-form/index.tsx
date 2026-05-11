"use client";

import { TextFieldList, type TextFieldListField } from "../../../molecules";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

export type LoginField = {
	id: string;
	label: string;
	placeholder?: string;
	type: "text" | "password";
	required?: boolean;
};

type Props = {
	fields: readonly LoginField[];
	values: Record<string, string | undefined>;
	errors?: Record<string, string | undefined>;
	onChange: (id: string, value: string) => void;
};

export function LoginForm({ fields, values, errors = {}, onChange }: Props) {
	const textFields: TextFieldListField[] = fields.map((field) => ({
		id: field.id,
		label: field.label,
		placeholder: field.placeholder,
		type: field.type,
		required: field.required,
	}));

	return (
		<ContentSection>
			<TextFieldList
				fields={textFields}
				values={values}
				errors={errors}
				onChange={onChange}
			/>
		</ContentSection>
	);
}
