export type SectionDividerThickness = "section" | "hairline";

export const sectionDividerVariants = ({
	thickness = "section",
}: {
	thickness?: SectionDividerThickness;
} = {}) =>
	[
		"pxds-section-divider",
		`pxds-section-divider--${thickness}`,
	].join(" ");
