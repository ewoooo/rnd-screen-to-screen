import { cva } from "class-variance-authority";

export const appBarVariants = cva("cx-app-bar", {
	variants: {
		leftItem: {
			true: "cx-app-bar--left-item-on",
			false: "cx-app-bar--left-item-off",
		},
		logo: {
			true: "cx-app-bar--logo",
			false: "cx-app-bar--default",
		},
		rightItem: {
			true: "cx-app-bar--right-item-on",
			false: "cx-app-bar--right-item-off",
		},
		title: {
			true: "cx-app-bar--title-on",
			false: "cx-app-bar--title-off",
		},
	},
	defaultVariants: {
		leftItem: true,
		logo: false,
		rightItem: true,
		title: true,
	},
});

export type AppBarLeftItem = NonNullable<
	Parameters<typeof appBarVariants>[0]
>["leftItem"];
export type AppBarLogo = NonNullable<
	Parameters<typeof appBarVariants>[0]
>["logo"];
export type AppBarRightItem = NonNullable<
	Parameters<typeof appBarVariants>[0]
>["rightItem"];
export type AppBarTitle = NonNullable<
	Parameters<typeof appBarVariants>[0]
>["title"];
