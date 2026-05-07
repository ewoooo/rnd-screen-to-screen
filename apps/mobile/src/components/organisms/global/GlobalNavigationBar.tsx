import { BottomNavigation, BottomNavigationItem } from "@pxds/pxds-components/core";
import {
	IconBusinessBag,
	IconBusinessBagFill,
	IconHomeFill,
	IconSearch,
} from "@pxds/pxds-icons";
import type { ReactNode } from "react";

import { Box } from "@pxds/pxds-layout/primitives";

type GnbKey = "my" | "search" | "shop";

export type GnbTab = { key: GnbKey; label: string; active: boolean };

const TAB_LABELS: Record<GnbKey, string> = {
	my: "MY",
	search: "검색",
	shop: "쇼핑",
};

const TAB_ORDER: GnbKey[] = ["my", "search", "shop"];

const ICON_SIZE = 24;

const tabIcon = (key: GnbKey, active: boolean): ReactNode => {
	if (key === "my")
		return <IconHomeFill width={ICON_SIZE} height={ICON_SIZE} />;
	if (key === "search")
		return <IconSearch width={ICON_SIZE} height={ICON_SIZE} />;
	return active ? (
		<IconBusinessBagFill width={ICON_SIZE} height={ICON_SIZE} />
	) : (
		<IconBusinessBag width={ICON_SIZE} height={ICON_SIZE} />
	);
};

type Props = {
	/** 활성 탭. 기본 "my". `tabs` 가 있으면 그쪽 active 가 우선. */
	active?: GnbKey;
	/** 명시 탭 정의 — 라벨 커스텀이 필요한 드문 경우만 사용. */
	tabs?: GnbTab[];
};

/**
 * T 앱 글로벌 GNB — 모든 도메인 화면(home/search/product/...)이 공유하는 단일 하단 chrome.
 * 배경은 `semantic-background-normal-normal` 로 통일. 자체 absolute/blur/brand tint 없음.
 */
export function GlobalNavigationBar({ active = "my", tabs }: Props) {
	const resolved: GnbTab[] =
		tabs ??
		TAB_ORDER.map((key) => ({
			key,
			label: TAB_LABELS[key],
			active: key === active,
		}));
	const activeKey = resolved.find((t) => t.active)?.key ?? resolved[0]?.key;
	return (
		<Box background="var(--semantic-background-normal-normal)">
			<BottomNavigation value={activeKey}>
				{resolved.map((tab) => (
					<BottomNavigationItem
						key={tab.key}
						value={tab.key}
						label={tab.label}
						icon={tabIcon(tab.key, tab.active)}
					/>
				))}
			</BottomNavigation>
		</Box>
	);
}
