import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListSelectedRightItem } from "@pxds/cx-components/components/list-selected-right-item";

const meta = {
	title: "Components/selection/ListSelectedRightItem",
	component: ListSelectedRightItem,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"ListSelected의 우측 affordance 슬롯. ListSelected 패턴 안에서만 사용되도록 scoped private 컴포넌트입니다. type variant로 pill/icon/text-button 형태를 선택합니다.",
			},
		},
		layer: "base",
		owner: "@pxds/cx-components",
		importPath: "@pxds/cx-components/components/list-selected-right-item",
		status: "active",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["buttonXsmallSolid", "icon", "textButton"],
			description: "Selects the Figma `Type` variant.",
		},
		label: {
			control: { type: "text" },
			description: "Visible label for button/text variants.",
		},
		iconType: {
			control: { type: "text" },
			description: "Icon rendered by the `icon` variant.",
		},
		disabled: {
			control: { type: "boolean" },
			description: "Passed to interactive affordances.",
		},
		ariaLabel: {
			control: { type: "text" },
			description: "Accessible label for icon-only interaction.",
		},
		onClick: {
			action: "clicked",
			description: "Makes the affordance interactive.",
		},
		className: {
			control: { type: "text" },
		},
	},
	args: {
		type: "buttonXsmallSolid",
		label: "받기",
		disabled: false,
	},
} satisfies Meta<typeof ListSelectedRightItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Icon: Story = {
	args: {
		type: "icon",
		iconType: "arrow-right",
		ariaLabel: "상세 보기",
	},
};

export const TextButton: Story = {
	args: {
		type: "textButton",
		label: "Text",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
