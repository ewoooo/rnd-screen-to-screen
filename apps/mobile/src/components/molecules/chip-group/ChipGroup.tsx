import { Chip } from "@pxds/pxds-components/core";

import { Flex } from "@/components/atoms/layout";

export type ChipItem = string | { id: string; label: string };

type Props = {
	items: readonly ChipItem[];
	selectedIds?: readonly string[];
	size?: "small" | "medium";
	variant?: "solid" | "outlined";
};

function normalize(item: ChipItem): { id: string; label: string } {
	return typeof item === "string" ? { id: item, label: item } : item;
}

export function ChipGroup({
	items,
	selectedIds,
	size = "small",
	variant = "outlined",
}: Props) {
	const selectedSet = new Set(selectedIds ?? []);
	return (
		<Flex wrap gap="inline">
			{items.map((raw) => {
				const { id, label } = normalize(raw);
				return (
					<Chip
						key={id}
						size={size}
						variant={variant}
						active={selectedSet.has(id)}
					>
						{label}
					</Chip>
				);
			})}
		</Flex>
	);
}
