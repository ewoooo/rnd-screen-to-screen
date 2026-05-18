import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextButton } from "@pxds/cx-components/components/text-button";

const meta = {
	title: "Components/action/TextButton",
	component: TextButton,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: "Text-only action component for the Figma `text-button` component set.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/text-button",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		children: { control: "text" },
		secondaryChildren: { control: "text" },
		variant: {
			control: "select",
			options: ["default", "paired"],
		},
		disabled: { control: "boolean" },
		asChild: { control: "boolean" },
	},
	args: {
		children: "버튼",
		variant: "default",
		disabled: false,
		asChild: false,
	},
} satisfies Meta<typeof TextButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Paired: Story = {
	args: {
		variant: "paired",
		children: "버튼",
		secondaryChildren: "버튼",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
