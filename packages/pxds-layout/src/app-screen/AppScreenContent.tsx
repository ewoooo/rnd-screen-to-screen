import type { ReactNode } from "react";

import { ContentList } from "./ContentList";
import { ContentOutlet } from "./ContentOutlet";

const SCREEN_INLINE_INSET = "var(--spacing-12)";
const CONTENT_BOTTOM_PADDING = "var(--spacing-16)";

type Props = {
	children: ReactNode;
	top: ReactNode;
	bottom?: ReactNode;
	background?: string;
};

export function AppScreenContent({
	children,
	top,
	bottom,
	background = "var(--semantic-surface-page-normal)",
}: Props) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
				overflow: "hidden",
				background,
			}}
		>
			<section
				style={{
					flexShrink: 0,
					background,
				}}
			>
				{top}
			</section>
			<ContentOutlet
				inlineInset={SCREEN_INLINE_INSET}
				style={{
					flex: "1 1 0",
					minHeight: 0,
					padding: `0 ${SCREEN_INLINE_INSET} ${CONTENT_BOTTOM_PADDING}`,
				}}
			>
				<ContentList>{children}</ContentList>
			</ContentOutlet>
			{bottom ? (
				<section
					style={{
						flexShrink: 0,
						background,
					}}
				>
					{bottom}
				</section>
			) : null}
		</div>
	);
}
