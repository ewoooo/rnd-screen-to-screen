import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "@pxds/cx-components/components/icon";

const meta = {
	title: "Components/layout/Icon",
	component: Icon,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"@pxds/cx-components does not implement Icon directly. It re-exports the Icon wrapper, types, color list, and registry helpers from @pxds/cx-icons.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/icon",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
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
			description: "Normalized registry icon key from @pxds/cx-icons.",
		},
		size: {
			control: "select",
			options: [40, 24, 20, 16, 12],
			description: "Public icon size in current code.",
		},
		color: {
			control: "select",
			options: [
				undefined,
				"primary",
				"secondary",
				"tertiary",
				"disabled",
				"brand",
				"critical",
				"on-brand",
			],
			description: "Token color for recolorable icons only.",
		},
		alt: {
			control: "text",
		},
		"aria-label": {
			control: "text",
		},
		className: {
			control: "text",
		},
	},
	args: {
		type: "arrow-left",
		size: 24,
	},
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Close: Story = {
	args: {
		type: "close",
		size: 24,
		"aria-label": "닫기",
	},
};

export const RecoloredPrimary: Story = {
	args: {
		type: "arrow-left",
		size: 24,
		color: "primary",
	},
};

export const Critical: Story = {
	args: {
		type: "info",
		size: 24,
		color: "critical",
	},
};

export const LargePayment: Story = {
	args: {
		type: "payment",
		size: 40,
	},
};
