import type { Meta, StoryObj } from "@storybook/react-vite";
import { BadgeIcon } from "@pxds/cx-components/components/badge-icon";

const meta = {
	title: "Components/feedback/BadgeIcon",
	component: BadgeIcon,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Compact icon-plus-badge compound for feature/category entry points.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/badge-icon",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		iconType: {
			control: "select",
			options: [
				"ai-search",
				"all",
				"arrow-down",
				"arrow-left",
				"arrow-right",
				"arrow-up",
				"barcode",
				"benefit",
				"bill",
				"bubble",
				"calender",
				"call",
				"close",
				"content",
				"data",
				"data-share",
				"device",
				"download",
				"dropdown",
				"family",
				"family-data",
				"heart",
				"history",
				"home",
				"info",
				"logo",
				"menu",
				"mobile-plan",
				"money",
				"netflix",
				"payment",
				"percent",
				"plus",
				"point",
				"rate-plan",
				"search",
				"shop",
				"shop-1",
				"subscribe",
				"terminal",
				"tu",
				"tw",
				"voice",
				"youtube",
			],
			description: "Convenience input for rendering Icon at 40px.",
		},
		badgeText: {
			control: "text",
			description: "Convenience text for rendering Badge.",
		},
		badgeType: {
			control: "select",
			options: ["gray", "black", "blue"],
			description: "Existing Badge tone.",
		},
		subtext: {
			control: "text",
			description: "Optional supporting text below the icon group.",
		},
		showSubtext: {
			control: "boolean",
			description: "Controls the Figma Subtext variant.",
		},
		className: {
			control: "text",
		},
	},
	args: {
		iconType: "payment",
		badgeText: "혜택",
		badgeType: "blue",
		subtext: "",
		showSubtext: false,
	},
} satisfies Meta<typeof BadgeIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSubtext: Story = {
	args: {
		iconType: "benefit",
		badgeText: "혜택",
		badgeType: "black",
		subtext: "멤버십",
		showSubtext: true,
	},
};

export const GrayBadge: Story = {
	args: {
		iconType: "rate-plan",
		badgeText: "필수",
		badgeType: "gray",
		showSubtext: false,
	},
};

export const BlackNew: Story = {
	args: {
		iconType: "shop",
		badgeText: "NEW",
		badgeType: "black",
		showSubtext: false,
	},
};
