import { SelectField } from "../select-field";
import { FormField } from "./FormField";

export const formFieldPreviewExample = {
	componentId: "form-field",
	description: "Label, helper, and field composition boundary.",
	render: () => (
		<div className="w-80 max-w-full">
			<FormField label="옵션" helperText="선택 가능한 값을 확인합니다.">
				<SelectField
					value="basic"
					options={[
						{ id: "basic", label: "기본 옵션" },
						{ id: "premium", label: "프리미엄 옵션" },
					]}
				/>
			</FormField>
		</div>
	),
} as const;
