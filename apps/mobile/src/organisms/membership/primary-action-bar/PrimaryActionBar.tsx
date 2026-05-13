"use client";

import { PrimaryCTABar } from "@pxds/pxds-components/molecules";
import type { PrimaryActionBarProps } from "./PrimaryActionBar.config";

export function MembershipPrimaryActionBar({
	primaryLabel,
	secondaryLabel,
	disabled,
}: PrimaryActionBarProps) {
	return (
		<PrimaryCTABar
			primaryLabel={primaryLabel}
			secondaryLabel={secondaryLabel}
			disabled={disabled}
		/>
	);
}
