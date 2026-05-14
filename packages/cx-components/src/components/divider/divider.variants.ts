import { cva } from "class-variance-authority";

export const dividerVariants = cva("divider", {
	variants: {
		type: {
			contents: "divider--contents",
			section: "divider--section",
		},
		orientation: {
			horizontal: "divider--horizontal",
			vertical: "divider--vertical",
		},
	},
	defaultVariants: {
		type: "contents",
		orientation: "horizontal",
	},
});

export type DividerType = NonNullable<
	Parameters<typeof dividerVariants>[0]
>["type"];
export type DividerOrientation = NonNullable<
	Parameters<typeof dividerVariants>[0]
>["orientation"];
