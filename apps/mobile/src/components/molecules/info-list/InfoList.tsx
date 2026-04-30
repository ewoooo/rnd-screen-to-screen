import { Chip, Thumbnail } from "@wanteddev/wds";
import type { ReactNode } from "react";

import { Box, HStack, VStack } from "@/components/atoms/layout";
import { TextBlock } from "@/components/atoms/typography";

export type InfoListItem = {
	id: string;
	title: string;
	sub: string;
	trailingLabel?: string;
	mediaLabel?: string;
	mediaIcon?: ReactNode;
};

type Props = {
	items: readonly InfoListItem[];
	selectedId?: string;
	selectable?: boolean;
};

export function InfoList({ items, selectedId, selectable = false }: Props) {
	return (
		<VStack role="list">
			{items.map((item, index) => {
				const selected = selectedId === item.id;
				return (
					<Box
						key={item.id}
						role="listitem"
						display="grid"
						gap="stack"
						py="stack"
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
						<VStack gap="row" minWidth={0}>
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
							<Chip
								size="small"
								variant={selected ? "solid" : "outlined"}
								active={selectable && selected}
							>
								{item.trailingLabel}
							</Chip>
						) : (
							<span aria-hidden />
						)}
					</Box>
				);
			})}
		</VStack>
	);
}
