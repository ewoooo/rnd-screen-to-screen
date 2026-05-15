import type { CSSProperties } from "react";
import { Divider as WdsDivider } from "../../core";

type Props = {
	orientation?: "horizontal" | "vertical";
	thickness?: 0 | 1;
	/**
	 * 선과 직각 방향 들여쓰기 (= 양 끝 margin).
	 * vertical → top/bottom margin / horizontal → left/right margin.
	 * Seed-style API. WDS Divider 자체에는 없어 wrapper 마진으로 구현.
	 */
	inset?: CSSProperties["margin"];
	className?: string;
	style?: CSSProperties;
};

/**
 * Seed-style inset 어휘 강제용 wrapper. 색은 WDS 기본 채택.
 * forced migration(2026-04-29): color prop 제거.
 */
export function Divider({
	orientation = "horizontal",
	thickness = 1,
	inset,
	className,
	style,
}: Props) {
	const isVertical = orientation === "vertical";
	const wrapperStyle: CSSProperties = {
		flexShrink: 0,
		...(isVertical
			? {
					alignSelf: "stretch",
					marginTop: inset,
					marginBottom: inset,
				}
			: {
					marginLeft: inset,
					marginRight: inset,
				}),
		...style,
	};
	return (
		<div className={className} style={wrapperStyle}>
			<WdsDivider vertical={isVertical} thickness={thickness} />
		</div>
	);
}
