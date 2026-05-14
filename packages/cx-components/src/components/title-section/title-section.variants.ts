import { cva } from "class-variance-authority";

export const titleSectionVariants = cva("title-section", {
	variants: {
		subTitle: {
			true: "title-section--sub-title-on",
			false: "title-section--sub-title-off",
		},
		leftItem: {
			true: "title-section--left-item-on",
			false: "title-section--left-item-off",
		},
		rightItem: {
			true: "title-section--right-item-on",
			false: "title-section--right-item-off",
		},
	},
	defaultVariants: {
		subTitle: false,
		leftItem: false,
		rightItem: false,
	},
});

export type TitleSectionSubTitle = NonNullable<
	Parameters<typeof titleSectionVariants>[0]
>["subTitle"];
