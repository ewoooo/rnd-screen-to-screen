import {
	type CSSProperties,
	type ElementType,
	type ReactNode,
	forwardRef,
} from "react";

type Edge = "top" | "bottom" | "left" | "right";

type FloatOwnProps = {
	as?: ElementType;
	/**
	 * 가장자리 프리셋. top/bottom 은 좌우 0 으로 가로 stretch, left/right 는 상하 0 으로 세로 stretch.
	 * inset/top/right/bottom/left 를 명시하면 그 쪽이 우선.
	 */
	edge?: Edge;
	position?: "absolute" | "fixed" | "sticky";
	top?: CSSProperties["top"];
	right?: CSSProperties["right"];
	bottom?: CSSProperties["bottom"];
	left?: CSSProperties["left"];
	inset?: CSSProperties["inset"];
	zIndex?: CSSProperties["zIndex"];
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
};

export type FloatProps = FloatOwnProps;

const edgeInsets: Record<Edge, Pick<CSSProperties, "top" | "right" | "bottom" | "left">> = {
	top: { top: 0, left: 0, right: 0 },
	bottom: { bottom: 0, left: 0, right: 0 },
	left: { top: 0, bottom: 0, left: 0 },
	right: { top: 0, bottom: 0, right: 0 },
};

/**
 * 부모(positioned) 안에서 가장자리에 부착되는 layer. Seed Design의 Float 차용.
 * GNB, sticky bar, badge 부착 등 absolute/fixed 위치 지정용.
 */
export const Float = forwardRef<HTMLElement, FloatProps>(function Float(
	props,
	ref,
) {
	const {
		as: As = "div",
		edge,
		position = "absolute",
		top,
		right,
		bottom,
		left,
		inset,
		zIndex,
		className,
		style,
		children,
	} = props;

	const base = edge ? edgeInsets[edge] : {};

	return (
		<As
			ref={ref}
			className={className}
			style={{
				position,
				...base,
				...(inset !== undefined ? { inset } : null),
				...(top !== undefined ? { top } : null),
				...(right !== undefined ? { right } : null),
				...(bottom !== undefined ? { bottom } : null),
				...(left !== undefined ? { left } : null),
				...(zIndex !== undefined ? { zIndex } : null),
				...style,
			}}
		>
			{children}
		</As>
	);
});
