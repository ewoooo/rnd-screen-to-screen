import { Button } from "@wanteddev/wds";

import { Box } from "@/components/atoms/layout";
import { semanticSurface } from "@/lib/brand-tokens";

type Props = {
	primaryLabel: string;
	onPrimary?: () => void;
	disabled?: boolean;
	secondaryLabel?: string;
	onSecondary?: () => void;
};

export function PrimaryCTABar({
	primaryLabel,
	onPrimary,
	disabled = false,
	secondaryLabel,
	onSecondary,
}: Props) {
	const hasSecondary = Boolean(secondaryLabel);

	return (
		<Box
			display="grid"
			gap="inline"
			style={{
				padding: "var(--spacing-12) var(--spacing-16) var(--spacing-20)",
				background: semanticSurface.page.normal,
				gridTemplateColumns: hasSecondary ? "1fr 2fr" : "1fr",
			}}
		>
			{hasSecondary ? (
				<Button
					size="large"
					variant="outlined"
					color="assistive"
					fullWidth
					onClick={onSecondary}
				>
					{secondaryLabel}
				</Button>
			) : null}
			<Button
				size="large"
				variant="solid"
				color="primary"
				fullWidth
				onClick={onPrimary}
				disabled={disabled}
			>
				{primaryLabel}
			</Button>
		</Box>
	);
}
