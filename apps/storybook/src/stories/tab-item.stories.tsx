import type { Meta, StoryObj } from "@storybook/react-vite";
import { TabItem } from "@pxds/cx-components/components/tab-item";

const meta = {
	title: "Components/navigation/TabItem",
	component: TabItem,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Tab에서 사용하는 단일 탭 라벨 아이템. 선택 상태의 라벨 강조와 underline만 소유한다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/tab-item",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		state: {
			control: "inline-radio",
			options: ["default", "selected"],
		},
		selected: { control: "boolean" },
		text: { control: "text" },
	},
	args: {
		state: "default",
		text: "홈",
	},
} satisfies Meta<typeof TabItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
	args: {
		state: "selected",
		text: "혜택",
	},
};

export const SelectedViaProp: Story = {
	args: {
		selected: true,
		text: "쇼핑",
	},
};
