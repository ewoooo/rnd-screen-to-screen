import type { ReactNode } from "react";

type PreviewCanvasLayout = "center" | "stack";

type PreviewCanvasProps = {
	children: ReactNode;
	layout?: PreviewCanvasLayout;
};

const layoutClassName = {
	center: "grid place-items-center",
	stack: "flex flex-col gap-4",
} as const satisfies Record<PreviewCanvasLayout, string>;

export function PreviewCanvas({
	children,
	layout = "center",
}: PreviewCanvasProps) {
	return (
		<div
			className={`flex-1 overflow-auto p-6 xl:p-8 ${layoutClassName[layout]}`}
		>
			{children}
		</div>
	);
}
