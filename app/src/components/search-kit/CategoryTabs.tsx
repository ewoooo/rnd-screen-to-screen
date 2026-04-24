type Tab = { id: string; label: string };

type Props = {
	tabs: Tab[];
	activeId: string;
};

/**
 * 검색 결과 상단의 카테고리 pill tabs (전체/단말기/기획전/부가서비스).
 */
export function CategoryTabs({ tabs, activeId }: Props) {
	return (
		<div
			style={{
				display: "flex",
				gap: "var(--spacing-8)",
				padding: "var(--spacing-8) 0 var(--spacing-16)",
				overflowX: "auto",
			}}
		>
			{tabs.map((tab) => {
				const active = tab.id === activeId;
				return (
					<span
						key={tab.id}
						style={{
							display: "inline-flex",
							alignItems: "center",
							padding: "var(--spacing-8) var(--spacing-16)",
							borderRadius: 999,
							background: active
								? "var(--semantic-label-normal)"
								: "rgba(255, 255, 255, 0.9)",
							border: active
								? "none"
								: "1px solid var(--semantic-line-solid-alternative)",
							color: active ? "#fff" : "var(--semantic-label-normal)",
							fontSize: 13,
							fontWeight: 600,
							letterSpacing: "-0.52px",
							whiteSpace: "nowrap",
						}}
					>
						{tab.label}
					</span>
				);
			})}
		</div>
	);
}
