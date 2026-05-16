import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterSorting } from "@pxds/cx-components/components/filter-sorting";

const meta = {
	title: "Components/form/FilterSorting",
	component: FilterSorting,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Phase 4 list count, sorting, and filter control row. Composes ButtonListOrder and an optional contents Divider.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/filter-sorting",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		totalCount: { control: "text" },
		totalLabel: { control: "text" },
		totalUnit: { control: "text" },
		orderLabel: { control: "text" },
		filterLabel: { control: "text" },
		divider: { control: "boolean" },
		onOrderClick: { action: "order" },
		onFilterClick: { action: "filter" },
	},
	args: {
		totalCount: 256,
		totalLabel: "전체",
		totalUnit: "개",
		orderLabel: "인기순",
		filterLabel: "필터",
		divider: true,
	},
} satisfies Meta<typeof FilterSorting>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
	args: {
		totalCount: 12,
		orderLabel: "최신순",
		onOrderClick: () => {},
		onFilterClick: () => {},
	},
};

export const WithoutDivider: Story = {
	args: {
		totalCount: 0,
		divider: false,
	},
};
