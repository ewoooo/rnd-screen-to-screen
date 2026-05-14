import type { ReactNode } from "react";
import { AppRouterCacheProvider, ThemeProvider } from "@pxds/pxds-components/core";

import "@pxds/pxds-components/core/global.css";
import "@pxds/cx-tokens/style.css";
import "@pxds/pxds-layout/styles.css";
import "@pxds/cx-components/styles.css";

export default function ComponentRenderLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<ThemeProvider>
			<AppRouterCacheProvider>{children}</AppRouterCacheProvider>
		</ThemeProvider>
	);
}
