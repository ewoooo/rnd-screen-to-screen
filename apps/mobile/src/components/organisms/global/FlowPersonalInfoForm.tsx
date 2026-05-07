"use client";

import { TextField } from "@pxds/pxds-components/patterns";
import { Fragment } from "react";

import { FormField } from "@pxds/pxds-components/patterns";
import { type SelectableItem, SelectableList } from "@/components/molecules";
import { VStack } from "@pxds/pxds-layout/primitives";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

export type FlowFieldKind = "text" | "tel" | "date" | "selectable";

export type FlowPersonalField = {
	id: string;
	kind: FlowFieldKind;
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

export type FlowPersonalValues = Record<string, string | undefined>;

type Props = {
	fields: readonly FlowPersonalField[];
	values: FlowPersonalValues;
	errors: Record<string, string | undefined>;
	onChange: (id: string, value: string) => void;
};

export function FlowPersonalInfoForm({
	fields,
	values,
	errors,
	onChange,
}: Props) {
	return (
		<ContentSection>
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
										onChange(field.id, (event.target as HTMLInputElement).value)
									}
								/>
							)}
						</FormField>
					</Fragment>
				))}
			</VStack>
		</ContentSection>
	);
}
