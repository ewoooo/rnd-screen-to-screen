import type { ReactNode } from "react";

import { ImageBrandLogoPilot } from "@/components/pilot-kit/ImageBrandLogoPilot";
import { OrgCardProductBarcodePilot } from "@/components/pilot-kit/OrgCardProductBarcodePilot";

const Section = ({
	title,
	figma,
	children,
	dark,
}: {
	title: string;
	figma: string;
	children: ReactNode;
	dark?: boolean;
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
				background: dark ? "#1a1a1a" : "#fafafa",
				borderRadius: 12,
				border: "1px solid #e5e7eb",
				alignItems: "flex-start",
			}}
		>
			{children}
		</div>
	</section>
);

export default function OrganismsCardProductBarcode() {
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
					Organisms / .org/card-product-barcode
				</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
					Figma{" "}
					<a
						href="https://www.figma.com/design/HEe3mcTVRPCZBlGwAaysWM/-R-D--Tokenize-Design-System--Preflight-SKT-?node-id=29-7011"
						target="_blank"
						rel="noreferrer"
						style={{ color: "#6b7280" }}
					>
						Tokenize DS / ogn/card-product-barcode
					</a>
					{" — "}할인 바코드 단독 카드 (이중 카드 + dot divider, .org/card-product-pass 와 비슷한 패턴)
				</p>
			</header>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>정식 컴포넌트 (placeholder)</h2>
			<Section title=".org/card-product-barcode (336×527)" figma="29:7011">
				<OrgCardProductBarcodePilot />
			</Section>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Best-case 변형 — 대표 2종</h2>

			<Section title="15% 할인 + 오프라인 (3 브랜드 통합)" figma="27:32173 변형">
				<OrgCardProductBarcodePilot
					slotImg={<ImageBrandLogoPilot size="s" badgeText="+1" />}
					brandRowText="{브랜드명, 브랜드명, 브랜드명}"
					title="15% 할인"
					slotBadge={
						<div style={{ background: "#f2f2f2", padding: "2px 8px", borderRadius: 4 }}>
							<span style={{ fontSize: 12, color: "#6c6c6c", fontWeight: 500 }}>오프라인</span>
						</div>
					}
					btnLabel="할인 내역 보기"
				/>
			</Section>

			<Section title="dark bg + 남은 시간 표시" figma="27:32173 변형 (dark)" dark>
				<OrgCardProductBarcodePilot
					slotImg={<ImageBrandLogoPilot size="s" badgeText="+1" />}
					brandRowText="{브랜드명, 브랜드명, 브랜드명}"
					title="15% 할인"
					slotBadge={
						<div style={{ background: "#f2f2f2", padding: "2px 8px", borderRadius: 4 }}>
							<span style={{ fontSize: 12, color: "#6c6c6c", fontWeight: 500 }}>오프라인</span>
						</div>
					}
					showBtn={false}
					showTime
					timeText="남은 시간 16 : 55"
				/>
			</Section>
		</main>
	);
}
