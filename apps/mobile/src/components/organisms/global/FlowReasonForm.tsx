"use client";

import { TextArea } from "@/components/molecules";
import {
	FormField,
	SelectableList,
	type SelectableItem,
} from "@/components/molecules";
import { VStack } from "@/components/atoms/layout";
import { ContentRail, ContentSection } from "@/components/templates/app-screen";

export type FlowReasonItem = SelectableItem;

type Props = {
	items: readonly FlowReasonItem[];
	freeTextLabel: string;
	freeTextPlaceholder: string;
	freeTextMaxLength: number;
	value: string | undefined;
	freeText: string;
	onValueChange: (id: string) => void;
	onFreeTextChange: (text: string) => void;
};

export function FlowReasonForm({
	items,
	freeTextLabel,
	freeTextPlaceholder,
	freeTextMaxLength,
	value,
	freeText,
	onValueChange,
	onFreeTextChange,
}: Props) {
	const tooLong = freeText.length > freeTextMaxLength;
	const errorText = tooLong
		? `최대 ${freeTextMaxLength}자까지 입력할 수 있어요.`
		: undefined;
	const helperText = `${freeText.length}/${freeTextMaxLength}자`;

	return (
		<ContentSection inset="bleed">
			<VStack gap="block">
				<SelectableList
					items={items}
					value={value}
					onChange={onValueChange}
					name="leave-reason"
					density="compact"
				/>
			</VStack>

			<ContentRail rail="measure" measure="body">
			<VStack>
				<FormField
					label={freeTextLabel}
					helperText={helperText}
					errorText={errorText}
				>
					<TextArea
						width={"full"}
						value={freeText}
						placeholder={freeTextPlaceholder}
						minRows={3}
						maxRows={6}
						maxLength={freeTextMaxLength + 50}
						invalid={tooLong}
						onChange={(event) =>
							onFreeTextChange((event.target as HTMLTextAreaElement).value)
						}
					/>
					</FormField>
			</VStack>
			</ContentRail>


		</ContentSection>
	);
}
