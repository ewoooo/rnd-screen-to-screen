import { cva } from "class-variance-authority";

export const titleBottomSheetVariants = cva("cx-title-bottom-sheet", {
	variants: {
		showTitle: {
			true: "cx-title-bottom-sheet--title-on",
			false: "cx-title-bottom-sheet--title-off",
		},
		showTitleText: {
			true: "cx-title-bottom-sheet--title-text-on",
			false: "cx-title-bottom-sheet--title-text-off",
		},
		showTitleButton: {
			true: "cx-title-bottom-sheet--title-button-on",
			false: "cx-title-bottom-sheet--title-button-off",
		},
		showSubText: {
			true: "cx-title-bottom-sheet--sub-text-on",
			false: "cx-title-bottom-sheet--sub-text-off",
		},
		showSubText2: {
			true: "cx-title-bottom-sheet--sub-text-2-on",
			false: "cx-title-bottom-sheet--sub-text-2-off",
		},
	},
	defaultVariants: {
		showTitle: true,
		showTitleText: true,
		showTitleButton: true,
		showSubText: false,
		showSubText2: false,
	},
});

export type TitleBottomSheetShowTitle = NonNullable<
	Parameters<typeof titleBottomSheetVariants>[0]
>["showTitle"];
