import type { ReactNode } from "react";

type ActionRailProps = {
	children: ReactNode;
	label: string;
};

export function ActionRail({ children, label }: ActionRailProps) {
	return (
		<aside
			aria-label={label}
			className="flex gap-2 border-t border-neutral-200 bg-neutral-50 p-2 sm:sticky sm:top-0 sm:h-dvh sm:flex-col sm:items-center sm:border-l sm:border-t-0"
		>
			{children}
		</aside>
	);
}

