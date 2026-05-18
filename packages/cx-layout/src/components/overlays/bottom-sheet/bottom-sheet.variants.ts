export type BottomSheetSurface = "default";

export const bottomSheetVariants = ({
	surface = "default",
}: {
	surface?: BottomSheetSurface;
} = {}) => ["pxds-bottom-sheet", `pxds-bottom-sheet--${surface}`].join(" ");
