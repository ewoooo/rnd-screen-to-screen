import type { CSSProperties, ReactNode } from "react";
import { createElement } from "react";

import { DEFAULT_TAG, type Variant, VARIANT_STYLES } from "./styles";

type Props = {
	variant: Variant;
	children: ReactNode;
	color?: string;
	as?: "p" | "span" | "div";
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
