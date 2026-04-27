import {
	Card,
	DualMenuCard,
	ListRow,
	MyEditButton,
	OfferingBanner,
	Shell,
	T_BRAND,
	T_BRAND_SHADOW,
} from "@/components/home-kit";
import { MobileScreen, Placeholder } from "@/components/system";
import { Typography } from "@/components/typography";
import { homeGuestFixture } from "./_mock";

export default function HomeGuestV1Kit() {
	const f = homeGuestFixture;

	return (
		<MobileScreen>
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
					<Typography variant="heading-20">
						{f.hero.headline}
					</Typography>
					<Placeholder w="100%" h={240} label="iPhone 17" />
					<div
						style={{ display: "flex", justifyContent: "flex-end" }}
					>
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
						<Typography variant="section-label">
							{f.plan.label}
						</Typography>
						<Typography variant="heading-20">
							{f.plan.title}
						</Typography>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "flex-start",
							gap: "var(--spacing-2)",
						}}
					>
						<Placeholder w={18} h={18} label="ai" />
						<Typography
							variant="ai-text"
							style={{ whiteSpace: "pre-line" }}
						>
							{f.plan.aiText}
						</Typography>
					</div>
				</Card>

				<DualMenuCard items={f.dualMenu} />

				{/* USIM/eSIM */}
				<Card
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-4)",
					}}
				>
					<Typography variant="section-label">
						{f.usim.label}
					</Typography>
					<Typography variant="heading-20">{f.usim.title}</Typography>
					<Typography variant="list-sub">{f.usim.sub}</Typography>
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
						<Typography variant="section-label">
							{f.subscriptions.label}
						</Typography>
						<Typography variant="heading-20">
							{f.subscriptions.title}
						</Typography>
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
		</MobileScreen>
	);
}
