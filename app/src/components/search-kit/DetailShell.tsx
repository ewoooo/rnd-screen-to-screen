import type { ReactNode } from "react";

import { PAGE_BG, PAGE_BG_SEMI, Placeholder } from "@/components/home-kit";

type Props = {
	title?: string;
	trailing?: ReactNode;
	children: ReactNode;
	/** 하단 고정 슬롯 (SearchField, SearchPill, ChatInput 등) */
	bottom?: ReactNode;
};

/**
 * 검색 상세 화면 공통 프레임. 홈의 Shell 과 달리 GNB 없음, 상단에 back 아이콘 필수.
 * step 02~11 에서 사용.
 */
export function DetailShell({ title, trailing, children, bottom }: Props) {
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				background: PAGE_BG,
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{/* Statusbar */}
			<div
				style={{
					height: 44,
					display: "flex",
					alignItems: "center",
					padding: "0 var(--spacing-20)",
					justifyContent: "space-between",
					background: PAGE_BG_SEMI,
					fontSize: 15,
					fontWeight: 600,
					color: "var(--semantic-label-normal)",
				}}
			>
				<span>7:28</span>
				<Placeholder w={56} h={14} label="status" />
			</div>

			{/* Header */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "var(--spacing-16) var(--spacing-20)",
					gap: "var(--spacing-12)",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "var(--spacing-12)",
						flex: 1,
						minWidth: 0,
					}}
				>
					<Placeholder w={24} h={24} label="‹" />
					{title ? (
						<span
							style={{
								fontSize: 18,
								fontWeight: 700,
								color: "var(--semantic-label-normal)",
								letterSpacing: "-0.9px",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{title}
						</span>
					) : null}
				</div>
				{trailing}
			</div>

			{/* Scroll content */}
			<div
				style={{
					flex: 1,
					overflowY: "auto",
					padding: "0 var(--spacing-20)",
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-16)",
					paddingBottom: bottom ? 160 : "var(--spacing-24)",
				}}
			>
				{children}
			</div>

			{/* Bottom fixed slot */}
			{bottom ? (
				<div
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						display: "flex",
						flexDirection: "column",
					}}
				>
					{bottom}
				</div>
			) : null}
		</div>
	);
}
