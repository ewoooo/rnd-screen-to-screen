"use client";

import { TextField } from "../shared";
import { Fragment } from "react";

import { VStack } from "@pxds/pxds-layout/primitives";
import { FormField } from "../shared";
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
	return (
		<ContentSection>
			<VStack gap="block">
				{fields.map((field) => (
					<Fragment key={field.id}>
						<FormField
							label={field.label}
							required={field.required}
							errorText={errors[field.id]}
						>
							<TextField
								type={field.type === "password" ? "password" : "text"}
								value={values[field.id] ?? ""}
								placeholder={field.placeholder}
								invalid={Boolean(errors[field.id])}
								onChange={(event) =>
									onChange(field.id, (event.target as HTMLInputElement).value)
								}
							/>
						</FormField>
					</Fragment>
				))}
			</VStack>
		</ContentSection>
	);
}
