import { QueryBar } from "./QueryBar";

export const queryBarPreviewExample = {
	componentId: "query-bar",
	description: "Read-only search/query input pattern.",
	render: () => (
		<div className="w-80 max-w-full">
			<QueryBar value="디자인 시스템" />
		</div>
	),
} as const;
