import { cva } from "class-variance-authority";

export const bottomsheetVariants = cva("bottomsheet", {
	variants: {
		actionButton: {
			on: "bottomsheet--action-button-on",
			off: "bottomsheet--action-button-off",
		},
		showTitleBottomSheet: {
			true: "bottomsheet--title-on",
			false: "bottomsheet--title-off",
		},
		handle: {
			true: "bottomsheet--handle-on",
			false: "bottomsheet--handle-off",
		},
	},
	defaultVariants: {
		actionButton: "on",
		showTitleBottomSheet: true,
		handle: true,
	},
});

export type BottomsheetActionButton = NonNullable<
	Parameters<typeof bottomsheetVariants>[0]
>["actionButton"];
