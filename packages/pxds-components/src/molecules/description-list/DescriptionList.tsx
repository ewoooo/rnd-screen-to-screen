"use client";

import { Button } from "@pxds/pxds-components/core";
import { Divider } from "@pxds/pxds-components/atoms/feedback";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { HStack, VStack } from "@pxds/pxds-layout/primitives";

export type DescriptionListItem = {
	id: string;
	label: string;
	value: string;
	actionLabel?: string | null;
};

type Props = {
	label?: string;
	items: readonly DescriptionListItem[];
	onActionClick?: (id: string) => void;
};

export function DescriptionList({ label, items, onActionClick }: Props) {
	return (
		<VStack gap="var(--semantic-spacing-stack)">
			{label ? (
				<TextBlock
					variant="sectionLabel"
					color="semantic.label.alternative"
					text={label}
				/>
			) : null}
			<VStack>
				{items.map((item, index) => (
					<VStack key={item.id}>
						<HStack
							gap="var(--semantic-spacing-row)"
							align="center"
							justify="space-between"
							py="var(--semantic-spacing-stack)"
						>
							<VStack gap="var(--semantic-spacing-inline)">
								<TextBlock
									variant="caption"
									color="semantic.label.alternative"
									text={item.label}
								/>
								<TextBlock variant="body" text={item.value} />
							</VStack>
							{item.actionLabel ? (
								<Button
									size="small"
									variant="outlined"
									color="assistive"
									onClick={() => onActionClick?.(item.id)}
								>
									{item.actionLabel}
								</Button>
							) : null}
						</HStack>
						{index < items.length - 1 ? <Divider /> : null}
					</VStack>
				))}
			</VStack>
		</VStack>
	);
}
