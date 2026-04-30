import { Button, ContentBadge } from "@wanteddev/wds";

import { Box, VStack } from "@/components/atoms/layout";
import { TextBlock } from "@/components/atoms/typography";
import { CARD_RADIUS, CARD_SHADOW } from "@/lib/brand-tokens";

import { MediaBlock } from "../media-block";

type Props = {
	text: string;
	badge: string;
	action: string;
	mediaLabel: string;
};

export function PromoBlock({ text, badge, action, mediaLabel }: Props) {
	return (
		<Box
			width="100%"
			style={{
				boxSizing: "border-box",
				minHeight: 120,
				padding: "var(--spacing-16) var(--spacing-20)",
				background: "var(--semantic-background-normal-alternative)",
				border: "1px solid var(--semantic-line-solid-alternative)",
				borderRadius: CARD_RADIUS,
				boxShadow: CARD_SHADOW,
			}}
		>
			<Box
				display="grid"
				gap="group"
				style={{
					gridTemplateColumns: "1fr auto",
					alignItems: "center",
				}}
			>
				<VStack gap="inline" minWidth={0}>
					<ContentBadge size="small" color="accent" variant="outlined">
						{badge}
					</ContentBadge>
					<TextBlock
						variant="listTitle"
						text={text}
						maxLines={2}
						overflow="truncate"
					/>
					<Button size="small" variant="outlined" color="assistive">
						{action}
					</Button>
				</VStack>
				<MediaBlock width="var(--spacing-64)" ratio="1:1" alt={mediaLabel} />
			</Box>
		</Box>
	);
}
