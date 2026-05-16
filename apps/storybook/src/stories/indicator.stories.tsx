import type { Meta, StoryObj } from "@storybook/react-vite";
import { Indicator } from "@pxds/cx-components/components/indicator";

const meta = {
	title: "Components/feedback/Indicator",
	component: Indicator,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Dot-style page/slide indicator primitive.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/indicator",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		count: {
			control: { type: "number", min: 1, step: 1 },
			description: "Number of dots to render. Clamped to at least 1.",
		},
		activeIndex: {
			control: { type: "number", min: 0, step: 1 },
			description: "Zero-based active dot index.",
		},
		ariaLabel: {
			control: "text",
			description: "Accessible label for the indicator group.",
		},
		className: {
			control: "text",
		},
	},
	args: {
		count: 6,
		activeIndex: 0,
		ariaLabel: "페이지 위치",
	},
} satisfies Meta<typeof Indicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ThreeDotsMiddle: Story = {
	args: {
		count: 3,
		activeIndex: 1,
		ariaLabel: "배너 위치",
	},
};

export const Last: Story = {
	args: {
		count: 5,
		activeIndex: 4,
	},
};
