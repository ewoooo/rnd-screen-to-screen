"use client";

import { IconButton } from "@wanteddev/wds";
import { IconClose } from "@wanteddev/wds-icon";

// Figma header-bottomsheet (molecule, 360×50) → bottomsheet 상단 헤더 (라운드 30, bg 흰색)
// Source: data/binding/overrides/header-bottomsheet.json
export function HeaderBottomsheetPilot({
	showClose = true,
	onClose,
}: {
	showClose?: boolean;
	onClose?: () => void;
}) {
	return (
		<div
			style={{
				width: 360,
				height: 50,
				padding: "14px 22px 0",
				background: "#ffffff",
				borderRadius: "30px 30px 0 0",
				display: "flex",
				justifyContent: "flex-end",
				alignItems: "flex-start",
			}}
		>
			{showClose && (
				<IconButton variant="normal" size="small" onClick={onClose}>
					<IconClose width={24} height={24} />
				</IconButton>
			)}
		</div>
	);
}
