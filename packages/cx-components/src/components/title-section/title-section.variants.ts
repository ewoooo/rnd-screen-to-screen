import { cva } from "class-variance-authority";

export const titleSectionVariants = cva("cx-title-section", {
	variants: {
		subTitle: {
			true: "cx-title-section--sub-title-on",
			false: "cx-title-section--sub-title-off",
		},
		leftItem: {
			true: "cx-title-section--left-item-on",
			false: "cx-title-section--left-item-off",
		},
		rightItem: {
			true: "cx-title-section--right-item-on",
			false: "cx-title-section--right-item-off",
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
