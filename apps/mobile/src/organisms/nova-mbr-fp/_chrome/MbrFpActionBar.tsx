import { ActionButton } from "@pxds/cx-components";

type MbrFpActionBarProps = {
	primaryLabel: string;
	disabled?: boolean;
	onPrimary?: () => void;
	secondaryLabel?: string;
	onSecondary?: () => void;
};

export function MbrFpActionBar({
	primaryLabel,
	disabled = false,
	onPrimary,
	secondaryLabel,
	onSecondary,
}: MbrFpActionBarProps) {
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
