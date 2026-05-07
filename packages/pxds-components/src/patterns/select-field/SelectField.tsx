import {
	Option,
	OptionContent,
	Select,
	SelectContent,
} from "../../core";

export type SelectOption = string | { id: string; label: string };

type Props = {
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	options: readonly SelectOption[];
	onChange?: (value: string) => void;
	width?: string | number;
};

function normalize(option: SelectOption): { id: string; label: string } {
	return typeof option === "string" ? { id: option, label: option } : option;
}

export function SelectField({
	value,
	placeholder,
	disabled,
	options,
	onChange,
	width = "100%",
}: Props) {
	return (
		<Select
			value={value}
			placeholder={placeholder}
			disabled={disabled}
			onChange={onChange}
			width={width}
		>
			<SelectContent>
				{options.map((raw) => {
					const { id, label } = normalize(raw);
					return (
						<Option key={id} value={id}>
							<OptionContent>{label}</OptionContent>
						</Option>
					);
				})}
			</SelectContent>
		</Select>
	);
}
