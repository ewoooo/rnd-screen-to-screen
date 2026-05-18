import type { Meta, StoryObj } from "@storybook/react-vite";
import { TitleContentsRightItem } from "@pxds/cx-components/components/title-contents-right-item";

const meta = {
	title: "Components/typography/TitleContentsRightItem",
	component: TitleContentsRightItem,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Private right-side preset renderer for TitleContents. Normalizes icon, button, and type3 presets to the existing component vocabulary.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/title-contents-right-item",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "inline-radio",
			options: ["icon", "button", "type3"],
		},
		icon: {
			control: "inline-radio",
			options: ["arrowUp"],
		},
		label: { control: "text" },
		disabled: { control: "boolean" },
		onClick: { action: "click" },
	},
	args: {
		type: "icon",
		icon: "arrowUp",
		label: "접기",
		disabled: false,
	},
} satisfies Meta<typeof TitleContentsRightItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconPreset: Story = {};

export const ButtonPreset: Story = {
	args: {
		type: "button",
		label: "버튼",
	},
};

export const Type3Preset: Story = {
	args: {
		type: "type3",
		label: "접기",
	},
};
