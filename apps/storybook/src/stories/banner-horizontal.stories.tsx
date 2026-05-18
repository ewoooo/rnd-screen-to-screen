import type { Meta, StoryObj } from "@storybook/react-vite";
import { BannerHorizontal } from "@pxds/cx-components/components/banner-horizontal";

const meta = {
	title: "Components/feedback/BannerHorizontal",
	component: BannerHorizontal,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"가로형 배너 compound. 타이틀/설명 텍스트 스택, 우측 media slot, 선택적 Indicator를 소유한다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/banner-horizontal",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		title: { control: "text" },
		description: { control: "text" },
		indicator: { control: "boolean" },
		indicatorCount: { control: { type: "number", min: 1, max: 10 } },
		activeIndex: { control: { type: "number", min: 0 } },
		ariaLabel: { control: "text" },
	},
	args: {
		title: "T우주 x 신한카드 결제 혜택",
		description: "우주패스 all, mini 무료 구독",
		indicator: true,
		indicatorCount: 6,
		activeIndex: 0,
	},
} satisfies Meta<typeof BannerHorizontal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIndicator: Story = {
	args: {
		indicator: false,
	},
};

export const AsLink: Story = {
	args: {
		title: "이번 달 구독 혜택",
		description: "혜택 자세히 보기",
		href: "/benefits/subscription",
		ariaLabel: "이번 달 구독 혜택 자세히 보기",
		indicator: false,
	},
};

export const ActiveIndexLast: Story = {
	args: {
		indicatorCount: 6,
		activeIndex: 5,
	},
};
