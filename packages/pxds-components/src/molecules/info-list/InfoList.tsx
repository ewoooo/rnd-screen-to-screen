import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { Chip, Thumbnail } from "@pxds/pxds-components/core";

import { Box, HStack, VStack } from "@pxds/pxds-layout/primitives";
import type { ReactNode } from "react";

export type InfoListTrailingKind = "value" | "status" | "action";
export type InfoListTrailingTone =
	| "neutral"
	| "positive"
	| "negative"
	| "cautionary";

export type InfoListItem = {
	id: string;
	title: string;
	sub: string;
	trailingLabel?: string;
	trailingKind?: InfoListTrailingKind;
	trailingTone?: InfoListTrailingTone;
	mediaLabel?: string;
	mediaIcon?: ReactNode;
};

type Props = {
	items: readonly InfoListItem[];
	selectedId?: string;
	selectable?: boolean;
};

const TONE_COLOR: Record<InfoListTrailingTone, string> = {
	neutral: "semantic.label.normal",
	positive: "semantic.status.positive",
	negative: "semantic.status.negative",
	cautionary: "semantic.status.cautionary",
};

export function InfoList({ items, selectedId, selectable = false }: Props) {
	return (
		<VStack role="list">
			{items.map((item, index) => {
				const selected = selectedId === item.id;
				const kind = item.trailingKind ?? "value";
				const tone = item.trailingTone ?? "neutral";
				return (
					<Box
						key={item.id}
						role="listitem"
						display="grid"
						gap="var(--semantic-spacing-stack)"
						py="var(--semantic-spacing-stack)"
						style={{
							gridTemplateColumns: "48px minmax(0, 1fr) auto",
							alignItems: "center",
							borderBottom:
								index < items.length - 1
									? "1px solid var(--semantic-line-solid-alternative)"
									: undefined,
						}}
					>
						{item.mediaIcon ? (
							<HStack
								align="center"
								justify="center"
								width={48}
								height={48}
								background="var(--semantic-fill-alternative)"
								style={{ borderRadius: "var(--spacing-16)" }}
							>
								{item.mediaIcon}
							</HStack>
						) : (
							<Thumbnail
								width={48}
								ratio="1:1"
								radius
								border={selectable && selected}
								alt={item.mediaLabel ?? item.title}
							/>
						)}
						<VStack gap="var(--semantic-spacing-row)" minWidth={0}>
							<TextBlock
								variant="listTitle"
								text={item.title}
								maxLines={1}
								overflow="truncate"
							/>
							<TextBlock
								variant="supportText"
								text={item.sub}
								color="semantic.label.alternative"
								maxLines={1}
								overflow="truncate"
							/>
						</VStack>
						{item.trailingLabel ? (
							kind === "status" ? (
								<TextBlock
									variant="meta"
									text={item.trailingLabel}
									color={TONE_COLOR[tone] as never}
								/>
							) : (
								<Chip
									size="small"
									variant={
										kind === "action" || (selected && selectable)
											? "solid"
											: "outlined"
									}
									active={selectable && selected}
								>
									{item.trailingLabel}
								</Chip>
							)
						) : (
							<span aria-hidden />
						)}
					</Box>
				);
			})}
		</VStack>
	);
}
