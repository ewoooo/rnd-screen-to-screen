"use client";

import { ModalContainer, ModalContent } from "@wanteddev/wds";
import type { CSSProperties, ReactNode } from "react";

import { useMobileFrame } from "@/components/templates/app-screen";

import { BottomSheetBackdrop } from "./BottomSheetBackdrop";

type Props = {
	handle?: boolean;
	peekHeight?: number;
	gap?: CSSProperties["gap"];
	backdrop?: ReactNode;
	children: ReactNode;
};

export function BottomSheetContent({
	handle = true,
	peekHeight,
	gap = "var(--spacing-20)",
	backdrop = <BottomSheetBackdrop />,
	children,
}: Props) {
	const frame = useMobileFrame();

	return (
		<ModalContainer
			variant="bottom"
			handle={handle}
			peekHeight={peekHeight}
			container={frame ?? undefined}
			dimmer={backdrop}
			wrapperProps={{
				style: frame
					? {
							position: "absolute",
							inset: 0,
							width: "100%",
							height: "100%",
						}
					: undefined,
				sx: {
					width: "100%",
					height: "100%",
				},
			}}
		>
			<ModalContent
				gap={gap}
				sx={{
					padding:
						"var(--spacing-16) var(--spacing-24) var(--spacing-24)",
				}}
			>
				{children}
			</ModalContent>
		</ModalContainer>
	);
}
