"use client";

import { ModalDimmer } from "@wanteddev/wds";
import type { CSSProperties } from "react";

type Props = {
	background?: CSSProperties["background"];
};

export function BottomSheetBackdrop({
	background = "var(--pxds-bottom-sheet-backdrop)",
}: Props) {
	return (
		<ModalDimmer
			sx={{
				background,
			}}
		/>
	);
}
