type Props = {
	label: string;
};

/**
 * "최근 검색어" 섹션의 × 버튼 달린 dismissable chip.
 */
export function RecentChip({ label }: Props) {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: "var(--spacing-6)",
				padding: "var(--spacing-6) var(--spacing-12)",
				borderRadius: 999,
				background: "var(--semantic-fill-normal)",
				fontSize: 13,
				fontWeight: 500,
				color: "var(--semantic-label-normal)",
				letterSpacing: "-0.52px",
			}}
		>
			{label}
			<span
				aria-hidden
				style={{
					fontSize: 11,
					color: "var(--semantic-label-alternative)",
				}}
			>
				×
			</span>
		</span>
	);
}
