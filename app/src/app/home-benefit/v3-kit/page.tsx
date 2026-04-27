import {
	BarcodeCard,
	Card,
	Heading20,
	HeroCard,
	ListRow,
	MyEditButton,
	OfferingBanner,
	SectionLabel,
	Shell,
	StatCard,
	TopBanner,
} from "@/components/home-kit";
import { homeBenefitFixture } from "./_mock";

export default function HomeBenefitV3Kit() {
	const f = homeBenefitFixture;

	return (
		<Shell>
			<TopBanner
				text={f.headerBanner.text}
				imageSize={{ w: 35, h: 56 }}
				imageLabel="card"
			/>

			<HeroCard
				label={f.points.label}
				headline={f.points.headline}
				aiText={`T 멤버십 사용 가능 포인트 ${f.points.availablePoints.toLocaleString()}P`}
				ctaText={f.points.ctaText}
			/>

			<BarcodeCard
				label={f.barcode.label}
				digits={f.barcode.digits}
				timerText={f.barcode.timerText}
			/>

			<StatCard
				label={f.brands.label}
				value={f.brands.countText}
				graphic={{ w: 40, h: 40, label: "icons" }}
			/>

			<OfferingBanner
				text={f.offeringBanner.text}
				imageSize={{ w: 72, h: 62 }}
			/>

			<Card
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-24)",
				}}
			>
				<SectionLabel>{f.movieSection.label}</SectionLabel>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-12)",
					}}
				>
					{f.movieSection.items.map((m) => (
						<ListRow
							key={m.id}
							thumb={{ w: 40, h: 58, label: "poster" }}
							title={m.title}
							sub={m.subText}
							pill="예매"
						/>
					))}
				</div>
			</Card>

			<Card
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-24)",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-4)",
					}}
				>
					<SectionLabel>{f.couponSection.label}</SectionLabel>
					<Heading20>{f.couponSection.countText}</Heading20>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-12)",
					}}
				>
					{f.couponSection.items.map((c) => (
						<ListRow
							key={c.id}
							thumb={{ w: 40, h: 40, label: c.brand }}
							title={c.title}
							sub={c.subText}
							pill="상세"
						/>
					))}
				</div>
			</Card>

			<MyEditButton />
		</Shell>
	);
}
