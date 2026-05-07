import { Button, Card, ContentBadge } from "@pxds/pxds-components/core";

import { VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/typography";

type NoticeTone = "info" | "warning" | "critical" | "success";

type Props = {
	badge?: string;
	text: string;
	action?: string;
	tone?: NoticeTone;
};

const TONE_STYLE: Record<
	NoticeTone,
	{
		background: string;
		border: string;
		badgeColor: "accent" | "neutral";
		textColor:
			| "semantic.label.normal"
			| "semantic.status.negative"
			| "semantic.status.positive";
	}
> = {
	info: {
		background: "var(--semantic-background-normal-alternative)",
		border: "var(--semantic-line-solid-alternative)",
		badgeColor: "accent",
		textColor: "semantic.label.normal",
	},
	warning: {
		background: "var(--semantic-background-normal-alternative)",
		border: "var(--semantic-status-cautionary)",
		badgeColor: "accent",
		textColor: "semantic.label.normal",
	},
	critical: {
		background: "var(--semantic-background-normal-alternative)",
		border: "var(--semantic-status-negative)",
		badgeColor: "accent",
		textColor: "semantic.status.negative",
	},
	success: {
		background: "var(--semantic-background-normal-alternative)",
		border: "var(--semantic-status-positive)",
		badgeColor: "accent",
		textColor: "semantic.status.positive",
	},
};

export function NoticeBlock({ badge, text, action, tone = "info" }: Props) {
	const toneStyle = TONE_STYLE[tone];

	return (
		<Card
			platform="mobile"
			width="100%"
			style={{
				padding: "var(--spacing-16)",
				background: toneStyle.background,
				border: `1px solid ${toneStyle.border}`,
				boxShadow: "none",
			}}
		>
			<VStack gap="inline">
				{badge ? (
					<ContentBadge size="small" color={toneStyle.badgeColor} variant="outlined">
						{badge}
					</ContentBadge>
				) : null}
				<TextBlock
					variant="body"
					text={text}
					color={toneStyle.textColor}
					maxLines={3}
				/>
				{action ? (
					<Button size="small" variant="outlined" color="assistive">
						{action}
					</Button>
				) : null}
			</VStack>
		</Card>
	);
}
