import {
	Chip,
	List,
	ListCell,
	ListCellContent,
	RadioGroup,
	RadioGroupItem,
	Typography,
} from "@wanteddev/wds";
import type { ReactNode } from "react";

import { HStack } from "@/components/atoms/layout";

export type SelectableDensity = "comfortable" | "compact";

export type SelectableItem = {
	id: string;
	title: string;
	sub?: string;
	trailingLabel?: string;
	leading?: ReactNode;
	disabled?: boolean;
	disabledReason?: string;
};

type Props = {
	items: readonly SelectableItem[];
	value?: string;
	onChange?: (id: string) => void;
	name: string;
	density?: SelectableDensity;
};

export function SelectableList({
	items,
	value,
	onChange,
	name,
	density = "comfortable",
}: Props) {
	const compact = density === "compact";
	return (
		<RadioGroup
			name={name}
			value={value}
			onValueChange={onChange}
			orientation="vertical"
		>
			<List flexDirection="column" gap={compact ? "var(--spacing-4)" : "var(--spacing-8)"}>
				{items.map((item) => {
					const selected = value === item.id;
					const showCaption = !compact && (item.sub || item.disabled);
					return (
						<ListCell
							as="label"
							key={item.id}
							selected={selected}
							disabled={item.disabled}
							verticalPadding={compact ? "small" : "medium"}
							fillWidth
							ellipsis
							textProps={{
								variant: "body1",
								weight: "bold",
								caption: showCaption ? (
									<>
										{item.sub}
										{item.disabled && item.disabledReason ? (
											<Typography
												as="span"
												variant="caption1"
												color="semantic.status.negative"
												style={{ display: "block" }}
											>
												{item.disabledReason}
											</Typography>
										) : null}
									</>
								) : undefined,
								captionProps: showCaption
									? {
											variant: "caption1",
											color: "semantic.label.alternative",
										}
									: undefined,
							}}
							leadingContent={
								item.leading ? (
									<ListCellContent variant="large-icon">
										{item.leading}
									</ListCellContent>
								) : undefined
							}
							trailingContent={
								<ListCellContent variant="custom">
									<HStack align="center" gap="inline">
										{item.trailingLabel ? (
											<Chip
												size="small"
												variant={selected ? "solid" : "outlined"}
												active={selected}
											>
												{item.trailingLabel}
											</Chip>
										) : null}
										<RadioGroupItem
											id={`${name}-${item.id}`}
											value={item.id}
											disabled={item.disabled}
										/>
									</HStack>
								</ListCellContent>
							}
							{...{ htmlFor: `${name}-${item.id}` }}
						>
							{item.title}
						</ListCell>
					);
				})}
			</List>
		</RadioGroup>
	);
}
