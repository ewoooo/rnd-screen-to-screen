"use client";

import type { ReactNode } from "react";

import { ButtonTabbarPilot } from "./ButtonTabbarPilot";

export type OrgTabbarItem = {
	key: string;
	label: string;
	icon: ReactNode;
};

// Figma tabbar (extras, 64h) — 화면 하단 탭바 (4 ButtonTabbarPilot + selected indicator)
// Source: data/binding/overrides/org-tabbar.json
export function OrgTabbarPilot({
	items,
	activeKey,
	onSelect,
}: {
	items: readonly OrgTabbarItem[];
	activeKey?: string;
	onSelect?: (key: string) => void;
}) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				gap: 6,
				padding: "0 35px",
				background: "white",
				backdropFilter: "blur(20px)",
				boxShadow: "0 8px 16px rgba(0,0,0,0.24)",
			}}
		>
			{items.map((it) => {
				const isActive = it.key === activeKey;
				return (
					<div key={it.key} style={{ position: "relative" }}>
						{isActive && (
							<div
								aria-hidden="true"
								style={{
									position: "absolute",
									top: 0,
									left: "50%",
									transform: "translateX(-50%)",
									width: 68,
									height: 10,
									background: "#000",
									borderRadius: "0 0 4px 4px",
								}}
							/>
						)}
						<ButtonTabbarPilot
							label={it.label}
							icon={it.icon}
							state={isActive ? "select" : "default"}
							onClick={() => onSelect?.(it.key)}
						/>
					</div>
				);
			})}
		</div>
	);
}
