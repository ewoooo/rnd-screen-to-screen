import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonXsmallSolid } from "@pxds/cx-components/components/button-xsmall-solid";

const meta = {
	title: "Components/action/ButtonXsmallSolid",
	component: ButtonXsmallSolid,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Figma `ButtonXsmallSolid`을 기존 `Button` semantics와 `Icon` asset으로 조립한 compact solid action adapter입니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/button-xsmall-solid",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		children: { control: "text" },
		state: {
			control: "select",
			options: ["active", "disabled"],
		},
		disabled: { control: "boolean" },
	},
	args: {
		children: "쿠폰 받기",
		state: "active",
		disabled: false,
	},
} satisfies Meta<typeof ButtonXsmallSolid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
	args: {
		state: "active",
		children: "쿠폰 받기",
	},
};

export const Disabled: Story = {
	args: {
		state: "disabled",
		children: "보유중",
	},
};

export const NoIcon: Story = {
	args: {
		children: "쿠폰 받기",
	},
	render: (args) => <ButtonXsmallSolid {...args} icon={false} />,
};
