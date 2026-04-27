import {
	Banner,
	Card,
	CardList,
	ListRow,
	MyEditButton,
	Shell,
	T_BRAND,
	T_BRAND_SHADOW,
} from "@/components/home-kit";
import { MobileScreen, Placeholder } from "@/components/system";
import { Typography } from "@/components/typography";

import { homeGuestFixture } from "./_mock";

export default function HomeGuestPage() {
	const f = homeGuestFixture;

	return (
		<MobileScreen>
			<Shell>
				{/* Big Hero — 비로그인 고유, 카드 외 자유 영역 */}
				<section
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "var(--spacing-16)",
						padding: "0 var(--spacing-16)",
					}}
				>
					<Typography variant="heading-20">{f.hero.headline}</Typography>
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

				<CardList>
					<Card
						level={2}
						label={f.plan.label}
						title={f.plan.title}
						body={
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
						}
					/>
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
						label={f.usim.label}
						title={f.usim.title}
						body={<Typography variant="list-sub">{f.usim.sub}</Typography>}
					/>
					<Card
						level={2}
						label={f.subscriptions.label}
						title={f.subscriptions.title}
						body={
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
						}
					/>
				</CardList>
				<MyEditButton />
			</Shell>
		</MobileScreen>
	);
}
