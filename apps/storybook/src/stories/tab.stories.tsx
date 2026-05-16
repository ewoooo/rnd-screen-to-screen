import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tab } from "@pxds/cx-components/components/tab";

const SAMPLE_ITEMS = [
	{ value: "home", label: "홈" },
	{ value: "benefit", label: "혜택" },
	{ value: "shopping", label: "쇼핑" },
];

const meta = {
	title: "Components/navigation/Tab",
	component: Tab,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"TabItem을 합성해 가로 탭 행을 구성하는 compound. 선택 값과 키보드 인터랙션, tablist 시맨틱을 소유한다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/tab",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		ariaLabel: { control: "text" },
		defaultValue: {
			control: "inline-radio",
			options: SAMPLE_ITEMS.map((item) => item.value),
		},
	},
	args: {
		ariaLabel: "Membership menu",
		items: SAMPLE_ITEMS,
		defaultValue: "home",
	},
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SelectedSecond: Story = {
	args: {
		defaultValue: "benefit",
	},
};

export const WithDisabled: Story = {
	args: {
		items: [
			{ value: "home", label: "홈" },
			{ value: "benefit", label: "혜택" },
			{ value: "shopping", label: "쇼핑", disabled: true },
		],
		defaultValue: "home",
	},
};
