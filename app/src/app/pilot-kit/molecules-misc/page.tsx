import type { ReactNode } from "react";

import { AccordionPilot } from "@/components/pilot-kit/AccordionPilot";
import { BannerContentsPilot } from "@/components/pilot-kit/BannerContentsPilot";
import { ButtonIconPilot } from "@/components/pilot-kit/ButtonIconPilot";
import { HeaderBottomsheetPilot } from "@/components/pilot-kit/HeaderBottomsheetPilot";
import { ImageBrandLogoPilot } from "@/components/pilot-kit/ImageBrandLogoPilot";
import { InformationBarcodePilot } from "@/components/pilot-kit/InformationBarcodePilot";
import { InformationMembershipPilot } from "@/components/pilot-kit/InformationMembershipPilot";
import { InputPilot } from "@/components/pilot-kit/InputPilot";
import { TextIconPilot } from "@/components/pilot-kit/TextIconPilot";

const Row = ({ title, figma, children }: { title: string; figma: string; children: ReactNode }) => (
	<section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
		<header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
			<h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{title}</h3>
			<span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "monospace" }}>{figma}</span>
		</header>
		<div
			style={{
				display: "flex",
				gap: 16,
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

export default function MoleculesMisc() {
	return (
		<main
			style={{
				padding: 24,
				display: "flex",
				flexDirection: "column",
				gap: 28,
				maxWidth: 920,
				margin: "0 auto",
			}}
		>
			<header style={{ display: "flex", flexDirection: "column", gap: 4 }}>
				<h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Molecules / Information · Header · Misc · Stateful</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
					Figma 04_ADP_P3-T1_Library / molecule (12:8103) — 7종
				</p>
			</header>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Buttons / Banners</h2>
			<Row title="button-icon" figma="1:26098 · 28×28">
				<ButtonIconPilot />
				<ButtonIconPilot badgeCount={3} />
			</Row>
			<Row title="banner-contents" figma="1:26311 · 336×242">
				<BannerContentsPilot />
			</Row>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Header</h2>
			<Row title="header-bottomsheet" figma="1:26583 · 360×50">
				<HeaderBottomsheetPilot />
			</Row>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Information</h2>
			<Row title="information-barcode" figma="1:27225 · 240×127">
				<InformationBarcodePilot />
			</Row>
			<Row title="information-membership" figma="1:27284 · 280×139">
				<InformationMembershipPilot />
			</Row>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Misc</h2>
			<Row title="image/brand-logo (m)" figma="1:26748 · 100×60">
				<ImageBrandLogoPilot size="m" />
			</Row>
			<Row title="image/brand-logo (s)" figma="1:26757 · 60×36 + badge">
				<ImageBrandLogoPilot size="s" />
				<ImageBrandLogoPilot size="s" showBadge={false} />
			</Row>
			<Row title="text-icon" figma="45:8068 · 61×14">
				<TextIconPilot text="추천 사유" />
			</Row>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Stateful</h2>
			<Row title="accordion (close, type=2)" figma="1:26839 · 304×84">
				<AccordionPilot state="close" type="2" footerOption={{ label: "추가 옵션 영역" }} />
			</Row>
			<Row title="accordion (open, type=1)" figma="1:26826 · 304×178">
				<AccordionPilot state="open" type="1" />
			</Row>
			<Row title="accordion (open, type=2)" figma="1:26832 · 304×220">
				<AccordionPilot state="open" type="2" footerOption={{ label: "추가 옵션 영역" }} />
			</Row>
			<Row title="input (focused)" figma="1:27372 · 304×44">
				<InputPilot state="focused" />
			</Row>
			<Row title="input (filled)" figma="1:27375 · 304×43">
				<InputPilot state="filled" text="입력된 값 예시" />
			</Row>
		</main>
	);
}
