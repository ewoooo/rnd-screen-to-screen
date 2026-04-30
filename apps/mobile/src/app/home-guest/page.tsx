import { Button } from "@wanteddev/wds";

import {
	GlobalNavigationBar,
	GlobalNavigationHeader,
} from "@/components/organisms/global";
import {
	AiAnnotation,
	Banner,
	HomeActionPairBlock,
	HomeInfoBlock,
	ListRow,
	MyEditButton,
} from "@/components/organisms/home";
import { HStack, VStack } from "@/components/atoms/layout";
import { Placeholder } from "@/components/atoms/feedback";
import { TextBlock } from "@/components/atoms/typography";
import { AppScreen } from "@/components/templates/app-screen";

import { homeGuestFixture } from "./_mock";

export default function HomeGuestPage() {
	const f = homeGuestFixture;

	return (
		<AppScreen
				top={<GlobalNavigationHeader />}
				bottom={<GlobalNavigationBar />}
			>
				{/* Big Hero — 비로그인 고유, 카드 외 자유 영역 */}
				<VStack as="section" gap="group" px="group">
					<TextBlock variant="hero" lines={f.hero.headlineLines} />
					<Placeholder w="100%" h={240} label="iPhone 17" />
					<HStack justify="flex-end">
						<Button size="medium" variant="solid" color="primary">
							{f.hero.ctaText}
						</Button>
					</HStack>
				</VStack>

				<HomeInfoBlock
					label={f.plan.label}
					title={f.plan.title}
					body={
						<AiAnnotation
							icon={<Placeholder w={18} h={18} label="ai" />}
							text={f.plan.aiText}
							multiline
						/>
					}
				/>
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
					label={f.usim.label}
					title={f.usim.title}
					body={
						<TextBlock
							variant="supportText"
							text={f.usim.sub}
							color="semantic.label.alternative"
						/>
					}
				/>
				<HomeInfoBlock
					label={f.subscriptions.label}
					title={f.subscriptions.title}
					body={
						<VStack gap="stack">
							{f.subscriptions.items.map((s) => (
								<ListRow
									key={s.id}
									thumb={{ w: 40, h: 40, label: "sub" }}
									title={s.title}
									sub={s.sub}
								/>
							))}
						</VStack>
					}
				/>
				<MyEditButton />
		</AppScreen>
	);
}
