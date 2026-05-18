import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonListOrder } from "@pxds/cx-components/components/button-list-order";

const meta = {
	title: "Components/action/ButtonListOrder",
	component: ButtonListOrder,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Compact inline action for choosing list ordering. It renders a label with the shared dropdown icon and is intended for scoped use in `FilterSorting` and `TitleSection.RightItem`, not as a generic button replacement.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/button-list-order",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		label: { control: "text" },
		icon: { control: "text" },
		disabled: { control: "boolean" },
	},
	args: {
		label: "인기순",
		icon: "dropdown",
		disabled: false,
	},
} satisfies Meta<typeof ButtonListOrder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Latest: Story = {
	args: {
		label: "최신순",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
