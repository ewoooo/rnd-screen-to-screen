import { cva } from "class-variance-authority";

export const actionButtonVariants = cva("action-button", {
	variants: {
		type: {
			default: "action-button--default",
			ai: "action-button--ai",
			gift: "action-button--gift",
		},
		buttonCount: {
			1: "action-button--button-1",
			2: "action-button--button-2",
		},
	},
	defaultVariants: {
		type: "default",
		buttonCount: 1,
	},
});

export type ActionButtonType = NonNullable<
	Parameters<typeof actionButtonVariants>[0]
>["type"];

export type ActionButtonButtonCount = NonNullable<
	Parameters<typeof actionButtonVariants>[0]
>["buttonCount"];
