import { cva } from "class-variance-authority";

export const badgeIconVariants = cva("badge-icon", {
	variants: {
		subtext: {
			true: "badge-icon--subtext-on",
			false: "badge-icon--subtext-off",
		},
	},
	defaultVariants: {
		subtext: false,
	},
});

export type BadgeIconSubtext = NonNullable<
	Parameters<typeof badgeIconVariants>[0]
>["subtext"];
