import { HeaderPilot } from "@/components/pilot-kit/HeaderPilot";

export default function HeaderPreviewPage() {
	return (
		<>
			{/* floating variant이라 배경 위에 떠 있어야 함 → 첫 자식으로 배치 */}
			<HeaderPilot />

			{/* 스크롤 가능한 콘텐츠 — floating + backdrop blur 효과 확인용 */}
			<div
				style={{
					flex: 1,
					minHeight: 0,
					overflow: "auto",
					display: "flex",
					flexDirection: "column",
					padding: "var(--spacing-16)",
					gap: "var(--spacing-16)",
				}}
			>
				{Array.from({ length: 20 }).map((_, i) => (
					<div
						key={i}
						style={{
							height: 72,
							borderRadius: 12,
							background:
								"var(--semantic-background-normal-alternative)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: 12,
							color: "var(--semantic-label-alternative)",
						}}
					>
						dummy block {i + 1}
					</div>
				))}
			</div>
		</>
	);
}
