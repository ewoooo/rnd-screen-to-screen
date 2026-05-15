import { cva } from "class-variance-authority";

export const pageStackListVariants = cva("page-stack-list", {
	variants: {
		title: {
			true: "page-stack-list--title",
			false: "page-stack-list--no-title",
		},
	},
	defaultVariants: {
		title: false,
	},
});

export type PageStackListTitlePresence = NonNullable<
	NonNullable<Parameters<typeof pageStackListVariants>[0]>["title"]
>;
