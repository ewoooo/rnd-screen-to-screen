import { Button } from "@pxds/pxds-components/core";

import { Box, VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";

type Props = {
	eyebrow: string;
	primaryAction: string;
	disabled?: boolean;
	state?: "ready" | "blocked";
};

export function FlowContinueBar({
	eyebrow,
	primaryAction,
	disabled = false,
	state = "ready",
}: Props) {
	const blocked = state === "blocked";
	return (
		<Box
			px="var(--semantic-spacing-stack)"
			py="var(--semantic-spacing-stack)"
			background="var(--semantic-surface-page-normal)"
		>
			<VStack gap="var(--semantic-spacing-stack)">
				<TextBlock
					variant="assistive"
					text={eyebrow}
					color={blocked ? "semantic.status.negative" : "semantic.primary.normal"}
					maxLines={1}
					overflow="truncate"
				/>
				<Button
					size="large"
					variant="solid"
					color="primary"
					fullWidth
					disabled={disabled}
				>
					{primaryAction}
				</Button>
			</VStack>
		</Box>
	);
}
