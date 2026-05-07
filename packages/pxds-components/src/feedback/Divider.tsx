import { Divider as WdsDivider } from "../core";
import type { CSSProperties } from "react";

export type SpacingToken =
	| "row"
	| "inline"
	| "stack"
	| "group"
	| "inset"
	| "block"
	| "section";

const SPACING_PX: Record<SpacingToken, number> = {
	row: 4,
	inline: 8,
	stack: 12,
	group: 16,
	inset: 20,
	block: 24,
	section: 32,
};

const spacingVar = (token: SpacingToken): string =>
	`var(--spacing-${SPACING_PX[token]})`;

type Props = {
	orientation?: "horizontal" | "vertical";
	thickness?: 0 | 1;
	/**
	 * 선과 직각 방향 들여쓰기 (= 양 끝 margin).
	 * vertical → top/bottom margin / horizontal → left/right margin.
	 * Seed-style API. WDS Divider 자체에는 없어 wrapper 마진으로 구현.
	 */
	inset?: SpacingToken;
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
	const insetPx = inset ? spacingVar(inset) : undefined;
	const wrapperStyle: CSSProperties = {
		flexShrink: 0,
		...(isVertical
			? {
					alignSelf: "stretch",
					marginTop: insetPx,
					marginBottom: insetPx,
				}
			: {
					marginLeft: insetPx,
					marginRight: insetPx,
				}),
		...style,
	};
	return (
		<div className={className} style={wrapperStyle}>
			<WdsDivider vertical={isVertical} thickness={thickness} />
		</div>
	);
}
