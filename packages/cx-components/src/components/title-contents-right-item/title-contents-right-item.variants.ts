import { cva } from "class-variance-authority";

export const titleContentsRightItemVariants = cva(
	"cx-title-contents-right-item",
	{
		variants: {
			type: {
				icon: "cx-title-contents-right-item--icon",
				button: "cx-title-contents-right-item--button",
				type3: "cx-title-contents-right-item--type3",
			},
		},
		defaultVariants: {
			type: "icon",
		},
	},
);

export type TitleContentsRightItemType = NonNullable<
	Parameters<typeof titleContentsRightItemVariants>[0]
>["type"];
