"use client";

import type { ChangeEvent } from "react";
import { TextField } from "@wanteddev/wds";

// Figma input/default (atom) → WDS TextField
// Source: data/binding/overrides/input-default.json
export function InputDefaultPilot({
	value,
	defaultValue,
	placeholder,
	disabled,
	invalid,
	onChange,
	onReset,
}: {
	value?: string;
	defaultValue?: string;
	placeholder?: string;
	disabled?: boolean;
	invalid?: boolean;
	onChange?: (value: string) => void;
	onReset?: (prev: string) => void;
}) {
	return (
		<TextField
			width={304}
			height={42}
			value={value}
			defaultValue={defaultValue}
			placeholder={placeholder}
			disabled={disabled}
			invalid={invalid}
			onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
			onReset={onReset}
		/>
	);
}
