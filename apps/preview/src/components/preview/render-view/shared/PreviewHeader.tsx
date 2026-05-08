import type { ReactNode } from "react";

type PreviewHeaderProps = {
	eyebrow: string;
	title: string;
	description?: string;
	action?: ReactNode;
};

export function PreviewHeader({
	eyebrow,
	title,
	description,
	action,
}: PreviewHeaderProps) {
	return (
		<header className="flex h-21 items-center justify-between border-b border-neutral-200 bg-white/80 px-6 backdrop-blur">
			<div className="min-w-0">
				<p className="text-xs text-neutral-500">{eyebrow}</p>
				<h2 className="truncate text-sm font-semibold">{title}</h2>
				{description ? (
					<p className="mt-1 truncate text-xs text-neutral-500">{description}</p>
				) : null}
			</div>
			{action}
		</header>
	);
}
