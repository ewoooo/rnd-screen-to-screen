import type { ReactNode } from "react";
import type { FigmaLayoutBridgeAttributes } from "../../../types/figma-bridge";

export type SlotAlign = "start" | "center" | "end" | "stretch";

export type SlotProps = FigmaLayoutBridgeAttributes & {
	name?: string;
	children?: ReactNode;
	className?: string;
	gap?: number | string;
	align?: SlotAlign;
};
