import { cva } from "class-variance-authority";

export const underlineTabVariants = cva("underline-tab", {
	variants: {
		state: {
			"01": "underline-tab--state-01",
			"02": "underline-tab--state-02",
		},
	},
	defaultVariants: {
		state: "01",
	},
});

export type UnderlineTabVariantState = NonNullable<
	Parameters<typeof underlineTabVariants>[0]
>["state"];
