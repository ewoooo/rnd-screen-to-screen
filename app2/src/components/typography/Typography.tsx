import type { CSSProperties, ReactNode } from "react";
import { createElement } from "react";

import { DEFAULT_TAG, type Variant, VARIANT_STYLES } from "./styles";

type Props = {
	variant: Variant;
	children: ReactNode;
	/** color override (예: mono-caption을 T_BRAND로) */
	color?: string;
	/** 기본 태그 override */
	as?: "p" | "span" | "div";
	/** 이외 inline 보강 */
	style?: CSSProperties;
};

/**
 * 6 variant 텍스트 슬롯. SSOT 는 ./styles.ts.
 */
export function Typography({ variant, children, color, as, style }: Props) {
	const tag = as ?? DEFAULT_TAG[variant];
	return createElement(
		tag,
		{
			style: {
				margin: 0,
				fontStyle: "normal",
				...VARIANT_STYLES[variant],
				...(color ? { color } : null),
				...style,
			},
		},
		children,
	);
}
