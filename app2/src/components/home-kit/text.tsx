import type { ReactNode } from "react";

import { BADGE_BG, FONT, T_BRAND } from "./tokens";

/**
 * 8 텍스트 슬롯 — Figma 명세 기준 raw <span>/<p> + FONT 토큰.
 * WDS Typography variant 매핑이 정확치 않은 픽셀이 있어 자체 토큰으로 고정한다.
 */

/** 13 / 700 / neutral — 카드 상단 라벨 */
export function SectionLabel({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.sectionLabel,
				color: "var(--semantic-label-neutral)",
			}}
		>
			{children}
		</span>
	);
}

/** 20 / 700 — 큰 타이틀. pre-line으로 개행 유지. */
export function Heading20({ children }: { children: ReactNode }) {
	return (
		<p
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.heading20,
				whiteSpace: "pre-line",
				color: "var(--semantic-label-normal)",
			}}
		>
			{children}
		</p>
	);
}

/** 13 / 700 / T_BRAND — AI 제안 인라인 (Card/L3 내부) */
export function AiText({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.aiText,
				color: T_BRAND,
			}}
		>
			{children}
		</span>
	);
}

/** 14 / 600 / label-normal — 리스트 행 제목 / 메뉴 라벨 */
export function ListTitle({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.listTitle,
				color: "var(--semantic-label-normal)",
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
			}}
		>
			{children}
		</span>
	);
}

/** 13 / 700 / label-alternative — 리스트 행 부제 */
export function ListSub({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.listSub,
				color: "var(--semantic-label-alternative)",
			}}
		>
			{children}
		</span>
	);
}

/** 11 / 700 / alternative — 모노 숫자. brand=true 면 T_BRAND. */
export function MonoCaption({
	children,
	brand,
}: {
	children: ReactNode;
	brand?: boolean;
}) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.monoCaption,
				color: brand ? T_BRAND : "var(--semantic-label-alternative)",
			}}
		>
			{children}
		</span>
	);
}

/** 11 / 700 / alternative / `#f4f5fa` bg — Stat 카드의 작은 회색 배지 */
export function StatBadge({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.statBadge,
				background: BADGE_BG,
				borderRadius: 6,
				padding: "var(--spacing-4) var(--spacing-6)",
				color: "var(--semantic-label-alternative)",
				whiteSpace: "nowrap",
			}}
		>
			{children}
		</span>
	);
}

type PillTone = "neutral" | "violet";

/**
 * 12 / 600 — 리스트/카드 우측 pill chip.
 * - `neutral` (default): fill-normal bg + label-alternative color
 * - `violet`: BADGE_BG + T_BRAND
 */
export function PillChip({
	children,
	tone = "neutral",
}: {
	children: ReactNode;
	tone?: PillTone;
}) {
	const palette =
		tone === "violet"
			? { bg: BADGE_BG, color: T_BRAND }
			: {
					bg: "var(--semantic-fill-normal)",
					color: "var(--semantic-label-alternative)",
				};
	return (
		<span
			style={{
				margin: 0,
				fontStyle: "normal",
				...FONT.pillChip,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				background: palette.bg,
				borderRadius: 999,
				padding: "var(--spacing-6) var(--spacing-12)",
				color: palette.color,
				flexShrink: 0,
			}}
		>
			{children}
		</span>
	);
}
