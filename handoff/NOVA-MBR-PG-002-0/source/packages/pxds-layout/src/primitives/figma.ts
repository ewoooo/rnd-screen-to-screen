export const flexFigmaSpec = {
	$schema: "component-spec-v1",
	name: "layout/flex",
	category: "atom",
	description: "PXDS flex primitive represented as a Figma auto-layout wrapper.",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "AUTO",
			width: "FILL",
		},
		children: [],
	},
} as const;

export const hStackFigmaSpec = {
	$schema: "component-spec-v1",
	name: "layout/h-stack",
	category: "atom",
	description: "PXDS horizontal stack primitive represented as a Figma auto-layout wrapper.",
	base: {
		layout: {
			mode: "HORIZONTAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
		},
		children: [],
	},
} as const;

export const vStackFigmaSpec = {
	$schema: "component-spec-v1",
	name: "layout/v-stack",
	category: "atom",
	description: "PXDS vertical stack primitive represented as a Figma auto-layout wrapper.",
	base: {
		layout: {
			mode: "VERTICAL",
			primaryAxisSizingMode: "AUTO",
			counterAxisSizingMode: "FIXED",
			width: "FILL",
		},
		children: [],
	},
} as const;
