import type { Meta, StoryObj } from "@storybook/react-vite";
import { Handle } from "@pxds/cx-components/components/handle";

const meta = {
	title: "Components/layout/Handle",
	component: Handle,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Bottomsheet 상단의 드래그 핸들 시각 primitive입니다. 제스처나 sheet 상태는 소유하지 않습니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/handle",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		state: {
			control: "select",
			options: ["default", "off"],
			description: "Figma variant parity가 필요할 때 쓰는 명시 상태입니다.",
		},
		showHandle: {
			control: "boolean",
			description: "Visual bar 표시 여부.",
		},
		className: {
			control: "text",
		},
	},
	args: {
		state: "default",
		showHandle: true,
	},
} satisfies Meta<typeof Handle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Off: Story = {
	args: {
		state: "off",
	},
};

export const Hidden: Story = {
	args: {
		showHandle: false,
	},
};
