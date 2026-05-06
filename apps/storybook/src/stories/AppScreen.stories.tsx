import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InfoList } from "@/components/molecules/info-list";
import { PromoBlock } from "@/components/molecules/promo-block";
import { StickyActionBar } from "@/components/molecules/cta-bar";
import { GlobalNavigationHeader } from "@/components/organisms/global";
import { AppScreen } from "@/components/templates/app-screen";

const meta = {
	title: "Templates/AppScreen",
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div className="storybook-mobile-canvas">
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductFlow: Story = {
	render: () => (
		<AppScreen
			top={<GlobalNavigationHeader />}
			bottom={
				<StickyActionBar
					eyebrow="예상 결제 금액"
					title="29,900원"
					secondaryAction="장바구니"
					primaryAction="구매하기"
				/>
			}
		>
			<PromoBlock
				badge="혜택"
				text="토큰 변경 영향 범위를 확인하기 위한 모바일 화면 샘플"
				action="자세히"
				mediaLabel="혜택 이미지"
			/>
			<InfoList
				selectable
				selectedId="option"
				items={[
					{
						id: "option",
						title: "옵션 선택",
						sub: "블랙 / 256GB",
						trailingLabel: "변경",
					},
					{
						id: "delivery",
						title: "배송 방식",
						sub: "오늘 도착",
						trailingLabel: "무료",
					},
					{
						id: "benefit",
						title: "멤버십 혜택",
						sub: "최대 3,000P 적립",
						trailingLabel: "적립",
					},
				]}
			/>
		</AppScreen>
	),
};
