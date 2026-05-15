import { cva } from "class-variance-authority";

export const footerVariants = cva("footer", {
	variants: {
		type: {
			"01": "footer--type-01",
			"02": "footer--type-02",
		},
	},
	defaultVariants: {
		type: "01",
	},
});

export type FooterType = NonNullable<
	Parameters<typeof footerVariants>[0]
>["type"];
