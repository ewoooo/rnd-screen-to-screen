import { TopNavigation, TopNavigationButton } from "@wanteddev/wds";
import { IconSearch } from "@wanteddev/wds-icon";
import type { ReactNode } from "react";

import { Box } from "@/components/atoms/layout";
import { QueryBar } from "@/components/molecules";
import { SearchResultTabs } from "@/components/organisms/search/SearchResultTabs";
import { AppScreen, StatusBar } from "@/components/templates/app-screen";

import { GlobalNavigationBar } from "./GlobalNavigationBar";

type Props = {
	query: string;
	tabs: readonly { id: string; label: string }[];
	activeTab: string;
	children: ReactNode;
};

export function GlobalSearch({ query, tabs, activeTab, children }: Props) {
	return (
		<AppScreen
			top={
				<>
					<GlobalSearchTopBar query={query} />
					<SearchResultTabs tabs={tabs} activeId={activeTab} />
				</>
			}
			bottom={<GlobalNavigationBar active="search" />}
		>
			{children}
		</AppScreen>
	);
}

function GlobalSearchTopBar({ query }: { query: string }) {
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
				toolbar={
					<Box px="inset" pb="stack">
						<QueryBar value={query} placeholder="상품, 혜택, 서비스를 검색" />
					</Box>
				}
			>
				검색
			</TopNavigation>
		</>
	);
}
