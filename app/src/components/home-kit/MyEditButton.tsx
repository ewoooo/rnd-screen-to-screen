import type { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	onClick?: () => void;
};

/**
 * 홈 화면 하단의 "MY 편집" 버튼. 연한 회색 ghost 스타일.
 * 감싸는 div가 가운데 정렬 담당.
 */
export function MyEditButton({ children = "MY 편집", onClick }: Props) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				marginTop: "var(--spacing-20)",
			}}
		>
			<button
				type="button"
				onClick={onClick}
				style={{
					background: "rgba(5, 0, 26, 0.05)",
					borderRadius: 999,
					padding: "var(--spacing-8) var(--spacing-14)",
					fontSize: 13,
					fontWeight: 700,
					color: "var(--semantic-label-alternative)",
					letterSpacing: "-0.52px",
					border: "none",
					cursor: "pointer",
				}}
			>
				{children}
			</button>
		</div>
	);
}
