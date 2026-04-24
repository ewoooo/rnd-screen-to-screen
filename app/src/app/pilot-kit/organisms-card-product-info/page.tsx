import type { ReactNode } from "react";

import { BarcodeCard } from "@/components/home-kit";
import { OrgCardProductInfoPilot } from "@/components/pilot-kit/OrgCardProductInfoPilot";

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

const BrandLogoPlaceholder = ({ color = "#3617ce" }: { color?: string }) => (
	<div
		style={{
			width: 36,
			height: 36,
			borderRadius: 99,
			background: color,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "white",
			fontSize: 16,
			fontWeight: 700,
		}}
	>
		B
	</div>
);

export default function OrganismsCardProductInfo() {
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
					Organisms / .org/card-product-info
				</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
					Figma{" "}
					<a
						href="https://www.figma.com/design/HEe3mcTVRPCZBlGwAaysWM/-R-D--Tokenize-Design-System--Preflight-SKT-?node-id=29-6892"
						target="_blank"
						rel="noreferrer"
						style={{ color: "#6b7280" }}
					>
						Tokenize DS / ogn/card-product-info
					</a>
					{" — "}쿠폰/바코드 단독 카드 organism (slot-img + title + sub + slot-contents + footer btn + more)
				</p>
			</header>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>정식 컴포넌트 (placeholder)</h2>
			<Section title=".org/card-product-info (336×441)" figma="29:6892">
				<OrgCardProductInfoPilot />
			</Section>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Best-case 변형 — 대표 3종</h2>

			<Section title="올리브영 모바일상품권 4천원 (바코드 쿠폰)" figma="27:32171 변형">
				<OrgCardProductInfoPilot
					title="올리브영 모바일상품권 4천원"
					slotImg={<BrandLogoPlaceholder color="#7ed957" />}
					showSlotBadge
					slotBadge={
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0" }}>
							<span style={{ fontSize: 12, color: "#1a1a1a", fontWeight: 500 }}>유효기간</span>
							<span style={{ fontSize: 12, color: "#1a1a1a", fontWeight: 500 }}>2024.07.10 (수) 23:59 까지</span>
						</div>
					}
					showSub={false}
					slotContents={
						<BarcodeCard
							label="쿠폰 번호"
							digits={["1234", "1234", "1234", "1234"]}
							timerText="D-3"
						/>
					}
					btnLabel="쿠폰 복사 후 올리브영 바로 가기"
				/>
			</Section>

			<Section title="투썸플레이스 30% 할인 (단순 쿠폰)" figma="27:32171 변형">
				<OrgCardProductInfoPilot
					title="투썸플레이스 30% 할인"
					slotImg={<BrandLogoPlaceholder color="#a32d3a" />}
					showSlotBadge
					slotBadge={
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0" }}>
							<span style={{ fontSize: 12, color: "#1a1a1a", fontWeight: 500 }}>유효기간</span>
							<span style={{ fontSize: 12, color: "#1a1a1a", fontWeight: 500 }}>2024.07.10 23:59 까지</span>
						</div>
					}
					showSub={false}
					slotContents={
						<BarcodeCard
							label="쿠폰 번호"
							digits={["1234", "1234", "1234", "1234"]}
							timerText="D-7"
						/>
					}
					btnLabel="쿠폰 복사"
				/>
			</Section>

			<Section title="Google One 100GB (구독 상품 정보)" figma="27:32171 변형">
				<OrgCardProductInfoPilot
					title="Google One 100GB"
					slotImg={<BrandLogoPlaceholder color="#fff3cd" />}
					showSlotBadge={false}
					state="이용중"
					date="다음 결제일까지 D-30"
					showTime={false}
					slotContents={
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
							<span style={{ fontSize: 14, color: "#6c6c6c" }}>매월 자동 결제 중</span>
						</div>
					}
					btnLabel="관리"
				/>
			</Section>
		</main>
	);
}
