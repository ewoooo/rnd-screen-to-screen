import { cva } from "class-variance-authority";

export const titleContentsRightItemVariants = cva(
	"title-contents-right-item",
	{
		variants: {
			type: {
				icon: "title-contents-right-item--icon",
				button: "title-contents-right-item--button",
				type3: "title-contents-right-item--type3",
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
