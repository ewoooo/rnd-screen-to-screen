import { Button, IconButton } from "@pxds/pxds-components/core";
import type { ReactNode } from "react";

import { Box, HStack, VStack } from "@pxds/pxds-layout/primitives";
import {
	TextBlock,
	type TextBlockOverflow,
	type TextBlockVariant,
} from "@pxds/pxds-components/typography";

type TextPolicy = {
	variant?: TextBlockVariant;
	maxLines?: number;
	overflow?: TextBlockOverflow;
};

type Props = {
	eyebrow: string;
	title: string;
	secondaryAction: string;
	primaryAction: string;
	icon?: ReactNode;
	textPolicy?: {
		eyebrow?: TextPolicy;
		title?: TextPolicy;
	};
};

export function StickyActionBar({
	eyebrow,
	title,
	secondaryAction,
	primaryAction,
	icon,
	textPolicy,
}: Props) {
	return (
		<Box
			style={{
				padding: "var(--spacing-12)",
				background: "var(--semantic-background-normal-normal)",
				borderTop: "1px solid var(--semantic-line-solid-alternative)",
			}}
		>
			<VStack gap="stack">
				<HStack gap="stack" justify="space-between" align="center">
					<VStack minWidth={0} gap="row">
						<TextBlock
							variant={textPolicy?.eyebrow?.variant ?? "assistive"}
							text={eyebrow}
							color="semantic.primary.normal"
							maxLines={textPolicy?.eyebrow?.maxLines}
							overflow={textPolicy?.eyebrow?.overflow}
						/>
						<TextBlock
							variant={textPolicy?.title?.variant ?? "price"}
							text={title}
							maxLines={textPolicy?.title?.maxLines ?? 1}
							overflow={textPolicy?.title?.overflow ?? "truncate"}
						/>
					</VStack>
					{icon ? (
						<IconButton variant="outlined" size="small" color="semantic.label.normal">
							{icon}
						</IconButton>
					) : null}
				</HStack>
				<Box
					display="grid"
					gap="inline"
					style={{ gridTemplateColumns: "96px 1fr" }}
				>
					<Button size="large" variant="outlined" color="assistive" fullWidth>
						{secondaryAction}
					</Button>
					<Button size="large" variant="solid" color="primary" fullWidth>
						{primaryAction}
					</Button>
				</Box>
			</VStack>
		</Box>
	);
}
