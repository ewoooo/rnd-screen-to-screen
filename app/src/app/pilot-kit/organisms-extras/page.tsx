import type { ReactNode } from "react";

import {
	IconBookmark,
	IconBubble,
	IconHome,
	IconListCategory,
} from "@wanteddev/wds-icon";

import { OrgFooterPilot } from "@/components/pilot-kit/OrgFooterPilot";
import { OrgHeaderPilot } from "@/components/pilot-kit/OrgHeaderPilot";
import { OrgTabbarPilot } from "@/components/pilot-kit/OrgTabbarPilot";

const Section = ({
	title,
	figma,
	children,
}: {
	title: string;
	figma: string;
	children: ReactNode;
}) => (
	<section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
		<header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
			<h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{title}</h3>
			<span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "monospace" }}>{figma}</span>
		</header>
		<div
			style={{
				display: "flex",
				gap: 24,
				flexWrap: "wrap",
				padding: 16,
				background: "#fafafa",
				borderRadius: 12,
				border: "1px solid #e5e7eb",
				alignItems: "flex-start",
			}}
		>
			{children}
		</div>
	</section>
);

const TABBAR_ITEMS = [
	{ key: "home", label: "홈", icon: <IconHome width={24} height={24} /> },
	{ key: "use", label: "이용", icon: <IconBubble width={24} height={24} /> },
	{ key: "category", label: "카테고리", icon: <IconListCategory width={24} height={24} /> },
	{ key: "mysub", label: "구독함", icon: <IconBookmark width={24} height={24} /> },
];

export default function OrganismsExtras() {
	return (
		<main
			style={{
				padding: 24,
				display: "flex",
				flexDirection: "column",
				gap: 28,
				maxWidth: 1100,
				margin: "0 auto",
			}}
		>
			<header style={{ display: "flex", flexDirection: "column", gap: 4 }}>
				<h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
					Organisms / Extras
				</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
					Figma{" "}
					<a
						href="https://www.figma.com/design/HEe3mcTVRPCZBlGwAaysWM/-R-D--Tokenize-Design-System--Preflight-SKT-?node-id=29-6768"
						target="_blank"
						rel="noreferrer"
						style={{ color: "#6b7280" }}
					>
						Tokenize DS / ogn/extras
					</a>
					{" — "}화면 chrome (header / tabbar / footer). best-case 없음.
				</p>
			</header>

			<Section title="header (360×64) — gradient bg + search/cart" figma="29:6769">
				<OrgHeaderPilot badgeCount={3} />
			</Section>

			<Section title="tabbar (4 buttons) — 홈/이용/카테고리/구독함" figma="29:6952">
				<div style={{ width: 360 }}>
					<OrgTabbarPilot items={TABBAR_ITEMS} activeKey="home" />
				</div>
			</Section>

			<Section title="footer (360×~522) — SK텔레콤 정보 + 약관 + 패밀리사이트" figma="29:6957">
				<OrgFooterPilot />
			</Section>
		</main>
	);
}
