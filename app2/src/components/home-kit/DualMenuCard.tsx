import { Placeholder } from "@/components/system";
import { Typography } from "@/components/typography";

import { Card } from "./Card";

type Item = { id: string; label: string };

type Props = {
	items: Item[];
	iconSize?: number;
	iconLabel?: string;
};

/**
 * Card/L1 이중 메뉴 — 두 개의 아이콘+라벨 항목을 세로 divider로 구분.
 * 관리/단말기/시니어/비로그인에서 반복 사용.
 */
export function DualMenuCard({ items, iconSize = 20, iconLabel = "ic" }: Props) {
	return (
		<Card style={{ padding: 0, display: "flex", alignItems: "stretch" }}>
			{items.map((m, i) => (
				<div
					key={m.id}
					style={{
						flex: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: "var(--spacing-2)",
						padding: "var(--spacing-20) var(--spacing-24)",
						borderLeft:
							i === 0
								? undefined
								: "1px solid var(--semantic-line-solid-alternative)",
					}}
				>
					<Placeholder w={iconSize} h={iconSize} label={iconLabel} />
					<Typography variant="list-title">{m.label}</Typography>
				</div>
			))}
		</Card>
	);
}
