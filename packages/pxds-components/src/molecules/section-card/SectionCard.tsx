import { type ReactNode } from "react";

import { Card, CardContent, CardTitle } from "@pxds/pxds-components/core";

import { HStack, VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";

type Props = {
	label?: ReactNode;
	title?: ReactNode;
	trailing?: ReactNode;
	trailingText?: ReactNode;
	children: ReactNode;
	contentGap?: string;
	padding?: string;
};

export function SectionCard({
	label,
	title,
	trailing,
	trailingText,
	children,
	contentGap = "var(--spacing-16)",
	padding,
}: Props) {
	const trailingNode =
		trailing ??
		(trailingText ? (
			<TextBlock
				variant="supportText"
				text={String(trailingText)}
				color="semantic.label.alternative"
				maxLines={1}
				overflow="truncate"
			/>
		) : null);
	const hasHeader = label || title || trailingNode;

	return (
		<Card
			platform="mobile"
			width="100%"
			style={{
				...(padding ? { padding } : null),
				boxShadow: "var(--pxds-surface-card-shadow)",
			}}
		>
			<CardContent gap={contentGap}>
				{hasHeader ? (
					<VStack gap="row">
						{label ? (
							<CardTitle
								variant="caption1"
								weight="bold"
								color="semantic.label.neutral"
							>
								{label}
							</CardTitle>
						) : null}
						{title || trailingNode ? (
							<HStack align="baseline" justify="space-between" gap="stack">
								{title ? (
									<CardTitle variant="headline1" weight="bold">
										{title}
									</CardTitle>
								) : null}
								{trailingNode}
							</HStack>
						) : null}
					</VStack>
				) : null}
				{children}
			</CardContent>
		</Card>
	);
}
