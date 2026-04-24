"use client";

import { FlexBox, IconButton } from "@wanteddev/wds";
import { IconBusinessBag, IconSearch } from "@wanteddev/wds-icon";
import type { ReactNode } from "react";

import { ButtonIconPilot } from "./ButtonIconPilot";

// Figma header (extras, 360×64) — 화면 상단 chrome (gradient bg + backdrop-blur + search/cart)
// Source: data/binding/overrides/org-header.json
export function OrgHeaderPilot({
	leading,
	showSearch = true,
	onSearch,
	showCart = true,
	badgeCount,
	onCart,
}: {
	leading?: ReactNode;
	showSearch?: boolean;
	onSearch?: () => void;
	showCart?: boolean;
	badgeCount?: number;
	onCart?: () => void;
}) {
	return (
		<div
			style={{
				width: 360,
				height: 64,
				padding: 18,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				background:
					"linear-gradient(to bottom, #ffffff 0%, rgba(246,246,246,0.8) 100%)",
				backdropFilter: "blur(20px)",
			}}
		>
			<div style={{ width: 28, height: 28, display: "flex", alignItems: "center" }}>
				{leading}
			</div>
			<FlexBox flexDirection="row" gap={12} alignItems="center">
				{showSearch && (
					<IconButton variant="normal" size="small" onClick={onSearch} aria-label="search">
						<IconSearch width={24} height={24} />
					</IconButton>
				)}
				{showCart && (
					<ButtonIconPilot
						icon={<IconBusinessBag width={24} height={24} />}
						badgeCount={badgeCount}
						onClick={onCart}
					/>
				)}
			</FlexBox>
		</div>
	);
}
