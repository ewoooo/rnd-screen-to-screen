"use client";

import { TextArea } from "../form-controls";
import { FormField } from "../form-field";
import { type SelectableItem, SelectableList } from "../selectable-list";
import { VStack } from "@pxds/pxds-layout/primitives";
import {
	ContentSection,
	ListContents,
} from "@pxds/pxds-layout/app-screen";

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
		<>
			<ListContents>
				<VStack gap="block">
					<SelectableList
						items={items}
						value={value}
						onChange={onValueChange}
						name="leave-reason"
						density="compact"
					/>
				</VStack>
			</ListContents>
			<ContentSection>
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
			</ContentSection>
		</>
	);
}
