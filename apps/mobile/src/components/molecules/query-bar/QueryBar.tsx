import { SearchField } from "@pxds/pxds-components/core";

type Props = {
	value: string;
	placeholder?: string;
};

export function QueryBar({ value, placeholder = "검색어를 입력하세요" }: Props) {
	return (
		<SearchField
			size="medium"
			width="100%"
			value={value}
			placeholder={placeholder}
			readOnly
			aria-label={placeholder}
		/>
	);
}
