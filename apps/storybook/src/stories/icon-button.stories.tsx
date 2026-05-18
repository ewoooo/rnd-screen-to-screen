import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "@pxds/cx-components/components/icon-button";
import { Icon } from "@pxds/cx-components/components/icon";

const meta = {
	title: "Components/action/IconButton",
	component: IconButton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "아이콘 단독 액션 버튼입니다. AppBar 같은 chrome action slot에서 사용합니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/icon-button",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["small", "medium"],
		},
		variant: {
			control: "select",
			options: ["plain"],
		},
		disabled: { control: "boolean" },
		"aria-label": { control: "text" },
	},
	args: {
		size: "medium",
		variant: "plain",
		disabled: false,
		"aria-label": "뒤로가기",
	},
	render: (args) => (
		<IconButton {...args}>
			<Icon type="arrow-left" size={24} />
		</IconButton>
	),
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
	args: {
		size: "small",
	},
};

export const Close: Story = {
	args: {
		"aria-label": "닫기",
	},
	render: (args) => (
		<IconButton {...args}>
			<Icon type="close" size={24} />
		</IconButton>
	),
};

export const Disabled: Story = {
	args: {
		disabled: true,
		"aria-label": "닫기",
	},
	render: (args) => (
		<IconButton {...args}>
			<Icon type="close" size={24} />
		</IconButton>
	),
};
