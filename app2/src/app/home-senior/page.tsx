import {
	Banner,
	Card,
	CardList,
	MyEditButton,
	Shell,
	StatBadge,
	T_BRAND,
} from "@/components/home-kit";
import { MobileScreen, Placeholder } from "@/components/system";
import { Typography } from "@/components/typography";

import { homeSeniorFixture } from "./_mock";

export default function HomeSeniorPage() {
	const f = homeSeniorFixture;

	return (
		<MobileScreen>
			<Shell>
				<CardList>
					<Banner
						variant="top"
						text={f.topBanner.text}
						imageSize={{ w: 59, h: 47 }}
						imageLabel="gift"
					/>
					<Card
						level={3}
						label={f.hero.label}
						title={f.hero.headline}
						ai={{
							icon: <Placeholder w={18} h={18} label="ai" />,
							text: f.hero.aiText,
						}}
						cta={{ text: f.hero.ctaText }}
					/>
					{f.stats.slice(0, 2).map((s) => (
						<Card
							key={s.id}
							level={2}
							label={s.label}
							title={s.value}
							badge={s.badge ? <StatBadge>{s.badge}</StatBadge> : undefined}
							aside={
								s.graphic ? <Placeholder {...s.graphic} /> : undefined
							}
						/>
					))}
					<Card
						level={1}
						left={{
							icon: <Placeholder w={20} h={20} label="ic" />,
							label: f.dualMenu[0].label,
						}}
						right={{
							icon: <Placeholder w={20} h={20} label="ic" />,
							label: f.dualMenu[1].label,
						}}
					/>
					<Banner
						variant="offering"
						text={f.galaxyBanner.text}
						imageSize={{ w: 72, h: 62 }}
						imageLabel="phone"
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
					{f.stats.slice(2).map((s) => (
						<Card
							key={s.id}
							level={2}
							label={s.label}
							title={s.value}
							badge={s.badge ? <StatBadge>{s.badge}</StatBadge> : undefined}
							aside={
								s.graphic ? <Placeholder {...s.graphic} /> : undefined
							}
						/>
					))}
				</CardList>
				<MyEditButton />
			</Shell>
		</MobileScreen>
	);
}
