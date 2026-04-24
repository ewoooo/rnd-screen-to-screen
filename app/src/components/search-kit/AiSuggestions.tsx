import { T_BRAND } from "@/components/home-kit";

import { SuggestionChip } from "./SuggestionChip";

type Props = {
	label: string;
	items: string[];
};

/**
 * ✨ "이어서 검색해보세요" — AI 추천 섹션(step 06 하단).
 */
export function AiSuggestions({ label, items }: Props) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-12)",
				padding: "var(--spacing-8) 0",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "var(--spacing-6)",
				}}
			>
				<span
					style={{ fontSize: 14, color: T_BRAND }}
					aria-hidden
				>
					✨
				</span>
				<span
					style={{
						fontSize: 14,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
						letterSpacing: "-0.56px",
					}}
				>
					{label}
				</span>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-8)",
					alignItems: "flex-start",
				}}
			>
				{items.map((t) => (
					<SuggestionChip key={t} label={t} />
				))}
			</div>
		</div>
	);
}
