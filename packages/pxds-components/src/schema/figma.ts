import type { RenderLayoutContract } from "./layout";

export type ComponentInstanceContract = {
	componentId: string;
	target: "figma";
	instanceName: string;
	layout?: RenderLayoutContract;
	props?: Readonly<Record<string, string | boolean | number | null>>;
	tokens?: readonly string[];
};
