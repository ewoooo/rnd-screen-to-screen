import { TextBlock } from "../../typography/text-block";
import { Divider } from "../Divider";

export const dividerPreviewExample = {
	componentId: "divider",
	description: "Inset-aware feedback line.",
	render: () => (
		<div className="grid w-64 gap-4">
			<TextBlock variant="caption" text="상단 콘텐츠" />
			<Divider />
			<TextBlock variant="caption" text="하단 콘텐츠" />
		</div>
	),
} as const;
