export const actionAreaTermsFigmaSpec = {
	$schema: "component-spec-v1",
	name: "ogn/mbr-action-area-terms",
	category: "ogn",
	description: "MBR terms agreement bottom CTA area.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
		},
		visual: {
			fill: "{color.semantic.surface.page.normal}",
		},
		children: [
			{
				kind: "ref",
				id: "primary-cta",
				component: "mol/primary-cta-bar",
				props: {
					primaryLabel: "다음",
					disabled: "true",
				},
				layoutAlign: "STRETCH",
			},
		],
	},
} as const;
