import type { ReactNode } from "react";

import { ListSub, ListTitle } from "@/components/home-kit";
import { BADGE_BG, CARD_BG, CARD_BORDER, T_BRAND } from "./tokens";

type Props = {
	emoji: string;
	name: string;
	sub: string;
	selected?: boolean;
	disabled?: boolean;
	trailing?: ReactNode;
};

/**
 * 결제 수단 1행 카드. home-kit Card 톤(반투명 흰 + 흰 테두리)을 베이스로 하되,
 * 선택 시 T_BRAND 보라 테두리 1.5px 로 강조. 핑크 배경 사용 안 함.
 */
export function MethodCard({ emoji, name, sub, selected, disabled, trailing }: Props) {
	const border = selected ? `1.5px solid ${T_BRAND}` : `1px solid ${CARD_BORDER}`;
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "var(--spacing-14)",
				padding: "var(--spacing-16)",
				borderRadius: 20,
				border,
				background: CARD_BG,
				opacity: disabled ? 0.5 : 1,
			}}
		>
			<MethodIcon emoji={emoji} />
			<div
				style={{
					flex: 1,
					minWidth: 0,
					display: "flex",
					flexDirection: "column",
					gap: 2,
				}}
			>
				<ListTitle>{name}</ListTitle>
				<ListSub>{sub}</ListSub>
			</div>
			{trailing ?? <RadioDot selected={!!selected} />}
		</div>
	);
}

/**
 * 결제 수단 식별 아이콘. home-kit 톤 — BADGE_BG 단색 + 글리프(emoji 또는 텍스트) 한 자.
 * Figma 의 4종 그라디언트(보라/네이비/핑크/초록) 톤은 SaaS 슬롯 패턴이라 사용하지 않는다.
 */
export function MethodIcon({ emoji }: { emoji: string }) {
	return (
		<div
			style={{
				width: 40,
				height: 40,
				borderRadius: 8,
				background: BADGE_BG,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: 20,
				color: T_BRAND,
				flex: "0 0 auto",
			}}
		>
			{emoji}
		</div>
	);
}

export function RadioDot({ selected }: { selected: boolean }) {
	const ring = selected ? T_BRAND : "var(--semantic-line-normal-normal)";
	return (
		<div
			style={{
				width: 22,
				height: 22,
				borderRadius: 999,
				border: `2px solid ${ring}`,
				background: selected ? T_BRAND : "transparent",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flex: "0 0 auto",
				boxSizing: "border-box",
			}}
		>
			{selected ? (
				<div
					style={{
						width: 8,
						height: 8,
						borderRadius: 999,
						background: "var(--semantic-background-normal-normal, #FFFFFF)",
					}}
				/>
			) : null}
		</div>
	);
}
