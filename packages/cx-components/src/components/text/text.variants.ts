import { cva } from "class-variance-authority";

export const textVariants = cva("cx-text", {
	variants: {
		variant: {
			displayTitle: "text-24-med",
			sectionTitle: "text-20-med",
			listTitle: "text-16-semi",
			body: "text-16-reg",
			bodySubtle: "text-14-reg",
			caption: "text-12-med",
			label: "text-14-semi",
			helper: "text-12-reg",
			error: "text-12-reg",
		},
	},
	defaultVariants: {
		variant: "body",
	},
});

export type TextVariant = NonNullable<
	Parameters<typeof textVariants>[0]
>["variant"];
