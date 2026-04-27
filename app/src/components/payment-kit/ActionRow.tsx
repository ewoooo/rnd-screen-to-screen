import { FONT } from "@/components/home-kit";
import { GNB_BORDER, T_BRAND } from "./tokens";

type State = "ok" | "disabled";

/**
 * 우측 trailing 텍스트("가능 ›" / "변경 ›" / "불가" 등) + 라벨/설명 의 행.
 * SCREEN 7(보류 가능 업무)·SCREEN 8(보조 수단 변경)·결제 수단 관리 등에서 사용.
 */
export function ActionRow({
	label,
	desc,
	trailing = "›",
	state = "ok",
}: {
	label: string;
	desc: string;
	trailing?: string;
	state?: State;
}) {
	const isDisabled = state === "disabled";
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "var(--spacing-16) 0",
				borderBottom: `1px solid ${GNB_BORDER}`,
				opacity: isDisabled ? 0.4 : 1,
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<span
					style={{
						...FONT.listTitle,
						color: "var(--semantic-label-normal)",
					}}
				>
					{label}
				</span>
				<span
					style={{
						...FONT.pillChip,
						fontWeight: 400,
						color: "var(--semantic-label-alternative)",
					}}
				>
					{desc}
				</span>
			</div>
			<span
				style={{
					...FONT.pillChip,
					fontWeight: 700,
					color: isDisabled
						? "var(--semantic-label-assistive)"
						: T_BRAND,
					whiteSpace: "nowrap",
				}}
			>
				{trailing}
			</span>
		</div>
	);
}
