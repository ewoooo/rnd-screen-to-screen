import {
	DiscoveryActions,
	GlobalNavigationBar,
	GlobalNavigationHeader,
	type GnbTab,
} from "@/components/organisms/global";
import { AppScreen } from "@pxds/pxds-layout/app-screen";
import {
	TuCarousel,
	TuHero,
	TuList,
	TuNotice,
	TuPromo,
	TuSection,
} from "@/components/organisms/tu";

import { mo01LoginFixture } from "./_mock";

const PAGE_BG_SEMI = "var(--semantic-surface-page-semi)";

const tabs: GnbTab[] = [
	{ key: "my", label: "MY", active: true },
	{ key: "search", label: "검색", active: false },
	{ key: "shop", label: "쇼핑", active: false },
];

/**
 * TU-DSP-MAIN-MO-02-PG-001-2 · 발견_case2_로그인 (v2.1 톤)
 *
 * 글로벌은 시스템 컴포넌트 사용:
 * - AppScreen (frame + app content)
 * - GlobalNavigationHeader (actions=DiscoveryActions로 SPEC-MAIN-10 조건부 노출 OFF 시안)
 * - GlobalNavigationBar (default tabs)
 *
 * 본문은 organisms/tu (Hero, Carousel, Promo, List, Notice).
 */
export default function Mo01LoginPage() {
	const f = mo01LoginFixture;

	return (
		<AppScreen
			background="var(--semantic-surface-page-normal)"
			top={
				<GlobalNavigationHeader
					actions={DiscoveryActions}
					background={PAGE_BG_SEMI}
				/>
			}
			bottom={<GlobalNavigationBar tabs={tabs} />}
		>
			<TuHero
				eyebrow={f.greeting.label}
				title={`${f.user.name} 님,\n오늘은 어떤 구독을\n만나볼까요?`}
			/>

			<TuSection title="실시간 인기" more="전체 ›">
				<TuCarousel
					items={[
						{
							id: "p1",
							rank: 1,
							title: "Netflix 프리미엄",
							sub: "UHD · 동시 4명",
							num: "17,000",
							unit: "원/월",
							mediaTone: "lilac",
						},
						{
							id: "p2",
							rank: 2,
							title: "쿠팡플레이 + 와우",
							sub: "로켓배송 포함",
							num: "7,890",
							unit: "원/월",
							mediaTone: "peach",
						},
						{
							id: "p3",
							rank: 3,
							title: "디즈니+ 스탠다드",
							sub: "Full HD · 동시 2명",
							num: "9,900",
							unit: "원/월",
							mediaTone: "blue",
						},
					]}
				/>
			</TuSection>

			<TuPromo title="신규 가입 첫 달 100원" sub="무엇이든 골라보세요" />

			<TuSection title="이번 주 인기 OTT" more="전체 ›">
				<TuList
					items={[
						{
							id: "ott1",
							rank: 1,
							title: "TVING 광고형 스탠다드",
							num: "5,500",
							unit: "원/월",
						},
						{
							id: "ott2",
							rank: 2,
							title: "Wavve 베이직",
							num: "7,900",
							unit: "원/월",
						},
						{
							id: "ott3",
							rank: 3,
							title: "Apple TV+",
							num: "6,500",
							unit: "원/월",
						},
					]}
				/>
			</TuSection>

			<TuNotice>OTT 2개 이상 묶으면 추가 20% 할인</TuNotice>
		</AppScreen>
	);
}
