export type PageStackListTitlePresence = boolean;

export const pageStackListVariants = ({
	title = false,
}: {
	title?: PageStackListTitlePresence;
} = {}) =>
	[
		"page-stack-list",
		title ? "page-stack-list--title" : "page-stack-list--no-title",
	].join(" ");
