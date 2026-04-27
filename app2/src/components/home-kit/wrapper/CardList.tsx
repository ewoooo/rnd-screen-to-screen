import type { ComponentProps, ReactElement } from "react";

import { Banner } from "../banner";
import { Card } from "../card";

type CardElement = ReactElement<ComponentProps<typeof Card>, typeof Card>;
type BannerElement = ReactElement<ComponentProps<typeof Banner>, typeof Banner>;

/** CardList 가 자식으로 허용하는 element 타입 — Card 또는 Banner 만. */
type Item = CardElement | BannerElement;

type Props = {
	/** Card | Banner 만 허용. .map()이 만든 배열도 직접 자식으로 넣을 수 있음. */
	children: Item | (Item | Item[])[];
	/** 항목 사이 세로 gap (CSS spacing token N). 기본 4. */
	gap?: number;
};

/**
 * Card / Banner 만 자식으로 받는 세로 wrapper.
 * Shell 의 ContentOutlet 안에서 화면 본문 흐름을 강제할 때 사용.
 */
export function CardList({ children, gap = 4 }: Props) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: `var(--spacing-${gap})`,
			}}
		>
			{children}
		</div>
	);
}
