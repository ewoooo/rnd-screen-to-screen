import { Placeholder } from "@/components/home-kit";

type Props = {
	query: string;
};

/**
 * 검색 완료된 화면(05, 06) 하단의 소형 검색어 chip.
 * 쿼리 텍스트 + 돋보기 아이콘 배치.
 */
export function SearchPill({ query }: Props) {
	return (
		<div
			style={{
				padding: "var(--spacing-12) var(--spacing-20)",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					display: "inline-flex",
					alignItems: "center",
					gap: "var(--spacing-12)",
					background: "rgba(255, 255, 255, 0.95)",
					border: "1px solid var(--semantic-line-solid-alternative)",
					borderRadius: 999,
					padding: "var(--spacing-10) var(--spacing-20)",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
				}}
			>
				<span
					style={{
						fontSize: 14,
						fontWeight: 600,
						color: "var(--semantic-label-normal)",
						letterSpacing: "-0.7px",
					}}
				>
					{query}
				</span>
				<Placeholder w={18} h={18} label="🔍" />
			</div>
		</div>
	);
}
