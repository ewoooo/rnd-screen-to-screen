import { TopNavigation, TopNavigationButton } from "@wanteddev/wds";
import { IconSearch } from "@wanteddev/wds-icon";
import type { ReactNode } from "react";

import { GlobalNavigationBar } from "@/components/organisms/global";
import { AppScreen, StatusBar } from "@/components/templates/app-screen";

type Props = {
	children: ReactNode;
	purchaseBar: ReactNode;
};

export function ProductShell({ children, purchaseBar }: Props) {
	return (
		<AppScreen
			top={<ProductTopBar />}
			bottom={
				<>
					{purchaseBar}
					<GlobalNavigationBar active="shop" />
				</>
			}
		>
			{children}
		</AppScreen>
	);
}

function ProductTopBar() {
	return (
		<>
			<StatusBar />
			<TopNavigation
				variant="normal"
				leadingContent={
					<TopNavigationButton variant="text" color="assistive">
						이전
					</TopNavigationButton>
				}
				trailingContent={
					<TopNavigationButton variant="icon" color="assistive">
						<IconSearch width={22} height={22} />
					</TopNavigationButton>
				}
			>
				상품 상세
			</TopNavigation>
		</>
	);
}
