import { TopNavigation, TopNavigationButton } from "@pxds/pxds-components/core";
import { IconSearch } from "@pxds/pxds-icons";
import type { ReactNode } from "react";

import { Box } from "@pxds/pxds-layout/primitives";
import { QueryBar } from "@pxds/pxds-components/patterns";
import { SearchResultTabs } from "@/components/organisms/search/SearchResultTabs";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

import { GlobalNavigationBar } from "./GlobalNavigationBar";

type Props = {
  query: string;
  tabs: readonly { id: string; label: string }[];
  activeTab: string;
  children: ReactNode;
};

export function GlobalSearch({ query, tabs, activeTab, children }: Props) {
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <GlobalSearchTopBar query={query} />
        <SearchResultTabs tabs={tabs} activeId={activeTab} />
      </AppScreen.Header>
      <AppScreen.Content>{children}</AppScreen.Content>
      <AppScreen.Bottom>
        <GlobalNavigationBar active="search" />
      </AppScreen.Bottom>
    </AppScreen>
  );
}

function GlobalSearchTopBar({ query }: { query: string }) {
  return (
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
  );
}
