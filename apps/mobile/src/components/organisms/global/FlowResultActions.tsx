import { PrimaryCTABar } from "@/components/molecules";

type Props = {
	primaryLabel: string;
	secondaryLabel?: string;
	onPrimary?: () => void;
	onSecondary?: () => void;
};

export function FlowResultActions({
	primaryLabel,
	secondaryLabel,
	onPrimary,
	onSecondary,
}: Props) {
	return (
		<PrimaryCTABar
			primaryLabel={primaryLabel}
			secondaryLabel={secondaryLabel}
			onPrimary={onPrimary}
			onSecondary={onSecondary}
		/>
	);
}
