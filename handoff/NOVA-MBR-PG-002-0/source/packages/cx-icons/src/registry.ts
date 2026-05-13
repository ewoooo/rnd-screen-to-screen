export const supportedIconSizes = [40, 24, 20, 16, 12] as const;

export type IconSize = (typeof supportedIconSizes)[number];
type SourceIconSize = IconSize | 32;

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

export const recolorableIconTypes = [
	"ai-search",
	"all",
	"arrow-down",
	"arrow-left",
	"arrow-right",
	"arrow-up",
	"barcode",
	"bubble",
	"calender",
	"close",
	"data-share",
	"download",
	"dropdown",
	"family-data",
	"heart",
	"history",
	"home",
	"info",
	"menu",
	"payment",
	"plus",
	"rate-plan",
	"search",
	"shop",
	"shop-1",
	"voice",
] as const;

export type RecolorableIconType = (typeof recolorableIconTypes)[number];

type IconRegistryEntry = {
	readonly sizes: readonly IconSize[];
	readonly files: Record<IconSize, IconFile>;
	readonly recolorable: boolean;
};

type SourceIconRegistryEntry = {
	readonly sizes: readonly SourceIconSize[];
	readonly files: Partial<Record<SourceIconSize, IconFile>>;
};

function iconFile(originalFileName: string, src: string): IconFile {
	return {
		originalFileName,
		src,
	};
}

const sourceIconRegistry = {
	"ai-search": {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=AiSearch.svg", new URL("./originals/Size=24, Type=AiSearch.svg", import.meta.url).href),
		},
	},
	all: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=All.svg", new URL("./originals/Size=20, Type=All.svg", import.meta.url).href),
		},
	},
	"arrow-down": {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=ArrowDown.svg", new URL("./originals/Size=16, Type=ArrowDown.svg", import.meta.url).href),
		},
	},
	"arrow-left": {
		sizes: [16, 24],
		files: {
			16: iconFile("Size=16, Type=ArrowLeft.svg", new URL("./originals/Size=16, Type=ArrowLeft.svg", import.meta.url).href),
			24: iconFile("Size=24, Type=ArrowLeft.svg", new URL("./originals/Size=24, Type=ArrowLeft.svg", import.meta.url).href),
		},
	},
	"arrow-right": {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=ArrowRight.svg", new URL("./originals/Size=16, Type=ArrowRight.svg", import.meta.url).href),
		},
	},
	"arrow-up": {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=ArrowUp.svg", new URL("./originals/Size=16, Type=ArrowUp.svg", import.meta.url).href),
		},
	},
	barcode: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Barcode.svg", new URL("./originals/Size=24, Type=Barcode.svg", import.meta.url).href),
		},
	},
	benefit: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=Benefit.svg", new URL("./originals/Size=16, Type=Benefit.svg", import.meta.url).href),
		},
	},
	bill: {
		sizes: [40],
		files: {
			40: iconFile("Size=40, Type=Bill.svg", new URL("./originals/Size=40, Type=Bill.svg", import.meta.url).href),
		},
	},
	bubble: {
		sizes: [12],
		files: {
			12: iconFile("Size=12, Type=Bubble.svg", new URL("./originals/Size=12, Type=Bubble.svg", import.meta.url).href),
		},
	},
	calender: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=Calender.svg", new URL("./originals/Size=20, Type=Calender.svg", import.meta.url).href),
		},
	},
	call: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=call.svg", new URL("./originals/Size=16, Type=call.svg", import.meta.url).href),
		},
	},
	close: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Close.svg", new URL("./originals/Size=24, Type=Close.svg", import.meta.url).href),
		},
	},
	content: {
		sizes: [40],
		files: {
			40: iconFile("Size=40, Type=Content.svg", new URL("./originals/Size=40, Type=Content.svg", import.meta.url).href),
		},
	},
	data: {
		sizes: [16, 40],
		files: {
			16: iconFile("Size=16, Type=data.svg", new URL("./originals/Size=16, Type=data.svg", import.meta.url).href),
			40: iconFile("Size=40, Type=Data.svg", new URL("./originals/Size=40, Type=Data.svg", import.meta.url).href),
		},
	},
	"data-share": {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=DataShare.svg", new URL("./originals/Size=20, Type=DataShare.svg", import.meta.url).href),
		},
	},
	device: {
		sizes: [40],
		files: {
			40: iconFile("Size=40, Type=Device.svg", new URL("./originals/Size=40, Type=Device.svg", import.meta.url).href),
		},
	},
	download: {
		sizes: [12],
		files: {
			12: iconFile("Size=12, Type=Download.svg", new URL("./originals/Size=12, Type=Download.svg", import.meta.url).href),
		},
	},
	dropdown: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=Dropdown.svg", new URL("./originals/Size=16, Type=Dropdown.svg", import.meta.url).href),
		},
	},
	family: {
		sizes: [40],
		files: {
			40: iconFile("Size=40, Type=Family.svg", new URL("./originals/Size=40, Type=Family.svg", import.meta.url).href),
		},
	},
	"family-data": {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=FamilyData.svg", new URL("./originals/Size=20, Type=FamilyData.svg", import.meta.url).href),
		},
	},
	heart: {
		sizes: [12],
		files: {
			12: iconFile("Size=12, Type=Heart.svg", new URL("./originals/Size=12, Type=Heart.svg", import.meta.url).href),
		},
	},
	history: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=history.svg", new URL("./originals/Size=24, Type=history.svg", import.meta.url).href),
		},
	},
	home: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Home.svg", new URL("./originals/Size=24, Type=Home.svg", import.meta.url).href),
		},
	},
	info: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=Info.svg", new URL("./originals/Size=20, Type=Info.svg", import.meta.url).href),
		},
	},
	logo: {
		sizes: [32],
		files: {
			32: iconFile("Size=32, Type=Logo.svg", new URL("./originals/Size=32, Type=Logo.svg", import.meta.url).href),
		},
	},
	menu: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Menu.svg", new URL("./originals/Size=24, Type=Menu.svg", import.meta.url).href),
		},
	},
	"mobile-plan": {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=MobilePlan.svg", new URL("./originals/Size=16, Type=MobilePlan.svg", import.meta.url).href),
		},
	},
	money: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=money.svg", new URL("./originals/Size=16, Type=money.svg", import.meta.url).href),
		},
	},
	netflix: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=netflix.svg", new URL("./originals/Size=16, Type=netflix.svg", import.meta.url).href),
		},
	},
	payment: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=Payment.svg", new URL("./originals/Size=20, Type=Payment.svg", import.meta.url).href),
		},
	},
	percent: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=percent.svg", new URL("./originals/Size=16, Type=percent.svg", import.meta.url).href),
		},
	},
	plus: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=Plus.svg", new URL("./originals/Size=16, Type=Plus.svg", import.meta.url).href),
		},
	},
	point: {
		sizes: [16, 40],
		files: {
			16: iconFile("Size=16, Type=point.svg", new URL("./originals/Size=16, Type=point.svg", import.meta.url).href),
			40: iconFile("Size=40, Type=Point.svg", new URL("./originals/Size=40, Type=Point.svg", import.meta.url).href),
		},
	},
	"rate-plan": {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=RatePlan.svg", new URL("./originals/Size=20, Type=RatePlan.svg", import.meta.url).href),
		},
	},
	search: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=search.svg", new URL("./originals/Size=20, Type=search.svg", import.meta.url).href),
		},
	},
	shop: {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Shop.svg", new URL("./originals/Size=24, Type=Shop.svg", import.meta.url).href),
		},
	},
	"shop-1": {
		sizes: [24],
		files: {
			24: iconFile("Size=24, Type=Shop-1.svg", new URL("./originals/Size=24, Type=Shop-1.svg", import.meta.url).href),
		},
	},
	subscribe: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=Subscribe.svg", new URL("./originals/Size=16, Type=Subscribe.svg", import.meta.url).href),
		},
	},
	terminal: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=Terminal.svg", new URL("./originals/Size=16, Type=Terminal.svg", import.meta.url).href),
		},
	},
	tu: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=TU.svg", new URL("./originals/Size=16, Type=TU.svg", import.meta.url).href),
		},
	},
	tw: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=TW.svg", new URL("./originals/Size=16, Type=TW.svg", import.meta.url).href),
		},
	},
	voice: {
		sizes: [20],
		files: {
			20: iconFile("Size=20, Type=Voice.svg", new URL("./originals/Size=20, Type=Voice.svg", import.meta.url).href),
		},
	},
	youtube: {
		sizes: [16],
		files: {
			16: iconFile("Size=16, Type=youtube.svg", new URL("./originals/Size=16, Type=youtube.svg", import.meta.url).href),
		},
	},
} as const satisfies Record<string, SourceIconRegistryEntry>;

