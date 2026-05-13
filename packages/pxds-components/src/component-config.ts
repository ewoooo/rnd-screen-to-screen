export type ComponentConfigLayer = "atom" | "molecule" | "organism";

export type ComponentConfigStatus = "active" | "experimental" | "deprecated";

export type ComponentConfig = {
	id: string;
	name: string;
	layer: ComponentConfigLayer;
	owner: "@pxds/pxds-components";
	importPath: string;
	group: string;
	status: ComponentConfigStatus;
	createdAt: `${number}-${number}-${number}`;
	source?: {
		package: string;
		component: string;
	};
};
