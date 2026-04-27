import { BADGE_BG, T_BRAND } from "./tokens";

type Tone = "success" | "warning";

/**
 * 결과 안내용 큰 라운드 아이콘 (72×72).
 * - success: 연보라 BADGE_BG + ✓ 등
 * - warning: var(--semantic-fill-normal) + ⚠️ 등 (Figma 의 #FFEAEA 빨강 톤은 home-kit 정합화로 회색 톤으로 대체)
 */
export function ResultIcon({ tone, glyph }: { tone: Tone; glyph: string }) {
	const bg = tone === "success" ? BADGE_BG : "var(--semantic-fill-normal)";
	const color = tone === "success" ? T_BRAND : "var(--semantic-label-normal)";
	return (
		<div
			style={{
				width: 72,
				height: 72,
				borderRadius: 36,
				background: bg,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color,
				fontSize: 32,
				fontWeight: 800,
			}}
		>
			{glyph}
		</div>
	);
}
