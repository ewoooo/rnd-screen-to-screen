"use client";

import type { ReactNode } from "react";
import { BottomNavigation, BottomNavigationItem } from "@wanteddev/wds";
import { IconHome, IconList, IconPerson } from "@wanteddev/wds-icon";

// synthesized ogn/GNB (C7) → WDS BottomNavigation 매핑
// Source: data/binding/overrides/gnb.json
export type GnbItem = {
	value: string;
	label: string;
	icon: ReactNode;
};

const DEFAULT_ITEMS: GnbItem[] = [
	{ value: "discover", label: "발견", icon: <IconHome width={24} height={24} /> },
	{ value: "category", label: "카테고리", icon: <IconList width={24} height={24} /> },
	{
		value: "subscription",
		label: "나의 구독",
		icon: <IconPerson width={24} height={24} />,
	},
];

export function GnbPilot({
	value,
	onValueChange,
	items = DEFAULT_ITEMS,
}: {
	value: string;
	onValueChange?: (v: string) => void;
	items?: GnbItem[];
}) {
	return (
		<BottomNavigation value={value} onValueChange={onValueChange}>
			{items.map((item) => (
				<BottomNavigationItem
					key={item.value}
					value={item.value}
					label={item.label}
					icon={item.icon}
				/>
			))}
		</BottomNavigation>
	);
}
