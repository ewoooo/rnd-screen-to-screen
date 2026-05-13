export const supportedIconSizes = [40, 24, 20, 16, 12] as const;

export type IconSize = (typeof supportedIconSizes)[number];
type SourceIconSize = IconSize | 32;

/**
 * Original SVG filenames are normalized to readable single names:
 * `Bubble.svg`, `AiSearch.svg`.
 *
 * When one type has multiple source sizes, the size suffix avoids collisions:
 * `ArrowLeft16.svg`, `ArrowLeft24.svg`.
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
			24: iconFile("AiSearch.svg", new URL("./originals/AiSearch.svg", import.meta.url).href),
		},
	},
	all: {
		sizes: [20],
		files: {
			20: iconFile("All.svg", new URL("./originals/All.svg", import.meta.url).href),
		},
	},
	"arrow-down": {
		sizes: [16],
		files: {
			16: iconFile("ArrowDown.svg", new URL("./originals/ArrowDown.svg", import.meta.url).href),
		},
	},
	"arrow-left": {
		sizes: [16, 24],
		files: {
			16: iconFile("ArrowLeft16.svg", new URL("./originals/ArrowLeft16.svg", import.meta.url).href),
			24: iconFile("ArrowLeft24.svg", new URL("./originals/ArrowLeft24.svg", import.meta.url).href),
		},
	},
	"arrow-right": {
		sizes: [16],
		files: {
			16: iconFile("ArrowRight.svg", new URL("./originals/ArrowRight.svg", import.meta.url).href),
		},
	},
	"arrow-up": {
		sizes: [16],
		files: {
			16: iconFile("ArrowUp.svg", new URL("./originals/ArrowUp.svg", import.meta.url).href),
		},
	},
	barcode: {
		sizes: [24],
		files: {
			24: iconFile("Barcode.svg", new URL("./originals/Barcode.svg", import.meta.url).href),
		},
	},
	benefit: {
		sizes: [16],
		files: {
			16: iconFile("Benefit.svg", new URL("./originals/Benefit.svg", import.meta.url).href),
		},
	},
	bill: {
		sizes: [40],
		files: {
			40: iconFile("Bill.svg", new URL("./originals/Bill.svg", import.meta.url).href),
		},
	},
	bubble: {
		sizes: [12],
		files: {
			12: iconFile("Bubble.svg", new URL("./originals/Bubble.svg", import.meta.url).href),
		},
	},
	calender: {
		sizes: [20],
		files: {
			20: iconFile("Calender.svg", new URL("./originals/Calender.svg", import.meta.url).href),
		},
	},
	call: {
		sizes: [16],
		files: {
			16: iconFile("Call.svg", new URL("./originals/Call.svg", import.meta.url).href),
		},
	},
	close: {
		sizes: [24],
		files: {
			24: iconFile("Close.svg", new URL("./originals/Close.svg", import.meta.url).href),
		},
	},
	content: {
		sizes: [40],
		files: {
			40: iconFile("Content.svg", new URL("./originals/Content.svg", import.meta.url).href),
		},
	},
	data: {
		sizes: [16, 40],
		files: {
			16: iconFile("Data16.svg", new URL("./originals/Data16.svg", import.meta.url).href),
			40: iconFile("Data40.svg", new URL("./originals/Data40.svg", import.meta.url).href),
		},
	},
	"data-share": {
		sizes: [20],
		files: {
			20: iconFile("DataShare.svg", new URL("./originals/DataShare.svg", import.meta.url).href),
		},
	},
	device: {
		sizes: [40],
		files: {
			40: iconFile("Device.svg", new URL("./originals/Device.svg", import.meta.url).href),
		},
	},
	download: {
		sizes: [12],
		files: {
			12: iconFile("Download.svg", new URL("./originals/Download.svg", import.meta.url).href),
		},
	},
	dropdown: {
		sizes: [16],
		files: {
			16: iconFile("Dropdown.svg", new URL("./originals/Dropdown.svg", import.meta.url).href),
		},
	},
	family: {
		sizes: [40],
		files: {
			40: iconFile("Family.svg", new URL("./originals/Family.svg", import.meta.url).href),
		},
	},
	"family-data": {
		sizes: [20],
		files: {
			20: iconFile("FamilyData.svg", new URL("./originals/FamilyData.svg", import.meta.url).href),
		},
	},
	heart: {
		sizes: [12],
		files: {
			12: iconFile("Heart.svg", new URL("./originals/Heart.svg", import.meta.url).href),
		},
	},
	history: {
		sizes: [24],
		files: {
			24: iconFile("History.svg", new URL("./originals/History.svg", import.meta.url).href),
		},
	},
	home: {
		sizes: [24],
		files: {
			24: iconFile("Home.svg", new URL("./originals/Home.svg", import.meta.url).href),
		},
	},
	info: {
		sizes: [20],
		files: {
			20: iconFile("Info.svg", new URL("./originals/Info.svg", import.meta.url).href),
		},
	},
	logo: {
		sizes: [32],
		files: {
			32: iconFile("Logo.svg", new URL("./originals/Logo.svg", import.meta.url).href),
		},
	},
	menu: {
		sizes: [24],
		files: {
			24: iconFile("Menu.svg", new URL("./originals/Menu.svg", import.meta.url).href),
		},
	},
	"mobile-plan": {
		sizes: [16],
		files: {
			16: iconFile("MobilePlan.svg", new URL("./originals/MobilePlan.svg", import.meta.url).href),
		},
	},
	money: {
		sizes: [16],
		files: {
			16: iconFile("Money.svg", new URL("./originals/Money.svg", import.meta.url).href),
		},
	},
	netflix: {
		sizes: [16],
		files: {
			16: iconFile("Netflix.svg", new URL("./originals/Netflix.svg", import.meta.url).href),
		},
	},
	payment: {
		sizes: [20],
		files: {
			20: iconFile("Payment.svg", new URL("./originals/Payment.svg", import.meta.url).href),
		},
	},
	percent: {
		sizes: [16],
		files: {
			16: iconFile("Percent.svg", new URL("./originals/Percent.svg", import.meta.url).href),
		},
	},
	plus: {
		sizes: [16],
		files: {
			16: iconFile("Plus.svg", new URL("./originals/Plus.svg", import.meta.url).href),
		},
	},
	point: {
		sizes: [16, 40],
		files: {
			16: iconFile("Point16.svg", new URL("./originals/Point16.svg", import.meta.url).href),
			40: iconFile("Point40.svg", new URL("./originals/Point40.svg", import.meta.url).href),
		},
	},
	"rate-plan": {
		sizes: [20],
		files: {
			20: iconFile("RatePlan.svg", new URL("./originals/RatePlan.svg", import.meta.url).href),
		},
	},
	search: {
		sizes: [20],
		files: {
			20: iconFile("Search.svg", new URL("./originals/Search.svg", import.meta.url).href),
		},
	},
	shop: {
		sizes: [24],
		files: {
			24: iconFile("Shop.svg", new URL("./originals/Shop.svg", import.meta.url).href),
		},
	},
	"shop-1": {
		sizes: [24],
		files: {
			24: iconFile("Shop-1.svg", new URL("./originals/Shop-1.svg", import.meta.url).href),
		},
	},
	subscribe: {
		sizes: [16],
		files: {
			16: iconFile("Subscribe.svg", new URL("./originals/Subscribe.svg", import.meta.url).href),
		},
	},
	terminal: {
		sizes: [16],
		files: {
			16: iconFile("Terminal.svg", new URL("./originals/Terminal.svg", import.meta.url).href),
		},
	},
	tu: {
		sizes: [16],
		files: {
			16: iconFile("TU.svg", new URL("./originals/TU.svg", import.meta.url).href),
		},
	},
	tw: {
		sizes: [16],
		files: {
			16: iconFile("TW.svg", new URL("./originals/TW.svg", import.meta.url).href),
		},
	},
	voice: {
		sizes: [20],
		files: {
			20: iconFile("Voice.svg", new URL("./originals/Voice.svg", import.meta.url).href),
		},
	},
	youtube: {
		sizes: [16],
		files: {
			16: iconFile("Youtube.svg", new URL("./originals/Youtube.svg", import.meta.url).href),
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
