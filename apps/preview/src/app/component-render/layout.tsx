import type { ReactNode } from "react";

import "@pxds/cx-tokens/style.css";
import "@pxds/cx-layout/styles.css";
import "@pxds/cx-components/styles.css";

export default function ComponentRenderLayout({
	children,
}: {
	children: ReactNode;
}) {
	return children;
}
