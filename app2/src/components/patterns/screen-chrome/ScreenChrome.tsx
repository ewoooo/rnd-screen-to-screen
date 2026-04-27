import type { ReactNode } from "react";

import { ContentOutlet } from "@/components/system";

type Props = {
	children: ReactNode;
	topBar: ReactNode;
	bottomBar?: ReactNode;
	stickyAction?: ReactNode;
	contentPadding?: string;
	contentGap?: number;
};

export function ScreenChrome({
	children,
	topBar,
	bottomBar,
	stickyAction,
	contentPadding = "104px var(--spacing-12) 188px",
	contentGap = 12,
}: Props) {
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				background: "var(--semantic-background-normal-normal)",
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{topBar}
			<ContentOutlet
				style={{
					padding: contentPadding,
					gap: `var(--spacing-${contentGap})`,
				}}
			>
				{children}
			</ContentOutlet>
			{stickyAction}
			{bottomBar}
		</div>
	);
}
