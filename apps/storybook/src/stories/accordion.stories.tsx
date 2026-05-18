import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "@pxds/cx-components/components/accordion";

const meta = {
	title: "Components/layout/Accordion",
	component: Accordion,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Controlled 또는 uncontrolled disclosure 컴포넌트. open/close 상태로 본문을 펼치거나 접는다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/accordion",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		title: { control: "text" },
		leftText: { control: "text" },
		defaultOpen: { control: "boolean" },
		open: { control: "boolean" },
		disabled: { control: "boolean" },
	},
	args: {
		title: "자주 묻는 질문",
		children: "상세 안내 문구를 표시합니다.",
		defaultOpen: false,
		disabled: false,
	},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
	args: {
		defaultOpen: true,
	},
};

export const WithLeftText: Story = {
	args: {
		leftText: "01",
		title: "요금제 혜택",
		defaultOpen: true,
		children: "혜택 상세 내용을 표시합니다.",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
