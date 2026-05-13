import { cva } from "class-variance-authority";

export const dividerVariants = cva("cx-divider", {
	variants: {
		type: {
			contents: "cx-divider--contents",
			section: "cx-divider--section",
		},
		orientation: {
			horizontal: "cx-divider--horizontal",
			vertical: "cx-divider--vertical",
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
