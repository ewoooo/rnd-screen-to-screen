import { Button } from "@wanteddev/wds";

import { Box } from "@/components/atoms/layout";
import { semanticSurface } from "@/lib/brand-tokens";

export type CtaTone = "default" | "destructive";

type Props = {
	primaryLabel: string;
	onPrimary?: () => void;
	disabled?: boolean;
	secondaryLabel?: string;
	onSecondary?: () => void;
	tertiaryLabel?: string;
	onTertiary?: () => void;
	tone?: CtaTone;
};

const DESTRUCTIVE_SX = {
	background: "var(--semantic-status-negative)",
	color: "var(--semantic-static-white)",
} as const;

export function PrimaryCTABar({
	primaryLabel,
	onPrimary,
	disabled = false,
	secondaryLabel,
	onSecondary,
	tertiaryLabel,
	onTertiary,
	tone = "default",
}: Props) {
	const hasSecondary = Boolean(secondaryLabel);
	const hasTertiary = Boolean(tertiaryLabel);

	return (
		<Box
			display="grid"
			gap="inline"
			style={{
				padding: hasTertiary
					? "var(--spacing-12) var(--spacing-16) var(--spacing-12)"
					: "var(--spacing-12) var(--spacing-16) var(--spacing-20)",
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
				sx={tone === "destructive" ? DESTRUCTIVE_SX : undefined}
			>
				{primaryLabel}
			</Button>
			{hasTertiary ? (
				<Box
					style={{ gridColumn: "1 / -1", paddingTop: "var(--spacing-4)" }}
				>
					<Button
						size="medium"
						variant="outlined"
						color="assistive"
						fullWidth
						onClick={onTertiary}
					>
						{tertiaryLabel}
					</Button>
				</Box>
			) : null}
		</Box>
	);
}
