import type { PropsWithChildren } from "react";

type MobileViewFrameProps = PropsWithChildren<{
	className?: string;
}>;

export function MobileViewFrame({ children, className }: MobileViewFrameProps) {
	const frameClassName = ["mobile-view-frame", className]
		.filter(Boolean)
		.join(" ");

	return <div className={frameClassName}>{children}</div>;
}
