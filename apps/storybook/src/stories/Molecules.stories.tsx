import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InfoList } from "@/components/molecules/info-list";
import { PromoBlock } from "@/components/molecules/promo-block";
import { StickyActionBar } from "@/components/molecules/cta-bar";

const meta = {
	title: "Molecules/Core",
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div style={{ width: 336 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Promo: Story = {
	render: () => (
		<PromoBlock
			badge="혜택"
			text="토큰 기반 프로모션 영역이 WDS 표면과 간격을 안정적으로 유지합니다"
			action="확인하기"
			mediaLabel="프로모션 이미지"
		/>
	),
};

export const ListWithTrailingBadges: Story = {
	render: () => (
		<InfoList
			selectable
			selectedId="delivery"
			items={[
				{
					id: "delivery",
					title: "배송지 확인",
					sub: "오늘 도착 예정",
					trailingLabel: "선택",
				},
				{
					id: "coupon",
					title: "쿠폰 적용",
					sub: "사용 가능한 쿠폰 2장",
					trailingLabel: "2장",
				},
				{
					id: "benefit",
					title: "멤버십 혜택",
					sub: "추가 적립 가능",
					trailingLabel: "혜택",
				},
			]}
		/>
	),
};

export const PurchaseActionBar: Story = {
	render: () => (
		<StickyActionBar
			eyebrow="예상 결제 금액"
			title="29,900원"
			secondaryAction="장바구니"
			primaryAction="구매하기"
		/>
	),
};
