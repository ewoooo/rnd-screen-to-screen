export type PopupSurface = "default";

export const popupVariants = ({
	surface = "default",
}: {
	surface?: PopupSurface;
} = {}) => ["pxds-popup-root", `pxds-popup-root--${surface}`].join(" ");
