import { cva } from "class-variance-authority";

export const actionButtonLeftItemVariants = cva("action-button-left-item", {
	variants: {
		type: {
			"ai-gift": "action-button-left-item--ai-gift",
			ai: "action-button-left-item--ai",
		},
	},
	defaultVariants: {
		type: "ai-gift",
	},
});

export type ActionButtonLeftItemType = NonNullable<
	Parameters<typeof actionButtonLeftItemVariants>[0]
>["type"];
