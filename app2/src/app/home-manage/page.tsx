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

import { homeManageFixture } from "./_mock";

const graphicSize: Record<
	(typeof homeManageFixture.stats)[number]["graphic"],
	{ w: number; h: number; label: string }
> = {
	family: { w: 48, h: 48, label: "family" },
	"progress-large": { w: 50, h: 50, label: "prog" },
	bill: { w: 48, h: 48, label: "bill" },
	"progress-small": { w: 40, h: 40, label: "prog" },
};

export default function HomeManagePage() {
	const f = homeManageFixture;

	return (
		<MobileScreen>
			<Shell>
				<CardList>
					<Banner
						variant="top"
						text={f.headerBanner.text}
						imageSize={{ w: 59, h: 47 }}
						imageLabel="gift"
					/>
					<Card
						level={3}
						label={f.diagnosis.label}
						title={f.diagnosis.headline}
						ai={{
							icon: <Placeholder w={18} h={18} label="ai" />,
							text: f.diagnosis.aiText,
						}}
						cta={{ text: f.diagnosis.ctaText }}
					/>
					{f.stats.slice(0, 2).map((s) => (
						<Card
							key={s.id}
							level={2}
							label={s.label}
							title={s.value}
							badge={s.badge ? <StatBadge>{s.badge}</StatBadge> : undefined}
							aside={<Placeholder {...graphicSize[s.graphic]} />}
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
						text={f.offeringBanner.text}
						imageSize={{ w: 72, h: 62 }}
					/>
					{f.stats.slice(2).map((s) => (
						<Card
							key={s.id}
							level={2}
							label={s.label}
							title={s.value}
							badge={s.badge ? <StatBadge>{s.badge}</StatBadge> : undefined}
							aside={<Placeholder {...graphicSize[s.graphic]} />}
						/>
					))}
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
				</CardList>
				<MyEditButton />
			</Shell>
		</MobileScreen>
	);
}
