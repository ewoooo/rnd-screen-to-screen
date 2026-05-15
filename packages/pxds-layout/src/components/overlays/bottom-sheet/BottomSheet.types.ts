import type { CSSProperties, ReactNode } from "react";

export type BottomSheetRootProps = {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: ReactNode;
};

export type BottomSheetBackdropProps = {
	background?: CSSProperties["background"];
};

export type BottomSheetContentProps = {
	handle?: boolean;
	peekHeight?: number;
	gap?: CSSProperties["gap"];
	backdrop?: ReactNode;
	children: ReactNode;
};

export type BottomSheetProps = BottomSheetRootProps &
	Omit<BottomSheetContentProps, "children">;
