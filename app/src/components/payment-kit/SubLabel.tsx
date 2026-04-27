import { FONT, ListSub, SectionLabel } from "@/components/home-kit";
import { T_BRAND } from "./tokens";

/** 카드 그룹 위 라벨 행 — home-kit SectionLabel + 우측 mark. required=true 면 보라 점 강조. */
export function SubLabel({ text, mark, required }: { text: string; mark?: string; required?: boolean }) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "var(--spacing-16) 0 var(--spacing-8)",
			}}
		>
			<SectionLabel>{text}</SectionLabel>
			{mark ? (
				required ? (
					<span
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: 4,
							...FONT.pillChip,
							fontWeight: 700,
							color: T_BRAND,
						}}
					>
						<span
							style={{
								display: "inline-block",
								width: 6,
								height: 6,
								borderRadius: 999,
								background: T_BRAND,
							}}
						/>
						{mark}
					</span>
				) : (
					<ListSub>{mark}</ListSub>
				)
			) : null}
		</div>
	);
}
