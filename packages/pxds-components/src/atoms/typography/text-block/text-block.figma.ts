export const textBlockFigmaSpec = {
	$schema: "component-spec-v1" as const,
	name: "atom/text-block",
	category: "atom" as const,
	description: "PXDS typography primitive for screen copy.",
	base: {
		layout: {
			mode: "HORIZONTAL" as const,
			primaryAxisSizingMode: "AUTO" as const,
			counterAxisSizingMode: "AUTO" as const,
		},
		children: [
			{
				kind: "text" as const,
				id: "text",
				content: "멤버십 혜택을 한눈에 확인하세요",
				textStyle: "{typography.body1.medium}",
				color: "{semantic.label.normal}",
				autoResize: "WIDTH_AND_HEIGHT" as const,
				exposeAs: "text",
			},
		],
	},
};
