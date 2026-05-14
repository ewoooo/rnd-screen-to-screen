import { cva } from "class-variance-authority";

export const listSelectedRightItemVariants = cva(
	"list-selected-right-item",
	{
		variants: {
			type: {
				buttonXsmallSolid:
					"list-selected-right-item--button-xsmall-solid",
				icon: "list-selected-right-item--icon",
				textButton: "list-selected-right-item--text-button",
			},
		},
		defaultVariants: {
			type: "buttonXsmallSolid",
		},
	},
);

export type ListSelectedRightItemType = NonNullable<
	Parameters<typeof listSelectedRightItemVariants>[0]
>["type"];
