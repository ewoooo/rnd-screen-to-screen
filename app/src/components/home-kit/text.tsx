import type { CSSProperties, ReactNode } from "react";

import { BADGE_BG, T_BRAND } from "./tokens";

/**
 * Figma 원본 픽셀 기준 타이포 슬롯.
 * 업무 의미 이름으로 export — WDS variant 이름은 내부에서만 매핑 고려.
 *
 * 공통 규칙: lineHeight는 Figma 값, letterSpacing 유지, color는 semantic 토큰 우선.
 */

const base: CSSProperties = {
	margin: 0,
	fontStyle: "normal",
};

// 13 / 700 / neutral — 카드 상단 라벨 ("T멤버십 포인트", "결합가족 보기" 등)
export function SectionLabel({ children }: { children: ReactNode }) {
	return (
		<span
			style={{
				...base,
				fontSize: 13,
				fontWeight: 700,
				letterSpacing: "-0.39px",
				lineHeight: 1.4,
				color: "var(--semantic-label-neutral)",
			}}
		>
			{children}
		</span>
	);
}

// 20 / 700 — 큰 타이틀 ("5곳에서 사용가능", "32GB", "엄마의 사용패턴에...")
// pre-line으로 개행 유지.
export function Heading20({ children }: { children: ReactNode }) {
	return (
		<p
			style={{
				...base,
				fontSize: 20,
				fontWeight: 700,
				letterSpacing: "-1px",
				lineHeight: 1.3,
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
				fontSize: 13,
				fontWeight: 700,
				letterSpacing: "-0.39px",
				lineHeight: 1.4,
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
				fontSize: 14,
				fontWeight: 600,
				letterSpacing: "-0.7px",
				lineHeight: 1.4,
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
				fontSize: 13,
				fontWeight: 700,
				letterSpacing: "-0.52px",
				lineHeight: 1.3,
				color: "var(--semantic-label-alternative)",
			}}
		>
			{children}
		</span>
	);
}

// 11 / 700 / alternative — 모노 숫자 (바코드 digits, 타이머 등)
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
				...base,
				fontSize: 11,
				fontWeight: 700,
				letterSpacing: "-0.44px",
				lineHeight: 1.4,
				color: brand ? T_BRAND : "var(--semantic-label-alternative)",
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
				background: BADGE_BG,
				borderRadius: 6,
				padding: "var(--spacing-4) var(--spacing-6)",
				fontSize: 11,
				fontWeight: 700,
				letterSpacing: "-0.44px",
				lineHeight: 1.3,
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
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				background: "var(--semantic-fill-normal)",
				borderRadius: 999,
				padding: "var(--spacing-6) var(--spacing-12)",
				fontSize: 12,
				fontWeight: 600,
				letterSpacing: "-0.6px",
				lineHeight: 1.3,
				color: "var(--semantic-label-alternative)",
				flexShrink: 0,
			}}
		>
			{children}
		</span>
	);
}
