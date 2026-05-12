import type { ComponentRenderTree } from "@pxds/pxds-components/schema";

import type {
	RenderPropValue,
	RenderSectionLayout,
} from "./render-spec";

export type ScreenRenderTreeMeta = {
	id: string;
	name: string;
	route: string;
	type: string;
};

export type ScreenRenderTreeNode = {
	component: string;
	section?: RenderSectionLayout;
	props?: Readonly<Record<string, RenderPropValue>>;
	children?: readonly ScreenRenderTreeNode[];
	render?: ComponentRenderTree;
};

export type ScreenRenderTreeDefinition = {
	slots: {
		systemHeader?: boolean;
		header?: ScreenRenderTreeNode | false;
		content?: readonly ScreenRenderTreeNode[];
		bottom?: readonly ScreenRenderTreeNode[] | false;
	};
};
