import {
	BarcodeCard,
	DualMenuCard,
	HeroCard,
	MyEditButton,
	OfferingBanner,
	Shell,
	StatCard,
	TopBanner,
} from "@/components/home-kit";
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

export default function HomeManageV3Kit() {
	const f = homeManageFixture;

	return (
		<Shell>
			<TopBanner
				text={f.headerBanner.text}
				imageSize={{ w: 59, h: 47 }}
				imageLabel="gift"
			/>

			<HeroCard
				label={f.diagnosis.label}
				headline={f.diagnosis.headline}
				aiText={f.diagnosis.aiText}
				ctaText={f.diagnosis.ctaText}
			/>

			{f.stats.slice(0, 2).map((s) => (
				<StatCard
					key={s.id}
					label={s.label}
					value={s.value}
					badge={s.badge}
					graphic={graphicSize[s.graphic]}
				/>
			))}

			<DualMenuCard items={f.dualMenu} />

			<OfferingBanner
				text={f.offeringBanner.text}
				imageSize={{ w: 72, h: 62 }}
			/>

			{f.stats.slice(2).map((s) => (
				<StatCard
					key={s.id}
					label={s.label}
					value={s.value}
					badge={s.badge}
					graphic={graphicSize[s.graphic]}
				/>
			))}

			<BarcodeCard
				label={f.barcode.label}
				digits={f.barcode.digits}
				timerText={f.barcode.timerText}
			/>

			<MyEditButton />
		</Shell>
	);
}
