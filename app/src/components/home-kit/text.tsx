import type { CSSProperties, ReactNode } from "react";

import { BADGE_BG, FONT, T_BRAND } from "./tokens";

// Phase 1 마이그레이션: SectionLabel/MonoCaption 실체는 pilot-kit으로 이전.
export { SectionLabelPilot as SectionLabel } from "@/components/pilot-kit/SectionLabelPilot";
export { MonoCaptionPilot as MonoCaption } from "@/components/pilot-kit/MonoCaptionPilot";

/**
 * Figma 픽셀 기준 타이포 슬롯.
 * 크기/두께/자간/행간은 tokens.FONT 에서 소비 — color 만 슬롯마다 지정.
 */

const base: CSSProperties = {
	margin: 0,
	fontStyle: "normal",
};

// 20 / 700 — 큰 타이틀 ("5곳에서 사용가능", "32GB", "엄마의 사용패턴에...")
// pre-line으로 개행 유지.
export function Heading20({ children }: { children: ReactNode }) {
	return (
		<p
			style={{
				...base,
				...FONT.heading20,
				whiteSpace: "pre-line",
				color: "var(--semantic-label-normal)",
			}}
		>
			{children}
		</p>
	);
}

// 13 / 700 / T_BRAND — AI 제안 인라인 (Card/L3 내부)
export function AiText({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				...base,
				...FONT.aiText,
				color: T_BRAND,
			}}
		>
			{children}
		</span>
	);
}

// 14 / 600 / label-normal — 리스트 행 제목 ("왕과 사는 남자") / 메뉴 라벨 ("T 가족모아데이터")
export function ListTitle({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				...base,
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

// 13 / 700 / label-alternative — 리스트 행 부제 ("VVIP CGV 1인 무료 이용", "D-2")
export function ListSub({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				...base,
				...FONT.listSub,
				color: "var(--semantic-label-alternative)",
			}}
		>
			{children}
		</span>
	);
}

// 11 / 700 / alternative / `#f4f5fa` bg — Stat 카드의 작은 회색 배지
export function StatBadge({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				...base,
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

// 12 / 600 / alternative / fill-normal bg — 리스트 행 우측 pill ("예매", "상세")
export function PillChip({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				...base,
				...FONT.pillChip,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				background: "var(--semantic-fill-normal)",
				borderRadius: 999,
				padding: "var(--spacing-6) var(--spacing-12)",
				color: "var(--semantic-label-alternative)",
				flexShrink: 0,
			}}
		>
			{children}
		</span>
	);
}
