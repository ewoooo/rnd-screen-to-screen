import { cva } from "class-variance-authority";

export type SearchBarType = "llm" | "search";

export const searchBarVariants = cva("search-bar", {
	variants: {
		type: {
			llm: "search-bar--llm",
			search: "search-bar--search",
		},
	},
	defaultVariants: {
		type: "search",
	},
});
