import type { ReactNode } from "react";

export function PreviewSidePanel({ children }: { children: ReactNode }) {
	return (
		<aside className="flex flex-col border-r border-neutral-200 bg-white sm:sticky sm:top-0 sm:h-dvh sm:max-h-dvh sm:overflow-hidden">
			{children}
		</aside>
	);
}
