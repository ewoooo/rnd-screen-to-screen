type Props = {
	label: string;
	count?: number;
};

/**
 * "기획전 2 >" / "단말기 4 >" 같은 섹션 헤더.
 */
export function CategoryHeader({ label, count }: Props) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "var(--spacing-4) 0",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "baseline",
					gap: "var(--spacing-8)",
				}}
			>
				<span
					style={{
						fontSize: 16,
						fontWeight: 700,
						color: "var(--semantic-label-normal)",
						letterSpacing: "-0.64px",
					}}
				>
					{label}
				</span>
				{count != null ? (
					<span
						style={{
							fontSize: 14,
							fontWeight: 600,
							color: "var(--semantic-label-alternative)",
						}}
					>
						{count}
					</span>
				) : null}
			</div>
			<span
				style={{
					fontSize: 14,
					color: "var(--semantic-label-alternative)",
				}}
			>
				›
			</span>
		</div>
	);
}
