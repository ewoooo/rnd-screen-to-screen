import type { Meta, StoryObj } from "@storybook/react-vite";
import { TitleBottomSheet } from "@pxds/cx-components/components/title-bottom-sheet";

const meta = {
	title: "Components/typography/TitleBottomSheet",
	component: TitleBottomSheet,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Bottom-sheet header content with optional title text, close affordance, and supporting sub-text rows.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/title-bottom-sheet",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		title: { control: "text" },
		subText: { control: "text" },
		subText2: { control: "text" },
		showTitle: { control: "boolean" },
		showTitleText: { control: "boolean" },
		showTitleButton: { control: "boolean" },
		showSubText: { control: "boolean" },
		showSubText2: { control: "boolean" },
		closeLabel: { control: "text" },
		onClose: { action: "close" },
	},
	args: {
		title: "타이틀",
		showTitle: true,
		showTitleButton: true,
	},
} satisfies Meta<typeof TitleBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSubText: Story = {
	args: {
		title: "요금제 선택",
		subText: "총",
		subText2: "3개",
		showSubText: true,
		showSubText2: true,
	},
};

export const WithoutCloseButton: Story = {
	args: {
		title: "알림",
		showTitleButton: false,
	},
};
