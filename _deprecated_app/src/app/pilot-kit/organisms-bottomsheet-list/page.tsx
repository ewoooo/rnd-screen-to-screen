import type { ReactNode } from "react";

import { ImageBrandLogoRoundPilot } from "@/components/pilot-kit/ImageBrandLogoRoundPilot";
import { OrgBottomsheetListPilot } from "@/components/pilot-kit/OrgBottomsheetListPilot";

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

const BrandRow = ({ name, sub }: { name: string; sub: string }) => (
	<div
		style={{
			display: "flex",
			gap: 12,
			alignItems: "center",
			padding: "10px 12px",
			width: "100%",
		}}
	>
		<ImageBrandLogoRoundPilot size="middle" />
		<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{name}</span>
			<span style={{ fontSize: 12, color: "#6c6c6c" }}>{sub}</span>
		</div>
	</div>
);

const SelectableRow = ({
	icon,
	title,
	sub,
	selected,
}: {
	icon: ReactNode;
	title: string;
	sub: string;
	selected?: boolean;
}) => (
	<div
		style={{
			display: "flex",
			gap: 12,
			alignItems: "center",
			padding: "12px 16px",
			width: "100%",
			border: "1px solid #f2f2f2",
			borderRadius: 16,
			background: "white",
			marginBottom: 8,
		}}
	>
		{icon}
		<div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
			<span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{title}</span>
			<span style={{ fontSize: 12, color: "#6c6c6c" }}>{sub}</span>
		</div>
		{selected && <span style={{ color: "#3617ce", fontSize: 18 }}>✓</span>}
	</div>
);

export default function OrganismsBottomsheetList() {
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
					Organisms / .bottomsheet-list
				</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
					Figma{" "}
					<a
						href="https://www.figma.com/design/HEe3mcTVRPCZBlGwAaysWM/-R-D--Tokenize-Design-System--Preflight-SKT-?node-id=29-7048"
						target="_blank"
						rel="noreferrer"
						style={{ color: "#6b7280" }}
					>
						Tokenize DS / ogn/bottomsheet-list
					</a>
					{" — "}바텀시트 list (header close + title/sub + scroll slot + 선택 CTA)
				</p>
			</header>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>정식 컴포넌트 (placeholder)</h2>
			<Section title=".bottomsheet-list (360×478)" figma="29:7048">
				<OrgBottomsheetListPilot />
			</Section>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Best-case 변형 — 대표 4종</h2>

			<Section title="할인 가능한 브랜드 (단순 list)" figma="27:32175 변형">
				<OrgBottomsheetListPilot
					title="할인 가능한 브랜드"
					showSub={false}
					showBtn={false}
					slot={
						<div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "0 12px" }}>
							<BrandRow name="세븐일레븐" sub="1일 1잔 사용 가능" />
							<BrandRow name="투썸플레이스" sub="1일 1잔 사용 가능" />
							<BrandRow name="배스킨라빈스" sub="1일 1잔 사용 가능" />
							<BrandRow name="CU" sub="1일 1잔 사용 가능" />
						</div>
					}
				/>
			</Section>

			<Section title="T 멤버십 카드 선택 (selectable rows)" figma="27:32175 변형">
				<OrgBottomsheetListPilot
					title="T 멤버십 카드를 선택해 주세요"
					showSub={false}
					showBtn={false}
					slot={
						<div style={{ width: "100%", padding: "0 8px" }}>
							<SelectableRow
								icon={<div style={{ width: 36, height: 24, background: "#3617ce", borderRadius: 4 }} />}
								title="1,000P"
								sub="0100-5481-1234-0908"
								selected
							/>
							<SelectableRow
								icon={<div style={{ width: 36, height: 24, background: "#a0a0a0", borderRadius: 4 }} />}
								title="900P"
								sub="2340-4567-1234-1234"
								selected
							/>
						</div>
					}
				/>
			</Section>

			<Section title="11pay 약관 동의 (단일 row + dark CTA)" figma="27:32175 변형">
				<OrgBottomsheetListPilot
					title={"11pay 이용에 앞서\n약관 동의가 필요해요"}
					showSub={false}
					btnLabel="동의하기"
					slot={
						<div style={{ width: "100%", padding: "0 8px" }}>
							<div
								style={{
									display: "flex",
									gap: 12,
									alignItems: "center",
									padding: "12px 16px",
									border: "1px solid #f2f2f2",
									borderRadius: 16,
									background: "white",
								}}
							>
								<input type="checkbox" defaultChecked aria-label="agree" />
								<span style={{ flex: 1, fontSize: 14, color: "#1a1a1a", fontWeight: 500 }}>
									[필수] 개인정보 제3자 (11pay) 제공 동의
								</span>
								<span style={{ color: "#a0a0a0" }}>›</span>
							</div>
						</div>
					}
				/>
			</Section>

			<Section title="발행 수단 선택 (text rows + check)" figma="27:32175 변형">
				<OrgBottomsheetListPilot
					title="발행 수단을 선택해 주세요"
					showSub={false}
					showBtn={false}
					slot={
						<div style={{ width: "100%", padding: "0 16px", display: "flex", flexDirection: "column", gap: 16 }}>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>휴대폰 번호</span>
								<span style={{ color: "#3617ce", fontSize: 18 }}>✓</span>
							</div>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<span style={{ fontSize: 14, color: "#a0a0a0" }}>현금영수증 카드 번호</span>
							</div>
						</div>
					}
				/>
			</Section>
		</main>
	);
}
