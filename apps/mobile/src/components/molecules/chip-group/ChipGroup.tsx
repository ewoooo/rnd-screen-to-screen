import { Chip } from "@wanteddev/wds";

import { Flex } from "@/components/atoms/layout";

type Props = {
	items: readonly string[];
	size?: "small" | "medium";
	variant?: "solid" | "outlined";
};

export function ChipGroup({ items, size = "small", variant = "outlined" }: Props) {
	return (
		<Flex wrap gap="inline">
			{items.map((item) => (
				<Chip key={item} size={size} variant={variant}>
					{item}
				</Chip>
			))}
		</Flex>
	);
}
