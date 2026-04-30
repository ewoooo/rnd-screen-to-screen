import {
	GlobalNavigationBar,
	GlobalNavigationHeader,
} from "@/components/organisms/global";
import {
	Banner,
	HomeActionPairBlock,
	HomeHeroBlock,
	HomeInfoBlock,
	MyEditButton,
	StatBadge,
} from "@/components/organisms/home";
import { HStack, VStack } from "@/components/atoms/layout";
import { Placeholder } from "@/components/atoms/feedback";
import { TextBlock } from "@/components/atoms/typography";
import { AppScreen } from "@/components/templates/app-screen";
import { homeSeniorFixture } from "./_mock";

export default function HomeSeniorPage() {
	const f = homeSeniorFixture;

	return (
		<AppScreen
				top={<GlobalNavigationHeader />}
				bottom={<GlobalNavigationBar />}
			>
				<Banner
					variant="top"
					text={f.topBanner.text}
					imageSize={{ w: 59, h: 47 }}
					imageLabel="gift"
				/>
				<HomeHeroBlock
					label={f.hero.label}
					title={f.hero.headline}
					ai={{
						icon: <Placeholder w={18} h={18} label="ai" />,
						text: f.hero.aiText,
					}}
					cta={{ text: f.hero.ctaText }}
				/>
				{f.stats.slice(0, 2).map((s) => (
					<HomeInfoBlock
						key={s.id}
						label={s.label}
						title={s.value}
						badge={s.badge ? <StatBadge>{s.badge}</StatBadge> : undefined}
						aside={s.graphic ? <Placeholder {...s.graphic} /> : undefined}
					/>
				))}
				<HomeActionPairBlock
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
				<HomeInfoBlock
					label={f.barcode.label}
					body={
						<VStack gap="row">
							<Placeholder w="100%" h={48} label="barcode" />
							<HStack justify="space-between" align="center">
								<HStack gap="inline">
									{f.barcode.digits.map((d) => (
										<TextBlock
											key={d}
											variant="meta"
											text={d}
											color="semantic.label.alternative"
										/>
									))}
								</HStack>
								<TextBlock
									variant="meta"
									text={f.barcode.timerText}
									color="semantic.primary.normal"
								/>
							</HStack>
						</VStack>
					}
				/>
				{f.stats.slice(2).map((s) => (
					<HomeInfoBlock
						key={s.id}
						label={s.label}
						title={s.value}
						badge={s.badge ? <StatBadge>{s.badge}</StatBadge> : undefined}
						aside={s.graphic ? <Placeholder {...s.graphic} /> : undefined}
					/>
				))}
				<MyEditButton />
		</AppScreen>
	);
}
