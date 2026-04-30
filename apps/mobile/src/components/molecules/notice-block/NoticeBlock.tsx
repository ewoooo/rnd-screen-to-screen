import { Button, Card, ContentBadge } from "@wanteddev/wds";

import { VStack } from "@/components/atoms/layout";
import { TextBlock } from "@/components/atoms/typography";

type NoticeTone = "info" | "warning" | "critical";

type Props = {
	badge: string;
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
		textColor: "semantic.label.normal" | "semantic.status.negative";
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
				<ContentBadge size="small" color={toneStyle.badgeColor} variant="outlined">
					{badge}
				</ContentBadge>
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
