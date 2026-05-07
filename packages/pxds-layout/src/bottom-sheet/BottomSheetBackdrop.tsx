"use client";

import { ModalDimmer } from "@pxds/pxds-components/core";
import type { CSSProperties } from "react";

type Props = {
	background?: CSSProperties["background"];
};

export function BottomSheetBackdrop({
	background = "rgba(0, 0, 0, 0.42)",
}: Props) {
	return (
		<ModalDimmer
			sx={{
				background,
			}}
		/>
	);
}
