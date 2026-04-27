import type { ReactNode } from "react";

/**
 * 풀스크린 dim 위 하단 시트.
 * DetailShell 의 bottom 슬롯에 넣으면 자체 backdrop(고정 inset 0)으로 화면 전체를 덮는다.
 * 좌우 인셋·spacing 은 home-kit 톤(var(--spacing-*) + CARD_BG/var(--semantic-*)).
 */
export function BottomSheet({ children }: { children: ReactNode }) {
	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				background: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "flex-end",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					background: "var(--semantic-background-normal-normal, #FFFFFF)",
					width: "100%",
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					padding:
						"var(--spacing-16) var(--spacing-16) var(--spacing-32)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "var(--spacing-12)",
				}}
			>
				<SheetHandle />
				{children}
			</div>
		</div>
	);
}

function SheetHandle() {
	return (
		<div
			style={{
				width: 36,
				height: 4,
				borderRadius: 999,
				background: "var(--semantic-line-normal-normal, #b2b2b2)",
			}}
		/>
	);
}
