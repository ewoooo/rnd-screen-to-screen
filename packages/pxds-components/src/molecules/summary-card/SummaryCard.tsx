import { type ReactNode } from "react";

import { Card, CardContent } from "@pxds/pxds-components/core";

import { VStack } from "@pxds/pxds-layout/primitives";
import {
	TextBlock,
	type TextBlockOverflow,
	type TextBlockVariant,
} from "@pxds/pxds-components/atoms/typography";

import { MediaBlock } from "../media-block";

type TextPolicy = {
	variant?: TextBlockVariant;
	maxLines?: number;
	overflow?: TextBlockOverflow;
};

type Props = {
	label: ReactNode;
	title: ReactNode;
	mediaAlt: string;
	mediaBadge?: ReactNode;
	labelPolicy?: TextPolicy;
	titlePolicy?: TextPolicy;
	children: ReactNode;
};

export function SummaryCard({
	label,
	title,
	mediaAlt,
	mediaBadge,
	labelPolicy,
	titlePolicy,
	children,
}: Props) {
	return (
		<Card
			platform="mobile"
			width="100%"
			gap="var(--spacing-20)"
			style={{ boxShadow: "var(--pxds-surface-card-shadow)" }}
		>
			<MediaBlock alt={mediaAlt} ratio="1:1" badge={mediaBadge} />
			<CardContent gap="var(--spacing-12)">
				<VStack gap="var(--semantic-spacing-row)">
					<TextBlock
						variant={labelPolicy?.variant ?? "meta"}
						text={String(label)}
						maxLines={labelPolicy?.maxLines ?? 1}
						overflow={labelPolicy?.overflow ?? "truncate"}
						color="semantic.label.alternative"
					/>
					<TextBlock
						variant={titlePolicy?.variant ?? "headline"}
						text={String(title)}
						maxLines={titlePolicy?.maxLines}
						overflow={titlePolicy?.overflow}
					/>
				</VStack>
				{children}
			</CardContent>
		</Card>
	);
}
