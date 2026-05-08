import type { ReactNode } from "react";

import { ContentList } from "./ContentList";
import { ContentOutlet } from "./ContentOutlet";

const SCREEN_INLINE_INSET = "var(--spacing-12)";
const CONTENT_BOTTOM_PADDING = "var(--spacing-16)";

type Props = {
	children: ReactNode;
	systemHeader?: ReactNode;
	header?: ReactNode;
	top?: ReactNode;
	bottom?: ReactNode;
	background?: string;
};

export function AppScreenContent({
	children,
	systemHeader,
	header,
	top,
	bottom,
	background = "var(--semantic-surface-page-normal)",
}: Props) {
	const appHeader = header ?? top;

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
			{systemHeader ? (
				<AppScreenChromeSlot background={background}>
					{systemHeader}
				</AppScreenChromeSlot>
			) : null}
			{appHeader ? (
				<AppScreenChromeSlot background={background}>
					{appHeader}
				</AppScreenChromeSlot>
			) : null}
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
				<AppScreenChromeSlot background={background}>{bottom}</AppScreenChromeSlot>
			) : null}
		</div>
	);
}

function AppScreenChromeSlot({
	children,
	background,
}: {
	children: ReactNode;
	background: string;
}) {
	return (
		<section
			style={{
				flexShrink: 0,
				background,
			}}
		>
			{children}
		</section>
	);
}
