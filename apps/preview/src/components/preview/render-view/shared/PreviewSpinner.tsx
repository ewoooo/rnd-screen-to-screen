import { Spinner } from "@/components/ui/spinner";

type PreviewSpinnerProps = {
	label: string;
};

export function PreviewSpinner({ label }: PreviewSpinnerProps) {
	return (
		<div
			className="flex min-h-40 flex-col items-center justify-center gap-3 text-sm text-neutral-500"
			role="status"
			aria-label={label}
		>
			<Spinner className="size-6 text-neutral-700" aria-hidden="true" />
			<span>{label}</span>
		</div>
	);
}
