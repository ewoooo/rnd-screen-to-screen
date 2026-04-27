import {
	Banner,
	Card,
	CardList,
	ListRow,
	MyEditButton,
	Shell,
	T_BRAND,
} from "@/components/home-kit";
import { MobileScreen, Placeholder } from "@/components/system";
import { Typography } from "@/components/typography";

import { homeBenefitFixture } from "./_mock";

export default function HomeBenefitPage() {
	const f = homeBenefitFixture;

	return (
		<MobileScreen>
			<Shell>
				<CardList>
					<Banner
						variant="top"
						text={f.headerBanner.text}
						imageSize={{ w: 35, h: 56 }}
						imageLabel="card"
					/>
					<Card
						level={3}
						label={f.points.label}
						title={f.points.headline}
						ai={{
							icon: <Placeholder w={18} h={18} label="ai" />,
							text: `T 멤버십 사용 가능 포인트 ${f.points.availablePoints.toLocaleString()}P`,
						}}
						cta={{ text: f.points.ctaText }}
					/>
					<Card
						level={2}
						label={f.barcode.label}
						body={
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "var(--spacing-4)",
								}}
							>
								<Placeholder w="100%" h={48} label="barcode" />
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<div style={{ display: "flex", gap: "var(--spacing-8)" }}>
										{f.barcode.digits.map((d) => (
											<Typography key={d} variant="mono-caption">
												{d}
											</Typography>
										))}
									</div>
									<Typography variant="mono-caption" color={T_BRAND}>
										{f.barcode.timerText}
									</Typography>
								</div>
							</div>
						}
					/>
					<Card
						level={2}
						label={f.brands.label}
						title={f.brands.countText}
						aside={<Placeholder w={40} h={40} label="icons" />}
					/>
					<Banner
						variant="offering"
						text={f.offeringBanner.text}
						imageSize={{ w: 72, h: 62 }}
					/>
					<Card
						level={2}
						label={f.movieSection.label}
						body={
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
						}
					/>
					<Card
						level={2}
						label={f.couponSection.label}
						title={f.couponSection.countText}
						body={
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
						}
					/>
				</CardList>
				<MyEditButton />
			</Shell>
		</MobileScreen>
	);
}
