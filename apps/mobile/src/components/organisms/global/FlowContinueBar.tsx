import { Button } from "@wanteddev/wds";

import { Box, VStack } from "@/components/atoms/layout";
import { TextBlock } from "@/components/atoms/typography";
import { semanticSurface } from "@/lib/brand-tokens";

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
