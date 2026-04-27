import iconShopLine from "@/assets/icons/ico_line_shop.svg";
import iconSearch from "@/assets/icons/ico_search.svg";
import iconHome from "@/assets/icons/ico_solid_home.svg";
import iconShopSolid from "@/assets/icons/ico_solid_shop.svg";

import { GNB_BORDER, PAGE_BG_SEMI, T_BRAND } from "@/components/home-kit";
import { Icon } from "@/components/system";

type GnbKey = "my" | "search" | "shop";

export type GnbTab = { key: GnbKey; label: string; active: boolean };

const defaultTabs: GnbTab[] = [
	{ key: "my", label: "MY", active: true },
	{ key: "search", label: "검색", active: false },
	{ key: "shop", label: "쇼핑", active: false },
];

/** 탭 key + active 상태에 따라 아이콘 결정. shop만 active/inactive 분기. */
const tabIcon = (key: GnbKey, active: boolean) => {
	if (key === "my") return iconHome;
	if (key === "search") return iconSearch;
	return active ? iconShopSolid : iconShopLine;
};

/**
 * T 앱 글로벌 GNB — 하단 absolute.
 * 탭 3개 (MY / 검색 / 쇼핑). active 만 T_BRAND 컬러 + 풀 opacity.
 * backdrop-blur 반투명 배경.
 */
export function GlobalNavigationBar({
	tabs = defaultTabs,
}: {
	tabs?: GnbTab[];
}) {
	return (
		<nav
			style={{
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
				background: PAGE_BG_SEMI,
				backdropFilter: "blur(4px)",
				WebkitBackdropFilter: "blur(4px)",
				borderTop: `1px solid ${GNB_BORDER}`,
				display: "flex",
				justifyContent: "center",
				gap: "var(--spacing-12)",
				padding: "var(--spacing-12) 0 var(--spacing-24)",
			}}
		>
			{tabs.map((tab) => {
				const color = tab.active
					? T_BRAND
					: "var(--semantic-label-alternative)";
				return (
					<div
						key={tab.key}
						style={{
							width: 96,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "var(--spacing-2)",
						}}
					>
						<Icon
							src={tabIcon(tab.key, tab.active)}
							width={24}
							height={24}
							color={color}
						/>
						<span
							style={{
								fontSize: 11,
								fontWeight: 600,
								color,
								letterSpacing: "-0.44px",
							}}
						>
							{tab.label}
						</span>
					</div>
				);
			})}
		</nav>
	);
}
