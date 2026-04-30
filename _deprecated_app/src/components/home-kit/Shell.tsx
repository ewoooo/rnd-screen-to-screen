import type { ReactNode } from "react";

import { Placeholder } from "./Placeholder";
import { GNB_BORDER, PAGE_BG, PAGE_BG_SEMI, T_BRAND } from "./tokens";

type GnbTab = { key: string; label: string; active: boolean };

const defaultGnb: GnbTab[] = [
	{ key: "my", label: "MY", active: true },
	{ key: "search", label: "검색", active: false },
	{ key: "shop", label: "쇼핑", active: false },
];

type Props = {
	children: ReactNode;
	gnbTabs?: GnbTab[];
};

/**
 * 홈 화면 공통 프레임.
 * - Statusbar + Header (T 로고 + 아이콘 3개)
 * - 스크롤 영역 (children)
 * - 하단 GNB
 * 각 블록은 v1/v2 구현과 동일. 필요하면 prop으로 확장.
 */
export function Shell({ children, gnbTabs = defaultGnb }: Props) {
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
			<StatusHeader />
			<div
				style={{
					flex: 1,
					overflowY: "auto",
					padding: "106px var(--spacing-12) 120px",
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-4)",
				}}
			>
				{children}
			</div>
			<Gnb tabs={gnbTabs} />
		</div>
	);
}

function StatusHeader() {
	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 10,
				background: PAGE_BG_SEMI,
				backdropFilter: "blur(7px)",
				WebkitBackdropFilter: "blur(7px)",
			}}
		>
			<div
				style={{
					height: 44,
					display: "flex",
					alignItems: "center",
					padding: "0 var(--spacing-20)",
					justifyContent: "space-between",
					fontSize: 15,
					fontWeight: 600,
					color: "var(--semantic-label-normal)",
				}}
			>
				<span>7:28</span>
				<Placeholder w={56} h={14} label="status" />
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "var(--spacing-10) var(--spacing-24) var(--spacing-16)",
				}}
			>
				<div
					style={{
						width: 32,
						height: 32,
						borderRadius: 8,
						background: T_BRAND,
						color: "#fff",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontWeight: 800,
						fontSize: 18,
					}}
				>
					T
				</div>
				<div style={{ display: "flex", gap: "var(--spacing-20)" }}>
					<Placeholder w={24} h={24} label="bar" />
					<Placeholder w={24} h={24} label="shop" />
					<Placeholder w={24} h={24} label="menu" />
				</div>
			</div>
		</div>
	);
}

function Gnb({ tabs }: { tabs: GnbTab[] }) {
	return (
		<nav
			style={{
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
				background: PAGE_BG_SEMI,
				backdropFilter: "blur(4px)",
				WebkitBackdropFilter: "blur(4px)",
				borderTop: `1px solid ${GNB_BORDER}`,
				display: "flex",
				justifyContent: "center",
				gap: "var(--spacing-12)",
				padding: "var(--spacing-12) 0 var(--spacing-24)",
			}}
		>
			{tabs.map((tab) => (
				<div
					key={tab.key}
					style={{
						width: 96,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "var(--spacing-2)",
						opacity: tab.active ? 1 : 0.4,
					}}
				>
					<Placeholder w={24} h={24} label={tab.key} />
					<span
						style={{
							fontSize: 11,
							fontWeight: 600,
							color: tab.active
								? T_BRAND
								: "var(--semantic-label-normal)",
							letterSpacing: "-0.44px",
						}}
					>
						{tab.label}
					</span>
				</div>
			))}
		</nav>
	);
}
