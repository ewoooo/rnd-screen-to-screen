import type { ReactNode } from "react";

import { CardHorizontalDeliveryPilot } from "@/components/pilot-kit/CardHorizontalDeliveryPilot";
import { CardHorizontalProductBarcodeInformationPilot } from "@/components/pilot-kit/CardHorizontalProductBarcodeInformationPilot";
import { CardHorizontalProductInformationPilot } from "@/components/pilot-kit/CardHorizontalProductInformationPilot";
import { CardHorizontalProductOptionPilot } from "@/components/pilot-kit/CardHorizontalProductOptionPilot";
import { CardHorizontalProductPassPilot } from "@/components/pilot-kit/CardHorizontalProductPassPilot";
import { CardHorizontalProductPilot } from "@/components/pilot-kit/CardHorizontalProductPilot";
import { CardHorizontalProductSelectPilot } from "@/components/pilot-kit/CardHorizontalProductSelectPilot";
import { CardVerticalProductListPilot } from "@/components/pilot-kit/CardVerticalProductListPilot";
import { CardVerticalProductMediumPilot } from "@/components/pilot-kit/CardVerticalProductMediumPilot";
import { CardVerticalProductSmallPilot } from "@/components/pilot-kit/CardVerticalProductSmallPilot";
import { CardVerticalPromotionPilot } from "@/components/pilot-kit/CardVerticalPromotionPilot";

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
			}}
		>
			{children}
		</div>
	</section>
);

export default function MoleculesCards() {
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
				<h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Molecules / Cards</h1>
				<p style={{ margin: 0, color: "#6b7280", fontSize: 13 }}>
					Figma 04_ADP_P3-T1_Library / molecule (12:8103) — 카드 10종
				</p>
			</header>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Vertical (4)</h2>
			<Row title="card-vertical-product/medium" figma="1:26922 · 228×369">
				<CardVerticalProductMediumPilot />
				<CardVerticalProductMediumPilot showSlot={false} showInfo={false} />
			</Row>
			<Row title="card-vertical-product/small" figma="1:26849 · 142×327">
				<CardVerticalProductSmallPilot />
				<CardVerticalProductSmallPilot
					showInfoSmall={false}
					showInfoLarge={false}
					showSlot={false}
					showAdd={false}
					showChip={false}
				/>
			</Row>
			<Row title="card-vertical-product-list" figma="1:26984 · 312×386">
				<CardVerticalProductListPilot />
			</Row>
			<Row title="card-vertical-promotion" figma="1:27298 · 146×246">
				<CardVerticalPromotionPilot />
				<CardVerticalPromotionPilot subtitle="EVENT" title="짧은 타이틀" />
			</Row>

			<h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Horizontal (6)</h2>
			<Row title="card-horizontal-product" figma="1:27104 · 310×80">
				<CardHorizontalProductPilot />
			</Row>
			<Row title="card-horizontal-product-option" figma="1:26999 · 336×108">
				<CardHorizontalProductOptionPilot />
			</Row>
			<Row title="card-horizontal-delivery" figma="1:27123 · 312×76">
				<CardHorizontalDeliveryPilot />
			</Row>
			<Row title="card-horizontal-product-barcode-information" figma="1:27149 · 288×56">
				<CardHorizontalProductBarcodeInformationPilot />
			</Row>
			<Row title="card-horizontal-product-pass" figma="1:27162 · 336×75">
				<CardHorizontalProductPassPilot />
			</Row>
			<Row title="card-horizontal-product-information" figma="1:27177 · 256×46">
				<CardHorizontalProductInformationPilot />
			</Row>
			<Row title="card-horizontal-product-select" figma="1:27292 · 336×136">
				<CardHorizontalProductSelectPilot />
			</Row>
		</main>
	);
}
