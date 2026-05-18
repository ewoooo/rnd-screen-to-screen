import type { Meta, StoryObj } from "@storybook/react-vite";
import { TitleContents } from "@pxds/cx-components/components/title-contents";

const meta = {
	title: "Components/typography/TitleContents",
	component: TitleContents,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Content-section title row with an optional right-side affordance (icon, button, or type3 preset).",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/title-contents",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		title: { control: "text" },
		showButton: { control: "boolean" },
	},
	args: {
		title: "타이틀",
		showButton: true,
		rightItem: { type: "icon", label: "접기" },
	},
} satisfies Meta<typeof TitleContents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutButton: Story = {
	args: {
		title: "상세 정보",
		showButton: false,
	},
};

export const ButtonRightItem: Story = {
	args: {
		title: "필터",
		rightItem: { type: "button", label: "버튼" },
	},
};
