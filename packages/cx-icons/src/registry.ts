export const supportedIconSizes = [12, 16, 20, 24, 32, 40] as const;

export type IconSize = (typeof supportedIconSizes)[number];

/**
 * Original SVG filenames are kept exactly as exported from Figma:
 * `Size={size}, Type={type}.svg`.
 *
 * The public icon type is normalized from Type to kebab-case:
 * `ArrowLeft` -> `arrow-left`, `AiSearch` -> `ai-search`,
 * `Shop-1` -> `shop-1`.
 */

export type IconFile = {
	readonly originalFileName: string;
	readonly src: string;
};

type IconRegistryEntry = {
	readonly sizes: readonly IconSize[];
	readonly files: Partial<Record<IconSize, IconFile>>;
};

function iconFile(originalFileName: string): IconFile {
	return {
		originalFileName,
		src: new URL(`./originals/${originalFileName}`, import.meta.url).href,
	};
}

export const iconRegistry = {
	"ai-search": {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=AiSearch.svg"),
		},
	},
	all: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=All.svg"),
		},
	},
	"arrow-down": {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=ArrowDown.svg"),
		},
	},
	"arrow-left": {
		sizes: [16, 24],
		files: {
			16: iconFile("Size=16, Type=ArrowLeft.svg"),
			24: iconFile("Size=24, Type=ArrowLeft.svg"),
		},
	},
	"arrow-right": {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=ArrowRight.svg"),
		},
	},
	"arrow-up": {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=ArrowUp.svg"),
		},
	},
	barcode: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Barcode.svg"),
		},
	},
	benefit: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=Benefit.svg"),
		},
	},
	bill: {
		sizes: [40],
		files: {
			40: iconFile("Size=40, Type=Bill.svg"),
		},
	},
	bubble: {
		sizes: [12],
		files: {
			12: iconFile("Size=12, Type=Bubble.svg"),
		},
	},
	calender: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=Calender.svg"),
		},
	},
	call: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=call.svg"),
		},
	},
	close: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Close.svg"),
		},
	},
	content: {
		sizes: [40],
		files: {
			40: iconFile("Size=40, Type=Content.svg"),
		},
	},
	data: {
		sizes: [16, 40],
		files: {
			16: iconFile("Size=16, Type=data.svg"),
			40: iconFile("Size=40, Type=Data.svg"),
		},
	},
	"data-share": {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=DataShare.svg"),
		},
	},
	device: {
		sizes: [40],
		files: {
			40: iconFile("Size=40, Type=Device.svg"),
		},
	},
	download: {
		sizes: [12],
		files: {
			12: iconFile("Size=12, Type=Download.svg"),
		},
	},
	dropdown: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=Dropdown.svg"),
		},
	},
	family: {
		sizes: [40],
		files: {
			40: iconFile("Size=40, Type=Family.svg"),
		},
	},
	"family-data": {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=FamilyData.svg"),
		},
	},
	heart: {
		sizes: [12],
		files: {
			12: iconFile("Size=12, Type=Heart.svg"),
		},
	},
	history: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=history.svg"),
		},
	},
	home: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Home.svg"),
		},
	},
	info: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=Info.svg"),
		},
	},
	logo: {
		sizes: [32],
		files: {
			32: iconFile("Size=32, Type=Logo.svg"),
		},
	},
	menu: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Menu.svg"),
		},
	},
	"mobile-plan": {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=MobilePlan.svg"),
		},
	},
	money: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=money.svg"),
		},
	},
	netflix: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=netflix.svg"),
		},
	},
	payment: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=Payment.svg"),
		},
	},
	percent: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=percent.svg"),
		},
	},
	plus: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=Plus.svg"),
		},
	},
	point: {
		sizes: [16, 40],
		files: {
			16: iconFile("Size=16, Type=point.svg"),
			40: iconFile("Size=40, Type=Point.svg"),
		},
	},
	"rate-plan": {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=RatePlan.svg"),
		},
	},
	search: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=search.svg"),
		},
	},
	shop: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Shop.svg"),
		},
	},
	"shop-1": {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Shop-1.svg"),
		},
	},
	subscribe: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=Subscribe.svg"),
		},
	},
	terminal: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=Terminal.svg"),
		},
	},
	tu: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=TU.svg"),
		},
	},
	tw: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=TW.svg"),
		},
	},
	voice: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=Voice.svg"),
		},
	},
	youtube: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=youtube.svg"),
		},
	},
} as const satisfies Record<string, IconRegistryEntry>;

export type IconType = keyof typeof iconRegistry;

export function getIconFile(type: IconType, size: IconSize): IconFile | undefined {
	const files: Partial<Record<IconSize, IconFile>> = iconRegistry[type].files;
	return files[size];
}
