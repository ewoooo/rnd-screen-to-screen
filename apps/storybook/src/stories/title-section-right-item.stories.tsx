import type { Meta, StoryObj } from "@storybook/react-vite";
import { TitleSectionRightItem } from "@pxds/cx-components/components/title-section-right-item";

const meta = {
	title: "Components/typography/TitleSectionRightItem",
	component: TitleSectionRightItem,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Private right-side item set for TitleSection. Mirrors the Figma TitleSection.RightItem variants: icon, textButton, textItemButton, buttonListOrder.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/title-section-right-item",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "inline-radio",
			options: ["icon", "textButton", "textItemButton", "buttonListOrder"],
		},
		disabled: { control: "boolean" },
		onClick: { action: "click" },
	},
	args: {
		type: "icon",
		icon: "menu",
		label: "더보기",
		disabled: false,
	},
} satisfies Meta<typeof TitleSectionRightItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconPreset: Story = {};

export const TextButton: Story = {
	args: {
		type: "textButton",
		text: "Text",
	},
};

export const TextItemButton: Story = {
	args: {
		type: "textItemButton",
		label: "선택한 휴대폰 번호",
		value: "3개",
		icon: "arrow-right",
	},
};

export const ButtonListOrder: Story = {
	args: {
		type: "buttonListOrder",
		label: "인기순",
		icon: "dropdown",
	},
};
