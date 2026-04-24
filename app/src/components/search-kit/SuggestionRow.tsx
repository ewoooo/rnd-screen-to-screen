import { Placeholder, T_BRAND } from "@/components/home-kit";

type Props = {
	label: string;
	/** ai: 보라 ✨ 아이콘 (AI 제안) / search: 돋보기 (검색어 자동완성) */
	kind?: "ai" | "search";
};

/**
 * 자동완성·제안 리스트의 한 행. 아이콘 + 라벨.
 * step 04(자동완성), 07(이어서 검색), 09 등에서 사용.
 */
export function SuggestionRow({ label, kind = "search" }: Props) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "var(--spacing-12)",
				padding: "var(--spacing-8) 0",
			}}
		>
			<div
				style={{
					width: 28,
					height: 28,
					borderRadius: 999,
					background: "var(--semantic-fill-normal)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: kind === "ai" ? T_BRAND : "var(--semantic-label-alternative)",
					fontSize: 12,
					fontWeight: 700,
					flexShrink: 0,
				}}
			>
				{kind === "ai" ? "✨" : "🔍"}
			</div>
			<span
				style={{
					fontSize: 15,
					fontWeight: 600,
					color: "var(--semantic-label-normal)",
					letterSpacing: "-0.6px",
				}}
			>
				{label}
			</span>
		</div>
	);
}
