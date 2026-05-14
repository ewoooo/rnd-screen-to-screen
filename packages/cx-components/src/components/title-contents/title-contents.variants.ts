import { cva } from "class-variance-authority";

export const titleContentsVariants = cva("title-contents", {
	variants: {
		showButton: {
			true: "title-contents--button-on",
			false: "title-contents--button-off",
		},
	},
	defaultVariants: {
		showButton: true,
	},
});

export type TitleContentsShowButton = NonNullable<
	Parameters<typeof titleContentsVariants>[0]
>["showButton"];
