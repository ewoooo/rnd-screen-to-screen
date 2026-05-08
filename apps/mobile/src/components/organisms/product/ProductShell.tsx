import { TopNavigation, TopNavigationButton } from "@pxds/pxds-components/core";
import { IconSearch } from "@pxds/pxds-icons";
import type { ReactNode } from "react";

import { GlobalNavigationBar } from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";

type Props = {
  children: ReactNode;
  purchaseBar: ReactNode;
};

export function ProductShell({ children, purchaseBar }: Props) {
  return (
    <AppScreen>
      <AppScreen.SystemHeader />
      <AppScreen.Header>
        <ProductTopBar />
      </AppScreen.Header>
      <AppScreen.Content>{children}</AppScreen.Content>
      <AppScreen.Bottom>
        {purchaseBar}
        <GlobalNavigationBar active="shop" />
      </AppScreen.Bottom>
    </AppScreen>
  );
}

function ProductTopBar() {
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
    >
      상품 상세
    </TopNavigation>
  );
}