export type IconType = keyof typeof sourceIconRegistry;

export const iconRegistry = Object.fromEntries(
	Object.entries(sourceIconRegistry).map(([type, entry]) => [
		type,
		{
			...entry,
			sizes: supportedIconSizes,
			files: buildIconFiles(entry.files),
			recolorable: isRecolorableIconType(type),
		},
	]),
) as unknown as Record<IconType, IconRegistryEntry>;

export function getIconFile(type: IconType, size: IconSize): IconFile | undefined {
	return iconRegistry[type].files[size];
}

function buildIconFiles(
	files: Partial<Record<SourceIconSize, IconFile>>,
): Record<IconSize, IconFile> {
	return Object.fromEntries(
		supportedIconSizes.map((size) => [
			size,
			files[size] ?? files[pickFallbackSize(files, size)],
		]),
	) as Record<IconSize, IconFile>;
}

function pickFallbackSize(
	files: Partial<Record<SourceIconSize, IconFile>>,
	size: IconSize,
): SourceIconSize {
	const availableSizes = Object.keys(files)
		.map(Number)
		.filter((fileSize): fileSize is SourceIconSize => fileSize in files);

	return availableSizes.reduce<SourceIconSize>((closestSize, fileSize) => {
		const currentDistance = Math.abs(fileSize - size);
		const closestDistance = Math.abs(closestSize - size);

		if (currentDistance === closestDistance) {
			return fileSize > closestSize ? fileSize : closestSize;
		}

		return currentDistance < closestDistance ? fileSize : closestSize;
	}, availableSizes[0] ?? size);
}

export function isRecolorableIconType(
	type: string,
): type is RecolorableIconType {
	return recolorableIconTypes.includes(type as RecolorableIconType);
}
