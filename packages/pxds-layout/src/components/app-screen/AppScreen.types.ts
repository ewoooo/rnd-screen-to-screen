import type { ReactNode } from "react";

export type AppScreenHeaderPreset =
	| "standard"
	| "form-entry"
	| "pattern-107"
	| "genui-text-section-117";

export type AppScreenActionBarPreset =
	| "compact-action"
	| "default-action"
	| "guided-action"
	| "primary-cta"
	| "pattern-102"
	| "cx-default-108"
	| "cx-with-text-154"
	| "single-primary-cta";

export type AppScreenContentProps = {
	children: ReactNode;
	systemHeader?: ReactNode;
	header?: ReactNode;
	top?: ReactNode;
	bottom?: ReactNode;
	background?: string;
	headerPreset?: AppScreenHeaderPreset;
	actionBarPreset?: AppScreenActionBarPreset;
};
