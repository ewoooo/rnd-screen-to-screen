"use client";

import { Fragment } from "react";

import {
	FormField,
	SelectableList,
	TextField,
	type SelectableItem,
} from "@/components/molecules";
import { VStack } from "@/components/atoms/layout";
import { ContentRail, ContentSection } from "@/components/templates/app-screen";

export type NcFieldKind = "text" | "tel" | "date" | "selectable";

export type NcPersonalField = {
	id: string;
	kind: NcFieldKind;
	label: string;
	required?: boolean;
	placeholder?: string;
	helperText?: string;
	options?: readonly SelectableItem[];
	validation?: {
		pattern?: string;
		minLength?: number;
		maxLength?: number;
		errorMessage?: string;
	};
};

export type NcPersonalValues = Record<string, string | undefined>;

type Props = {
	fields: readonly NcPersonalField[];
	values: NcPersonalValues;
	errors: Record<string, string | undefined>;
	onChange: (id: string, value: string) => void;
};

export function NcPersonalInfoForm({
	fields,
	values,
	errors,
	onChange,
}: Props) {
	return (
		<ContentSection>
			<ContentRail rail="measure" measure="body">
				<VStack gap="block">
					{fields.map((field) => (
						<Fragment key={field.id}>
							<FormField
								label={field.label}
								required={field.required}
								helperText={field.helperText}
								errorText={errors[field.id]}
							>
								{field.kind === "selectable" && field.options ? (
									<SelectableList
										name={field.id}
										items={field.options}
										value={values[field.id]}
										onChange={(value) => onChange(field.id, value)}
										density="compact"
									/>
								) : (
									<TextField
										value={values[field.id] ?? ""}
										placeholder={field.placeholder}
										invalid={Boolean(errors[field.id])}
										maxLength={field.validation?.maxLength}
										inputMode={
											field.kind === "tel"
												? "tel"
												: field.kind === "date"
													? "numeric"
													: undefined
										}
										onChange={(event) =>
											onChange(
												field.id,
												(event.target as HTMLInputElement).value,
											)
										}
									/>
								)}
							</FormField>
						</Fragment>
					))}
				</VStack>
			</ContentRail>
		</ContentSection>
	);
}
