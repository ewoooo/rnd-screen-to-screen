import type { Meta, StoryObj } from "@storybook/react-vite";
import { TooltipBubble } from "@pxds/cx-components/components/tooltip-bubble";

const meta = {
	title: "Components/feedback/TooltipBubble",
	component: TooltipBubble,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Figma `Tooltip` visual component에 대응하는 표시용 bubble. trigger, open state, delay 같은 동작은 포함하지 않습니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/tooltip-bubble",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		direction: {
			control: { type: "radio" },
			options: ["left", "center", "right"],
			description: "Bubble tail direction variant.",
		},
		children: {
			control: { type: "text" },
			description: "Bubble content.",
		},
		className: {
			control: { type: "text" },
		},
	},
	args: {
		direction: "left",
		children: "선물가 14,900원",
	},
} satisfies Meta<typeof TooltipBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Center: Story = {
	args: {
		direction: "center",
	},
};

export const Right: Story = {
	args: {
		direction: "right",
	},
};
