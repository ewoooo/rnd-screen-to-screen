export type PageStackContentsTitle = boolean;

export const pageStackContentsVariants = ({
	title = false,
}: {
	title?: PageStackContentsTitle;
} = {}) =>
	[
		"cx-page-stack-contents",
		title
			? "cx-page-stack-contents--title-on"
			: "cx-page-stack-contents--title-off",
	].join(" ");
