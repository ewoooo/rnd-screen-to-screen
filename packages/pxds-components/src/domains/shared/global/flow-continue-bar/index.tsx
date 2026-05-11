import { Button } from "@pxds/pxds-components/core";

import { Box, VStack } from "@pxds/pxds-layout/primitives";
import { TextBlock } from "@pxds/pxds-components/atoms/typography";
import { semanticSurface } from "@pxds/pxds-tokens";

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
			px="stack"
			py="stack"
			background={semanticSurface.page.normal}
		>
			<VStack gap="stack">
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
