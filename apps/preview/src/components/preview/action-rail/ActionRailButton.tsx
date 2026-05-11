"use client";

import {
	AlertCircleIcon,
	CheckIcon,
	type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type ActionRailButtonStatus =
	| "idle"
	| "copying"
	| "copied"
	| "creating"
	| "created"
	| "error";

type ActionRailButtonProps = {
	defaultIcon: LucideIcon;
	disabled?: boolean;
	error?: string | null;
	label: string;
	onClick: () => void;
	status: ActionRailButtonStatus;
};

export function ActionRailButton({
	defaultIcon: DefaultIcon,
	disabled = false,
	error,
	label,
	onClick,
	status,
}: ActionRailButtonProps) {
	const buttonLabel = error ?? label;

	return (
		<Button
			type="button"
			variant="ghost"
			size="sm"
			className="h-10 w-10 justify-center px-0"
			aria-label={buttonLabel}
			title={buttonLabel}
			disabled={disabled}
			onClick={onClick}
		>
			<ActionRailButtonIcon fallback={DefaultIcon} status={status} />
		</Button>
	);
}

function ActionRailButtonIcon({
	fallback: FallbackIcon,
	status,
}: {
	fallback: LucideIcon;
	status: ActionRailButtonStatus;
}) {
	if (status === "error") return <AlertCircleIcon aria-hidden="true" />;
	if (status === "copied" || status === "created") {
		return <CheckIcon aria-hidden="true" />;
	}

	return <FallbackIcon aria-hidden="true" />;
}
