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
import { homeDeviceChangeFixture } from "@/fixtures/home-device-change";

export default function HomeDeviceChangeV1Kit() {
	const f = homeDeviceChangeFixture;

	return (
		<Shell>
			<TopBanner
				text={f.topBanner.text}
				imageSize={{ w: 62, h: 94 }}
				imageLabel="iPhone"
			/>

			<HeroCard
				label={f.hero.label}
				headline={f.hero.headline}
				aiText={f.hero.aiText}
				ctaText={f.hero.ctaText}
			/>

			{f.stats.slice(0, 2).map((s) => (
				<StatCard key={s.id} {...s} />
			))}

			<DualMenuCard items={f.dualMenu} />

			<OfferingBanner
				text={f.galaxyBanner.text}
				imageSize={{ w: 72, h: 62 }}
				imageLabel="phone"
			/>

			<BarcodeCard
				label={f.barcode.label}
				digits={f.barcode.digits}
				timerText={f.barcode.timerText}
			/>

			{f.stats.slice(2).map((s) => (
				<StatCard key={s.id} {...s} />
			))}

			<MyEditButton />
		</Shell>
	);
}
