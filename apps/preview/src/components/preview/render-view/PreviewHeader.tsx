import type { ReactNode } from "react";

type PreviewHeaderProps = {
	eyebrow: string;
	title: string;
	action?: ReactNode;
};

export function PreviewHeader({
	eyebrow,
	title,
	action,
}: PreviewHeaderProps) {
	return (
		<header className="flex h-21 items-center justify-between border-b border-neutral-200 bg-white/80 px-6 backdrop-blur">
			<div>
				<p className="text-xs text-neutral-500">{eyebrow}</p>
				<h2 className="text-sm font-semibold">{title}</h2>
			</div>
			{action}
		</header>
	);
}
