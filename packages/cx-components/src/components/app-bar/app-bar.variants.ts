import { cva } from "class-variance-authority";

export const appBarVariants = cva("app-bar", {
	variants: {
		leftItem: {
			true: "app-bar--left-item-on",
			false: "app-bar--left-item-off",
		},
		logo: {
			true: "app-bar--logo",
			false: "app-bar--default",
		},
		rightItem: {
			true: "app-bar--right-item-on",
			false: "app-bar--right-item-off",
		},
		title: {
			true: "app-bar--title-on",
			false: "app-bar--title-off",
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
