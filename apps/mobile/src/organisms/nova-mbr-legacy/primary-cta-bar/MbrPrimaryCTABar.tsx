import { ActionButton } from "@pxds/cx-components";

type MbrPrimaryCTABarProps = {
	primaryLabel: string;
	disabled?: boolean;
	onPrimary?: () => void;
	secondaryLabel?: string;
	onSecondary?: () => void;
};

export function MbrPrimaryCTABar({
	primaryLabel,
	disabled = false,
	onPrimary,
	secondaryLabel,
	onSecondary,
}: MbrPrimaryCTABarProps) {
	if (secondaryLabel) {
		return (
			<ActionButton
				actions={[
					{
						label: secondaryLabel,
						variant: "secondary",
						onClick: onSecondary,
					},
					{
						label: primaryLabel,
						variant: "primary",
						disabled,
						onClick: onPrimary,
					},
				]}
			/>
		);
	}

	return (
		<ActionButton
			actions={[
				{
					label: primaryLabel,
					variant: "primary",
					disabled,
					onClick: onPrimary,
				},
			]}
		/>
	);
}
