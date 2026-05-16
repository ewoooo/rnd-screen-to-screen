import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListTextRightItem } from "@pxds/cx-components/components/list-text-right-item";

const meta = {
	title: "Components/layout/ListTextRightItem",
	component: ListTextRightItem,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"ListText의 우측 preset 슬롯. Figma RightItem 컴포넌트 세트를 mirror합니다. type variant로 text/badge/badgeLevel/textButton/icon 표현을 선택합니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/list-text-right-item",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["text", "badge", "badgeLevel", "textButton", "icon"],
			description: "Normalized private preset type.",
		},
		text: {
			control: { type: "text" },
			description: "Label for `text`, `badge`, and `textButton`.",
		},
		badgeType: {
			control: { type: "select" },
			options: ["gray", "black", "blue"],
			description: "Badge tone for `badge`.",
		},
		levels: {
			control: { type: "object" },
			description: "Level badge order for `badgeLevel`.",
		},
		icon: {
			control: { type: "select" },
			options: ["arrow-right"],
			description: "Icon preset for `icon`.",
		},
		ariaLabel: {
			control: { type: "text" },
			description: "Required by type when interactive `icon` owns the action target.",
		},
		onClick: {
			action: "clicked",
			description: "Makes `textButton` or `icon` own the action target.",
		},
		className: {
			control: { type: "text" },
		},
	},
	args: {
		type: "text",
		text: "-3,000원",
	},
} satisfies Meta<typeof ListTextRightItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Badge: Story = {
	args: {
		type: "badge",
		text: "소멸",
		badgeType: "gray",
	},
};

export const BadgeLevel: Story = {
	args: {
		type: "badgeLevel",
		levels: ["v", "g", "s"],
	},
};

export const TextButton: Story = {
	args: {
		type: "textButton",
		text: "-3,000원",
	},
};

export const Icon: Story = {
	args: {
		type: "icon",
		icon: "arrow-right",
		ariaLabel: "다음으로 이동",
	},
};
