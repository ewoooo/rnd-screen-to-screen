import { cva } from "class-variance-authority";

export const titleSectionVariants = cva("cx-title-section", {
	variants: {
		leftItem: {
			true: "cx-title-section--left-item-on",
			false: "cx-title-section--left-item-off",
		},
		rightItem: {
			true: "cx-title-section--right-item-on",
			false: "cx-title-section--right-item-off",
		},
		titleSubText: {
			true: "cx-title-section--title-sub-text-on",
			false: "cx-title-section--title-sub-text-off",
		},
		titleSubImage: {
			true: "cx-title-section--title-sub-image-on",
			false: "cx-title-section--title-sub-image-off",
		},
		subText: {
			true: "cx-title-section--sub-text-on",
			false: "cx-title-section--sub-text-off",
		},
	},
	defaultVariants: {
		leftItem: false,
		rightItem: false,
		titleSubText: false,
		titleSubImage: false,
		subText: false,
	},
});

export type TitleSectionLeftItem = NonNullable<
	Parameters<typeof titleSectionVariants>[0]
>["leftItem"];
export type TitleSectionRightItem = NonNullable<
	Parameters<typeof titleSectionVariants>[0]
>["rightItem"];
export type TitleSectionTitleSubText = NonNullable<
	Parameters<typeof titleSectionVariants>[0]
>["titleSubText"];
export type TitleSectionTitleSubImage = NonNullable<
	Parameters<typeof titleSectionVariants>[0]
>["titleSubImage"];
export type TitleSectionSubText = NonNullable<
	Parameters<typeof titleSectionVariants>[0]
>["subText"];
