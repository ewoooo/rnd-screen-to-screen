import { cva } from "class-variance-authority";

export const popupActionButtonVariants = cva("cx-popup-action-button", {
	variants: {
		options: {
			"2Buttons": "cx-popup-action-button--2-buttons",
			"1Button": "cx-popup-action-button--1-button",
		},
	},
	defaultVariants: {
		options: "2Buttons",
	},
});

export type PopupActionButtonVariant = NonNullable<
	Parameters<typeof popupActionButtonVariants>[0]
>["options"];
