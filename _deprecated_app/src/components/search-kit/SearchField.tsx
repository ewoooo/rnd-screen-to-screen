import { Placeholder, T_BRAND } from "@/components/home-kit";

type Props = {
	placeholder?: string;
	value?: string;
	/** 우측 원형 버튼 종류: AI 마이크 / 돋보기 / 전송 화살표 */
	action?: "ai" | "search" | "send";
	/** 좌측 back chip (step 03, 08, 09, 10) */
	withBackChip?: boolean;
	/** 입력값 오른쪽의 x 버튼 (step 08) */
	clearable?: boolean;
};

/**
 * 하단 고정 검색 입력바. pill 모양 (radius 999).
 * value 주면 입력된 텍스트, 없으면 placeholder.
 */
export function SearchField({
	placeholder = "검색 또는 질문하기",
	value,
	action = "ai",
	withBackChip = false,
	clearable = false,
}: Props) {
	const actionLabel = action === "ai" ? "ai" : action === "search" ? "🔍" : "↑";
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "var(--spacing-8)",
				padding: "var(--spacing-12) var(--spacing-20)",
				background: "transparent",
			}}
		>
			{withBackChip ? (
				<div
					style={{
						width: 44,
						height: 44,
						borderRadius: 999,
						background: "#fff",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexShrink: 0,
					}}
				>
					<Placeholder w={20} h={20} label="‹" />
				</div>
			) : null}
			<div
				style={{
					flex: 1,
					height: 44,
					background: "#fff",
					borderRadius: 999,
					display: "flex",
					alignItems: "center",
					padding: "0 var(--spacing-20)",
					gap: "var(--spacing-8)",
					minWidth: 0,
				}}
			>
				<span
					style={{
						flex: 1,
						fontSize: 14,
						color: value
							? "var(--semantic-label-normal)"
							: "var(--semantic-label-alternative)",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{value ?? placeholder}
				</span>
				{clearable ? (
					<div
						style={{
							width: 18,
							height: 18,
							borderRadius: 999,
							background: "var(--semantic-fill-normal)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: 10,
							color: "var(--semantic-label-alternative)",
							flexShrink: 0,
						}}
					>
						×
					</div>
				) : null}
			</div>
			<div
				style={{
					width: 44,
					height: 44,
					borderRadius: 999,
					background: T_BRAND,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "#fff",
					fontSize: 14,
					fontWeight: 700,
					flexShrink: 0,
				}}
			>
				{actionLabel}
			</div>
		</div>
	);
}
