export type RenderSlot = "header" | "content" | "bottom" | "system";

export type RenderSectionInset = "default" | "bleed" | "none";

export type RenderRail = "inset" | "measure" | "full";

export type RenderMeasure = "body" | "form" | "wide";

export type RenderStackDirection = "vertical" | "horizontal" | "none";

export type RenderLayoutContract = {
	slot?: RenderSlot;
	section?: {
		inset?: RenderSectionInset;
		rail?: RenderRail;
		measure?: RenderMeasure;
	};
	stack?: {
		direction: RenderStackDirection;
		gap?: string;
		align?: "start" | "center" | "end" | "stretch";
	};
	sizing?: {
		width?: "fill" | "hug" | "fixed";
		height?: "fill" | "hug" | "fixed";
	};
};
