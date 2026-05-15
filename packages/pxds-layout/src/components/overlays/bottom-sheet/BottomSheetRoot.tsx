"use client";

import { Modal, NoSsr } from "@wanteddev/wds";
import type { BottomSheetRootProps } from "./BottomSheet.types";

export function BottomSheetRoot({
	open,
	defaultOpen,
	onOpenChange,
	children,
}: BottomSheetRootProps) {
	return (
		<NoSsr>
			<Modal
				open={open}
				defaultOpen={defaultOpen}
				onOpenChange={onOpenChange}
			>
				{children}
			</Modal>
		</NoSsr>
	);
}
