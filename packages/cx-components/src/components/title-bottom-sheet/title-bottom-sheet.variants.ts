import { cva } from "class-variance-authority";

export const titleBottomSheetVariants = cva("title-bottom-sheet", {
	variants: {
		showTitle: {
			true: "title-bottom-sheet--title-on",
			false: "title-bottom-sheet--title-off",
		},
		showTitleText: {
			true: "title-bottom-sheet--title-text-on",
			false: "title-bottom-sheet--title-text-off",
		},
		showTitleButton: {
			true: "title-bottom-sheet--title-button-on",
			false: "title-bottom-sheet--title-button-off",
		},
		showSubText: {
			true: "title-bottom-sheet--sub-text-on",
			false: "title-bottom-sheet--sub-text-off",
		},
		showSubText2: {
			true: "title-bottom-sheet--sub-text-2-on",
			false: "title-bottom-sheet--sub-text-2-off",
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
