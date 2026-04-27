import { GNB_BORDER, T_BRAND, T_BRAND_SHADOW } from "./tokens";

type Props = {
	secondaryText: string;
	primaryText: string;
	/**
	 * `true` (기본): 화면 하단 fixed 영역용 — borderTop·padding·shadow·backdrop blur wrapper 적용.
	 * `false`: BottomSheet 등 이미 컨테이너가 있는 곳에서 사용 — wrapper 없이 두 버튼만 가로 배치.
	 */
	sticky?: boolean;
};

/**
 * 하단 영역에 2개 버튼(secondary + primary)을 가로로 배치.
 */
export function DualCTA({ secondaryText, primaryText, sticky = true }: Props) {
	const buttons = (
		<>
			<button type="button" style={secondaryStyle}>
				{secondaryText}
			</button>
			<button type="button" style={primaryStyle}>
				{primaryText}
			</button>
		</>
	);
	if (!sticky) {
		return (
			<div
				style={{
					display: "flex",
					gap: "var(--spacing-12)",
					width: "100%",
				}}
			>
				{buttons}
			</div>
		);
	}
	return (
		<div
			style={{
				backdropFilter: "blur(4px)",
				WebkitBackdropFilter: "blur(4px)",
				borderTop: `1px solid ${GNB_BORDER}`,
				padding: "var(--spacing-12) var(--spacing-20) var(--spacing-24)",
				boxShadow: T_BRAND_SHADOW,
				display: "flex",
				gap: "var(--spacing-12)",
			}}
		>
			{buttons}
		</div>
	);
}

const sharedBtn = {
	flex: 1,
	height: 56,
	borderRadius: 999,
	fontSize: 16,
	fontWeight: 700,
	cursor: "pointer",
	border: "none",
} as const;

const secondaryStyle = {
	...sharedBtn,
	background: "#FFFFFF",
	color: "var(--semantic-label-normal)",
	border: "1px solid var(--semantic-line-normal-normal, #b2b2b2)",
} as const;

const primaryStyle = {
	...sharedBtn,
	background: T_BRAND,
	color: "#FFFFFF",
} as const;
