import { cva } from "class-variance-authority";

export const actionButtonLeftItemVariants = cva("cx-action-button-left-item", {
	variants: {
		type: {
			"ai-gift": "cx-action-button-left-item--ai-gift",
			ai: "cx-action-button-left-item--ai",
		},
	},
	defaultVariants: {
		type: "ai-gift",
	},
});

export type ActionButtonLeftItemType = NonNullable<
	Parameters<typeof actionButtonLeftItemVariants>[0]
>["type"];
