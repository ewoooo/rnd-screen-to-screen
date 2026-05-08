import type { ReactNode } from "react";

import { PreviewProviders } from "@/components/preview/PreviewProviders";
import { PreviewShell } from "@/components/preview/PreviewShell";
import { PreviewNavigationRail } from "@/components/preview/navigation-rail/PreviewNavigationRail";

import "./preview-shell.css";

export default function PreviewRouteLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="preview-shell-root">
			<PreviewProviders>
				<PreviewShell>
					<PreviewNavigationRail />
					{children}
				</PreviewShell>
			</PreviewProviders>
		</div>
	);
}
