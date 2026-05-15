import { cva } from "class-variance-authority";

export const sectionItemVariants = cva("section-item", {
	variants: {
		variant: {
			default: "section-item--default",
			card: "section-item--card",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export type SectionItemVariant = NonNullable<
	NonNullable<Parameters<typeof sectionItemVariants>[0]>["variant"]
>;
