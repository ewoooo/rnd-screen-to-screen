import {
	Card,
	DualMenuCard,
	Heading20,
	ListRow,
	ListSub,
	MyEditButton,
	OfferingBanner,
	Placeholder,
	SectionLabel,
	Shell,
	T_BRAND,
	T_BRAND_SHADOW,
} from "@/components/home-kit";
import { homeGuestFixture } from "./_mock";

export default function HomeGuestV1Kit() {
	const f = homeGuestFixture;

	return (
		<Shell>
			{/* Big Hero — 비로그인 고유 */}
			<section
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-16)",
					padding: "0 var(--spacing-16)",
				}}
			>
				<p
					style={{
						margin: 0,
						fontSize: 20,
						fontWeight: 700,
						letterSpacing: "-1px",
						lineHeight: 1.3,
						color: "var(--semantic-label-normal)",
						whiteSpace: "pre-line",
					}}
				>
					{f.hero.headline}
				</p>
				<Placeholder w="100%" h={240} label="iPhone 17" />
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<button
						type="button"
						style={{
							background: T_BRAND,
							color: "#fff",
							height: 44,
							padding: "0 var(--spacing-20)",
							borderRadius: 12,
							border: "none",
							fontSize: 14,
							fontWeight: 600,
							boxShadow: T_BRAND_SHADOW,
							cursor: "pointer",
						}}
					>
						{f.hero.ctaText}
					</button>
				</div>
			</section>

			{/* 모바일 요금제 카드 - AI 2줄, CTA 없음 */}
			<Card
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-16)",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-8)",
					}}
				>
					<SectionLabel>{f.plan.label}</SectionLabel>
					<Heading20>{f.plan.title}</Heading20>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "flex-start",
						gap: "var(--spacing-2)",
					}}
				>
					<Placeholder w={18} h={18} label="ai" />
					<span
						style={{
							fontSize: 13,
							fontWeight: 700,
							color: T_BRAND,
							letterSpacing: "-0.39px",
							lineHeight: 1.4,
							whiteSpace: "pre-line",
						}}
					>
						{f.plan.aiText}
					</span>
				</div>
			</Card>

			<DualMenuCard items={f.dualMenu} />

			<OfferingBanner
				text={f.galaxyBanner.text}
				imageSize={{ w: 72, h: 62 }}
				imageLabel="phone"
			/>

			{/* USIM/eSIM */}
			<Card
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-4)",
				}}
			>
				<SectionLabel>{f.usim.label}</SectionLabel>
				<Heading20>{f.usim.title}</Heading20>
				<ListSub>{f.usim.sub}</ListSub>
			</Card>

			{/* 구독상품 */}
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
					<SectionLabel>{f.subscriptions.label}</SectionLabel>
					<Heading20>{f.subscriptions.title}</Heading20>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-12)",
					}}
				>
					{f.subscriptions.items.map((s) => (
						<ListRow
							key={s.id}
							thumb={{ w: 40, h: 40, label: "sub" }}
							title={s.title}
							sub={s.sub}
						/>
					))}
				</div>
			</Card>

			<MyEditButton />
		</Shell>
	);
}
