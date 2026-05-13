import { Button } from "@pxds/cx-components";
import { createScreenExportAttributes } from "@pxds/pxds-layout/screen-export";

type MbrPrimaryCTABarProps = {
	primaryLabel: string;
	disabled?: boolean;
	onPrimary?: () => void;
};

export function MbrPrimaryCTABar({
	primaryLabel,
	disabled = false,
	onPrimary,
}: MbrPrimaryCTABarProps) {
	return (
		<div
			{...createScreenExportAttributes({
				type: "MbrPrimaryCTABar",
				id: "mbr-primary-cta-bar",
				props: {
					componentId: "mbr-primary-cta-bar",
					disabled,
					primaryLabel,
				},
			})}
			style={{
				display: "grid",
				gap: "var(--semantic-spacing-inline)",
				gridTemplateColumns: "1fr",
				padding: "var(--spacing-12) var(--spacing-16) var(--spacing-20)",
				background: "var(--semantic-surface-page-normal)",
			}}
		>
			<Button
				fullWidth
				size="large"
				variant="primary"
				disabled={disabled}
				onClick={onPrimary}
			>
				{primaryLabel}
			</Button>
		</div>
	);
}
