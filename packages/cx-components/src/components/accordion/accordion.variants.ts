import { cva } from "class-variance-authority";

export const accordionVariants = cva("accordion", {
	variants: {
		state: {
			close: "accordion--close",
			open: "accordion--open",
		},
		leftText: {
			true: "accordion--left-text",
			false: null,
		},
	},
	defaultVariants: {
		state: "close",
		leftText: false,
	},
});

export type AccordionState = NonNullable<
	NonNullable<Parameters<typeof accordionVariants>[0]>["state"]
>;

export type AccordionLeftText = NonNullable<
	NonNullable<Parameters<typeof accordionVariants>[0]>["leftText"]
>;
