import type { Meta, StoryObj } from "@storybook/react-vite";
import { BottomNavigation } from "@pxds/cx-components/components/bottom-navigation";

const meta = {
	title: "Components/navigation/BottomNavigation",
	component: BottomNavigation,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Figma State variant(My/Search/Shopping)에 매핑되는 3-item 모바일 bottom navigation.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/bottom-navigation",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		state: {
			control: "inline-radio",
			options: ["My", "Search", "Shopping"],
		},
	},
	args: {
		state: "My",
	},
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Search: Story = {
	args: {
		state: "Search",
	},
};

export const Shopping: Story = {
	args: {
		state: "Shopping",
	},
};

export const CustomItems: Story = {
	args: {
		state: "Search",
		items: [
			{ state: "My", label: "MY", icon: "home", iconSize: 24 },
			{ state: "Search", label: "검색", icon: "search", iconSize: 20 },
			{ state: "Shopping", label: "쇼핑", icon: "shop", iconSize: 24 },
		],
	},
};
