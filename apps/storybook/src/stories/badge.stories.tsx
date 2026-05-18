import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@pxds/cx-components/components/badge";

const meta = {
	title: "Components/feedback/Badge",
	component: Badge,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "작은 상태/분류 라벨을 표현하는 CX badge 컴포넌트입니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/badge",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["gray", "black", "blue"],
			description: "Visual tone.",
		},
		text: {
			control: "text",
			description: "Text fallback when children is absent.",
		},
		className: {
			control: "text",
		},
	},
	args: {
		type: "gray",
		text: "Badge",
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Gray: Story = {
	args: {
		type: "gray",
		text: "필수",
	},
};

export const Black: Story = {
	args: {
		type: "black",
		text: "NEW",
	},
};

export const Blue: Story = {
	args: {
		type: "blue",
		text: "혜택",
	},
};
