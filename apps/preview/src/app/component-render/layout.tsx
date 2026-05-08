import type { ReactNode } from "react";
import { AppRouterCacheProvider, ThemeProvider } from "@pxds/pxds-components/core";

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
