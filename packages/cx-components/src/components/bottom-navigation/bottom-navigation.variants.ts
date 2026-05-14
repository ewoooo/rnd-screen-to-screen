import { cva } from "class-variance-authority";

export type BottomNavigationState = "My" | "Search" | "Shopping";

export const bottomNavigationVariants = cva("bottom-navigation", {
	variants: {
		state: {
			My: "bottom-navigation--state-my",
			Search: "bottom-navigation--state-search",
			Shopping: "bottom-navigation--state-shopping",
		} satisfies Record<BottomNavigationState, string>,
	},
	defaultVariants: {
		state: "My",
	},
});
