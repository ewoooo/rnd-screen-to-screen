import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function ContentList({ children }: Props) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-4)",
			}}
		>
			{children}
		</div>
	);
}
