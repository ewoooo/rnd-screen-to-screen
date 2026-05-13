export type ProgressAppBarVariantOptions = {
	progressLabel?: boolean;
};

export const progressAppBarVariants = ({
	progressLabel = false,
}: ProgressAppBarVariantOptions = {}) =>
	[
		"mbr-progress-app-bar",
		progressLabel
			? "mbr-progress-app-bar--progress-label-on"
			: "mbr-progress-app-bar--progress-label-off",
	].join(" ");

export type ProgressAppBarProgressLabel =
	ProgressAppBarVariantOptions["progressLabel"];
