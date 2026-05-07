"use client";

import { ModalDimmer } from "@pxds/pxds-components/core";
import { BOTTOM_SHEET_BACKDROP } from "@pxds/pxds-tokens";
import type { CSSProperties } from "react";

type Props = {
	background?: CSSProperties["background"];
};

export function BottomSheetBackdrop({
	background = BOTTOM_SHEET_BACKDROP,
}: Props) {
	return (
		<ModalDimmer
			sx={{
				background,
			}}
		/>
	);
}
