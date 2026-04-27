import {
	BottomNavigation,
	BottomNavigationItem,
	TopNavigation,
	TopNavigationButton,
} from "@wanteddev/wds";
import type { ReactNode } from "react";

import iconSearch from "@/assets/icons/ico_search.svg";
import iconHome from "@/assets/icons/ico_solid_home.svg";
import iconShop from "@/assets/icons/ico_solid_shop.svg";

import { ScreenChrome } from "@/components/patterns";
import { Icon, StatusBar } from "@/components/system";

type Props = {
	children: ReactNode;
	purchaseBar: ReactNode;
};

const chromeBg = "rgba(255, 255, 255, 0.86)";

export function ProductShell({ children, purchaseBar }: Props) {
	return (
		<ScreenChrome
			topBar={<ProductTopBar />}
			stickyAction={purchaseBar}
			bottomBar={<ProductBottomBar />}
		>
			{children}
		</ScreenChrome>
	);
}

function ProductTopBar() {
	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 10,
				background: chromeBg,
				backdropFilter: "blur(7px)",
				WebkitBackdropFilter: "blur(7px)",
			}}
		>
			<StatusBar />
			<TopNavigation
				variant="normal"
				background={false}
				leadingContent={
					<TopNavigationButton variant="text" color="assistive">
						이전
					</TopNavigationButton>
				}
				trailingContent={
					<TopNavigationButton variant="icon" color="assistive">
						<Icon src={iconSearch} width={22} height={22} color="currentColor" />
					</TopNavigationButton>
				}
			>
				상품 상세
			</TopNavigation>
		</div>
	);
}

function ProductBottomBar() {
	return (
		<div
			style={{
				position: "absolute",
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 12,
				background: chromeBg,
				backdropFilter: "blur(4px)",
				WebkitBackdropFilter: "blur(4px)",
				borderTop: "1px solid var(--semantic-line-solid-alternative)",
			}}
		>
			<BottomNavigation value="shop">
				<BottomNavigationItem
					value="my"
					label="MY"
					icon={<Icon src={iconHome} width={24} height={24} color="currentColor" />}
				/>
				<BottomNavigationItem
					value="search"
					label="검색"
					icon={<Icon src={iconSearch} width={24} height={24} color="currentColor" />}
				/>
				<BottomNavigationItem
					value="shop"
					label="쇼핑"
					icon={<Icon src={iconShop} width={24} height={24} color="currentColor" />}
				/>
			</BottomNavigation>
		</div>
	);
}
