import { cva } from "class-variance-authority";

export const listSelectedRightItemVariants = cva(
	"cx-list-selected-right-item",
	{
		variants: {
			type: {
				buttonXsmallSolid:
					"cx-list-selected-right-item--button-xsmall-solid",
				icon: "cx-list-selected-right-item--icon",
				textButton: "cx-list-selected-right-item--text-button",
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
