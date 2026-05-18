import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "@pxds/cx-components/components/tooltip";

const meta = {
	title: "Components/feedback/Tooltip",
	component: Tooltip,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"TooltipBubble을 감싸는 positioning compound. 선택적 trigger anchor와 controlled/uncontrolled open 상태를 지원합니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/tooltip",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		direction: {
			control: { type: "radio" },
			options: ["left", "center", "right"],
			description: "Direction variant forwarded to TooltipBubble.",
		},
		open: {
			control: { type: "boolean" },
			description: "Controlled visibility when trigger is provided.",
		},
		defaultOpen: {
			control: { type: "boolean" },
			description: "Initial uncontrolled visibility when trigger is provided.",
		},
		children: {
			control: { type: "text" },
			description: "Tooltip content passed to TooltipBubble.",
		},
		className: {
			control: { type: "text" },
		},
	},
	args: {
		direction: "left",
		children: "선물가 14,900원",
	},
} satisfies Meta<typeof Tooltip>;

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

export const WithTrigger: Story = {
	args: {
		open: true,
		trigger: (
			<button type="button" style={{ padding: "8px 12px" }}>
				혜택 보기
			</button>
		),
	},
};
