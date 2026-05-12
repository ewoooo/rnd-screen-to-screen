import type { ComponentRenderTree } from "@pxds/pxds-components/schema";
import type { ComponentRenderReact } from "@pxds/pxds-components/render-react";

import type { OrganismDomainModuleId } from "./organism-domain";

export type OrganismLifecycleStatus =
	| "active"
	| "experimental"
	| "deprecated";

export type OrganismRegistryMeta = {
	id: string;
	name: string;
	layer: "organism";
	owner: "@screen/mobile";
	importPath: string;
	group: OrganismDomainModuleId;
	status: OrganismLifecycleStatus;
	createdAt: `${number}-${number}-${number}`;
	exportMode: "render-tree";
};

export type OrganismRegistryEntry = OrganismRegistryMeta & {
	render: () => ComponentRenderTree;
};

export type RenderableRegistryEntry = {
	id: string;
	render?: () => ComponentRenderTree;
	renderReact?: ComponentRenderReact;
};
