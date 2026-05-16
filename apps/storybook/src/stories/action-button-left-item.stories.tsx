import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionButtonLeftItem } from "@pxds/cx-components/components/action-button-left-item";

const meta = {
	title: "Components/action/ActionButtonLeftItem",
	component: ActionButtonLeftItem,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Private leading icon cluster for `ActionButton`. It owns no label, click handler, disabled state, tooltip, or button layout behavior.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/action-button-left-item",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["ai-gift", "ai"],
		},
	},
	args: {
		type: "ai-gift",
	},
} satisfies Meta<typeof ActionButtonLeftItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AiGift: Story = {
	args: {
		type: "ai-gift",
	},
};

export const Ai: Story = {
	args: {
		type: "ai",
	},
};
