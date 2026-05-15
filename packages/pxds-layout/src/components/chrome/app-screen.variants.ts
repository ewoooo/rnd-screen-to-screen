export type ResolvedAppScreenHeaderPreset = "standard" | "form-entry";
export type ResolvedAppScreenActionBarPreset =
	| "compact-action"
	| "default-action"
	| "guided-action"
	| "primary-cta";

export const appScreenFrameVariants = () => "app-screen-frame";

export const appScreenChromeSlotVariants = ({
	slot,
}: {
	slot: "systemHeader" | "header" | "bottom";
}) => ["app-screen-chrome-slot", `app-screen-chrome-slot--${slot}`].join(" ");

export const appScreenHeaderPresetMetrics = {
	standard: {
		height: "107px",
		systemHeaderHeight: "59px",
		appHeaderHeight: "48px",
	},
	"form-entry": {
		height: "117px",
		systemHeaderHeight: "61px",
		appHeaderHeight: "56px",
	},
} satisfies Record<
	ResolvedAppScreenHeaderPreset,
	{
		height: string;
		systemHeaderHeight: string;
		appHeaderHeight: string;
	}
>;

export const appScreenActionBarPresetMetrics = {
	"compact-action": {
		height: "102px",
		contentBottomPadding: "102px",
	},
	"default-action": {
		height: "108px",
		contentBottomPadding: "108px",
	},
	"guided-action": {
		height: "154px",
		contentBottomPadding: "154px",
	},
	"primary-cta": {
		height: "108px",
		contentBottomPadding: "108px",
	},
} satisfies Record<
	ResolvedAppScreenActionBarPreset,
	{
		height: string;
		contentBottomPadding: string;
	}
>;
