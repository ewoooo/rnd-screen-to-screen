import type { ReactNode } from "react";
import { wdsCorePreviewExamples } from "@pxds/pxds-components/core";
import {
	dividerPreviewExample,
	placeholderPreviewExample,
} from "@pxds/pxds-components/atoms/feedback";
import {
	filterTabsPreviewExample,
	formFieldPreviewExample,
	mediaBlockPreviewExample,
	queryBarPreviewExample,
	selectFieldPreviewExample,
} from "@pxds/pxds-components/shared";
import {
	TextBlock,
	textBlockPreviewMocks,
} from "@pxds/pxds-components/atoms/typography";

export type ComponentPreviewExample = {
	componentId: string;
	description: string;
	render: () => ReactNode;
};

export const componentPreviewExamples = [
	...wdsCorePreviewExamples,
	{
		componentId: "text-block",
		description: "Typography primitive with PXDS text role mapping.",
		render: () => (
			<div className="grid gap-2">
				{textBlockPreviewMocks.map((props) => (
					<TextBlock key={`${props.variant}-${props.text}`} {...props} />
				))}
			</div>
		),
	},
	dividerPreviewExample,
	placeholderPreviewExample,
	mediaBlockPreviewExample,
	queryBarPreviewExample,
	filterTabsPreviewExample,
	formFieldPreviewExample,
	selectFieldPreviewExample,
] as const satisfies readonly ComponentPreviewExample[];

export function getComponentPreviewExample(componentId: string) {
	return componentPreviewExamples.find(
		(example) => example.componentId === componentId,
	);
}
