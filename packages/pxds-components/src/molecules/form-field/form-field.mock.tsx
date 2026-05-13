import { TextField } from "../form-controls";
import { FormField } from "./FormField";

export const formFieldPreviewExample = {
	componentId: "form-field",
	description: "Label, helper, and field composition boundary.",
	render: () => (
		<div className="w-80 max-w-full">
			<FormField label="이름" helperText="표시될 이름을 입력합니다.">
				<TextField placeholder="홍길동" />
			</FormField>
		</div>
	),
} as const;
