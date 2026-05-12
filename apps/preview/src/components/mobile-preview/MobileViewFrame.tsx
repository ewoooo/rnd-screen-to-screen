import type { CSSProperties, PropsWithChildren } from "react";

type MobileViewFrameProps = PropsWithChildren<{
	className?: string;
	style?: CSSProperties;
}>;

export function MobileViewFrame({
	children,
	className,
	style,
}: MobileViewFrameProps) {
	return (
		<div
			className={["mobile-view-frame", className].filter(Boolean).join(" ")}
			style={style}
		>
			{children}
		</div>
	);
}
