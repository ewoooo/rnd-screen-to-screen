"use client";

import { Option, Select } from "@wanteddev/wds";

// Figma dropdown-list (atom) → WDS Select + Option
// Source: data/binding/overrides/dropdown-list.json
export type DropdownOption = { value: string; label: string };

export function DropdownListPilot({
	options,
	value,
	defaultValue,
	placeholder = "선택",
	disabled,
	onChange,
}: {
	options: DropdownOption[];
	value?: string;
	defaultValue?: string;
	placeholder?: string;
	disabled?: boolean;
	onChange?: (value: string) => void;
}) {
	return (
		<Select
			width={304}
			value={value}
			defaultValue={defaultValue}
			placeholder={placeholder}
			disabled={disabled}
			onChange={onChange}
		>
			{options.map((o) => (
				<Option key={o.value} value={o.value}>
					{o.label}
				</Option>
			))}
		</Select>
	);
}
