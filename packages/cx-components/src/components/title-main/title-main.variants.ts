import { cva } from "class-variance-authority";

export const titleMainVariants = cva("title-main", {
	variants: {
		type: {
			complete: "title-main--complete",
			search: "title-main--search",
		},
		titleSubText: {
			true: "title-main--title-sub-text-on",
			false: "title-main--title-sub-text-off",
		},
		media: {
			true: "title-main--media-on",
			false: "title-main--media-off",
		},
		indicator: {
			true: "title-main--indicator-on",
			false: "title-main--indicator-off",
		},
	},
	defaultVariants: {
		type: "complete",
		titleSubText: false,
		media: false,
		indicator: false,
	},
});

export type TitleMainVariantType = NonNullable<
	NonNullable<Parameters<typeof titleMainVariants>[0]>["type"]
>;
