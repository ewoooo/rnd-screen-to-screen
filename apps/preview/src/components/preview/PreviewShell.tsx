import type { ReactNode } from "react";

type PreviewShellProps = {
	children: ReactNode;
};

export function PreviewShell({ children }: PreviewShellProps) {
	return (
		<main className="grid min-h-dvh grid-cols-1 bg-transparent sm:grid-cols-[56px_260px_minmax(390px,1fr)_56px] xl:grid-cols-[56px_300px_minmax(420px,1fr)_56px]">
			{children}
		</main>
	);
}
