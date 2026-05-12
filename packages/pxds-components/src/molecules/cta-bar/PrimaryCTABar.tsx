import { Button } from "@pxds/pxds-components/core";

import { Box } from "@pxds/pxds-layout/primitives";
import { createScreenExportAttributes } from "@pxds/pxds-layout/screen-export";
import { semanticSurface } from "@pxds/pxds-tokens";
import {
	renderBoolean,
	renderString,
	type ComponentRenderReact,
} from "../../render-react";

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
			{...createScreenExportAttributes({
				type: "PrimaryCTABar",
				id: "primary-cta-bar",
				props: {
					componentId: "primary-cta-bar",
					disabled,
					hasSecondary,
					hasTertiary,
					primaryLabel,
					secondaryLabel,
					tertiaryLabel,
					tone,
				},
			})}
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

export const primaryCtaBarRenderReact: ComponentRenderReact = ({ node }) => (
	<PrimaryCTABar
		primaryLabel={renderString(node.props?.primaryLabel) ?? ""}
		secondaryLabel={renderString(node.props?.secondaryLabel)}
		tertiaryLabel={renderString(node.props?.tertiaryLabel)}
		disabled={renderBoolean(node.props?.disabled, false)}
		tone={node.props?.tone === "destructive" ? "destructive" : "default"}
	/>
);
