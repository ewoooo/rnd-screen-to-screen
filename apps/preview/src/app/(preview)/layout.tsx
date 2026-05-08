import type { ReactNode } from "react";

import { PreviewProviders } from "@/components/preview/PreviewProviders";
import { PreviewShell } from "@/components/preview/PreviewShell";
import { PreviewNavigationRail } from "@/components/preview/navigation-rail/PreviewNavigationRail";

export default function PreviewRouteLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<PreviewProviders>
			<PreviewShell>
				<PreviewNavigationRail />
				{children}
			</PreviewShell>
		</PreviewProviders>
	);
}
