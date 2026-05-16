import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChipItem } from "@pxds/cx-components/components/chip-item";

const meta = {
	title: "Components/selection/ChipItem",
	component: ChipItem,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Chips 패턴에서 사용하는 단일 pill item. selected 상태와 optional onClick을 지원합니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/chip-item",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		children: {
			control: { type: "text" },
			description: "Chip label content.",
		},
		selected: {
			control: { type: "boolean" },
			description: "Selected visual state.",
		},
		onClick: {
			action: "clicked",
			description: "Optional press handler. When set, renders as <button>.",
		},
		className: {
			control: { type: "text" },
		},
	},
	args: {
		children: "단말기",
		selected: false,
	},
} satisfies Meta<typeof ChipItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
	args: {
		selected: true,
	},
};

export const Clickable: Story = {
	args: {
		onClick: () => undefined,
	},
};
