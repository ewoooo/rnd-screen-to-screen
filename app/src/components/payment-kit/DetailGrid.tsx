import { FONT } from "@/components/home-kit";
import { GNB_BORDER, T_BRAND } from "./tokens";

export type DetailGridItem = {
	key: string;
	value: string;
	tone?: "default" | "violet" | "discount";
};

/**
 * key/value 행을 회색 박스 안에 묶어 보여주는 결제 디테일 카드.
 * Figma SCREEN 4·6·9 공통 패턴.
 */
export function DetailGrid({ items }: { items: readonly DetailGridItem[] }) {
	return (
		<div
			style={{
				background: "var(--semantic-fill-normal)",
				borderRadius: 16,
				width: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{items.map((it, i) => {
				const isLast = i === items.length - 1;
				const valueColor =
					it.tone === "violet" || it.tone === "discount"
						? T_BRAND
						: "var(--semantic-label-normal)";
				return (
					<div
						key={it.key}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "var(--spacing-12) var(--spacing-16)",
							borderBottom: isLast ? "none" : `1px solid ${GNB_BORDER}`,
						}}
					>
						<span
							style={{
								...FONT.pillChip,
								fontWeight: 400,
								color: "var(--semantic-label-alternative)",
							}}
						>
							{it.key}
						</span>
						<span
							style={{
								...FONT.listSub,
								color: valueColor,
							}}
						>
							{it.value}
						</span>
					</div>
				);
			})}
		</div>
	);
}
