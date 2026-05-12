"use client";

import { PrimaryCTABar } from "../../../molecules/cta-bar";
import { createScreenExportAttributes } from "@pxds/pxds-layout/screen-export";

type Props = {
	disabled?: boolean;
};

export function ActionAreaTerms({ disabled = true }: Props) {
	return (
		<div
			{...createScreenExportAttributes({
				type: "ActionAreaTerms",
				id: "action-area-terms",
				props: {
					componentId: "ogn-mbr-action-area-terms",
					disabled,
					primaryLabel: "다음",
				},
			})}
			style={{ width: "100%" }}
		>
			<PrimaryCTABar primaryLabel="다음" disabled={disabled} />
		</div>
	);
}
