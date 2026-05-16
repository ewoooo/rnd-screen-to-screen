import type { Meta, StoryObj } from "@storybook/react-vite";
import { UnderlineTab } from "@pxds/cx-components/components/underline-tab";

const SAMPLE_ITEMS = [
	{ value: "benefit", label: "혜택" },
	{ value: "history", label: "이용내역" },
] as const;

const meta = {
	title: "Components/navigation/UnderlineTab",
	component: UnderlineTab,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"두 개의 옵션을 가지는 underline 탭 compound. 동일 폭 탭 영역, 선택 상태, underline 위치를 소유한다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/underline-tab",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		state: {
			control: "inline-radio",
			options: ["01", "02"],
		},
		ariaLabel: { control: "text" },
	},
	args: {
		items: [...SAMPLE_ITEMS] as [
			(typeof SAMPLE_ITEMS)[number],
			(typeof SAMPLE_ITEMS)[number],
		],
		state: "01",
		ariaLabel: "멤버십 보기 방식",
	},
} satisfies Meta<typeof UnderlineTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecondSelected: Story = {
	args: {
		state: "02",
	},
};

export const UsageStatus: Story = {
	args: {
		items: [
			{ value: "available", label: "사용 가능" },
			{ value: "used", label: "사용 완료" },
		],
		state: "01",
	},
};
