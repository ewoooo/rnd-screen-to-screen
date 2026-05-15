import type { ReactNode } from "react";

export type CxComponentPreviewLayer = "base";

export type CxComponentPreviewGroup =
	| "action"
	| "feedback"
	| "form"
	| "layout"
	| "navigation"
	| "selection"
	| "typography";

export type CxComponentPreviewStatus = "active" | "candidate";

export type CxComponentPreviewOwner = "@pxds/cx-components";

export type CxComponentPreviewEntry = {
	id: string;
	name: string;
	layer: CxComponentPreviewLayer;
	group: CxComponentPreviewGroup;
	owner: CxComponentPreviewOwner;
	importPath: string;
	status: CxComponentPreviewStatus;
};

export type CxComponentPreviewCase = {
	id: string;
	label: string;
	render: () => ReactNode;
};

export type CxComponentPreviewExample = {
	componentId: string;
	description: string;
	cases: readonly CxComponentPreviewCase[];
};

export type ComponentPreviewExample = CxComponentPreviewExample;
