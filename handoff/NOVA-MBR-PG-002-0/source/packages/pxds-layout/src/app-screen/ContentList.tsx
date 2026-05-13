import type { ReactNode } from "react";
import { createScreenExportAttributes } from "../screen-export";

type Props = {
	children: ReactNode;
};

export function ContentList({ children }: Props) {
	return (
		<div
			{...createScreenExportAttributes({
				type: "ContentList",
				props: { gap: "var(--spacing-4)" },
			})}
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
