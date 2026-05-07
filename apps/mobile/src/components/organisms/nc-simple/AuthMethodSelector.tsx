"use client";

import { TextField } from "@pxds/pxds-components/patterns";
import { useState } from "react";
import { type SelectableItem, SelectableList } from "@/components/molecules";

import { VStack } from "@pxds/pxds-layout/primitives";
import { FormField } from "@pxds/pxds-components/patterns";
import { ContentRail, ContentSection } from "@pxds/pxds-layout/app-screen";

export type AuthMethodItem = SelectableItem;

type Props = {
	methodLabel: string;
	methods: readonly AuthMethodItem[];
	codeLabel: string;
	codePlaceholder?: string;
	codeHelperText?: string;
	step?: 1 | 2;
	selectedMethod?: string;
	codeValue?: string;
	codeError?: string;
	onMethodChange?: (id: string) => void;
	onCodeChange?: (value: string) => void;
};

export function AuthMethodSelector({
	methodLabel,
	methods,
	codeLabel,
	codePlaceholder,
	codeHelperText,
	step: stepProp,
	selectedMethod: selectedProp,
	codeValue: codeValueProp,
	codeError,
	onMethodChange,
	onCodeChange,
}: Props) {
	const [internalStep, setInternalStep] = useState<1 | 2>(1);
	const [internalSelected, setInternalSelected] = useState<string | undefined>(
		undefined,
	);
	const [internalCode, setInternalCode] = useState("");

	const step = stepProp ?? internalStep;
	const selected = selectedProp ?? internalSelected;
	const codeValue = codeValueProp ?? internalCode;

	const handleMethodChange = (id: string) => {
		if (selectedProp === undefined) setInternalSelected(id);
		if (stepProp === undefined) setInternalStep(2);
		onMethodChange?.(id);
	};

	const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (codeValueProp === undefined) setInternalCode(value);
		onCodeChange?.(value);
	};

	return (
		<ContentSection inset="bleed">
			<VStack gap="block">
				<ContentRail rail="inset">
					<FormField label={methodLabel}>
						<></>
					</FormField>
				</ContentRail>
				<SelectableList
					name="auth-method"
					items={methods}
					value={selected}
					onChange={handleMethodChange}
					density="comfortable"
				/>
				{step === 2 ? (
					<ContentRail rail="inset">
						<FormField
							label={codeLabel}
							helperText={codeHelperText}
							errorText={codeError}
						>
							<TextField
								value={codeValue}
								placeholder={codePlaceholder}
								inputMode="numeric"
								invalid={Boolean(codeError)}
								onChange={handleCodeChange}
							/>
						</FormField>
					</ContentRail>
				) : null}
			</VStack>
		</ContentSection>
	);
}
