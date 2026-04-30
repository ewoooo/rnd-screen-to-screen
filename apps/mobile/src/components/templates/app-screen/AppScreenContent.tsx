import type { ReactNode } from "react";

import { Box, VStack } from "@/components/atoms/layout";
import { semanticSurface } from "@/lib/brand-tokens";

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
	background = semanticSurface.page.normal,
}: Props) {
	return (
		<VStack
			width="100%"
			height="100%"
			background={background}
			overflow="hidden"
		>
			<Box
				as="section"
				style={{
					flexShrink: 0,
					background,
				}}
			>
				{top}
			</Box>
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
				<Box
					as="section"
					style={{
						flexShrink: 0,
						background,
					}}
				>
					{bottom}
				</Box>
			) : null}
		</VStack>
	);
}
