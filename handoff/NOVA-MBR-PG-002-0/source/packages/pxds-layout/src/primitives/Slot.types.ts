import type { ReactNode } from "react";

export type SlotAlign = "start" | "center" | "end" | "stretch";

export type SlotProps = {
	name?: string;
	children?: ReactNode;
	className?: string;
	gap?: number | string;
	align?: SlotAlign;
};
