import { SelectField } from "./SelectField";

export const selectFieldPreviewExample = {
	componentId: "select-field",
	description: "Select control pattern with normalized options.",
	render: () => (
		<div className="w-80 max-w-full">
			<SelectField
				value="standard"
				options={[
					{ id: "standard", label: "스탠다드" },
					{ id: "express", label: "빠른 처리" },
				]}
			/>
		</div>
	),
} as const;
