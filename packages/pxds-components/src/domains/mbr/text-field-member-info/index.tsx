"use client";

import { Box, HStack, VStack } from "@pxds/pxds-layout/primitives";
import { ContentSection } from "@pxds/pxds-layout/app-screen";

import { Button } from "../../../core";
import { TextField } from "../../../molecules/form-controls";
import { FormField } from "../../../molecules/form-field";
import { partPolicyTexts, type OgnPart } from "../../../ogn-spec";
import { textFieldMemberInfoSpec } from "./spec";

type SnapshotState = "default" | "error" | "blocked";

type Props = {
	state?: SnapshotState;
	values?: Partial<Record<string, string>>;
};

function getDisplayedHintAndError(part: OgnPart, state: SnapshotState) {
	const { hint, error } = partPolicyTexts(part);
	if (state === "error" && error) {
		return { helperText: undefined, errorText: error };
	}
	return { helperText: hint, errorText: undefined };
}

export function TextFieldMemberInfo({
	state = "default",
	values = {},
}: Props) {
	const fieldParts = textFieldMemberInfoSpec.parts.filter(
		(part) => part.component === "form-field",
	);
	const idPart = fieldParts.find((p) => p.id === "text-field-user-id");
	const duplicateCheckPart = textFieldMemberInfoSpec.parts.find(
		(p) => p.id === "button-id-duplicate-check",
	);
	const remainingFieldParts = fieldParts.filter(
		(p) => p.id !== "text-field-user-id",
	);

	return (
		<ContentSection>
			<VStack gap="block">
				{idPart ? (
					<HStack gap="inline" align="end">
						<Box style={{ flex: 1 }}>
							<FormFieldForPart
								part={idPart}
								state={state}
								values={values}
							/>
						</Box>
						{duplicateCheckPart ? (
							<Button variant="outlined" size="medium">
								{duplicateCheckPart.label ?? "중복확인"}
							</Button>
						) : null}
					</HStack>
				) : null}
				{remainingFieldParts.map((part) => (
					<FormFieldForPart
						key={part.id}
						part={part}
						state={state}
						values={values}
					/>
				))}
			</VStack>
		</ContentSection>
	);
}

function FormFieldForPart({
	part,
	state,
	values,
}: {
	part: OgnPart;
	state: SnapshotState;
	values: Partial<Record<string, string>>;
}) {
	const { helperText, errorText } = getDisplayedHintAndError(part, state);
	return (
		<FormField
			label={part.label ?? ""}
			required={part.required}
			helperText={helperText}
			errorText={errorText}
		>
			<TextField
				value={values[part.id] ?? ""}
				placeholder={part.placeholder}
				invalid={Boolean(errorText)}
				readOnly
			/>
		</FormField>
	);
}
