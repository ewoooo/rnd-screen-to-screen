import type { Meta, StoryObj } from "@storybook/react-vite";
import { TitleSectionLeftItem } from "@pxds/cx-components/components/title-section-left-item";

const meta = {
	title: "Components/typography/TitleSectionLeftItem",
	component: TitleSectionLeftItem,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Private leading slot for TitleSection. Mirrors the Figma LeftItem set: text, icon, and badge presets.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/title-section-left-item",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "inline-radio",
			options: ["text", "icon", "badge"],
		},
	},
	args: {
		type: "text",
		text: "2",
	},
} satisfies Meta<typeof TitleSectionLeftItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextPreset: Story = {};

export const IconPreset: Story = {
	args: {
		type: "icon",
		iconType: "info",
		label: "안내",
	},
};

export const BadgePreset: Story = {
	args: {
		type: "badge",
		text: "Badge",
	},
};
