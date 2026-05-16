import type { NodeKind } from "./node";
import type { PropConfig } from "./prop";

export type ComponentLayer =
	| "primitive"
	| "compound"
	| "organism"
	| "pattern";

export type ComponentConfig<TProps = Record<string, unknown>> = {
	id: string;
	name: string;
	layer: ComponentLayer;
	owner: string;
	node: {
		kind: NodeKind;
		selectable?: boolean;
		exportable?: boolean;
	};
	props?: Partial<Record<keyof TProps, PropConfig>>;
	figma?: {
		componentName?: string;
		componentKey?: string;
	};
};
