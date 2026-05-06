"use client";

import { Divider } from "@/components/atoms/feedback";
import { HStack, VStack } from "@/components/atoms/layout";
import { TextBlock } from "@/components/atoms/typography";
import { ContentSection } from "@/components/templates/app-screen";

export type ReusedInfoItem = {
	id: string;
	title: string;
	trailingLabel: string;
	action?: string | null;
};

type Props = {
	label?: string;
	items: readonly ReusedInfoItem[];
	onActionClick?: (id: string) => void;
};

export function ReusedInfoList({ label, items, onActionClick }: Props) {
	return (
		<ContentSection>
			<VStack gap="stack">
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
								gap="row"
								align="center"
								justify="space-between"
								py="stack"
							>
								<VStack gap="inline">
									<TextBlock
										variant="caption"
										color="semantic.label.alternative"
										text={item.title}
									/>
									<TextBlock variant="body" text={item.trailingLabel} />
								</VStack>
								{item.action ? (
									<button
										type="button"
										onClick={() => onActionClick?.(item.id)}
										style={{
											background: "transparent",
											border: "1px solid var(--semantic-line-solid-normal)",
											padding: "var(--spacing-4) var(--spacing-12)",
											borderRadius: "var(--spacing-8)",
											cursor: "pointer",
										}}
									>
										<TextBlock
											variant="caption"
											color="semantic.label.normal"
											text={item.action}
										/>
									</button>
								) : null}
							</HStack>
							{index < items.length - 1 ? <Divider /> : null}
						</VStack>
					))}
				</VStack>
			</VStack>
		</ContentSection>
	);
}
