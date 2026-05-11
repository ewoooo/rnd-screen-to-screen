"use client";

import { Modal, NoSsr } from "@wanteddev/wds";
import type { ReactNode } from "react";

type Props = {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: ReactNode;
};

export function BottomSheetRoot({
	open,
	defaultOpen,
	onOpenChange,
	children,
}: Props) {
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
